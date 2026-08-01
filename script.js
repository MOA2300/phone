"use strict";

/* ---------------------------------
   ELEMENTS
--------------------------------- */

const spriteButton =
  document.getElementById("sprite-button");

const sprite =
  document.getElementById("sprite");

const phoneContainer =
  document.getElementById("phone-container");

const phoneFrame =
  document.getElementById("phone-frame");

const openScreenClock =
  document.getElementById("open-screen-clock");

const openScreenDate =
  document.getElementById("open-screen-date");

const openScreenTime =
  document.getElementById("open-screen-time");

const frontScreen =
  document.getElementById("front-screen");

const frontScreenDate =
  document.getElementById("front-screen-date");

const frontScreenTime =
  document.getElementById("front-screen-time");

const phoneMenu =
  document.getElementById("phone-menu");

const menuItems = Array.from(
  document.querySelectorAll(".phone-menu-item")
);

const menuPhotoAnimation =
  document.getElementById("menu-photo-animation");

const keyOverlay =
  document.getElementById("key-overlay");

const phoneKeys = Array.from(
  document.querySelectorAll(".phone-key")
);

const flipTrigger =
  document.getElementById("flip-trigger");

const contentPanel =
  document.getElementById("content-panel");

const contentPanelTitle =
  document.getElementById("content-panel-title");

const panelPage =
  document.getElementById("panel-page");

const panelPageNumber =
  document.getElementById("panel-page-number");

const panelPrevious =
  document.getElementById("panel-previous");

const panelNext =
  document.getElementById("panel-next");

const panelClose =
  document.getElementById("panel-close");

/* ---------------------------------
   PHONE ANIMATION FRAMES
--------------------------------- */

