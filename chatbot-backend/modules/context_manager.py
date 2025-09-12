from modules.language_support import normalize_mixed_input

def get_context(user_input):
    normalized = normalize_mixed_input(user_input)

    if "earthquake" in normalized:
        return "You are a disaster management expert helping students prepare for earthquakes."
    elif "flood" in normalized:
        return "You are a disaster management expert helping students prepare for floods."
    elif "fire" in normalized:
        return "You are a disaster management expert helping students prepare for fires."
    elif "cyclone" in normalized:
        return "You are a disaster management expert helping students prepare for cyclones."
    elif "landslide" in normalized:
        return "You are a disaster management expert helping students prepare for landslide."
    elif "tsunami" in normalized:
        return "You are a disaster management expert helping students prepare for tsunami."
    elif "drought" in normalized:
        return "You are a disaster management expert helping students prepare for drought."
    elif "disaster" in normalized:
        return "You are a disaster management expert helping students prepare for general disaster."
    
    else:
        return "You are a general disaster preparedness assistant for students."