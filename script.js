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

const phoneMenu =
  document.getElementById("phone-menu");

const menuItems =
  Array.from(
    document.querySelectorAll(
      ".phone-menu-item"
    )
  );

const contentPanel =
  document.getElementById("content-panel");

const panelTitle =
  document.getElementById("panel-title");

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
   PHONE IMAGE FRAMES
--------------------------------- */

const spriteFrames = [];

for (let i = 1; i <= 16; i += 1) {
  spriteFrames.push(
    `DefineSprite_22/${i}.png`
  );
}

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
   CONTENT
--------------------------------- */

const sectionContent = {
  about: {
    title: "About Me",

    pages: [
      `
        <div class="about-page">
          <div class="about-image-wrapper">
            <img
              class="about-image"
              src="images/diva.jpg"
              alt="Portrait of Leslie Ahuatzi"
            />
          </div>

          <div class="about-copy">
            <h2>
              Take a Peek Into My Journey
            </h2>

            <p>
              I am a graduate of Scripps College
              with a B.A. in Digital Art. I had
              the privilege of experimenting with
              various mediums in college,
              including graphic art, photography,
              printmaking, and ceramics.
            </p>

            <p>
              Over time, I realized that my
              strongest work always had a strong
              message. This realization led me
              into a digital marketing role.
              Here, I grasped what it meant to
              create compelling content that
              generates a big impact within a
              target audience.
            </p>

            <p>
              I love creating art, but I also
              love transmitting stories. Many
              of my roles or projects are part
              of fast-paced environments. Thus,
              I have had to adapt to environments
              where deadlines are tight and
              attention to detail is a top
              priority.
            </p>

            <p>
              Furthermore, I am always open to
              feedback and mentorship from
              others. My main goal in all of my
              roles is to lead with empathy and
              clear communication.
            </p>
          </div>
        </div>
      `
    ]
  },

  site: {
    title: "Sites",

    pages: [
      `
        <h2>
          Visit My Portfolio Page:
        </h2>

        <p>
          Explore my photography, visual design,
          interactive projects and other creative
          work.
        </p>

        <p>
          <a
            href="https://leslieahuatzi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            leslieahuatzi.com ↗
          </a>
        </p>
      `,

      `
        <h2>
          Visit My LinkedIn:
        </h2>

        <p>
          Connect with me and learn more about
          my professional experience.
        </p>

        <p>
          <a
            href="https://www.linkedin.com/in/leslie-ahuatzi"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.linkedin.com/in/leslie-ahuatzi ↗
          </a>
        </p>
      `
    ]
  },

  history: {
    title: "History",

    pages: [
      `
        <p class="panel-kicker">
          THE ENTIRE HISTORY OF THE UNIVERSE
        </p>

        <p class="panel-quote">
          Nothing became everything.
          Everything became stars, planets,
          dinosaurs, people, Wi-Fi and this
          application. Now we make things
          before the deadline.
        </p>
      `
    ]
  },

  resume: {
    title: "Resume",

    pages: [
      `
        <p class="panel-kicker">
          PAGE 01 · PROFILE
        </p>

        <h2>
          Leslie Ahuatzi
        </h2>

        <p class="resume-meta">
          Digital Artist · Photographer ·
          Designer · Marketer
        </p>

        <p>
          Multidisciplinary creative with
          experience translating ideas into
          photography, graphics, video,
          digital content and audience-focused
          marketing.
        </p>

        <p>
          <strong>Email:</strong>

          <a href="mailto:leslieahuatzi5@gmail.com">
            leslieahuatzi5@gmail.com
          </a>
        </p>

        <p>
          <strong>Portfolio:</strong>

          <a
            href="https://leslieahuatzi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            leslieahuatzi.com
          </a>
        </p>
      `,

      `
        <p class="panel-kicker">
          PAGE 02 · EDUCATION
        </p>

        <h2>
          Scripps College
        </h2>

        <p class="resume-meta">
          Bachelor of Arts, Digital Art
        </p>

        <ul>
          <li>Cumulative GPA: 3.8</li>
          <li>Dean’s List</li>
          <li>Scripps College Grant</li>

          <li>
            Advanced coursework in digital art,
            photography and video
          </li>
        </ul>
      `,

      `
        <p class="panel-kicker">
          PAGE 03 · PHOTOGRAPHY
        </p>

        <h2>
          The Student Life
        </h2>

        <p class="resume-meta">
          Staff Photographer ·
          January 2024–May 2025
        </p>

        <ul>
          <li>
            Produced more than 20 edited
            photographs weekly
          </li>

          <li>
            Covered sports, clubs and campus
            events under deadline
          </li>

          <li>
            Managed equipment and workflows
            independently
          </li>
        </ul>
      `,

      `
        <p class="panel-kicker">
          PAGE 04 · GRAPHIC DESIGN
        </p>

        <h2>
          Alicia’s Studio
        </h2>

        <p class="resume-meta">
          Graphic Designer ·
          December 2024–March 2025
        </p>

        <ul>
          <li>
            Created graphics, posters and
            digital artist materials
          </li>

          <li>
            Incorporated editorial feedback
            and delivered polished assets
          </li>
        </ul>
      `,

      `
        <p class="panel-kicker">
          PAGE 05 · MARKETING
        </p>

        <h2>
          HowRU?
        </h2>

        <p class="resume-meta">
          Marketing Intern ·
          September 2024–January 2025
        </p>

        <ul>
          <li>
            Supported outreach and content
            scheduling
          </li>

          <li>
            Researched trends and fan behavior
          </li>

          <li>
            Pitched social and event ideas
          </li>
        </ul>
      `,

      `
        <p class="panel-kicker">
          PAGE 06 · MEDIA SERVICES
        </p>

        <h2>
          Scripps College
        </h2>

        <p class="resume-meta">
          Media Services Intern ·
          August 2023–December 2023
        </p>

        <ul>
          <li>
            Supported students and faculty
            with technical issues
          </li>

          <li>
            Troubleshot AV equipment,
            projectors and computers
          </li>
        </ul>
      `,

      `
        <p class="panel-kicker">
          PAGE 07 · FREELANCE
        </p>

        <h2>
          Freelance Photographer
        </h2>

        <p class="resume-meta">
          August 2021–Present
        </p>

        <ul>
          <li>
            Photographed concerts and artists
          </li>

          <li>
            Contributed published work to
            Local Wolves Magazine
          </li>

          <li>
            Built a fashion, portrait and
            concert portfolio
          </li>
        </ul>
      `,

      `
        <p class="panel-kicker">
          PAGE 08 · TOOLKIT
        </p>

        <h2>
          Skills and Interests
        </h2>

        <h3>
          Creative tools
        </h3>

        <p>
          Photoshop, Lightroom, Illustrator,
          Premiere Pro, Microsoft Office
          and Google Suite
        </p>

        <h3>
          Languages
        </h3>

        <p>
          Fluent in English and Spanish
        </p>
      `
    ]
  }
};

