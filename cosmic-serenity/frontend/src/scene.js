// frontend/src/scene.js
// Sets up the Three.js scene, camera, and renderer.
let scene, camera, renderer, clock;

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas'), antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  clock = new THREE.Clock();
  
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateScene(travelSpeed) {
  requestAnimationFrame(() => animateScene(travelSpeed));
  
  // Move camera along z-axis over time.
  const delta = clock.getDelta();
  camera.position.z -= travelSpeed * delta;
  
  renderer.render(scene, camera);
}

export { initScene, animateScene, scene, camera, renderer };
