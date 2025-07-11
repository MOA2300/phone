const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

const openFrames = [
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
  "images/50.png"
];

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

function setSizeClass(className) {
  container.classList.remove("small", "medium", "large");
  container.classList.add(className);
}

function playAnimation(frames, finalFrame, sizeClass, callback) {
  isAnimating = true;
  let i = 0;

  const interval = setInterval(() => {
    frame.src = frames[i];
    i++;

    if (i >= frames.length) {
      clearInterval(interval);
      frame.src = finalFrame;
      setSizeClass(sizeClass);
      isAnimating = false;
      if (callback) callback();
    }
  }, 100);
}

// Initial setup
frame.src = "images/6.png";
setSizeClass("small");
container.classList.add("pulse-hover");

container.addEventListener("click", () => {
  if (isAnimating) return;

  if (!hasOpenedOnce) {
    container.classList.remove("pulse-hover");
    playAnimation(openFrames, "images/42.png", "large", () => {
      hasOpenedOnce = true;
      isOpen = true;
    });
  } else if (isOpen) {
    playAnimation(closeFrames, "images/50.png", "medium", () => {
      isOpen = false;
    });
  } else {
    const reopenFrames = [...closeFrames].reverse();
    playAnimation(reopenFrames, "images/42.png", "large", () => {
      isOpen = true;
    });
  }
});
