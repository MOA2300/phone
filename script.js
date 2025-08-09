const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");
const keyOverlay = document.getElementById("key-overlay");
const flipTrigger = document.getElementById("flip-trigger");

const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

const openFrames = [
  "images/6.png", "images/25.png", "images/28.png", "images/30.png",
  "images/32.png", "images/34.png", "images/36.png", "images/38.png",
  "images/40.png", "images/42.png"
];

const closeFrames = [
  "images/46.png", "images/48.png", "images/50.png"
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

let spriteIndex = 0;
let spriteInterval;

function startSpriteLoop() {
  spriteInterval = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 160);
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
  }, 90);
}

window.onload = () => {
  startSpriteLoop();

  sprite.addEventListener("click", () => {
    const sound1 = new Audio("sounds/27_fixed.mp3");
    const sound2 = new Audio("sounds/28_fixed.mp3");
    sound1.play();
    sound2.play();

    stopSpriteLoop();
    sprite.style.display = "none";
    container.style.display = "flex";

    playAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;
      setFlipTriggerArea();
      renderKeys(); // only after fully opened
    });
  });

  flipTrigger.addEventListener("click", () => {
    if (isAnimating || !hasOpenedOnce) return;

    if (isOpen) {
      playAnimation(closeFrames, "images/50.png", () => {
        isOpen = false;
        setFlipTriggerArea();
        keyOverlay.innerHTML = ""; // remove keys on close
      });
    } else {
      const reopenFrames = [...closeFrames].reverse();
      playAnimation(reopenFrames, "images/42.png", () => {
        isOpen = true;
        setFlipTriggerArea();
        renderKeys();
      });
    }
  });

  function setFlipTriggerArea() {
    if (isOpen) {
      flipTrigger.style.left = "20px";
      flipTrigger.style.top = "30px";
      flipTrigger.style.width = "180px";
      flipTrigger.style.height = "90px";
    } else {
      flipTrigger.style.left = "90px";
      flipTrigger.style.top = "450px";
      flipTrigger.style.width = "200px";
      flipTrigger.style.height = "80px";
    }
  }

  function renderKeys() {
    keyOverlay.innerHTML = ""; // clear previous

    const key = "1key";
    const pos = { x: 464, y: 430 }; // Adjust as needed

    const button = document.createElement("button");
    button.className = "key-button";
    button.style.left = `${pos.x}px`;
    button.style.top = `${pos.y}px`;

    const hoverImg = document.createElement("img");
    hoverImg.src = `normal keys/${key}.png`;
    hoverImg.className = "key-overlay-img";
    hoverImg.style.left = `${pos.x}px`;
    hoverImg.style.top = `${pos.y}px`;

    button.addEventListener("click", e => {
      if (!isOpen) {
        e.preventDefault();
        return;
      }
      console.log(`Key ${key} clicked`);
    });

    keyOverlay.appendChild(button);
    keyOverlay.appendChild(hoverImg);
  }
};



