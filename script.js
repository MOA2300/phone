const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Sprite animation frames
const spriteFrames = [];
for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

// Flip phone opening and closing frames
const openFrames = [
  "images/6.png", "images/25.png", "images/28.png", "images/30.png",
  "images/32.png", "images/34.png", "images/36.png", "images/38.png",
  "images/40.png", "images/42.png"
];

const closeFrames = [
  "images/46.png", "images/48.png", "images/50.png"
];

// Preload all frames
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
      setFlipTriggerArea(); // Update area after phone is open
    });
  });

  const keyOverlay = document.getElementById("key-overlay");
  const flipTrigger = document.getElementById("flip-trigger");

  // Only allow flip via correct trigger zone
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

  // Update the clickable flip zone depending on open/closed state
  function setFlipTriggerArea() {
    if (isOpen) {
      // white circled area (top latch of open phone)
      flipTrigger.style.left = "113px";
      flipTrigger.style.top = "60px";
    } else {
      // red circled area (bottom lip of closed phone)
      flipTrigger.style.left = "115px";
      flipTrigger.style.top = "405px";
    }
  }

  // KEY POSITION MAPPING (lowered Y values)
  const keyMap = {
    key0: { x: 92, y: 340 },
    key1: { x: 55, y: 310 },
    key2: { x: 92, y: 310 },
    key3: { x: 129, y: 310 },
    key4: { x: 55, y: 280 },
    key5: { x: 92, y: 280 },
    key6: { x: 129, y: 280 },
    key7: { x: 55, y: 250 },
    key8: { x: 92, y: 250 },
    key9: { x: 129, y: 250 },
    key10: { x: 55, y: 370 },
    keyhash: { x: 129, y: 370 },
    keyanswerphone: { x: 35, y: 220 },
    keyhangup: { x: 140, y: 220 }
  };

  // Create clickable overlays for keys
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
      flashImg.style.display = "block";
      setTimeout(() => {
        flashImg.style.display = "none";
      }, 200);
    });
  });
};
