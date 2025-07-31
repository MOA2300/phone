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
    });
  });

  flipTrigger.addEventListener("click", () => {
    if (isAnimating || !hasOpenedOnce) return;

    if (isOpen) {
      playAnimation(closeFrames, "images/50.png", () => {
        isOpen = false;
        setFlipTriggerArea();
      });
    } else {
      const reopenFrames = [...closeFrames].reverse();
      playAnimation(reopenFrames, "images/42.png", () => {
        isOpen = true;
        setFlipTriggerArea();
      });
    }
  });

  function setFlipTriggerArea() {
    if (isOpen) {
      flipTrigger.style.left = "100px";
      flipTrigger.style.top = "20px";
      flipTrigger.style.width = "180px";
      flipTrigger.style.height = "90px";
    } else {
      flipTrigger.style.left = "90px";
      flipTrigger.style.top = "450px";
      flipTrigger.style.width = "200px";
      flipTrigger.style.height = "80px";
    }
  }

  // Adjust these positions based on your image layout
  const keyMap = {
    "0key": { x: 92, y: 410 },
    "1key": { x: 55, y: 380 },
    "2key": { x: 92, y: 380 },
    "3key": { x: 129, y: 380 },
    "4key": { x: 55, y: 350 },
    "5key": { x: 92, y: 350 },
    "6key": { x: 129, y: 350 },
    "7key": { x: 55, y: 320 },
    "8key": { x: 92, y: 320 },
    "9key": { x: 129, y: 320 },
    "starkey": { x: 55, y: 440 },
    "hashkey": { x: 145, y: 500 },
    "answerphonekey": { x: 35, y: 280 },
    "hangupkey": { x: 140, y: 280 },
    "middlekey": { x: 91, y: 292 },
    "leftarrowkey": { x: 57, y: 292 },
    "rightarrowkey": { x: 125, y: 292 },
    "uparrowkey": { x: 91, y: 265 },
    "downarrowkey": { x: 91, y: 317 },
    "emailkey": { x: 55, y: 252 },
    "camerakey": { x: 129, y: 252 },
    "toprightkey": { x: 160, y: 210 }
  };

  Object.entries(keyMap).forEach(([key, pos]) => {
    const button = document.createElement("button");
    button.className = "key-button";
    button.style.left = `${pos.x}px`;
    button.style.top = `${pos.y}px`;

    const hoverImg = document.createElement("img");
    hoverImg.src = `normal keys/${key}.png`;

    button.appendChild(hoverImg);

    button.addEventListener("click", e => {
      if (!isOpen) {
        e.preventDefault();
        return;
      }
      console.log(`Key ${key} clicked`);
    });

    keyOverlay.appendChild(button);
  });
};
