"use strict";

/* ---------------------------------
   HTML ELEMENTS
--------------------------------- */

const spriteButton =
  document.getElementById("sprite-button");

const sprite =
  document.getElementById("sprite");

const frame =
  document.getElementById("phone-frame");

const container =
  document.getElementById("phone-container");

const keyOverlay =
  document.getElementById("key-overlay");

const flipTrigger =
  document.getElementById("flip-trigger");

const frontScreen =
  document.getElementById("front-screen");

const frontScreenDate =
  document.getElementById("front-screen-date");

const frontScreenTime =
  document.getElementById("front-screen-time");

const openScreenClock =
  document.getElementById("open-screen-clock");

const openScreenDate =
  document.getElementById("open-screen-date");

const openScreenTime =
  document.getElementById("open-screen-time");

/* ---------------------------------
   SMALL STARTING PHONE FRAMES
--------------------------------- */

const spriteFrames = [];

for (let i = 1; i <= 16; i += 1) {
  spriteFrames.push(
    `DefineSprite_22/${i}.png`
  );
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
   PHONE KEY COORDINATES

   Based on the 236 × 656 open phone.
--------------------------------- */

const phoneKeys = [
  /* Upper side keys */

  {
    name: "upper-left",
    label: "Upper left key",
    x: 49,
    y: 341,
    width: 36,
    height: 21
  },

  {
    name: "upper-right",
    label: "Upper right key",
    x: 139,
    y: 341,
    width: 36,
    height: 21
  },

  /*
    Smaller direction-arrow areas.

    The up arrow has been moved higher.
    The left arrow remains farther left.
  */

  {
    name: "dpad-up",
    label: "Up",
    x: 105,
    y: 345,
    width: 12,
    height: 6,
    className: "dpad-key"
  },

  {
    name: "dpad-left",
    label: "Left",
    x: 85,
    y: 361,
    width: 6,
    height: 12,
    className: "dpad-key"
  },

  {
    name: "dpad-right",
    label: "Right",
    x: 131,
    y: 361,
    width: 6,
    height: 12,
    className: "dpad-key"
  },

  {
    name: "dpad-down",
    label: "Down",
    x: 105,
    y: 390,
    width: 12,
    height: 6,
    className: "dpad-key"
  },

  /* Center select button */

  {
    name: "dpad-center",
    label: "Select",
    x: 98,
    y: 357,
    width: 28,
    height: 28
  },

  /* Lower side keys */

  {
    name: "lower-left",
    label: "Lower left key",
    x: 49,
    y: 381,
    width: 36,
    height: 21
  },

  {
    name: "lower-right",
    label: "Lower right key",
    x: 139,
    y: 381,
    width: 36,
    height: 21
  },

  /* Call, menu and hang-up */

  {
    name: "call",
    label: "Call",
    x: 48,
    y: 408,
    width: 39,
    height: 23
  },

  {
    name: "menu",
    label: "Menu",
    x: 94,
    y: 408,
    width: 38,
    height: 23
  },

  {
    name: "end",
    label: "Hang up",
    x: 139,
    y: 408,
    width: 38,
    height: 23
  },

  /* Number row 1 */

  {
    name: "1",
    label: "Number 1",
    x: 48,
    y: 439,
    width: 39,
    height: 21
  },

  {
    name: "2",
    label: "Number 2",
    x: 94,
    y: 439,
    width: 39,
    height: 21
  },

  {
    name: "3",
    label: "Number 3",
    x: 139,
    y: 439,
    width: 39,
    height: 21
  },

  /* Number row 2 */

  {
    name: "4",
    label: "Number 4",
    x: 48,
    y: 467,
    width: 39,
    height: 21
  },

  {
    name: "5",
    label: "Number 5",
    x: 94,
    y: 467,
    width: 39,
    height: 21
  },

  {
    name: "6",
    label: "Number 6",
    x: 139,
    y: 467,
    width: 39,
    height: 21
  },

  /* Number row 3 */

  {
    name: "7",
    label: "Number 7",
    x: 48,
    y: 495,
    width: 39,
    height: 21
  },

  {
    name: "8",
    label: "Number 8",
    x: 94,
    y: 495,
    width: 39,
    height: 21
  },

  {
    name: "9",
    label: "Number 9",
    x: 139,
    y: 495,
    width: 39,
    height: 21
  },

  /* Bottom row */

  {
    name: "star",
    label: "Star",
    x: 48,
    y: 523,
    width: 39,
    height: 21
  },

  {
    name: "0",
    label: "Number 0",
    x: 94,
    y: 523,
    width: 39,
    height: 21
  },

  {
    name: "hash",
    label: "Hash",
    x: 139,
    y: 523,
    width: 39,
    height: 21
  }
];

/* ---------------------------------
   PHONE STATE
--------------------------------- */

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

let spriteIndex = 0;
let spriteInterval = null;
let clockInterval = null;

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
  ...closeFrames,
  "images/bunny.png"
]);