const OPEN_PHONE_FRAMES = [
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

const CLOSE_PHONE_FRAMES = [
  "images/46.png",
  "images/48.png",
  "images/50.png"
];

const PHONE_FRAME_SPEED = 90;

/* ---------------------------------
   MENU PHOTO ANIMATION
--------------------------------- */

const MENU_ANIMATION_FRAME_COUNT = 71;

/*
  Lower number = faster animation.
  45ms makes 71 frames last about
  3.2 seconds.
*/

const MENU_ANIMATION_SPEED = 45;

let menuAnimationFrame = 1;
let menuAnimationTimer = null;
let isMenuAnimationPlaying = false;

/* ---------------------------------
   STATE
--------------------------------- */

let isPhoneAnimating = false;
let isPhoneOpen = false;
let isPhoneClosed = false;

let isMenuVisible = false;
let selectedMenuIndex = 0;

let currentPanelIndex = 0;

/* ---------------------------------
   PANEL CONTENT
--------------------------------- */

const panelPages = [
  {
    id: "about",
    title: "About",
    content: `
      <p class="panel-kicker">
        DIGITAL ARTIST · DESIGNER · PHOTOGRAPHER
      </p>

      <h2>
        Hi, I'm Leslie.
      </h2>

      <p class="panel-quote">
        I create digital experiences that combine
        clarity, creativity and care.
      </p>

      <p>
        My work includes photography, graphic design,
        video, interactive web projects and digital
        marketing.
      </p>

      <p>
        I am especially interested in nostalgic
        technology, identity, visual storytelling and
        experiences that feel human.
      </p>
    `
  },

  {
    id: "site",
    title: "Site",
    content: `
      <p class="panel-kicker">
        PORTFOLIO
      </p>

      <h2>
        Visit my website
      </h2>

      <p>
        Explore my photography, design work, videos
        and interactive digital projects.
      </p>

      <p>
        <a
          href="https://leslieahuatzi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open leslieahuatzi.com
        </a>
      </p>
    `
  },

  {
    id: "history",
    title: "History",
    content: `
      <p class="panel-kicker">
        CREATIVE TIMELINE
      </p>

      <h2>
        From art to interaction
      </h2>

      <ul>
        <li>
          Studied Digital Art at Scripps College.
        </li>

        <li>
          Developed experience in photography,
          printmaking, video and graphic design.
        </li>

        <li>
          Created interactive projects using HTML,
          CSS, JavaScript, PIXI.js and Three.js.
        </li>

        <li>
          Expanded into digital marketing, content
          strategy and social media design.
        </li>
      </ul>
    `
  },

  {
    id: "resume",
    title: "Résumé",
    content: `
      <p class="panel-kicker">
        EXPERIENCE
      </p>

      <h2>
        Creative and digital work
      </h2>

      <p class="resume-meta">
        Photography · Design · Video · Marketing
      </p>

      <h3>
        Digital Marketing
      </h3>

      <p>
        Created social content, visual assets,
        outreach materials and campaign ideas for
        growing brands and organizations.
      </p>

      <h3>
        Photography and Video
      </h3>

      <p>
        Photographed portraits, concerts, events and
        editorial projects while supporting production
        and post-production workflows.
      </p>

      <h3>
        Interactive Design
      </h3>

      <p>
        Built browser-based experiences using HTML,
        CSS and JavaScript with an emphasis on
        nostalgic interfaces and playful interaction.
      </p>
    `
  }
];

/* ---------------------------------
   IMAGE PRELOADING
--------------------------------- */

function preloadImages(paths) {
  paths.forEach((path) => {
    const image = new Image();
    image.src = path;
  });
}

function preloadMenuAnimation() {
  for (
    let frame = 1;
    frame <= MENU_ANIMATION_FRAME_COUNT;
    frame += 1
  ) {
    const image = new Image();

    image.src =
      `images/DefineSprite_203/${frame}.png`;
  }
}

preloadImages([
  ...OPEN_PHONE_FRAMES,
  ...CLOSE_PHONE_FRAMES
]);

preloadMenuAnimation();

/* ---------------------------------
   CLOCK
--------------------------------- */

function formatDate(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const weekday = date.toLocaleDateString(
    "en-US",
    {
      weekday: "short"
    }
  );

  return `${year}/${month}/${day}(${weekday})`;
}

function formatTime(date) {
  const hours = String(
    date.getHours()
  ).padStart(2, "0");

  const minutes = String(
    date.getMinutes()
  ).padStart(2, "0");

  const seconds = String(
    date.getSeconds()
  ).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function updateClock() {
  const now = new Date();

  const dateText = formatDate(now);
  const timeText = formatTime(now);

  openScreenDate.textContent = dateText;
  openScreenTime.textContent = timeText;

  frontScreenDate.textContent = dateText;
  frontScreenTime.textContent = timeText;
}

updateClock();

window.setInterval(updateClock, 1000);

/* ---------------------------------
   GENERAL FRAME ANIMATION
--------------------------------- */

function playFrameSequence(
  frames,
  speed = PHONE_FRAME_SPEED
) {
  return new Promise((resolve) => {
    let frameIndex = 0;

    phoneFrame.src = frames[frameIndex];

    const timer = window.setInterval(() => {
      frameIndex += 1;

      if (frameIndex >= frames.length) {
        window.clearInterval(timer);
        resolve();
        return;
      }

      phoneFrame.src = frames[frameIndex];
    }, speed);
  });
}

/* ---------------------------------
   MENU PHOTO ANIMATION
--------------------------------- */

function stopMenuPhotoAnimation({
  resetFrame = true
} = {}) {
  if (menuAnimationTimer !== null) {
    window.clearInterval(menuAnimationTimer);
    menuAnimationTimer = null;
  }

  isMenuAnimationPlaying = false;

  phoneMenu.classList.remove("is-animating");

  menuPhotoAnimation.classList.remove(
    "is-playing"
  );

  if (resetFrame) {
    menuAnimationFrame = 1;

    menuPhotoAnimation.src =
      "images/DefineSprite_203/1.png";
  }
}

function finishMenuPhotoAnimation() {
  stopMenuPhotoAnimation({
    resetFrame: false
  });

  menuAnimationFrame =
    MENU_ANIMATION_FRAME_COUNT;

  menuPhotoAnimation.src =
    `images/DefineSprite_203/${MENU_ANIMATION_FRAME_COUNT}.png`;

  updateMenuSelection();
}

function startMenuPhotoAnimation() {
  stopMenuPhotoAnimation();

  isMenuAnimationPlaying = true;
  menuAnimationFrame = 1;

  phoneMenu.classList.add("is-animating");

  menuPhotoAnimation.classList.add(
    "is-playing"
  );

  menuPhotoAnimation.src =
    "images/DefineSprite_203/1.png";

  menuAnimationTimer = window.setInterval(() => {
    menuAnimationFrame += 1;

    if (
      menuAnimationFrame >
      MENU_ANIMATION_FRAME_COUNT
    ) {
      finishMenuPhotoAnimation();
      return;
    }

    menuPhotoAnimation.src =
      `images/DefineSprite_203/${menuAnimationFrame}.png`;
  }, MENU_ANIMATION_SPEED);
}

/* ---------------------------------
   MENU VISIBILITY
--------------------------------- */

function setPhoneMenuVisible(
  visible,
  {
    playAnimation = true
  } = {}
) {
  isMenuVisible = visible;

  phoneMenu.classList.toggle(
    "is-visible",
    visible
  );

  if (!visible) {
    stopMenuPhotoAnimation();

    return;
  }

  selectedMenuIndex = 0;

  updateMenuSelection();

  if (playAnimation) {
    startMenuPhotoAnimation();
  }
}

/* ---------------------------------
   MENU SELECTION
--------------------------------- */

function updateMenuSelection() {
  menuItems.forEach((item, index) => {
    const isSelected =
      index === selectedMenuIndex;

    item.classList.toggle(
      "is-selected",
      isSelected
    );

    item.setAttribute(
      "aria-current",
      isSelected ? "true" : "false"
    );
  });
}

function moveMenuSelection(direction) {
  if (
    !isMenuVisible ||
    isMenuAnimationPlaying
  ) {
    return;
  }

  const columns = 2;
  const rows = 2;

  const currentRow =
    Math.floor(selectedMenuIndex / columns);

  const currentColumn =
    selectedMenuIndex % columns;

  let nextRow = currentRow;
  let nextColumn = currentColumn;

  if (direction === "up") {
    nextRow =
      (currentRow - 1 + rows) % rows;
  }

  if (direction === "down") {
    nextRow =
      (currentRow + 1) % rows;
  }

  if (direction === "left") {
    nextColumn =
      (currentColumn - 1 + columns) %
      columns;
  }

  if (direction === "right") {
    nextColumn =
      (currentColumn + 1) % columns;
  }

  selectedMenuIndex =
    nextRow * columns + nextColumn;

  updateMenuSelection();
}

function selectCurrentMenuItem() {
  if (
    !isMenuVisible ||
    isMenuAnimationPlaying
  ) {
    return;
  }

  const selectedItem =
    menuItems[selectedMenuIndex];

  if (!selectedItem) return;

  const pageId =
    selectedItem.dataset.page;

  openPanelById(pageId);
}

/* ---------------------------------
   PHONE OPENING
--------------------------------- */

async function openPhone() {
  if (
    isPhoneAnimating ||
    isPhoneOpen
  ) {
    return;
  }

  isPhoneAnimating = true;
  isPhoneClosed = false;

  spriteButton.hidden = true;

  phoneContainer.style.display = "block";

  frontScreen.style.display = "none";

  openScreenClock.style.display = "none";

  keyOverlay.style.visibility = "hidden";

  setPhoneMenuVisible(false);

  await playFrameSequence(
    OPEN_PHONE_FRAMES
  );

  phoneFrame.src =
    OPEN_PHONE_FRAMES[
      OPEN_PHONE_FRAMES.length - 1
    ];

  isPhoneOpen = true;
  isPhoneAnimating = false;

  openScreenClock.style.display = "block";

  keyOverlay.style.visibility = "visible";
}

/* ---------------------------------
   PHONE CLOSING
--------------------------------- */

async function closePhone() {
  if (
    isPhoneAnimating ||
    !isPhoneOpen
  ) {
    return;
  }

  closePanel();

  setPhoneMenuVisible(false);

  isPhoneAnimating = true;

  openScreenClock.style.display = "none";

  keyOverlay.style.visibility = "hidden";

  await playFrameSequence(
    CLOSE_PHONE_FRAMES
  );

  phoneFrame.src =
    CLOSE_PHONE_FRAMES[
      CLOSE_PHONE_FRAMES.length - 1
    ];

  isPhoneOpen = false;
  isPhoneClosed = true;
  isPhoneAnimating = false;

  frontScreen.style.display = "block";

  keyOverlay.style.visibility = "hidden";
}

/* ---------------------------------
   REOPEN PHONE
--------------------------------- */

async function reopenPhone() {
  if (
    isPhoneAnimating ||
    !isPhoneClosed
  ) {
    return;
  }

  isPhoneAnimating = true;

  frontScreen.style.display = "none";

  setPhoneMenuVisible(false);

  const reverseFrames = [
    ...CLOSE_PHONE_FRAMES
  ].reverse();

  await playFrameSequence(
    reverseFrames
  );

  await playFrameSequence(
    OPEN_PHONE_FRAMES
  );

  phoneFrame.src =
    OPEN_PHONE_FRAMES[
      OPEN_PHONE_FRAMES.length - 1
    ];

  isPhoneClosed = false;
  isPhoneOpen = true;
  isPhoneAnimating = false;

  openScreenClock.style.display = "block";

  keyOverlay.style.visibility = "visible";
}

/* ---------------------------------
   CONTENT PANEL
--------------------------------- */

function updatePanel() {
  const page =
    panelPages[currentPanelIndex];

  contentPanelTitle.textContent =
    page.title;

  panelPage.innerHTML =
    page.content;

  panelPageNumber.textContent =
    `${currentPanelIndex + 1} / ${panelPages.length}`;

  panelPrevious.disabled =
    currentPanelIndex === 0;

  panelNext.disabled =
    currentPanelIndex ===
    panelPages.length - 1;
}

function openPanelById(pageId) {
  const pageIndex =
    panelPages.findIndex(
      (page) => page.id === pageId
    );

  if (pageIndex === -1) return;

  currentPanelIndex = pageIndex;

  updatePanel();

  setPhoneMenuVisible(false);

  contentPanel.classList.add(
    "is-open"
  );

  contentPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "panel-open"
  );
}

function closePanel() {
  contentPanel.classList.remove(
    "is-open"
  );

  contentPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "panel-open"
  );
}

