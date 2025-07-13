const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite animation frames
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Flip phone animation frames
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

// Sounds (use re-encoded versions)
const sound1 = new Audio("sounds/27_fixed.mp3");
const sound2 = new Audio("sounds/28_fixed.mp3");
sound1.volume = 1;
sound2.volume = 1;

// Preload images
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
let spriteIndex = 0;
let spriteInterval = null;

// Play sprite loop until clicked
function loopSprite() {
  sprite.style.visibility = "visible";
  sprite.style.display = "block";
  container.style.display = "none";

  spriteIndex = 0;
  sprite.src = spriteFrames[spriteIndex];
  spriteInterval = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 150); // control speed of sprite loop
}

// Play frame animation
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
  }, 90); // adjust speed for smoother feel
}

// On load, loop sprite until click
window.onload = () => {
  container.style.display = "none";
  loopSprite();
};

// On sprite click: play sound + transition to phone animation
sprite.addEventListener("click", () => {
  console.log("Sprite clicked - playing sounds...");

  sound1.play().catch(err => console.error("Sound 1 error:", err));
  setTimeout(() => {
    sound2.play().catch(err => console.error("Sound 2 error:", err));
  }, 150);

  clearInterval(spriteInterval);
  sprite.style.display = "none";
  container.style.display = "flex";

  playAnimation(openFrames, "images/42.png", () => {
    hasOpenedOnce = true;
    isOpen = true;
    console.log("Phone fully opened");
  });
});

// Phone toggle on click
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
