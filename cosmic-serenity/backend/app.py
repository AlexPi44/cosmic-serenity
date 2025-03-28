# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from mood_model import classify_mood

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/analyze_mood', methods=['POST'])
def analyze_mood():
    """
    Expects JSON: { "text": "user input" }
    Returns a JSON with detected mood and configuration for the cosmic journey.
    """
    data = request.json
    user_text = data.get("text", "")
    mood_label = classify_mood(user_text)
    
    # Configuration mapping for our three moods.
    config_mapping = {
        "happy_hormone": {
            "speed": 0.6,
            "music": "music/happy_hormone.mp3",
            "message": "Feel the surge of joy as the cosmos celebrates you!"
        },
        "inspired": {
            "speed": 0.5,
            "music": "music/inspiring.mp3",
            "message": "Let the majestic universe ignite your inner spark."
        },
        "deep_calm": {
            "speed": 0.3,
            "music": "music/deep_calm.mp3",
            "message": "Sink into deep calm as you drift among the stars."
        }
    }
    
    config = config_mapping.get(mood_label.lower(), config_mapping["deep_calm"])
    response = {"mood": mood_label, "config": config}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
