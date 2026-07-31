const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");
const keyOverlay = document.getElementById("key-overlay");
const flipTrigger = document.getElementById("flip-trigger");

/* --------------------------------------------------
   SPRITE FRAMES
-------------------------------------------------- */

const spriteFrames = [];

for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

/* --------------------------------------------------
   PHONE ANIMATION FRAMES
-------------------------------------------------- */

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

/* --------------------------------------------------
   PRELOAD IMAGES
-------------------------------------------------- */

function preloadImages(paths) {
  paths.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages([
  ...spriteFrames,
  ...openFrames,
  ...closeFrames
]);

/* --------------------------------------------------
   STATE
-------------------------------------------------- */

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

let spriteIndex = 0;
let spriteInterval = null;

/* --------------------------------------------------
   SMALL SPRITE LOOP
-------------------------------------------------- */

function startSpriteLoop() {
  stopSpriteLoop();

  spriteInterval = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 160);
}

function stopSpriteLoop() {
  if (spriteInterval) {
    clearInterval(spriteInterval);
    spriteInterval = null;
  }
}

/* --------------------------------------------------
   PHONE FRAME ANIMATION
-------------------------------------------------- */

function playAnimation(frames, finalFrame, callback) {
  if (isAnimating) return;

  isAnimating = true;
  flipTrigger.style.pointerEvents = "none";

  let frameIndex = 0;

  const interval = setInterval(() => {
    if (frameIndex < frames.length) {
      frame.src = frames[frameIndex];
      frameIndex++;
      return;
    }

    clearInterval(interval);

    frame.src = finalFrame;
    isAnimating = false;
    flipTrigger.style.pointerEvents = "auto";

    if (typeof callback === "function") {
      callback();
    }
  }, 90);
}

/* --------------------------------------------------
   CLICKABLE FLIP AREA
-------------------------------------------------- */

function setFlipTriggerArea() {
  flipTrigger.style.position = "absolute";
  flipTrigger.style.cursor = "pointer";
  flipTrigger.style.zIndex = "100";
  flipTrigger.style.pointerEvents = "auto";

  if (isOpen) {
    /*
      Clickable area over the upper hinge and top edge
      of the fully opened phone.
    */
    flipTrigger.style.left = "35px";
    flipTrigger.style.top = "0px";
    flipTrigger.style.width = "145px";
    flipTrigger.style.height = "95px";
  } else {
    /*
      Clickable area over the closed phone so the user
      can click it again to reopen it.
    */
    flipTrigger.style.left = "15px";
    flipTrigger.style.top = "0px";
    flipTrigger.style.width = "170px";
    flipTrigger.style.height = "180px";
  }
}

/* --------------------------------------------------
   PHONE KEYS
-------------------------------------------------- */

function renderKeys() {
  keyOverlay.innerHTML = "";

  if (!isOpen) return;

  const key = "1key";
  const pos = {
    x: 464,
    y: 430
  };

  const button = document.createElement("button");

  button.className = "key-button";
  button.type = "button";
  button.setAttribute("aria-label", "Phone key 1");

  button.style.left = `${pos.x}px`;
  button.style.top = `${pos.y}px`;

  const hoverImg = document.createElement("img");

  hoverImg.src = `normal keys/${key}.png`;
  hoverImg.alt = "";
  hoverImg.className = "key-overlay-img";
  hoverImg.style.left = `${pos.x}px`;
  hoverImg.style.top = `${pos.y}px`;

  button.addEventListener("click", (event) => {
    if (!isOpen || isAnimating) {
      event.preventDefault();
      return;
    }

    console.log(`Key ${key} clicked`);
  });

  keyOverlay.appendChild(button);
  keyOverlay.appendChild(hoverImg);
}

/* --------------------------------------------------
   INITIALIZE SITE
-------------------------------------------------- */

window.addEventListener("load", () => {
  startSpriteLoop();

  /*
    First click:
    Hide the small sprite and open the phone.
  */
  sprite.addEventListener("click", () => {
    if (isAnimating || hasOpenedOnce) return;

    const sound1 = new Audio("sounds/27_fixed.mp3");
    const sound2 = new Audio("sounds/28_fixed.mp3");

    sound1.play().catch(() => {
      console.log("The first sound could not autoplay.");
    });

    sound2.play().catch(() => {
      console.log("The second sound could not autoplay.");
    });

    stopSpriteLoop();

    sprite.style.display = "none";
    container.style.display = "flex";

    playAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;

      setFlipTriggerArea();
      renderKeys();
    });
  });

  /*
    Click the top hinge:
    Close or reopen the phone.
  */
  flipTrigger.addEventListener("click", (event) => {
    event.stopPropagation();

    if (isAnimating || !hasOpenedOnce) return;

    if (isOpen) {
      keyOverlay.innerHTML = "";

      playAnimation(closeFrames, "images/50.png", () => {
        isOpen = false;
        setFlipTriggerArea();
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
});








