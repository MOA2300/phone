const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const overlay = document.getElementById("sprite-overlay");
const container = document.getElementById("phone-container");

const spriteFrames = Array.from({ length: 16 }, (_, i) => `DefineSprite_22/${i + 1}.png`);
const sprite339Frames = Array.from({ length: 18 }, (_, i) => `DefineSprite_339/${i + 1}.png`);

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

function preloadImages(paths) {
  paths.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages([...spriteFrames, ...openFrames, ...closeFrames, ...sprite339Frames]);

let spriteIndex = 0;
let spriteInterval = null;
let overlayIndex = 0;
let overlayInterval = null;
let hasOpened = false;
let isAnimating = false;

// Play sprite 22 loop
function playSpriteLoop() {
  sprite.style.display = "block";
  frame.style.display = "none";
  spriteInterval = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 90);
}

// Play sprite 339 loop overlay
function playOverlayLoop() {
  overlay.style.display = "block";
  overlayInterval = setInterval(() => {
    overlayIndex = (overlayIndex + 1) % sprite339Frames.length;
    overlay.src = sprite339Frames[overlayIndex];
  }, 100);
}

// Flip animation
function playAnimation(frames, finalFrame, callback) {
  isAnimating = true;
  let i = 0;
  const interval = setInterval(() => {
    frame.src = frames[i];
    i++;
    if (i >= frames.length) {
      clearInterval(interval);
      frame.src = finalFrame;
      isAnimating = false;
      if (finalFrame === "images/42.png") {
        playOverlayLoop();
      } else {
        overlay.style.display = "none";
        clearInterval(overlayInterval);
      }
      callback && callback();
    }
  }, 90);
}

sprite.addEventListener("click", () => {
  if (isAnimating || hasOpened) return;

  clearInterval(spriteInterval);
  sprite.style.display = "none";
  frame.style.display = "block";
  playAnimation(openFrames, "images/42.png", () => {
    hasOpened = true;
  });
});

// Click to toggle
container.addEventListener("click", (e) => {
  if (!hasOpened || isAnimating) return;

  const rect = container.getBoundingClientRect();
  const clickY = e.clientY - rect.top;
  const containerHeight = rect.height;

  if (frame.src.includes("42.png") && clickY < containerHeight / 2) {
    // Clicked upper half — close phone
    playAnimation(closeFrames, "images/50.png", () => {
      hasOpened = false;
    });
  } else if (frame.src.includes("50.png") && clickY >= containerHeight / 2) {
    // Clicked lower half — open phone
    playAnimation([...closeFrames].reverse(), "images/42.png", () => {
      hasOpened = true;
    });
  }
});

// Start sprite intro
window.onload = () => {
  playSpriteLoop();
};
