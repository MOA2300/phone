const imageFrames = [
  "6.png",
  "25.png",
  "28.png",
  "30.png",
  "32.png",
  "34.png",
  "36.png",
  "38.png",
  "42.png",
  "46.png",
  "48.png",
  "50.png"
];

let currentFrame = 0;
const frameElement = document.getElementById("phone-frame");

function playFlipAnimation() {
  const interval = setInterval(() => {
    frameElement.src = imageFrames[currentFrame];
    currentFrame++;
    if (currentFrame >= imageFrames.length) {
      clearInterval(interval);
    }
  }, 150); // Adjust frame delay if needed
}

window.onload = () => {
  playFlipAnimation();
};
