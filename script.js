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

// Current state
let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

function playAnimation(frames, finalFrame, targetWidth, callback) {
  isAnimating = true;
  let i = 0;

  const interval = setInterval(() => {
    frame.src = frames[i];
    i++;

    if (i >= frames.length) {
      clearInterval(interval);
      frame.src = finalFrame;
      container.style.width = targetWidth;
      isAnimating = false;
      if (callback) callback();
    }
  }, 100);
}

// Initial phone setup
frame.src = "images/6.png";
container.classList.add("pulse-hover");
container.style.width = "90px";

container.addEventListener("click", () => {
  if (isAnimating) return;

  if (!hasOpenedOnce) {
    // First click: full opening sequence
    container.classList.remove("pulse-hover");
    playAnimation(openFrames, "images/42.png", "250px", () => {
      hasOpenedOnce = true;
      isOpen = true;
    });
  } else if (isOpen) {
    // Phone is open → Close it
    playAnimation(closeFrames, "images/50.png", "120px", () => {
      isOpen = false;
    });
  } else {
    // Phone is closed → Reopen
    const reopenFrames = [...closeFrames].reverse();
    playAnimation(reopenFrames, "images/42.png", "250px", () => {
      isOpen = true;
    });
  }
});
