// frontend/src/stars.js
// Loads star data from stars.csv and creates a starfield.
import { scene } from "./scene.js";

function loadStars() {
  fetch("assets/stars.csv")
    .then(response => response.text())
    .then(data => {
      const lines = data.trim().split("\n");
      const positions = [];
      // Skip header (first line)
      for (let i = 1; i < lines.length; i++) {
        const [id, x, y, z, magnitude, color] = lines[i].split(",");
        positions.push(parseFloat(x), parseFloat(y), parseFloat(z));
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
    })
    .catch(err => console.error("Error loading stars.csv:", err));
}

export { loadStars };
