// frontend/src/main.js
// Main application logic: handles mood input, calls backend API, and starts the cosmic journey.
import { initScene, animateScene } from "./scene.js";
import { loadStars } from "./stars.js";
import { playMusic } from "./audio.js";

document.getElementById("submitMood").addEventListener("click", function() {
  const userText = document.getElementById("userText").value;
  if (!userText) {
    alert("Please enter how you feel.");
    return;
  }
  
  // Call backend API to analyze mood.
  fetch("http://YOUR_BACKEND_URL:5000/analyze_mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: userText })
  })
    .then(response => response.json())
    .then(data => {
      const mood = data.mood;
      const config = data.config;  // e.g., { speed, music, message }
      console.log("Detected mood:", mood, config);
      
      // Hide the mood input section and display the 3D canvas.
      document.getElementById("moodInput").style.display = "none";
      document.getElementById("canvasContainer").style.display = "block";
      
      // Display guidance message (fades out via CSS).
      const guidanceDiv = document.getElementById("guidanceMessage");
      guidanceDiv.innerText = config.message;
      
      // Start playing the selected ambient music.
      playMusic("assets/" + config.music);
      
      // Initialize and start the Three.js scene.
      initScene();
      loadStars();
      animateScene(config.speed);
    })
    .catch(err => console.error("Error during mood analysis:", err));
});
