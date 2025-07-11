const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite filenames (1.png to 16.png)
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

const openFrames = [
  "images/25.png",
  "images/28.png",
  "images/30.png",
  "images/32.png",
  "images/34.png",
  "images/42.png"
];

const closeFrames = [
  "images/46.png",
  "images/48.png",
  "images/50.png"
];

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

function setSizeClass(className) {
  container.classList.remove("small", "medium", "large");
  container.classList.add(className);
}

function playAnimation(frames, finalFrame, sizeClass, callback) {
  isAnimating = true;
  let i = 0;
  const interval = setInterval(() => {
    frame.src = frames[i];
    i++;
    if (i >= frames.length) {
      clearInterval(interval);
      frame.src = finalFrame;
      setSizeClass(sizeClass);
      isAnimating = false;
      callback && callback();
    }
  }, 100);
}

function playSpriteIntro(callback) {
  sprite.style.display = "block";
  container.style.display = "none";
  let i = 0;

  const interval = setInterval(() => {
    sprite.src = spriteFrames[i];
    i++;
    if (i >= spriteFrames.length) {
      clearInterval(interval);
      sprite.style.display = "none";
      container.style.display = "flex";
      callback && callback();
    }
  }, 70); // adjust speed if needed
}

window.onload = () => {
  // Start sprite animation, then play phone opening
  playSpriteIntro(() => {
    playAnimation(openFrames, "images/42.png", "large", () => {
      hasOpenedOnce = true;
      isOpen = true;
    });
  });
};

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
