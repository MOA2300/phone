const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

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
preloadImages([...spriteFrames, ...openFrames, ...closeFrames]);

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

// Looping sprite animation
let spriteIndex = 0;
let spriteInterval;

function startSpriteLoop() {
  spriteInterval = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 160); // Adjust speed here
}

function stopSpriteLoop() {
  clearInterval(spriteInterval);
}

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
  }, 90); // Adjust speed here
}

window.onload = () => {
  startSpriteLoop();

  sprite.addEventListener("click", () => {
    stopSpriteLoop();
    sprite.style.display = "none";
    container.style.display = "flex";
    playAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;
    });
  });
};

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