function showPreviousPanelPage() {
  if (currentPanelIndex <= 0) {
    return;
  }

  currentPanelIndex -= 1;

  updatePanel();
}

function showNextPanelPage() {
  if (
    currentPanelIndex >=
    panelPages.length - 1
  ) {
    return;
  }

  currentPanelIndex += 1;

  updatePanel();
}

/* ---------------------------------
   PHONE KEY HANDLING
--------------------------------- */

function flashPhoneKey(button) {
  button.classList.add("is-pressed");

  window.setTimeout(() => {
    button.classList.remove(
      "is-pressed"
    );
  }, 120);
}

function handlePhoneKey(keyName) {
  const panelIsOpen =
    contentPanel.classList.contains(
      "is-open"
    );

  if (panelIsOpen) {
    if (keyName === "dpad-left") {
      showPreviousPanelPage();
      return;
    }

    if (keyName === "dpad-right") {
      showNextPanelPage();
      return;
    }

    if (
      keyName === "end" ||
      keyName === "lower-right"
    ) {
      closePanel();
    }

    return;
  }

  if (keyName === "dpad-center") {
    if (!isMenuVisible) {
      setPhoneMenuVisible(true);

      return;
    }

    if (!isMenuAnimationPlaying) {
      selectCurrentMenuItem();
    }

    return;
  }

  if (
    keyName === "menu" &&
    !isMenuVisible
  ) {
    setPhoneMenuVisible(true);

    return;
  }

  if (keyName === "dpad-up") {
    moveMenuSelection("up");
    return;
  }

  if (keyName === "dpad-down") {
    moveMenuSelection("down");
    return;
  }

  if (keyName === "dpad-left") {
    moveMenuSelection("left");
    return;
  }

  if (keyName === "dpad-right") {
    moveMenuSelection("right");
    return;
  }

  if (
    keyName === "end" ||
    keyName === "lower-right"
  ) {
    setPhoneMenuVisible(false);
  }
}

