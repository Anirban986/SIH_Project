from langdetect import detect_langs, DetectorFactory
from deep_translator import GoogleTranslator
from rapidfuzz import process
import re

DetectorFactory.seed = 0
disaster_terms = {
    "earthquake": [
        "bhukamp", "bhukhanp", "bhukam", "bhukampa", "bhukompo", "bhukom", "bhookamp", "bhukomp",
        "earthquake", "bhumikamp", "bhumi kamp", "disaster bhukamp", "bhukamp disaster",
        "भूकंप", "भूकम्प", "भूकंप आया", "भूकंप से बचाव", "bhukamp aaya", "bhukamp se bachav",
        "kompo laglo", "nilam nadungudhu", "bhoomampu", "kampan", "kampana aayitu", "bhookampam",
        "bhukampa hela", "zameen hildi", "zalzala", "zamin hila"
    ],
    "flood": [
        "flood", "flash flood", "water rising", "flood alert", "flood warning", "flood rescue",
        "बाढ़", "बाढ", "बाढ़ आई", "बाढ़ से बचाव", "बाढ़ का खतरा", "baadh", "badh", "barh", "baarish se baadh",
        "bonna", "plaban", "jolobonno", "pani uthche", "bonna asche", "bonna theke bachar upay", "bonna warning",
        "vellam", "thanni perugudhu", "vellam vanthachu", "vellam safety", "vellam alert",
        "varadha", "neellu peruguthunnayi", "varadha vastundi", "varadha warning", "varadha rescue",
        "pur", "pani bharla", "pur aala", "puricha dhoka", "puratun vachva",
        "jala pravaha", "neeru barutte", "neeru hathiddu", "jala apaya", "jala rakshane",
        "vellapokkam", "vellam vannu", "vellam raksha", "vellam thadayuka", "vellam upayam",
        "bada", "jala bahi gala", "bada asila", "bada raksha", "bada upaya",
        "baadh aa gayi", "pani chadh gaya", "baadh di madad", "baadh ton bachav", "baadh alert",
        "selab", "pani bhar gaya", "selab aaya", "selab se bachav", "selab ka khatra",
        "bonna ahise", "bonna raksha", "bonna upaya",
        "pani vadhi gayu", "baadh avi gayi", "baadh ni madad", "baadh thi bachav",
        "ghar mein pani ghus gaya", "school mein flood hai", "hostel mein pani bhar gaya", "help during flood", "how to stay safe in flood", "flood emergency", "flood situation", "flood kya karein"
    ],
    "fire": [
        "fire", "wildfire", "blaze", "flames", "fire alert", "fire drill", "fire emergency",
        "aag", "ag", "agni", "ज्वाला", "आग", "आग लग गई", "आग से बचाव", "aag lag gayi", "aag se bachav",
        "agun", "jalche", "jwala", "agun lagche", "agun lagar por ki korbo",
        "neruppu", "neruppu pidikkudhu", "neruppu safety",
        "ippudu", "agni pattindi", "fire hoyeche",
        "aag lagli", "agnishaman",
        "benki", "benki hidiyitu",
        "thee", "thee pidichu",
        "agni", "aag lagila",
        "agni", "aag lag gayi",
        "aag", "aag lag gayi",
        "neruppu", "neruppu safety",
        "jal gaya", "fire kya karein", "fire help", "fire rescue", "fire se bachav"
    ],
    "cyclone": [
        "cyclone", "storm", "hurricane", "typhoon", "cyclone alert", "cyclone warning", "cyclone shelter",
        "चक्रवात", "तूफान", "आंधी", "चक्रवात आया", "तूफान से बचाव", "chakravat", "toofan", "aandhi",
        "jhor", "bavandar", "gobhir jhor", "toofan warning", "toofan panic",
        "soolam", "kaatru perugudhu", "soolam safety",
        "chakravatham", "gali vichcham", "cyclone ki korbo",
        "chakravat", "toofan",
        "soolagali", "gali joragide",
        "chuzhal", "kaattu varunnu",
        "chakrabat", "toofan asila",
        "toofan aa gaya", "hawa tez hai",
        "toofan", "aandhi",
        "cyclone kya karein", "cyclone help", "cyclone rescue", "cyclone se bachav"
    ],
    "landslide": [
        "landslide", "mudslide", "landslide alert", "landslide warning", "landslide rescue",
        "भूस्खलन", "पहाड़ खिसकना", "भूस्खलन से बचाव", "bhuskhalan", "pahaari dhsalan", "pahar dhsalan",
        "bhuskhala", "pahar dhala", "pahar dhsala", "pahar khisna", "zamin khisakna",
        "malai urundhudhu", "nilam slid aagudhu",
        "pagaalu jaruthunnayi", "pahad khisna",
        "pahaad khisla", "bhumi khisakli",
        "gudda slid aayitu", "bhumi slid aayitu",
        "malayurakku", "bhumi slid aayi",
        "pahar khisila", "bhumi khisila",
        "pahaad khisak gaya", "zameen slid ho gayi",
        "zamin khisak gayi", "pahaad gir gaya",
        "landslide hoyeche", "landslide ki korbo", "landslide help", "landslide se bachav"
    ],
    "tsunami": [
        "tsunami", "sea wave", "tsunami alert", "tsunami warning", "tsunami rescue",
        "सुनामी", "समुद्री लहर", "सुनामी आई", "सुनामी से बचाव", "sunami", "samudrik jhor",
        "jolotora", "samudra taranga", "samundar ki lehar", "samundar ki lehr", "samundar ki lhr",
        "kadal alai", "tsunami varudhu",
        "samudra lehar", "tsunami vastundi",
        "samudra lehar", "tsunami yetoy",
        "samudra ale", "tsunami barutte",
        "kadal alakal", "tsunami varunnu",
        "samudra lehar", "tsunami asila",
        "samundar di lehar", "tsunami aa gayi",
        "samundar ki lehar", "tsunami",
        "tsunami kya karein", "tsunami help", "tsunami rescue", "tsunami se bachav"
    ],
    "drought": [
        "drought", "dry spell", "no rain", "water shortage", "drought alert", "drought help",
        "सूखा", "बारिश नहीं हुई", "पानी नहीं गिरा", "सूखा से बचाव", "sukha", "sukhha", "sukha pad gaya",
        "barshaheen", "pani nei",
        "varumai", "thanni illai",
        "neellu levu", "sukham",
        "sukha padla", "pani nahi",
        "neeru illa", "sukha aayitu",
        "vellam illa", "sukham",
        "pani nahi", "sukha asila",
        "pani nahi aaya", "sukha ho gaya",
        "pani nahi gira", "sukha",
        "drought hoyeche", "drought ki korbo", "drought help", "drought se bachav"
    ],
    "general_disaster": [
    "disaster", "emergency", "tragedy", "crisis", "danger", "problem", "alert", "warning",
    "help", "rescue", "support", "safe", "safety", "precaution", "preparedness",
    "apda", "आपदा", "आपातकाल", "आपात स्थिति", "durghatna", "दुर्घटना", "vipatti", "विपत्ति",
    "musibat", "मुसीबत", "samasya", "समस्या", "bachao", "बचाओ", "madad", "मदद",
    "kya karein", "क्या करें", "kya karna chahiye", "क्या करना चाहिए", "kaise bachein", "कैसे बचें",
    "bipod", "bipad", "vipada", "viplab", "durjog", "দুর্যোগ", "biporjoy", "বিপর্যয়",
    "sahayata", "સહાયતા", "madat", "મદદ", "samasya", "సమస్య", "apattu", "அபத்து",
    "apaatkaalin", "ಅಪಾತ್ಕಾಲೀನ", "aapatkalin", "ଆପତ୍କାଳୀନ", "aapat sthiti", "आपत स्थिति",
    "raksha", "रक्षा", "suraksha", "सुरक्षा", "rakshan", "ரட்சிப்பு", "surakshita", "સુરક્ષિત",
    "emergency situation", "disaster response", "disaster management", "how to stay safe",
    "what should I do", "need help", "urgent help", "immediate rescue", "safe place",
    "evacuation", "relief", "shelter", "panic", "fear", "distress", "chaos", "hazard"
]}
disaster_keywords = {variant: key for key, variants in disaster_terms.items() for variant in variants}