/* ---------------------------------
   PHONE KEYS
--------------------------------- */

const phoneKeys = [
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

  {
    name: "dpad-center",
    label: "Open menu or select highlighted item",
    x: 98,
    y: 357,
    width: 28,
    height: 28
  },

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
    label: "Back",
    x: 139,
    y: 381,
    width: 36,
    height: 21
  },

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
    label: "Select highlighted menu item",
    x: 94,
    y: 408,
    width: 38,
    height: 23
  },

  {
    name: "end",
    label: "Back",
    x: 139,
    y: 408,
    width: 38,
    height: 23
  },

  {
    name: "1",
    label: "About shortcut",
    x: 48,
    y: 439,
    width: 39,
    height: 21
  },

  {
    name: "2",
    label: "Sites shortcut",
    x: 94,
    y: 439,
    width: 39,
    height: 21
  },

  {
    name: "3",
    label: "History shortcut",
    x: 139,
    y: 439,
    width: 39,
    height: 21
  },

  {
    name: "4",
    label: "Resume shortcut",
    x: 48,
    y: 467,
    width: 39,
    height: 21
  }
];

/* ---------------------------------
   STATE
--------------------------------- */

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;
let isMenuVisible = false;

let spriteIndex = 0;
let spriteInterval = null;
let clockInterval = null;

