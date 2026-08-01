"use strict";

/* ---------------------------------
   ELEMENTS
--------------------------------- */

const spriteButton = document.getElementById("sprite-button");
const sprite = document.getElementById("sprite");

const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

const keyOverlay = document.getElementById("key-overlay");
const flipTrigger = document.getElementById("flip-trigger");

const phoneDisplayText = document.getElementById(
  "phone-display-text"
);

/* ---------------------------------
   STARTING SPRITE FRAMES
--------------------------------- */

const spriteFrames = [];

for (let i = 1; i <= 16; i += 1) {
  spriteFrames.push(`DefineSprite_22/${i}.png`);
}

/* ---------------------------------
   PHONE OPENING FRAMES
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

/* ---------------------------------
   PHONE CLOSING FRAMES
--------------------------------- */

const closeFrames = [
  "images/46.png",
  "images/48.png",
  "images/50.png"
];

/* ---------------------------------
   PHONE KEYS

   Coordinates are based on a
   200 × 600 phone container.

   Change x, y, width, and height to align each
   clickable area with your image.
--------------------------------- */

const phoneKeys = [
  /* Upper rectangular buttons */

  {
    name: "left-soft",
    label: "Left soft key",
    x: 15,
    y: 330,
    width: 46,
    height: 26
  },
  {
    name: "right-soft",
    label: "Right soft key",
    x: 139,
    y: 330,
    width: 46,
    height: 26
  },

  /* Directional pad */

  {
    name: "up",
    label: "Up",
    x: 76,
    y: 322,
    width: 49,
    height: 27
  },
  {
    name: "left",
    label: "Left",
    x: 53,
    y: 344,
    width: 36,
    height: 40
  },
  {
    name: "center",
    label: "Select",
    x: 77,
    y: 340,
    width: 48,
    height: 48
  },
  {
    name: "right",
    label: "Right",
    x: 113,
    y: 344,
    width: 36,
    height: 40
  },
  {
    name: "down",
    label: "Down",
    x: 76,
    y: 379,
    width: 49,
    height: 28
  },

  /* Call and end buttons */

  {
    name: "call",
    label: "Call",
    x: 15,
    y: 378,
    width: 47,
    height: 28
  },
  {
    name: "end",
    label: "End call",
    x: 138,
    y: 378,
    width: 47,
    height: 28
  },

  /* Number row 1 */

  {
    name: "1",
    label: "Number 1",
    x: 18,
    y: 416,
    width: 47,
    height: 27
  },
  {
    name: "2",
    label: "Number 2",
    x: 77,
    y: 416,
    width: 47,
    height: 27
  },
  {
    name: "3",
    label: "Number 3",
    x: 136,
    y: 416,
    width: 47,
    height: 27
  },

  /* Number row 2 */

  {
    name: "4",
    label: "Number 4",
    x: 18,
    y: 451,
    width: 47,
    height: 27
  },
  {
    name: "5",
    label: "Number 5",
    x: 77,
    y: 451,
    width: 47,
    height: 27
  },
  {
    name: "6",
    label: "Number 6",
    x: 136,
    y: 451,
    width: 47,
    height: 27
  },

  /* Number row 3 */

  {
    name: "7",
    label: "Number 7",
    x: 18,
    y: 486,
    width: 47,
    height: 27
  },
  {
    name: "8",
    label: "Number 8",
    x: 77,
    y: 486,
    width: 47,
    height: 27
  },
  {
    name: "9",
    label: "Number 9",
    x: 136,
    y: 486,
    width: 47,
    height: 27
  },

  /* Bottom row */

  {
    name: "star",
    label: "Star",
    x: 18,
    y: 521,
    width: 47,
    height: 27
  },
  {
    name: "0",
    label: "Number 0",
    x: 77,
    y: 521,
    width: 47,
    height: 27
  },
  {
    name: "hash",
    label: "Hash",
    x: 136,
    y: 521,
    width: 47,
    height: 27
  }
];

/* ---------------------------------
   STATE
--------------------------------- */

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

let spriteIndex = 0;
let spriteInterval = null;

let typedNumber = "";

