const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");
const clickTop = document.getElementById("click-top");
const clickBottom = document.getElementById("click-bottom");

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
  paths.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
preloadImages([...spriteFrames, ...openFrames, ...closeFrames]);

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

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

function playSpriteIntro(callback) {
  sprite.style.visibility = "visible";
  sprite.style.display = "block";
  container.style.display = "none";

  let i = 2;
  setTimeout(() => {
    const loop = setInterval(() => {
      sprite.src = `DefineSprite_22/${i}.png`;
      i++;
      if (i > 16) i = 1;
    }, 100);

    // Start full animation only when clicking during sprite
    sprite.addEventListener("click", () => {
      clearInterval(loop);
      sprite.style.display = "none";
      container.style.display = "flex";
      container.classList.remove("pulse-hover");

      playAnimation(openFrames, "images/42.png", () => {
        hasOpenedOnce = true;
        isOpen = true;
      });
    }, { once: true });
  }, 100);
}

window.onload = () => {
  container.classList.add("pulse-hover");
  playSpriteIntro();
};

// Clicking top closes phone
clickTop.addEventListener("click", () => {
  if (!isOpen || isAnimating) return;
  playAnimation(closeFrames, "images/50.png", () => {
    isOpen = false;
  });
});

// Clicking bottom reopens phone
clickBottom.addEventListener("click", () => {
  if (isOpen || isAnimating || !hasOpenedOnce) return;
  const reopenFrames = [...closeFrames].reverse();
  playAnimation(reopenFrames, "images/42.png", () => {
    isOpen = true;
  });
});
