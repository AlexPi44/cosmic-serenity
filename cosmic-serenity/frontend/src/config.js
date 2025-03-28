// frontend/src/config.js
// This file defines the mapping of moods to journey configurations.
// It is used on both backend and frontend (for consistency).
const moodConfigMapping = {
  "happy_hormone": {
    speed: 0.6,  // Relatively fast travel for a joyful surge.
    music: "music/happy_hormone.mp3",
    message: "Feel the surge of joy as the cosmos celebrates you!"
  },
  "inspired": {
    speed: 0.5,
    music: "music/inspiring.mp3",
    message: "Let the majestic universe ignite your inner spark."
  },
  "deep_calm": {
    speed: 0.3,  // Slow and steady for deep relaxation.
    music: "music/deep_calm.mp3",
    message: "Sink into deep calm as you drift among the stars."
  }
};

function getConfigForMood(moodLabel) {
  return moodConfigMapping[moodLabel.toLowerCase()] || moodConfigMapping["deep_calm"];
}