/* ---------------------------------
   EVENT LISTENERS
--------------------------------- */

spriteButton.addEventListener(
  "click",
  openPhone
);

flipTrigger.addEventListener(
  "click",
  () => {
    if (isPhoneOpen) {
      closePhone();
      return;
    }

    if (isPhoneClosed) {
      reopenPhone();
    }
  }
);

phoneKeys.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      if (
        !isPhoneOpen ||
        isPhoneAnimating
      ) {
        return;
      }

      flashPhoneKey(button);

      handlePhoneKey(
        button.dataset.key
      );
    }
  );
});

menuItems.forEach((item, index) => {
  item.addEventListener(
    "mouseenter",
    () => {
      if (isMenuAnimationPlaying) {
        return;
      }

      selectedMenuIndex = index;

      updateMenuSelection();
    }
  );

  item.addEventListener(
    "click",
    () => {
      if (isMenuAnimationPlaying) {
        return;
      }

      selectedMenuIndex = index;

      updateMenuSelection();

      selectCurrentMenuItem();
    }
  );
});

panelPrevious.addEventListener(
  "click",
  showPreviousPanelPage
);

panelNext.addEventListener(
  "click",
  showNextPanelPage
);

panelClose.addEventListener(
  "click",
  closePanel
);

/* Keyboard support */

document.addEventListener(
  "keydown",
  (event) => {
    if (!isPhoneOpen) return;

    const panelIsOpen =
      contentPanel.classList.contains(
        "is-open"
      );

    if (
      event.key === "Escape"
    ) {
      if (panelIsOpen) {
        closePanel();
      } else {
        setPhoneMenuVisible(false);
      }

      return;
    }

    if (
      event.key === "ArrowUp"
    ) {
      event.preventDefault();

      handlePhoneKey("dpad-up");
    }

    if (
      event.key === "ArrowDown"
    ) {
      event.preventDefault();

      handlePhoneKey("dpad-down");
    }

    if (
      event.key === "ArrowLeft"
    ) {
      event.preventDefault();

      handlePhoneKey("dpad-left");
    }

    if (
      event.key === "ArrowRight"
    ) {
      event.preventDefault();

      handlePhoneKey("dpad-right");
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      handlePhoneKey("dpad-center");
    }
  }
);

/* ---------------------------------
   INITIAL SETUP
--------------------------------- */

updateMenuSelection();
updatePanel();