def detect_language(text):
    try:
        langs = detect_langs(text)
        if isinstance(langs, list) and len(langs) > 0:
            top = langs[0]
            if hasattr(top, 'lang') and hasattr(top, 'prob') and top.prob > 0.7:
                return top.lang
    except Exception:
        pass
    return "en"

def translate_input(text, lang):
    try:
        if lang != "en":
            return GoogleTranslator(source=lang, target='en').translate(text)
    except Exception:
        pass
    return text

def translate_output(text, lang):
    try:
        if lang != "en":
            return GoogleTranslator(source='en', target=lang).translate(text)
    except Exception:
        pass
    return text

def correct_spelling(text):
    words = text.split()
    corrected = []
    for word in words:
        result = process.extractOne(word, disaster_keywords.keys())
        if result:
            match, score, _ = result
            corrected.append(match if score > 85 else word)
        else:
            corrected.append(word)
    return " ".join(corrected)

def normalize_mixed_input(text):
    text = text.strip().lower()
    text = re.sub(r"[^\w\s]", "", text)  
    text = correct_spelling(text)

    filler_words = [
        "ke", "ka", "ki", "hai", "ho", "hota", "hoti", "par", "mein", "me", "toh", "tha", "thi",
        "raha", "rahi", "wala", "wali"
    ]
    for word in filler_words:
        text = re.sub(rf"\b{word}\b", "", text)

    replacements = {
    "bhukamp": "earthquake", "bhukhanp": "earthquake", "bhukam": "earthquake", "bhukampa": "earthquake",
    "bhukompo": "earthquake", "bhukom": "earthquake", "bhookamp": "earthquake", "bhukomp": "earthquake",
    "bhumikamp": "earthquake", "bhumi kamp": "earthquake", "भूकंप": "earthquake", "भूकम्प": "earthquake",
    "भूकंप आया": "earthquake", "भूकंप से बचाव": "earthquake", "bhukamp aaya": "earthquake",
    "bhukamp se bachav": "earthquake", "kompo laglo": "earthquake", "nilam nadungudhu": "earthquake",
    "bhoomampu": "earthquake", "kampan": "earthquake", "kampana aayitu": "earthquake",
    "bhookampam": "earthquake", "bhukampa hela": "earthquake", "zameen hildi": "earthquake",
    "zalzala": "earthquake", "zamin hila": "earthquake",
    "flood": "flood", "flash flood": "flood", "water rising": "flood", "flood alert": "flood",
    "flood warning": "flood", "flood rescue": "flood", "बाढ़": "flood", "बाढ": "flood",
    "बाढ़ आई": "flood", "बाढ़ से बचाव": "flood", "बाढ़ का खतरा": "flood", "baadh": "flood",
    "badh": "flood", "barh": "flood", "baarish se baadh": "flood", "bonna": "flood", "plaban": "flood",
    "jolobonno": "flood", "pani uthche": "flood", "bonna asche": "flood", "bonna theke bachar upay": "flood",
    "bonna warning": "flood", "vellam": "flood", "thanni perugudhu": "flood", "vellam vanthachu": "flood",
    "vellam safety": "flood", "vellam alert": "flood", "varadha": "flood", "neellu peruguthunnayi": "flood",
    "varadha vastundi": "flood", "varadha warning": "flood", "varadha rescue": "flood", "pur": "flood",
    "pani bharla": "flood", "pur aala": "flood", "puricha dhoka": "flood", "puratun vachva": "flood",
    "jala pravaha": "flood", "neeru barutte": "flood", "neeru hathiddu": "flood", "jala apaya": "flood",
    "jala rakshane": "flood", "vellapokkam": "flood", "vellam vannu": "flood", "vellam raksha": "flood",
    "vellam thadayuka": "flood", "vellam upayam": "flood", "bada": "flood", "jala bahi gala": "flood",
    "bada asila": "flood", "bada raksha": "flood", "bada upaya": "flood", "baadh aa gayi": "flood",
    "pani chadh gaya": "flood", "baadh di madad": "flood", "baadh ton bachav": "flood", "baadh alert": "flood",
    "selab": "flood", "pani bhar gaya": "flood", "selab aaya": "flood", "selab se bachav": "flood",
    "selab ka khatra": "flood", "bonna ahise": "flood", "bonna raksha": "flood", "bonna upaya": "flood",
    "pani vadhi gayu": "flood", "baadh avi gayi": "flood", "baadh ni madad": "flood", "baadh thi bachav": "flood",
    "ghar mein pani ghus gaya": "flood", "school mein flood hai": "flood", "hostel mein pani bhar gaya": "flood",
    "help during flood": "flood", "how to stay safe in flood": "flood", "flood emergency": "flood",
    "flood situation": "flood", "flood kya karein": "flood",
    "fire": "fire", "wildfire": "fire", "blaze": "fire", "flames": "fire", "fire alert": "fire",
    "fire drill": "fire", "fire emergency": "fire", "aag": "fire", "ag": "fire", "agni": "fire",
    "ज्वाला": "fire", "आग": "fire", "आग लग गई": "fire", "आग से बचाव": "fire", "aag lag gayi": "fire",
    "aag se bachav": "fire", "agun": "fire", "jalche": "fire", "jwala": "fire", "agun lagche": "fire",
    "agun lagar por ki korbo": "fire", "neruppu": "fire", "neruppu pidikkudhu": "fire",
    "neruppu safety": "fire", "ippudu": "fire", "agni pattindi": "fire", "fire hoyeche": "fire",
    "aag lagli": "fire", "agnishaman": "fire", "benki": "fire", "benki hidiyitu": "fire",
    "thee": "fire", "thee pidichu": "fire", "aag lagila": "fire", "jal gaya": "fire",
    "fire kya karein": "fire", "fire help": "fire", "fire rescue": "fire", "fire se bachav": "fire",
    "cyclone": "cyclone", "storm": "cyclone", "hurricane": "cyclone", "typhoon": "cyclone",
    "cyclone alert": "cyclone", "cyclone warning": "cyclone", "cyclone shelter": "cyclone",
    "चक्रवात": "cyclone", "तूफान": "cyclone", "आंधी": "cyclone", "चक्रवात आया": "cyclone",
    "तूफान से बचाव": "cyclone", "chakravat": "cyclone", "toofan": "cyclone", "aandhi": "cyclone",
    "jhor": "cyclone", "bavandar": "cyclone", "gobhir jhor": "cyclone", "toofan warning": "cyclone",
    "toofan panic": "cyclone", "soolam": "cyclone", "kaatru perugudhu": "cyclone",
    "soolam safety": "cyclone", "chakravatham": "cyclone", "gali vichcham": "cyclone",
    "cyclone ki korbo": "cyclone", "soolagali": "cyclone", "gali joragide": "cyclone",
    "chuzhal": "cyclone", "kaattu varunnu": "cyclone", "chakrabat": "cyclone", "toofan asila": "cyclone",
    "toofan aa gaya": "cyclone", "hawa tez hai": "cyclone", "cyclone kya karein": "cyclone",
    "cyclone help": "cyclone", "cyclone rescue": "cyclone", "cyclone se bachav": "cyclone",
    "landslide": "landslide", "mudslide": "landslide", "landslide alert": "landslide",
    "landslide warning": "landslide", "landslide rescue": "landslide", "भूस्खलन": "landslide",
    "पहाड़ खिसकना": "landslide", "भूस्खलन से बचाव": "landslide", "bhuskhalan": "landslide",
    "pahaari dhsalan": "landslide", "pahar dhsalan": "landslide", "bhuskhala": "landslide",
    "pahar dhala": "landslide", "pahar dhsala": "landslide", "pahar khisna": "landslide",
    "zamin khisakna": "landslide", "malai urundhudhu": "landslide", "nilam slid aagudhu": "landslide",
    "pagaalu jaruthunnayi": "landslide", "pahad khisna": "landslide", "pahaad khisla": "landslide",
    "bhumi khisakli": "landslide", "gudda slid aayitu": "landslide", "bhumi slid aayitu": "landslide",
    "malayurakku": "landslide", "bhumi slid aayi": "landslide", "pahar khisila": "landslide",
    "bhumi khisila": "landslide", "pahaad khisak gaya": "landslide", "zameen slid ho gayi": "landslide",
    "zamin khisak gayi": "landslide", "pahaad gir gaya": "landslide", "landslide hoyeche": "landslide",
    "landslide ki korbo": "landslide", "landslide help": "landslide", "landslide se bachav": "landslide",
    "tsunami": "tsunami", "sea wave": "tsunami", "tsunami alert": "tsunami",
    "tsunami warning": "tsunami", "tsunami rescue": "tsunami", "सुनामी": "tsunami",
    "समुद्री लहर": "tsunami", "सुनामी आई": "tsunami", "सुनामी से बचाव": "tsunami",
    "sunami": "tsunami", "samudrik jhor": "tsunami", "jolotora": "tsunami",
    "samudra taranga": "tsunami", "samundar ki lehar": "tsunami", "samundar ki lehr": "tsunami",
    "samundar ki lhr": "tsunami", "kadal alai": "tsunami", "tsunami varudhu": "tsunami",
    "samudra lehar": "tsunami", "tsunami vastundi": "tsunami", "tsunami yetoy": "tsunami",
    "samudra ale": "tsunami", "tsunami barutte": "tsunami", "kadal alakal": "tsunami",
    "tsunami varunnu": "tsunami", "tsunami asila": "tsunami", "samundar di lehar": "tsunami",
    "tsunami aa gayi": "tsunami", "tsunami kya karein": "tsunami", "tsunami help": "tsunami",
    "tsunami rescue": "tsunami", "tsunami se bachav": "tsunami",
    "drought": "drought", "dry spell": "drought", "no rain": "drought",
    "water shortage": "drought", "drought alert": "drought", "drought help": "drought",
    "सूखा": "drought", "बारिश नहीं हुई": "drought", "पानी नहीं गिरा": "drought",
    "सूखा से बचाव": "drought", "sukha": "drought", "sukhha": "drought", "sukha pad gaya": "drought",
    "barshaheen": "drought", "pani nei": "drought", "varumai": "drought", "thanni illai": "drought",
    "neellu levu": "drought", "sukham": "drought", "sukha padla": "drought", "pani nahi": "drought",
    "neeru illa": "drought", "sukha aayitu": "drought", "vellam illa": "drought",
    "sukha asila": "drought", "pani nahi aaya": "drought", "sukha ho gaya": "drought",
    "pani nahi gira": "drought", "drought hoyeche": "drought", "drought ki korbo": "drought",
    "drought se bachav": "drought",
    "disaster": "general_disaster", "emergency": "general_disaster", "tragedy": "general_disaster",
    "crisis": "general_disaster", "danger": "general_disaster", "problem": "general_disaster",
    "alert": "general_disaster", "warning": "general_disaster", "help": "general_disaster",
    "rescue": "general_disaster", "support": "general_disaster", "safe": "general_disaster",
    "safety": "general_disaster", "precaution": "general_disaster", "preparedness": "general_disaster",
    "apda": "general_disaster", "आपदा": "general_disaster", "आपातकाल": "general_disaster",
    "आपात स्थिति": "general_disaster", "durghatna": "general_disaster", "दुर्घटना": "general_disaster",
    "vipatti": "general_disaster", "विपत्ति": "general_disaster", "musibat": "general_disaster",
    "मुसीबत": "general_disaster", "samasya": "general_disaster", "समस्या": "general_disaster",
    "bachao": "general_disaster", "बचाओ": "general_disaster", "madad": "general_disaster",
    "मदद": "general_disaster", "kya karein": "general_disaster", "क्या करें": "general_disaster",
    "kya karna chahiye": "general_disaster", "क्या करना चाहिए": "general_disaster",
    "kaise bachein": "general_disaster", "कैसे बचें": "general_disaster", "bipod": "general_disaster",
    "bipad": "general_disaster", "vipada": "general_disaster", "viplab": "general_disaster",
    "durjog": "general_disaster", "দুর্যোগ": "general_disaster", "biporjoy": "general_disaster",
    "বিপর্যয়": "general_disaster", "sahayata": "general_disaster", "સહાયતા": "general_disaster",
    "madat": "general_disaster", "મદદ": "general_disaster", "సమస్య": "general_disaster",
    "apattu": "general_disaster", "அபத்து": "general_disaster", "ಅಪಾತ್ಕಾಲೀನ": "general_disaster",
    "aapatkalin": "general_disaster", "ଆପତ୍କାଳୀନ": "general_disaster", "आपत स्थिति": "general_disaster",
    "raksha": "general_disaster", "रक्षा": "general_disaster", "suraksha": "general_disaster",
    "सुरक्षा": "general_disaster", "rakshan": "general_disaster", "ரட்சிப்பு": "general_disaster",
    "surakshita": "general_disaster", "સુરક્ષિત": "general_disaster", "emergency situation": "general_disaster",
    "disaster response": "general_disaster", "disaster management": "general_disaster",
    "how to stay safe": "general_disaster", "what should I do": "general_disaster",
    "need help": "general_disaster", "urgent help": "general_disaster", "immediate rescue": "general_disaster",
    "safe place": "general_disaster", "evacuation": "general_disaster", "relief": "general_disaster",
    "shelter": "general_disaster", "panic": "general_disaster", "fear": "general_disaster",
    "distress": "general_disaster", "chaos": "general_disaster", "hazard": "general_disaster"
}

    for local, english in replacements.items():
        text = text.replace(local, english)

    text = re.sub(r"\s+", " ", text)
    return text

def detect_disaster_type(user_input):
    if not user_input or not user_input.strip():
        return None

    lang = detect_language(user_input)
    translated = translate_input(user_input, lang)
    normalized = normalize_mixed_input(translated)

    all_phrases = list(disaster_keywords.keys())
    result = process.extractOne(normalized, all_phrases)

    if result:
        match, score, _ = result
        if score > 80:
            return disaster_keywords.get(match)
    return None