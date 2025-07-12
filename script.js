const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite animation frames (1.png to 16.png)
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Phone opening and closing sequences
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
let spriteIndex = 0;
let spriteLoop;
let animationStarted = false;

// Loop sprite animation
function startSpriteLoop() {
  spriteLoop = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 100);
}

// Flip phone animation
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

// Sprite click handler
sprite.addEventListener("click", () => {
  if (animationStarted) return;

  animationStarted = true;
  clearInterval(spriteLoop);
  sprite.style.display = "none";
  container.style.display = "flex";

  frame.src = "images/6.png";

  playAnimation(openFrames, "images/42.png", () => {
    hasOpenedOnce = true;
    isOpen = true;
  });
});

// Phone click to toggle open/close
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

// Start sprite loop on load
window.onload = () => {
  startSpriteLoop();
};


