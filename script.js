const openFrames = [
  "images/6.png",
  "images/25.png",
  "images/28.png",
  "images/30.png",
  "images/32.png",
  "images/34.png",
  "images/42.png"
];

const closeFrames = [
  "images/46.png",
  "images/48.png",
  "images/50.png",
  "images/6.png"
];

const reopenFrames = [...closeFrames].reverse();

let currentFrame = 0;
let animationPlayed = false;
let isOpen = false;
let isAnimating = false;

const container = document.getElementById("phone-container");
const frameElement = document.getElementById("phone-frame");

// Set initial image
frameElement.src = "images/6.png";
container.classList.add("pulse-hover");

function playFrames(frames, callback) {
  isAnimating = true;
  let index = 0;
  const interval = setInterval(() => {
    frameElement.src = frames[index];
    index++;
    if (index >= frames.length) {
      clearInterval(interval);
      isAnimating = false;
      callback && callback();
    }
  }, 100); // faster animation
}

function handleClick() {
  if (isAnimating) return;

  if (!animationPlayed) {
    // First time: open the phone
    container.classList.remove("pulse-hover");
    container.style.width = "250px";
    playFrames(openFrames, () => {
      animationPlayed = true;
      isOpen = true;
    });
  } else {
    if (isOpen) {
      playFrames(closeFrames, () => {
        isOpen = false;
        container.style.width = "120px";
      });
    } else {
      container.style.width = "250px";
      playFrames(reopenFrames, () => {
        isOpen = true;
      });
    }
  }
}

container.addEventListener("click", handleClick);