/* ---------------------------------
   PRELOAD ALL IMAGES
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
   STARTING SPRITE LOOP
--------------------------------- */

function startSpriteLoop() {
  stopSpriteLoop();

  sprite.src = spriteFrames[0];

  spriteInterval = window.setInterval(() => {
    spriteIndex =
      (spriteIndex + 1) % spriteFrames.length;

    sprite.src = spriteFrames[spriteIndex];
  }, 160);
}

function stopSpriteLoop() {
  if (spriteInterval === null) return;

  window.clearInterval(spriteInterval);
  spriteInterval = null;
}

/* ---------------------------------
   GENERAL FRAME ANIMATION
--------------------------------- */

function playAnimation(
  frames,
  finalFrame,
  callback
) {
  if (isAnimating || frames.length === 0) return;

  isAnimating = true;

  flipTrigger.disabled = true;
  disablePhoneKeys();

  let frameIndex = 0;

  const animationInterval = window.setInterval(() => {
    if (frameIndex < frames.length) {
      frame.src = frames[frameIndex];
      frameIndex += 1;
      return;
    }

    window.clearInterval(animationInterval);

    frame.src = finalFrame;
    isAnimating = false;

    flipTrigger.disabled = false;

    if (typeof callback === "function") {
      callback();
    }

    if (isOpen) {
      enablePhoneKeys();
    }
  }, 90);
}

/* ---------------------------------
   FLIP TRIGGER POSITION

   Open phone:
   Trigger covers the top hinge.

   Closed phone:
   Trigger covers the whole closed phone.
--------------------------------- */

function setFlipTriggerArea() {
  if (isOpen) {
    flipTrigger.style.left = "0px";
    flipTrigger.style.top = "0px";
    flipTrigger.style.width = "200px";
    flipTrigger.style.height = "96px";

    flipTrigger.setAttribute(
      "aria-label",
      "Close phone"
    );
  } else {
    flipTrigger.style.left = "0px";
    flipTrigger.style.top = "0px";
    flipTrigger.style.width = "200px";
    flipTrigger.style.height = "400px";

    flipTrigger.setAttribute(
      "aria-label",
      "Open phone"
    );
  }
}

/* ---------------------------------
   CREATE CLICKABLE PHONE KEYS
--------------------------------- */

function renderKeys() {
  keyOverlay.innerHTML = "";

  phoneKeys.forEach((key) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "phone-key";

    button.dataset.key = key.name;

    button.setAttribute(
      "aria-label",
      key.label
    );

    button.style.left = `${key.x}px`;
    button.style.top = `${key.y}px`;
    button.style.width = `${key.width}px`;
    button.style.height = `${key.height}px`;

    button.addEventListener(
      "pointerdown",
      () => {
        if (!isOpen || isAnimating) return;

        button.classList.add("is-pressed");
      }
    );

    button.addEventListener(
      "pointerup",
      () => {
        button.classList.remove("is-pressed");
      }
    );

    button.addEventListener(
      "pointercancel",
      () => {
        button.classList.remove("is-pressed");
      }
    );

    button.addEventListener(
      "pointerleave",
      () => {
        button.classList.remove("is-pressed");
      }
    );

    button.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        if (!isOpen || isAnimating) return;

        handlePhoneKey(key.name);
      }
    );

    keyOverlay.appendChild(button);
  });

  if (isOpen) {
    enablePhoneKeys();
  } else {
    disablePhoneKeys();
  }
}

/* ---------------------------------
   ENABLE AND DISABLE KEYS
--------------------------------- */

function disablePhoneKeys() {
  const buttons =
    keyOverlay.querySelectorAll(".phone-key");

  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove("is-pressed");
  });
}

function enablePhoneKeys() {
  if (!isOpen || isAnimating) return;

  const buttons =
    keyOverlay.querySelectorAll(".phone-key");

  buttons.forEach((button) => {
    button.disabled = false;
  });
}

/* ---------------------------------
   PHONE KEY ACTIONS
--------------------------------- */

