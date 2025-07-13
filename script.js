const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite animation frames (DefineSprite_22/1.png to 16.png)
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Flip phone opening frames
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

// Flip phone closing frames
const closeFrames = [
  "images/46.png",
  "images/48.png",
  "images/50.png"
];

// Preload all frames and sounds
function preloadAssets() {
  const allImages = [...spriteFrames, ...openFrames, ...closeFrames];
  allImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Preload sounds
  new Audio("sounds/27.mp3");
  new Audio("sounds/28.mp3");
}
preloadAssets();

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
  }, 160); // Retro speed
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
  }, 90); // Smooth flip speed
}

window.onload = () => {
  // Preload sounds for sprite click
  const sound1 = new Audio("sounds/27.mp3");
  const sound2 = new Audio("sounds/28.mp3");

  startSpriteLoop();

  sprite.addEventListener("click", () => {
    // Play sounds when sprite is clicked
    sound1.play();
    setTimeout(() => sound2.play(), 150); // Slight delay for layering

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