let selectedMenuIndex = 0;
let activeSectionName = null;
let activePageIndex = 0;

/* ---------------------------------
   PRELOAD
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
  "images/bunny.png",
  "images/diva.jpg"
]);

/* ---------------------------------
   STARTING SPRITE
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
   CLOCK
--------------------------------- */

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function formatOpenPhoneDate(date) {
  const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  return (
    `${date.getFullYear()}/` +
    `${padNumber(date.getMonth() + 1)}/` +
    `${padNumber(date.getDate())}` +
    `(${weekdays[date.getDay()]})`
  );
}

function formatOpenPhoneTime(date) {
  return (
    `${padNumber(date.getHours())}:` +
    `${padNumber(date.getMinutes())}:` +
    `${padNumber(date.getSeconds())}`
  );
}

function formatFrontPhoneDate(date) {
  return (
    `${date.getFullYear()}/` +
    `${padNumber(date.getMonth() + 1)}/` +
    `${padNumber(date.getDate())}`
  );
}

function formatFrontPhoneTime(date) {
  return (
    `${padNumber(date.getHours())}:` +
    `${padNumber(date.getMinutes())}`
  );
}

function updatePhoneClock() {
  const now = new Date();

  frontScreenDate.textContent =
    formatFrontPhoneDate(now);

  frontScreenTime.textContent =
    formatFrontPhoneTime(now);

  openScreenDate.textContent =
    formatOpenPhoneDate(now);

  openScreenTime.textContent =
    formatOpenPhoneTime(now);
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
   VISIBILITY
--------------------------------- */

function setFrontScreenVisible(visible) {
  frontScreen.style.display =
    visible
      ? "block"
      : "none";

  frontScreen.setAttribute(
    "aria-hidden",
    visible
      ? "false"
      : "true"
  );
}

function setOpenClockVisible(visible) {
  openScreenClock.style.display =
    visible
      ? "block"
      : "none";

  openScreenClock.setAttribute(
    "aria-hidden",
    visible
      ? "false"
      : "true"
  );
}

function setPhoneMenuVisible(visible) {
  isMenuVisible = visible;

  phoneMenu.classList.toggle(
    "is-visible",
    visible
  );

  phoneMenu.setAttribute(
    "aria-hidden",
    visible
      ? "false"
      : "true"
  );
}

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
    enabled
      ? "false"
      : "true"
  );
}

/* ---------------------------------
   MENU
--------------------------------- */

function updateMenuSelection() {
  menuItems.forEach(
    (item, index) => {
      const selected =
        index === selectedMenuIndex;

      item.classList.toggle(
        "is-selected",
        selected
      );

      item.setAttribute(
        "aria-selected",
        selected
          ? "true"
          : "false"
      );
    }
  );
}

function moveMenuSelection(direction) {
  if (!isMenuVisible) {
    return;
  }

  const row =
    Math.floor(
      selectedMenuIndex / 2
    );

  const column =
    selectedMenuIndex % 2;

  let nextRow = row;
  let nextColumn = column;

  if (direction === "up") {
    nextRow =
      Math.max(
        0,
        row - 1
      );
  }

  if (direction === "down") {
    nextRow =
      Math.min(
        1,
        row + 1
      );
  }

  if (direction === "left") {
    nextColumn =
      Math.max(
        0,
        column - 1
      );
  }

  if (direction === "right") {
    nextColumn =
      Math.min(
        1,
        column + 1
      );
  }

  selectedMenuIndex =
    nextRow * 2 + nextColumn;

  updateMenuSelection();
}