/* ---------------------------------
   SMALL PHONE SPRITE LOOP
--------------------------------- */

function startSpriteLoop() {
  stopSpriteLoop();

  sprite.src = spriteFrames[0];

  spriteInterval =
    window.setInterval(() => {
      spriteIndex =
        (spriteIndex + 1) %
        spriteFrames.length;

      sprite.src =
        spriteFrames[spriteIndex];
    }, 160);
}

function stopSpriteLoop() {
  if (spriteInterval === null) {
    return;
  }

  window.clearInterval(
    spriteInterval
  );

  spriteInterval = null;
}

/* ---------------------------------
   PHONE CLOCK
--------------------------------- */

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function formatPhoneDate(date) {
  const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  const year =
    date.getFullYear();

  const month =
    padNumber(
      date.getMonth() + 1
    );

  const day =
    padNumber(
      date.getDate()
    );

  const weekday =
    weekdays[
      date.getDay()
    ];

  return `${year}/${month}/${day}(${weekday})`;
}

function formatPhoneTime(date) {
  const hours =
    padNumber(
      date.getHours()
    );

  const minutes =
    padNumber(
      date.getMinutes()
    );

  const seconds =
    padNumber(
      date.getSeconds()
    );

  return `${hours}:${minutes}:${seconds}`;
}

function updatePhoneClock() {
  const now = new Date();

  const dateText =
    formatPhoneDate(now);

  const timeText =
    formatPhoneTime(now);

  frontScreenDate.textContent =
    dateText;

  frontScreenTime.textContent =
    timeText;

  openScreenDate.textContent =
    dateText;

  openScreenTime.textContent =
    timeText;
}

function startPhoneClock() {
  updatePhoneClock();

  if (clockInterval !== null) {
    window.clearInterval(
      clockInterval
    );
  }

  clockInterval =
    window.setInterval(
      updatePhoneClock,
      1000
    );
}

/* ---------------------------------
   SCREEN VISIBILITY
--------------------------------- */

function setFrontScreenVisible(visible) {
  frontScreen.style.display =
    visible
      ? "block"
      : "none";

  frontScreen.setAttribute(
    "aria-hidden",
    visible ? "false" : "true"
  );
}

function setOpenClockVisible(visible) {
  openScreenClock.style.display =
    visible
      ? "block"
      : "none";

  openScreenClock.setAttribute(
    "aria-hidden",
    visible ? "false" : "true"
  );
}

/* ---------------------------------
   KEYPAD VISIBILITY
--------------------------------- */

function setKeysEnabled(enabled) {
  const buttons =
    keyOverlay.querySelectorAll(
      ".phone-key"
    );

  buttons.forEach((button) => {
    button.disabled = !enabled;

    button.classList.remove(
      "is-pressed"
    );
  });

  keyOverlay.style.visibility =
    enabled
      ? "visible"
      : "hidden";

  keyOverlay.style.pointerEvents =
    enabled
      ? "auto"
      : "none";

  keyOverlay.setAttribute(
    "aria-hidden",
    enabled ? "false" : "true"
  );
}

/* ---------------------------------
   GENERAL FRAME ANIMATION
--------------------------------- */

function playAnimation(
  frames,
  finalFrame,
  callback
) {
  if (
    isAnimating ||
    frames.length === 0
  ) {
    return;
  }

  isAnimating = true;

  flipTrigger.disabled = true;

  setKeysEnabled(false);

  let index = 0;

  const interval =
    window.setInterval(() => {
      if (
        index <
        frames.length
      ) {
        frame.src =
          frames[index];

        index += 1;

        return;
      }

      window.clearInterval(
        interval
      );

      frame.src =
        finalFrame;

      isAnimating = false;

      flipTrigger.disabled =
        false;

      if (
        typeof callback ===
        "function"
      ) {
        callback();
      }
    }, 90);
}

/* ---------------------------------
   FLIP CLICK AREA
--------------------------------- */

function setFlipTriggerArea() {
  if (isOpen) {
    /*
      Open phone:
      click the top cap to close it.
    */

    flipTrigger.style.left =
      "62px";

    flipTrigger.style.top =
      "0px";

    flipTrigger.style.width =
      "112px";

    flipTrigger.style.height =
      "62px";

    flipTrigger.setAttribute(
      "aria-label",
      "Close phone"
    );
  } else {
    /*
      Closed phone:
      click the full front to reopen it.
    */

    flipTrigger.style.left =
      "18px";

    flipTrigger.style.top =
      "80px";

    flipTrigger.style.width =
      "200px";

    flipTrigger.style.height =
      "496px";

    flipTrigger.setAttribute(
      "aria-label",
      "Open phone"
    );
  }
}

