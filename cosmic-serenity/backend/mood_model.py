# backend/mood_model.py
from transformers import pipeline

# Load the emotion classification pipeline using a pre-trained model.
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

def classify_mood(text: str) -> str:
    """
    Classify the mood from the user text.
    Returns one of the three target labels: 'happy_hormone', 'inspired', or 'deep_calm'.
    (Mapping: for demonstration, we map model output to our three moods.)
    """
    result = emotion_classifier(text)[0]
    label = result['label'].lower()
    # Map the model's label to one of our three moods.
    if label in ["joy", "love", "surprise"]:
        return "happy_hormone"
    elif label in ["fear", "anger"]:
        return "deep_calm"
    elif label in ["sadness"]:
        return "inspired"
    else:
        return "deep_calm"  # default fallback
