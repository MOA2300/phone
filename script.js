const openingFrames = [
  "images/25.png",
  "images/28.png",
  "images/30.png",
  "images/32.png",
  "images/34.png",
  "images/42.png"
];

const closingFrames = [
  "images/46.png",
  "images/48.png",
  "images/50.png"
];

const container = document.getElementById("phone-container");
const frame = document.getElementById("phone-frame");

// Initial state
let isOpen = false;
let hasPlayed = false;
let isAnimating = false;

// Set to small closed phone
frame.src = "images/6.png";
container.classList.add("pulse-hover");

function playFrames(frames, onEnd) {
  isAnimating = true;
  let i = 0;

  const interval = setInterval(() => {
    frame.src = frames[i];
    i++;
    if (i >= frames.length) {
      clearInterval(interval);
      isAnimating = false;
      onEnd();
    }
  }, 100); // Faster animation
}

container.addEventListener("click", () => {
  if (isAnimating) return;

  // FIRST TIME: Open phone
  if (!hasPlayed) {
    container.classList.remove("pulse-hover");
    container.style.width = "250px";

    playFrames(openingFrames, () => {
      hasPlayed = true;
      isOpen = true;
    });

    return;
  }

  // After first animation, toggle open/close
  if (isOpen) {
    // Closing
    playFrames(closingFrames, () => {
      frame.src = "images/50.png"; // stay at image 50 when closed
      container.style.width = "120px";
      isOpen = false;
    });
  } else {
    // Reopening
    container.style.width = "250px";
    playFrames([...closingFrames].reverse(), () => {
      frame.src = "images/42.png"; // fully open
      isOpen = true;
    });
  }
});
