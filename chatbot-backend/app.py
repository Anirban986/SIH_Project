from flask import Flask, request, jsonify, render_template, g
from modules.query_handler import handle_query
from modules.language_support import detect_language, normalize_mixed_input, detect_disaster_type
from modules.general_queries import general_queries
from rapidfuzz import fuzz
import json, os, random, time
from functools import lru_cache
from flask_cors import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)
static_folder = app.static_folder or "static"
dq_path = os.path.join(static_folder, "disaster_queries.json")
dq_data = {}

if os.path.exists(dq_path):
    with open(dq_path, "r", encoding="utf-8") as f:
        dq_data = json.load(f)

disaster_queries = dq_data.get("disaster_queries", {})
keyword_index = {}

for dtype, data in disaster_queries.items():
    for block in data.get("followups", {}).get("keyword", []):
        keywords = set(map(str.lower, block.get("keywords", [])))
        for kw in keywords:
            keyword_index.setdefault(kw, []).extend(block.get("messages", []))

intro_phrases = [
    "Great! Let’s take the next step together.",
    "I’m here with you. Want to keep going?",
    "Let’s make this simple and clear together.",
    "Here’s something that might really help.",
    "Want to explore this a bit more?",
    "Can I show you something helpful?",
    "Let me walk you through this.",
    "You’re on the right track. Want to go deeper?",
    "Let’s make this easier together.",
    "I’ve got something useful for you.",
    "Shall we dive into the next part?",
    "Let’s stay safe and smart. Want to hear more?",
    "I’ve got your back. Want to take a closer look?",
    "This might be useful — shall we explore it?",
    "Let’s walk through it step by step.",
    "Here’s something that could make things clearer.",
    "I’ve got a tip that might make this easier.",
    "You're doing great — ready for the next tip?",
    "Let’s take this one step further."
]

fallback_responses = [
    "That’s a really thoughtful question. Right now, I’m focused on disaster safety like earthquakes, floods, fires, cyclones. Want to explore one of those?",
    "I wish I could help with everything. For now, I’m trained to support you during disasters. Let’s look at something like fire safety or flood response together.",
    "I’m here to guide you through disaster situations. If you’re asking about earthquakes, floods, fires, cyclones, I’ve got your back. Want to try one of those?",
    "That’s important, and I care about it. I’m built to help during disasters — maybe we can explore how to stay safe in an earthquake or cyclone or fire or flood?",
    "I’m here for disaster safety, preparedness, and alerts. If you’re facing something like an earthquake or flood or fire or cyclone, I’ll do my best to support you."
]

@lru_cache(maxsize=500)
def cached_query(message, lang):
    result = handle_query(message, lang)
    if isinstance(result, dict):
        return result
    return {"response": str(result), "followup": None}

@app.before_request
def start_timer():
    g.start_time = time.perf_counter()

@app.after_request
def add_latency_header(response):
    if hasattr(g, "start_time"):
        latency = round(time.perf_counter() - g.start_time, 3)
        response.headers["X-Response-Time"] = f"{latency}s"
    return response

@app.route("/")
def home():
    return render_template("chatbot.html")

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"status": "ok", "message": "Flask server is running ✅"})

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(force=True) or {}
        user_input = data.get("message", "").strip()
        user_lang = data.get("language", "").strip()

        if not user_input:
            return jsonify({"response": "Please enter a message.", "followup": None})

        if not user_lang:
            user_lang = detect_language(user_input)

        translated = normalize_mixed_input(user_input)
        normalized_input = translated.lower()
        input_words = set(normalized_input.split())

        disaster_type = detect_disaster_type(user_input)
        matched_messages = []

        for phrase, translations in general_queries.items():
            for lang_code, content in translations.items():
                question_text = content.get("question", "").lower()
                if fuzz.partial_ratio(question_text, normalized_input) > 85 or question_text in normalized_input:
                    reply = translations.get(user_lang, translations["en"])
                    return jsonify({
                        "response": reply["response"],
                        "followup": None
                    })

        for kw, msgs in keyword_index.items():
            if kw in input_words:
                matched_messages.extend(msgs)

        if not disaster_type and not matched_messages:
            fallback_message = random.choice(fallback_responses)
            return jsonify({
                "response": fallback_message,
                "followup": None
            })

        fallback_blocks = disaster_queries.get(disaster_type, {}).get("followups", {}).get("keyword") or []
        for block in fallback_blocks:
            keywords = set(map(str.lower, block.get("keywords", [])))
            if input_words & keywords:
                matched_messages.extend(block.get("messages", []))

        followup = None
        if matched_messages and user_lang == "en":
            intro = random.choice(intro_phrases)
            followup = f"{intro} {random.choice(matched_messages)}"

        result = cached_query(user_input, user_lang)
        return jsonify({
            "response": result.get("response", "Sorry, I couldn't generate a response."),
            "followup": followup or result.get("followup")
        })

    except Exception as e:
        import traceback
        print("Error:", e)
        traceback.print_exc()
        return jsonify({
            "response": "Oops! Something went wrong on the server.",
            "followup": None
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)