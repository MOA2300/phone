const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");
const keyOverlay = document.getElementById("key-overlay");
const flipTrigger = document.getElementById("flip-trigger");

/* ---------------------------------
   SPRITE FRAMES
--------------------------------- */

const spriteFrames = [];

for (let i = 1; i <= 16; i++) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

/* ---------------------------------
   PHONE ANIMATION FRAMES
--------------------------------- */

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

/* ---------------------------------
   PRELOAD IMAGES
--------------------------------- */

function preloadImages(paths) {
  paths.forEach((src) => {
    const image = new Image();
    image.src = src;
  });
}

preloadImages([
  ...spriteFrames,
  ...openFrames,
  ...closeFrames
]);

/* ---------------------------------
   PHONE STATE
--------------------------------- */

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

let spriteIndex = 0;
let spriteInterval = null;

/* ---------------------------------
   SMALL PHONE SPRITE LOOP
--------------------------------- */

function startSpriteLoop() {
  stopSpriteLoop();

  spriteInterval = setInterval(() => {
    spriteIndex = (spriteIndex + 1) % spriteFrames.length;
    sprite.src = spriteFrames[spriteIndex];
  }, 160);
}

function stopSpriteLoop() {
  if (spriteInterval !== null) {
    clearInterval(spriteInterval);
    spriteInterval = null;
  }
}

/* ---------------------------------
   PHONE FRAME ANIMATION
--------------------------------- */

function playAnimation(frames, finalFrame, callback) {
  if (isAnimating) return;

  isAnimating = true;
  flipTrigger.style.pointerEvents = "none";

  let frameIndex = 0;

  const animationInterval = setInterval(() => {
    if (frameIndex < frames.length) {
      frame.src = frames[frameIndex];
      frameIndex += 1;
      return;
    }

    clearInterval(animationInterval);

    frame.src = finalFrame;
    isAnimating = false;
    flipTrigger.style.pointerEvents = "auto";

    if (typeof callback === "function") {
      callback();
    }
  }, 90);
}

/* ---------------------------------
   CLICKABLE PHONE AREA
--------------------------------- */

function setFlipTriggerArea() {
  flipTrigger.style.position = "absolute";
  flipTrigger.style.cursor = "pointer";
  flipTrigger.style.zIndex = "100";
  flipTrigger.style.pointerEvents = "auto";

  if (isOpen) {
    /*
      OPEN PHONE:
      Only the top hinge area is clickable.
    */

    flipTrigger.style.left = "35px";
    flipTrigger.style.top = "0px";
    flipTrigger.style.width = "145px";
    flipTrigger.style.height = "95px";

    flipTrigger.setAttribute(
      "aria-label",
      "Close phone"
    );
  } else {
    /*
      CLOSED PHONE:
      The entire closed phone is clickable.
    */

    flipTrigger.style.left = "5px";
    flipTrigger.style.top = "0px";
    flipTrigger.style.width = "190px";
    flipTrigger.style.height = "390px";

    flipTrigger.setAttribute(
      "aria-label",
      "Open phone"
    );
  }
}

/* ---------------------------------
   PHONE KEYS
--------------------------------- */

function renderKeys() {
  keyOverlay.innerHTML = "";

  if (!isOpen) return;

  const keyName = "1key";

  const position = {
    x: 464,
    y: 430
  };

  const button = document.createElement("button");

  button.className = "key-button";
  button.type = "button";
  button.setAttribute("aria-label", "Phone key 1");

  button.style.left = `${position.x}px`;
  button.style.top = `${position.y}px`;

  const hoverImage = document.createElement("img");

  hoverImage.src = `normal keys/${keyName}.png`;
  hoverImage.alt = "";
  hoverImage.className = "key-overlay-img";

  hoverImage.style.left = `${position.x}px`;
  hoverImage.style.top = `${position.y}px`;

  button.addEventListener("click", (event) => {
    event.stopPropagation();

    if (!isOpen || isAnimating) return;

    console.log(`${keyName} clicked`);
  });

  keyOverlay.appendChild(button);
  keyOverlay.appendChild(hoverImage);
}

/* ---------------------------------
   OPEN THE PHONE FOR THE FIRST TIME
--------------------------------- */

function openPhoneForFirstTime() {
  if (isAnimating || hasOpenedOnce) return;

  const sound1 = new Audio("sounds/27_fixed.mp3");
  const sound2 = new Audio("sounds/28_fixed.mp3");

  sound1.play().catch(() => {
    console.log("The first sound could not play.");
  });

  sound2.play().catch(() => {
    console.log("The second sound could not play.");
  });

  stopSpriteLoop();

  sprite.style.display = "none";
  container.style.display = "flex";

  playAnimation(
    openFrames,
    "images/42.png",
    () => {
      hasOpenedOnce = true;
      isOpen = true;

      setFlipTriggerArea();
      renderKeys();
    }
  );
}

/* ---------------------------------
   CLOSE THE PHONE
--------------------------------- */

function closePhone() {
  if (isAnimating || !isOpen) return;

  keyOverlay.innerHTML = "";

  playAnimation(
    closeFrames,
    "images/50.png",
    () => {
      isOpen = false;
      setFlipTriggerArea();
    }
  );
}

/* ---------------------------------
   REOPEN THE PHONE
--------------------------------- */

function reopenPhone() {
  if (isAnimating || isOpen) return;

  const reopenFrames = [...closeFrames].reverse();

  playAnimation(
    reopenFrames,
    "images/42.png",
    () => {
      isOpen = true;
      setFlipTriggerArea();
      renderKeys();
    }
  );
}

/* ---------------------------------
   INITIALIZE
--------------------------------- */

window.addEventListener("load", () => {
  startSpriteLoop();

  sprite.addEventListener(
    "click",
    openPhoneForFirstTime
  );

  flipTrigger.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      if (isAnimating || !hasOpenedOnce) {
        return;
      }

      if (isOpen) {
        closePhone();
      } else {
        reopenPhone();
      }
    }
  );

  flipTrigger.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key !== "Enter" &&
        event.key !== " "
      ) {
        return;
      }

      event.preventDefault();

      if (isAnimating || !hasOpenedOnce) {
        return;
      }

      if (isOpen) {
        closePhone();
      } else {
        reopenPhone();
      }
    }
  );
});
 






