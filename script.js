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
  "images/25.png",
  "images/28.png",
  "images/30.png",
  "images/32.png",
  "images/34.png",
  "images/36.png",
  "images/38.png",
  "images/40.png", // ✅ make sure this file exists without spaces
  "images/42.png"
];

const closeFrames = [
  "images/46.png",
  "images/48.png",
  "images/50.png"
];

// Animation state tracking
let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

// Set initial phone size
function setSizeClass(className) {
  container.classList.remove("small", "medium", "large");
  container.classList.add(className);
}

// Play frame-by-frame animation
function playAnimation(frames, finalFrame, sizeClass, callback) {
  isAnimating = true;
  setSizeClass(sizeClass); // ✅ set correct size before animation
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
  }, 350); // adjust animation speed if needed
}

// Play sprite intro before showing phone
function playSpriteIntro(callback) {
  sprite.style.visibility = "visible";
  sprite.style.display = "block";
  container.style.display = "none";

  let i = 2; // start from 2 since 1.png is already in HTML

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
    }, 150); // sprite animation speed
  }, 150); // buffer delay to prevent visual glitch
}

// Run sprite intro then start flip phone animation
window.onload = () => {
  setSizeClass("small");
  frame.src = "images/6.png";
  container.classList.add("pulse-hover");

  playSpriteIntro(() => {
    container.classList.remove("pulse-hover");
    playAnimation(openFrames, "images/42.png", "large", () => {
      hasOpenedOnce = true;
      isOpen = true;
    });
  });
};

// Toggle phone open/close on click
container.addEventListener("click", () => {
  if (isAnimating || !hasOpenedOnce) return;

  if (isOpen) {
    playAnimation(closeFrames, "images/50.png", "medium", () => {
      isOpen = false;
    });
  } else {
    const reopenFrames = [...closeFrames].reverse();
    playAnimation(reopenFrames, "images/42.png", "large", () => {
      isOpen = true;
    });
  }
});