/* ---------------------------------
   CREATE KEYPAD BUTTONS
--------------------------------- */

function renderKeys() {
  keyOverlay.innerHTML = "";

  phoneKeys.forEach((key) => {
    const button =
      document.createElement(
        "button"
      );

    button.type =
      "button";

    button.className =
      "phone-key";

    if (key.className) {
      button.classList.add(
        key.className
      );
    }

    button.dataset.key =
      key.name;

    button.setAttribute(
      "aria-label",
      key.label
    );

    button.style.left =
      `${key.x}px`;

    button.style.top =
      `${key.y}px`;

    button.style.width =
      `${key.width}px`;

    button.style.height =
      `${key.height}px`;

    button.addEventListener(
      "pointerdown",
      () => {
        if (
          !isOpen ||
          isAnimating
        ) {
          return;
        }

        button.classList.add(
          "is-pressed"
        );
      }
    );

    const releaseKey = () => {
      button.classList.remove(
        "is-pressed"
      );
    };

    button.addEventListener(
      "pointerup",
      releaseKey
    );

    button.addEventListener(
      "pointercancel",
      releaseKey
    );

    button.addEventListener(
      "pointerleave",
      releaseKey
    );

    button.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        if (
          !isOpen ||
          isAnimating
        ) {
          return;
        }

        handlePhoneKey(
          key.name
        );
      }
    );

    keyOverlay.appendChild(
      button
    );
  });

  setKeysEnabled(false);
}

/* ---------------------------------
   KEY ACTIONS
--------------------------------- */

function handlePhoneKey(keyName) {
  console.log(
    `Phone key pressed: ${keyName}`
  );

  switch (keyName) {
    case "end":
      /*
        The hang-up key does not
        physically close the phone.
      */

      console.log(
        "Hang-up button pressed"
      );

      break;

    case "call":
      console.log(
        "Call button pressed"
      );

      break;

    case "menu":
      console.log(
        "Menu button pressed"
      );

      break;

    case "dpad-up":
      console.log("Move up");
      break;

    case "dpad-down":
      console.log("Move down");
      break;

    case "dpad-left":
      console.log("Move left");
      break;

    case "dpad-right":
      console.log("Move right");
      break;

    case "dpad-center":
      console.log("Select");
      break;

    case "upper-left":
    case "upper-right":
    case "lower-left":
    case "lower-right":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "star":
    case "0":
    case "hash":
      console.log(
        `${keyName} pressed`
      );

      break;

    default:
      console.warn(
        `No action assigned to ${keyName}`
      );
  }
}

/* ---------------------------------
   FIRST OPENING
--------------------------------- */

function openPhoneForFirstTime() {
  if (
    isAnimating ||
    hasOpenedOnce
  ) {
    return;
  }

  stopSpriteLoop();

  spriteButton.hidden =
    true;

  spriteButton.style.display =
    "none";

  sprite.style.display =
    "none";

  setKeysEnabled(false);

  setFrontScreenVisible(false);

  setOpenClockVisible(false);

  container.style.display =
    "block";

  const sound1 =
    new Audio(
      "sounds/27_fixed.mp3"
    );

  const sound2 =
    new Audio(
      "sounds/28_fixed.mp3"
    );

  sound1
    .play()
    .catch(() => {});

  sound2
    .play()
    .catch(() => {});

  playAnimation(
    openFrames,
    "images/42.png",
    () => {
      hasOpenedOnce =
        true;

      isOpen =
        true;

      setFlipTriggerArea();

      setKeysEnabled(true);

      setFrontScreenVisible(false);

      setOpenClockVisible(true);
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

  setKeysEnabled(false);

  setFrontScreenVisible(false);

  setOpenClockVisible(false);

  isOpen =
    false;

  playAnimation(
    closeFrames,
    "images/50.png",
    () => {
      setFlipTriggerArea();

      setFrontScreenVisible(true);

      setOpenClockVisible(false);
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

  setFrontScreenVisible(false);

  setOpenClockVisible(false);

  setKeysEnabled(false);

  const reopenFrames =
    [...closeFrames].reverse();

  playAnimation(
    reopenFrames,
    "images/42.png",
    () => {
      isOpen =
        true;

      setFlipTriggerArea();

      setKeysEnabled(true);

      setFrontScreenVisible(false);

      setOpenClockVisible(true);
    }
  );
}

/* ---------------------------------
   INITIALIZE
--------------------------------- */

function initializePhone() {
  renderKeys();

  setKeysEnabled(false);

  setFrontScreenVisible(false);

  setOpenClockVisible(false);

  startSpriteLoop();

  startPhoneClock();

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
