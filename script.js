const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite animation frames
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Flip phone animation sequences
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

// Animate phone frame through a series of images
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
  }, 90); // smooth speed
}

// Sprite intro animation
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
        frame.src = "images/6.png"; // only show this AFTER sprite
        callback && callback();
      }
    }, 90);
  }, 90); // slight delay to avoid visual jump
}

// Page load
window.onload = () => {
  frame.src = ""; // empty initially
  container.classList.add("pulse-hover");

  playSpriteIntro(() => {
    container.classList.remove("pulse-hover");
    playAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;
    });
  });
};

// Toggle flip phone state
container.addEventListener("click", () => {
  if (isAnimating || !hasOpenedOnce) return;

  if (isOpen) {
    playAnimation(closeFrames, "images/50.png", () => {
      isOpen = false;
    });
  } else {
    playAnimation([...closeFrames].reverse(), "images/42.png", () => {
      isOpen = true;
    });
  }
});
