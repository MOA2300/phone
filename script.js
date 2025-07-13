const spriteIntro = document.getElementById("sprite-intro");
const frame = document.getElementById("phone-frame");
const sprite339 = document.getElementById("sprite-339");
const container = document.getElementById("phone-container");

// Sprite frame sources
const spriteIntroFrames = Array.from({ length: 16 }, (_, i) => `DefineSprite_22/${i + 1}.png`);
const sprite339Frames = Array.from({ length: 18 }, (_, i) => `DefineSprite_339/${i + 1}.png`);

// Phone open/close frames
const openFrames = ["images/25.png", "images/28.png", "images/30.png", "images/32.png", "images/34.png", "images/36.png", "images/38.png", "images/40.png", "images/42.png"];
const closeFrames = ["images/46.png", "images/48.png", "images/50.png"];

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;
let spriteIntroIndex = 1;
let sprite339Index = 1;
let sprite339Interval;

function preloadImages(arr) {
  arr.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages([...spriteIntroFrames, ...sprite339Frames, ...openFrames, ...closeFrames]);

function playSpriteIntro(callback) {
  spriteIntro.style.display = "block";
  container.classList.remove("pulse-hover");

  let i = 1;
  const interval = setInterval(() => {
    if (i < spriteIntroFrames.length) {
      spriteIntro.src = spriteIntroFrames[i++];
    } else {
      clearInterval(interval);
      spriteIntro.style.display = "none";
      callback();
    }
  }, 90);
}

function playAnimation(frames, finalFrame, callback) {
  isAnimating = true;
  let i = 0;

  const interval = setInterval(() => {
    if (i < frames.length) {
      frame.src = frames[i++];
    } else {
      clearInterval(interval);
      frame.src = finalFrame;
      isAnimating = false;
      callback && callback();
    }
  }, 90);
}

function loopSprite339() {
  sprite339.style.display = "block";
  sprite339Interval = setInterval(() => {
    sprite339.src = sprite339Frames[sprite339Index++ % sprite339Frames.length];
  }, 100);
}

// On load
window.onload = () => {
  frame.src = "images/6.png";
  container.classList.add("pulse-hover");

  playSpriteIntro(() => {
    playAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;
      loopSprite339();
    });
  });
};

container.addEventListener("click", (e) => {
  if (isAnimating || !hasOpenedOnce) return;

  const rect = container.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  if (isOpen && clickY < rect.height / 2) {
    clearInterval(sprite339Interval);
    sprite339.style.display = "none";
    playAnimation(closeFrames, "images/50.png", () => {
      isOpen = false;
    });
  } else if (!isOpen && clickY > rect.height / 2) {
    playAnimation([...closeFrames].reverse(), "images/42.png", () => {
      isOpen = true;
      loopSprite339();
    });
  }
});
