const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");
const keyOverlay = document.getElementById("key-overlay");
const flipTrigger = document.getElementById("flip-trigger");

// Sprite animation frames
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Opening and closing frames
const openFrames = [
  "images/6.png", "images/25.png", "images/28.png", "images/30.png",
  "images/32.png", "images/34.png", "images/36.png", "images/38.png",
  "images/40.png", "images/42.png"
];

const closeFrames = [
  "images/46.png", "images/48.png", "images/50.png"
];

// Preload all images
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
    // Adjust these based on your image scale/size
    if (isOpen) {
      flipTrigger.style.left = "50px";
      flipTrigger.style.top = "40px";
      flipTrigger.style.width = "125px";
      flipTrigger.style.height = "100px";
    } else {
      flipTrigger.style.left = "120px";
      flipTrigger.style.top = "450px";
      flipTrigger.style.width = "200px";
      flipTrigger.style.height = "80px";
    }
  }

  // Key positions (SHIFTED DOWN)
  const keyMap = {
    key0: { x: 92, y: 410 },
    key1: { x: 55, y: 380 },
    key2: { x: 92, y: 380 },
    key3: { x: 129, y: 380 },
    key4: { x: 55, y: 350 },
    key5: { x: 92, y: 350 },
    key6: { x: 129, y: 350 },
    key7: { x: 55, y: 320 },
    key8: { x: 92, y: 320 },
    key9: { x: 129, y: 320 },
    key10: { x: 55, y: 440 },
    keyhash: { x: 129, y: 440 },
    keyanswerphone: { x: 35, y: 280 },
    keyhangup: { x: 140, y: 280 }
  };

  Object.entries(keyMap).forEach(([key, pos]) => {
    const button = document.createElement("button");
    button.className = "key-button";
    button.style.left = `${pos.x}px`;
    button.style.top = `${pos.y}px`;

    const flashImg = document.createElement("img");
    flashImg.src = `compressed/${key}.png`;
    flashImg.className = "key-image";
    flashImg.style.left = `${pos.x}px`;
    flashImg.style.top = `${pos.y}px`;

    keyOverlay.appendChild(button);
    keyOverlay.appendChild(flashImg);

    button.addEventListener("click", () => {
      if (!isOpen) return; // LOCK keys if phone is closed

      flashImg.style.display = "block";
      setTimeout(() => {
        flashImg.style.display = "none";
      }, 200);
    });
  });
};
