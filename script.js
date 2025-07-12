const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite animation frames
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Opening frames (6.png should appear only after sprite)
const openFrames = [
  "images/6.png",
  "images/25.png",
  "images/28.png",
  "images/30.png",
  "images/32.png",
  "images/34.png",
  "images/36.png",
  "images/38.png",
  "images/40.png",
  "images/42.png"
];

const closeFrames = [
  "images/46.png",
  "images/48.png",
  "images/50.png"
];

// Preload all images
function preloadImages(paths) {
  paths.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
preloadImages([...spriteFrames, ...openFrames, ...closeFrames]);

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

// Frame animation logic
function playAnimation(frames, finalFrame, callback) {
  isAnimating = true;
  let i = 0;

  const interval = setInterval(() => {
    if (i < frames.length) {
      frame.src = frames[i];
      i++;
    } else {
      clearInterval(interval);
      frame.src = finalFrame;
      isAnimating = false;
      if (callback) callback();
    }
  }, 90);
}

// Sprite animation intro (small, not scaled)
function playSpriteIntro(callback) {
  sprite.style.visibility = "visible";
  sprite.style.display = "block";
  container.style.display = "none";

  let i = 2;
  setTimeout(() => {
    const interval = setInterval(() => {
      if (i <= 16) {
        sprite.src = `DefineSprite_22/${i}.png`;
        i++;
      } else {
        clearInterval(interval);
        sprite.style.display = "none";
        container.style.display = "flex";
        callback && callback();
      }
    }, 90);
  }, 100);
}

// On page load
window.onload = () => {
  container.classList.add("pulse-hover");

  // Don't show frame initially
  frame.src = "";

  playSpriteIntro(() => {
    container.classList.remove("pulse-hover");
    playAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;
    });
  });
};

// Toggle on click
container.addEventListener("click", () => {
  if (isAnimating || !hasOpenedOnce) return;

  if (isOpen) {
    playAnimation(closeFrames, "images/50.png", () => {
      isOpen = false;
    });
  } else {
    const reopenFrames = [...closeFrames].reverse();
    playAnimation(reopenFrames, "images/42.png", () => {
      isOpen = true;
    });
  }
});