function selectCurrentMenuItem() {
  if (!isMenuVisible) {
    return;
  }

  const selectedItem =
    menuItems[selectedMenuIndex];

  if (!selectedItem) {
    return;
  }

  openContentPanel(
    selectedItem.dataset.section
  );
}

/* ---------------------------------
   CONTENT PANEL
--------------------------------- */

function openContentPanel(sectionName) {
  const section =
    sectionContent[sectionName];

  if (!section) {
    return;
  }

  setPhoneMenuVisible(false);

  activeSectionName =
    sectionName;

  activePageIndex =
    0;

  renderPanelPage();

  document.body.classList.add(
    "panel-open"
  );

  contentPanel.classList.add(
    "is-open"
  );

  contentPanel.setAttribute(
    "aria-hidden",
    "false"
  );
}

function closeContentPanel() {
  document.body.classList.remove(
    "panel-open"
  );

  contentPanel.classList.remove(
    "is-open"
  );

  contentPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  activeSectionName =
    null;

  activePageIndex =
    0;
}

function renderPanelPage() {
  const section =
    sectionContent[activeSectionName];

  if (!section) {
    return;
  }

  const totalPages =
    section.pages.length;

  panelTitle.textContent =
    section.title;

  panelPage.innerHTML =
    section.pages[activePageIndex];

  panelPageNumber.textContent =
    `${padNumber(activePageIndex + 1)} / ` +
    `${padNumber(totalPages)}`;

  panelPrevious.disabled =
    activePageIndex === 0;

  panelNext.disabled =
    activePageIndex ===
    totalPages - 1;

  panelPage.scrollTop =
    0;

  panelPage.style.animation =
    "none";

  requestAnimationFrame(() => {
    panelPage.style.animation = "";
  });
}

function showPreviousPanelPage() {
  if (
    !activeSectionName ||
    activePageIndex <= 0
  ) {
    return;
  }

  activePageIndex -= 1;

  renderPanelPage();
}

function showNextPanelPage() {
  if (!activeSectionName) {
    return;
  }

  const section =
    sectionContent[activeSectionName];

  if (
    !section ||
    activePageIndex >=
    section.pages.length - 1
  ) {
    return;
  }

  activePageIndex += 1;

  renderPanelPage();
}

/* ---------------------------------
   PHONE FRAME ANIMATION
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

  isAnimating =
    true;

  flipTrigger.disabled =
    true;

  setKeysEnabled(false);

  let index = 0;

  const interval =
    window.setInterval(() => {
      if (index < frames.length) {
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

      isAnimating =
        false;

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
   FLIP AREA
--------------------------------- */

