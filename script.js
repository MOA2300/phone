const imageFrames = [
  "images/6.png",
  "images/25.png",
  "images/28.png",
  "images/30.png",
  "images/32.png",
  "images/34.png",
  "images/36.png",
  "images/38.png",
  "images/42.png",
  "images/46.png",
  "images/48.png",
  "images/50.png"
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
