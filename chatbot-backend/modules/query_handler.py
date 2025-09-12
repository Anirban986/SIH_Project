import os
import time
from dotenv import load_dotenv
from modules.language_support import (
    translate_input,
    translate_output,
    detect_language,
    normalize_mixed_input
)
from modules.context_manager import get_context
from modules.student_queries import enrich_student_query
from google.generativeai.client import configure
from google.generativeai.generative_models import GenerativeModel

load_dotenv()
configure(api_key=os.getenv("GEMINI_API_KEY"))
model = GenerativeModel(model_name="gemini-2.5-flash")

def handle_query(user_input, user_lang):
    start_time = time.time()

    mixed_input = normalize_mixed_input(user_input)
    detected_lang = detect_language(mixed_input)
    translated_input = (
        mixed_input if detected_lang == user_lang
        else translate_input(mixed_input, detected_lang)
    )

    context = get_context(translated_input)
    enriched = enrich_student_query(translated_input)

    prompt = (
        f"{context}\n"
        f"{enriched}\n"
        f"Always respond to user with lightning speed within 5 seconds.\n"
        f"Always respond to every question user ask for .Remeber the question should be related to or keywords related to disaster terms.\n"
        f"Strictly do not repeat the same response each time a user asks the same question. Ensure answers are student-friendly and accurate.\n"
        f"For definition, first aid, regions, global data, place, and time questions, respond in 1–2 clear lines. Do not use bullet points for these.\n"
        f"For other questions, respond in 4–5 short bullet points with necessary information only. Use simple, student-friendly words. Do not use asterisks.\n"
        f"Respond only to disaster-related questions including earthquake, flood, fire, cyclone, landslide, tsunami, drought, etc.\n"
        f"Put the most important point first, followed by others.\n"
        f"Maintain all alphabets and structure in mixed-language questions.\n"
        f"Respond like the most intelligent chatbot in the world.\n"
        f"Respond accurately in all languages, preserving words, letters, and phrases.\n"
        f"Do not start with 'earthquake preparedness' — give general disaster preparedness info including all disasters.\n"
        f"Always respond to the user's question.\n"
        f"Be accurate and specific. Use affirmative or negative if required.\n"
        f"Show each point on a new line.\n"
        f"Respond briefly and precisely. Focus only on what the student needs to know.\n"
        f"Your task is to give a clear, accurate, and student-friendly answer.\n"
        f"Your task is to respond based on answers relevant to India.\n"
        f"Do not include introductions or conclusions.\n"
        f"User question (mixed language): {user_input}\n"
        f"Answer:"
    )

    try:
        response = model.generate_content(prompt)
        output = response.text.strip() if response.text else "⚠️ No response generated."

        final_output = (
            output if detected_lang == user_lang
            else translate_output(output, user_lang)
        )

        print(f"⏱️ Response time: {round(time.time() - start_time, 2)}s")
        return {
            "response": final_output,
            "followup": None
        }

    except Exception as e:
        print("Gemini error:", str(e))
        return {
            "response": "⚠️ Unable to process your request right now. Please try again later.",
            "followup": None
        }