function handlePhoneKey(keyName) {
  playKeySound();

  switch (keyName) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      enterCharacter(keyName);
      break;

    case "star":
      enterCharacter("*");
      break;

    case "hash":
      enterCharacter("#");
      break;

    case "left-soft":
      clearLastCharacter();
      break;

    case "right-soft":
      clearPhoneDisplay();
      break;

    case "up":
      showTemporaryMessage("UP");
      break;

    case "down":
      showTemporaryMessage("DOWN");
      break;

    case "left":
      showTemporaryMessage("LEFT");
      break;

    case "right":
      showTemporaryMessage("RIGHT");
      break;

    case "center":
      showTemporaryMessage("SELECT");
      break;

    case "call":
      showTemporaryMessage("CALLING...");
      break;

    case "end":
      closePhone();
      break;

    default:
      console.log(`Unknown key: ${keyName}`);
  }
}

/* ---------------------------------
   PHONE DISPLAY
--------------------------------- */

function updatePhoneDisplay() {
  phoneDisplayText.textContent = typedNumber;
}

function enterCharacter(character) {
  const maximumCharacters = 12;

  if (typedNumber.length >= maximumCharacters) {
    return;
  }

  typedNumber += character;
  updatePhoneDisplay();
}

function clearLastCharacter() {
  typedNumber = typedNumber.slice(0, -1);
  updatePhoneDisplay();
}

function clearPhoneDisplay() {
  typedNumber = "";
  updatePhoneDisplay();
}

function showTemporaryMessage(message) {
  phoneDisplayText.textContent = message;

  window.setTimeout(() => {
    updatePhoneDisplay();
  }, 600);
}

/* ---------------------------------
   OPTIONAL KEYPAD SOUND
--------------------------------- */

function playKeySound() {
  /*
    This checks for sounds/key.mp3.

    Delete this function call from handlePhoneKey()
    if you do not have that file.
  */

  const sound = new Audio("sounds/key.mp3");

  sound.volume = 0.35;

  sound.play().catch(() => {
    /*
      No error is shown if the optional sound file
      does not exist.
    */
  });
}

/* ---------------------------------
   FIRST OPENING
--------------------------------- */

function openPhoneForFirstTime() {
  if (isAnimating || hasOpenedOnce) return;

  const sound1 =
    new Audio("sounds/27_fixed.mp3");

  const sound2 =
    new Audio("sounds/28_fixed.mp3");

  sound1.play().catch(() => {
    console.log("Opening sound 1 could not play.");
  });

  sound2.play().catch(() => {
    console.log("Opening sound 2 could not play.");
  });

  stopSpriteLoop();

  spriteButton.hidden = true;
  container.style.display = "flex";

  playAnimation(
    openFrames,
    "images/42.png",
    () => {
      hasOpenedOnce = true;
      isOpen = true;

      setFlipTriggerArea();
      enablePhoneKeys();
    }
  );
}

/* ---------------------------------
   CLOSE PHONE
--------------------------------- */

function closePhone() {
  if (
    isAnimating ||
    !hasOpenedOnce ||
    !isOpen
  ) {
    return;
  }

  isOpen = false;
  disablePhoneKeys();

  playAnimation(
    closeFrames,
    "images/50.png",
    () => {
      setFlipTriggerArea();
    }
  );
}

/* ---------------------------------
   REOPEN PHONE
--------------------------------- */

function reopenPhone() {
  if (
    isAnimating ||
    !hasOpenedOnce ||
    isOpen
  ) {
    return;
  }

  const reopenFrames =
    [...closeFrames].reverse();

  playAnimation(
    reopenFrames,
    "images/42.png",
    () => {
      isOpen = true;

      setFlipTriggerArea();
      enablePhoneKeys();
    }
  );
}

/* ---------------------------------
   INITIALIZE
--------------------------------- */

function initializePhone() {
  renderKeys();
  updatePhoneDisplay();
  startSpriteLoop();

  spriteButton.addEventListener(
    "click",
    openPhoneForFirstTime
  );

  flipTrigger.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      if (
        isAnimating ||
        !hasOpenedOnce
      ) {
        return;
      }

      if (isOpen) {
        closePhone();
      } else {
        reopenPhone();
      }
    }
  );
}

window.addEventListener(
  "DOMContentLoaded",
  initializePhone
);
