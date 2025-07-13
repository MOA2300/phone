const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite animation frames (1.png to 16.png)
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Flip phone open and close frames
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

// Preload all assets
function preloadAssets() {
  const allImages = [...spriteFrames, ...openFrames, ...closeFrames];
  allImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Also preload sounds
  const s1 = new Audio("https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3");
  const s2 = new Audio("https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3");
  s1.load();
  s2.load();
}
preloadAssets();

// State
let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

// Sprite loop variables
let spriteIndex = 0;
let spriteInterval;

// Loop sprite animation
function startSpriteLoop() {
  spriteInterval = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 160); // match original flash pacing
}

function stopSpriteLoop() {
  clearInterval(spriteInterval);
}

// Flip animation
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
  }, 90); // adjust speed here
}

// On page load
window.onload = () => {
  console.log("Page loaded");

  // Load test audio
  const sound1 = new Audio("https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3");
  const sound2 = new Audio("https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3");
  sound1.volume = 1;
  sound2.volume = 1;

  // Start sprite loop
  startSpriteLoop();

  // Add click listener to sprite
  sprite.addEventListener("click", () => {
    console.log("Sprite clicked - playing sounds...");

    sound1.play()
      .then(() => console.log("Sound 1 played"))
      .catch(err => console.error("Sound 1 error:", err));

    setTimeout(() => {
      sound2.play()
        .then(() => console.log("Sound 2 played"))
        .catch(err => console.error("Sound 2 error:", err));
    }, 150);

    // Stop sprite and begin animation
    stopSpriteLoop();
    sprite.style.display = "none";
    container.style.display = "flex";

    playAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;
      console.log("Phone fully opened");
    });
  });
};

// Toggle open/close phone on click
container.addEventListener("click", () => {
  if (isAnimating || !hasOpenedOnce) return;

  if (isOpen) {
    playAnimation(closeFrames, "images/50.png", () => {
      isOpen = false;
      console.log("Phone closed");
    });
  } else {
    const reopenFrames = [...closeFrames].reverse();
    playAnimation(reopenFrames, "images/42.png", () => {
      isOpen = true;
      console.log("Phone reopened");
    });
  }
});
