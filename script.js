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
let animationPlayed = false;
let isOpen = true;

const container = document.getElementById("phone-container");
const frameElement = document.getElementById("phone-frame");

// Initial image
frameElement.src = "images/6.png";
container.classList.add("pulse-hover");

function playFlipAnimation() {
  container.classList.remove("pulse-hover");
  container.style.animation = "zoomRotate 3s ease-in-out forwards";

  const interval = setInterval(() => {
    if (currentFrame < imageFrames.length) {
      frameElement.src = imageFrames[currentFrame];
      currentFrame++;
    } else {
      clearInterval(interval);
      animationPlayed = true;
      isOpen = true;
      container.style.animation = ""; // Clear animation so it doesn't repeat
    }
  }, 200);
}

function togglePhone() {
  if (isOpen) {
    frameElement.src = "images/6.png";
    isOpen = false;
  } else {
    frameElement.src = "images/42.png";
    isOpen = true;
  }
}

container.addEventListener("click", () => {
  if (!animationPlayed) {
    playFlipAnimation();
  } else {
    togglePhone();
  }
});