function setFlipTriggerArea() {
  if (isOpen) {
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
   CREATE PHONE KEYS
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
   PHONE KEY ACTIONS
--------------------------------- */

function handlePhoneKey(keyName) {
  const panelIsOpen =
    contentPanel.classList.contains(
      "is-open"
    );

  if (panelIsOpen) {
    switch (keyName) {
      case "dpad-left":
        showPreviousPanelPage();
        return;

      case "dpad-right":
        showNextPanelPage();
        return;

      case "end":
      case "lower-right":
        closeContentPanel();
        return;

      default:
        return;
    }
  }

  switch (keyName) {
    case "dpad-center":
      if (!isMenuVisible) {
        setPhoneMenuVisible(true);
        updateMenuSelection();
      } else {
        selectCurrentMenuItem();
      }

      break;

    case "dpad-up":
      if (isMenuVisible) {
        moveMenuSelection("up");
      }

      break;

    case "dpad-down":
      if (isMenuVisible) {
        moveMenuSelection("down");
      }

      break;

    case "dpad-left":
      if (isMenuVisible) {
        moveMenuSelection("left");
      }

      break;

    case "dpad-right":
      if (isMenuVisible) {
        moveMenuSelection("right");
      }

      break;

    case "menu":
      if (isMenuVisible) {
        selectCurrentMenuItem();
      }

      break;

    case "end":
    case "lower-right":
      setPhoneMenuVisible(false);
      break;

    case "1":
      if (isMenuVisible) {
        openContentPanel("about");
      }

      break;

    case "2":
      if (isMenuVisible) {
        openContentPanel("site");
      }

      break;

    case "3":
      if (isMenuVisible) {
        openContentPanel("history");
      }

      break;

    case "4":
      if (isMenuVisible) {
        openContentPanel("resume");
      }

      break;

    default:
      console.log(
        `Phone key pressed: ${keyName}`
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

  setPhoneMenuVisible(false);

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

      setPhoneMenuVisible(false);

      updateMenuSelection();
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

  closeContentPanel();

  setKeysEnabled(false);

  setFrontScreenVisible(false);

  setOpenClockVisible(false);

  setPhoneMenuVisible(false);

  isOpen =
    false;

  playAnimation(
    closeFrames,
    "images/50.png",
    () => {
      setFlipTriggerArea();

      setFrontScreenVisible(true);

      setOpenClockVisible(false);

      setPhoneMenuVisible(false);
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

  setPhoneMenuVisible(false);

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

      setPhoneMenuVisible(false);

      updateMenuSelection();
    }
  );
}

/* ---------------------------------
   MENU AND PANEL EVENTS
--------------------------------- */

function initializeMenuEvents() {
  menuItems.forEach(
    (item, index) => {
      item.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          if (!isMenuVisible) {
            return;
          }

          selectedMenuIndex =
            index;

          updateMenuSelection();

          openContentPanel(
            item.dataset.section
          );
        }
      );
    }
  );

  panelClose.addEventListener(
    "click",
    closeContentPanel
  );

  panelPrevious.addEventListener(
    "click",
    showPreviousPanelPage
  );

  panelNext.addEventListener(
    "click",
    showNextPanelPage
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        !isOpen ||
        isAnimating
      ) {
        return;
      }

      const panelIsOpen =
        contentPanel.classList.contains(
          "is-open"
        );

      if (panelIsOpen) {
        if (
          event.key ===
          "ArrowLeft"
        ) {
          event.preventDefault();

          showPreviousPanelPage();
        }

        if (
          event.key ===
          "ArrowRight"
        ) {
          event.preventDefault();

          showNextPanelPage();
        }

        if (
          event.key ===
          "Escape"
        ) {
          closeContentPanel();
        }

        return;
      }

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();

        if (!isMenuVisible) {
          setPhoneMenuVisible(true);

          updateMenuSelection();
        } else {
          selectCurrentMenuItem();
        }

        return;
      }

      if (
        event.key ===
        "Escape"
      ) {
        setPhoneMenuVisible(false);
        return;
      }

      if (!isMenuVisible) {
        return;
      }

      if (
        event.key ===
        "ArrowUp"
      ) {
        event.preventDefault();

        moveMenuSelection("up");
      }

      if (
        event.key ===
        "ArrowDown"
      ) {
        event.preventDefault();

        moveMenuSelection("down");
      }

      if (
        event.key ===
        "ArrowLeft"
      ) {
        event.preventDefault();

        moveMenuSelection("left");
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        event.preventDefault();

        moveMenuSelection("right");
      }
    }
  );
}

/* ---------------------------------
   INITIALIZE
--------------------------------- */

function initializePhone() {
  renderKeys();

  initializeMenuEvents();

  setKeysEnabled(false);

  setFrontScreenVisible(false);

  setOpenClockVisible(false);

  setPhoneMenuVisible(false);

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
