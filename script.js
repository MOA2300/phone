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
    title: "ABOUT",

    pages: [
      `
        <p class="panel-kicker">
          PAGE 01 · ORIGIN STORY
        </p>

        <h2>
          Art was the beginning.
          People became the purpose.
        </h2>

        <p>
          I began as an artist drawn to
          photography, printmaking, video
          and visual storytelling.
        </p>

        <p>
          Over time, I realized that the
          strongest creative work does more
          than look polished. It helps people
          feel seen, understood and curious.
        </p>

        <p>
          That realization led me from studio
          art into design, marketing and
          interactive digital experiences,
          without leaving my artistic instincts
          behind.
        </p>
      `,

      `
        <p class="panel-kicker">
          PAGE 02 · CREATIVE EVOLUTION
        </p>

        <h2>
          I learned to move between worlds.
        </h2>

        <p>
          As a staff photographer, I learned
          to notice the moment before it
          disappeared.
        </p>

        <p>
          As a graphic designer, I learned
          to turn ideas into clear visual
          systems.
        </p>

        <p>
          As a marketing intern, I learned
          how culture, audience behavior and
          timing shape the way a story travels.
        </p>

        <p>
          Each role strengthened a different
          creative muscle: observation,
          collaboration, adaptability and
          follow-through.
        </p>
      `,

      `
        <p class="panel-kicker">
          PAGE 03 · WHY W+K
        </p>

        <h2>
          I want to make work that earns
          attention.
        </h2>

        <p>
          Wieden+Kennedy’s program interests
          me because it treats creativity as
          more than decoration.
        </p>

        <p>
          The work can be strange, human,
          culturally aware and strategically
          sharp—all at once.
        </p>

        <p>
          I would bring a multidisciplinary
          perspective, a willingness to
          experiment and the habit of asking:
          <strong>
            What will make someone stop,
            feel and remember?
          </strong>
        </p>
      `,

      `
        <p class="panel-kicker">
          PAGE 04 · NEXT CHAPTER
        </p>

        <h2>
          Still learning. Already building.
        </h2>

        <p>
          My next step is to grow inside a
          creative environment where art
          direction, storytelling, strategy,
          design and culture collide.
        </p>

        <p class="panel-quote">
          I do not want to make work that
          simply fills space. I want to make
          work that changes the temperature
          of it.
        </p>
      `
    ]
  },

  site: {
    title: "SITE",

    pages: [
      `
        <p class="panel-kicker">
          PAGE 01 · PORTFOLIO
        </p>

        <h2>
          Enter the rest of my creative world.
        </h2>

        <p>
          My portfolio includes photography,
          visual design, interactive projects
          and work shaped by identity, music,
          fashion and digital culture.
        </p>

        <p>
          <a
            href="https://leslieahuatzi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open leslieahuatzi.com ↗
          </a>
        </p>

        <p>
          Best viewed with curiosity and at
          least one browser tab you are willing
          to sacrifice.
        </p>
      `,

      `
        <p class="panel-kicker">
          PAGE 02 · WHAT YOU WILL FIND
        </p>

        <h2>
          A portfolio built across mediums.
        </h2>

        <ul>
          <li>
            Editorial, portrait and concert
            photography
          </li>

          <li>
            Graphic and campaign design
          </li>

          <li>
            Video and digital storytelling
          </li>

          <li>
            Interactive web experiments
          </li>

          <li>
            Work exploring culture, identity
            and nostalgia
          </li>
        </ul>
      `
    ]
  },

  history: {
    title: "HISTORY",

    pages: [
      `
        <p class="panel-kicker">
          EXPLAIN THE ENTIRE HISTORY OF THE
          UNIVERSE AS BRIEFLY AS POSSIBLE
        </p>

        <p class="panel-quote">
          Nothing exploded into everything.
          Everything cooled, collided and became
          stars, planets, dinosaurs, people,
          Wi-Fi and this application. We are
          temporary stardust making things—and
          trying to meet the deadline.
        </p>
      `
    ]
  },

  resume: {
    title: "RESUME",

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
          <li>
            Cumulative GPA: 3.8
          </li>

          <li>
            Dean’s List and Scripps College
            Grant
          </li>

          <li>
            Advanced coursework in digital art,
            photography, video art,
            black-and-white photography,
            and art and ecology
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
          January 2024 – May 2025
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
            Managed equipment and photography
            workflows independently
          </li>

          <li>
            Edited and delivered work using
            Adobe Lightroom Classic
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
          December 2024 – March 2025
        </p>

        <ul>
          <li>
            Created graphics, posters and
            digital artist materials
          </li>

          <li>
            Worked on projects involving
            Psychic Fever, Beno, Andre Martin
            and Enrico
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
          September 2024 – January 2025
        </p>

        <ul>
          <li>
            Supported outreach, content
            schedules and visual assets
          </li>

          <li>
            Researched trends and fan behavior
          </li>

          <li>
            Pitched social and event ideas
            for music artists
          </li>

          <li>
            Wrote organized weekly project
            recaps
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
          August 2023 – December 2023
        </p>

        <ul>
          <li>
            Assisted students and faculty
            with urgent technical needs
          </li>

          <li>
            Supported camera and AV-equipment
            checkouts
          </li>

          <li>
            Troubleshot projectors, computers
            and audio-visual hardware
          </li>

          <li>
            Maintained accurate equipment
            records
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
          August 2021 – Present
        </p>

        <ul>
          <li>
            Photographed concerts for
            KLandMexico and Blender Magazine
          </li>

          <li>
            Contributed published work to
            Local Wolves Magazine
          </li>

          <li>
            Built a fashion, portrait and
            concert portfolio
          </li>

          <li>
            Photographed Seo In Guk,
            Psychic Fever, Milena and Enjambre
          </li>
        </ul>
      `,

      `
        <p class="panel-kicker">
          PAGE 08 · TOOLKIT
        </p>

        <h2>
          Skills and interests
        </h2>

        <h3>
          Creative tools
        </h3>

        <p>
          Adobe Photoshop, Lightroom,
          Illustrator, Premiere Pro,
          Microsoft Office and Google Suite
        </p>

        <h3>
          Languages
        </h3>

        <p>
          Fluent in English and Spanish
        </p>

        <h3>
          Interests
        </h3>

        <p>
          Photography, soccer, design,
          printmaking, films and digital
          marketing
        </p>
      `
    ]
  }
};

/* ---------------------------------
   PHONE KEY COORDINATES
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
    label: "Select",
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
    label: "Lower right key",
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
    label: "Menu",
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
   STATE
--------------------------------- */

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

let spriteIndex = 0;
let spriteInterval = null;
let clockInterval = null;

let selectedMenuIndex = 0;
let activeSectionName = null;
let activePageIndex = 0;

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

  window.clearInterval(spriteInterval);
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
    window.clearInterval(clockInterval);
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
    visible ? "block" : "none";

  frontScreen.setAttribute(
    "aria-hidden",
    visible ? "false" : "true"
  );
}

function setOpenClockVisible(visible) {
  openScreenClock.style.display =
    visible ? "block" : "none";

  openScreenClock.setAttribute(
    "aria-hidden",
    visible ? "false" : "true"
  );
}

function setPhoneMenuVisible(visible) {
  phoneMenu.style.display =
    visible ? "block" : "none";

  phoneMenu.setAttribute(
    "aria-hidden",
    visible ? "false" : "true"
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
    enabled ? "visible" : "hidden";

  keyOverlay.style.pointerEvents =
    enabled ? "auto" : "none";

  keyOverlay.setAttribute(
    "aria-hidden",
    enabled ? "false" : "true"
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
        selected ? "true" : "false"
      );
    }
  );
}

function moveMenuSelection(direction) {
  const row =
    Math.floor(selectedMenuIndex / 2);

  const column =
    selectedMenuIndex % 2;

  let nextRow = row;
  let nextColumn = column;

  if (direction === "up") {
    nextRow = Math.max(0, row - 1);
  }

  if (direction === "down") {
    nextRow = Math.min(1, row + 1);
  }

  if (direction === "left") {
    nextColumn = Math.max(0, column - 1);
  }

  if (direction === "right") {
    nextColumn = Math.min(1, column + 1);
  }

  selectedMenuIndex =
    nextRow * 2 + nextColumn;

  updateMenuSelection();
}

function selectCurrentMenuItem() {
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

  activeSectionName = sectionName;
  activePageIndex = 0;

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

  activeSectionName = null;
  activePageIndex = 0;
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
    activePageIndex === totalPages - 1;

  panelPage.scrollTop = 0;

  panelPage.style.animation = "none";

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

  isAnimating = true;
  flipTrigger.disabled = true;

  setKeysEnabled(false);

  let index = 0;

  const interval =
    window.setInterval(() => {
      if (index < frames.length) {
        frame.src = frames[index];
        index += 1;
        return;
      }

      window.clearInterval(interval);

      frame.src = finalFrame;

      isAnimating = false;
      flipTrigger.disabled = false;

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
    flipTrigger.style.left = "62px";
    flipTrigger.style.top = "0px";
    flipTrigger.style.width = "112px";
    flipTrigger.style.height = "62px";

    flipTrigger.setAttribute(
      "aria-label",
      "Close phone"
    );
  } else {
    flipTrigger.style.left = "18px";
    flipTrigger.style.top = "80px";
    flipTrigger.style.width = "200px";
    flipTrigger.style.height = "496px";

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

    button.type = "button";
    button.className = "phone-key";

    if (key.className) {
      button.classList.add(
        key.className
      );
    }

    button.dataset.key = key.name;

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
    case "dpad-up":
      moveMenuSelection("up");
      break;

    case "dpad-down":
      moveMenuSelection("down");
      break;

    case "dpad-left":
      moveMenuSelection("left");
      break;

    case "dpad-right":
      moveMenuSelection("right");
      break;

    case "dpad-center":
    case "menu":
      selectCurrentMenuItem();
      break;

    case "1":
      openContentPanel("about");
      break;

    case "2":
      openContentPanel("site");
      break;

    case "3":
      openContentPanel("history");
      break;

    case "4":
      openContentPanel("resume");
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

  spriteButton.hidden = true;
  spriteButton.style.display = "none";
  sprite.style.display = "none";

  setKeysEnabled(false);

  /* Closed-screen bunny must be hidden
     while opening the phone. */
  setFrontScreenVisible(false);

  setOpenClockVisible(false);
  setPhoneMenuVisible(false);

  container.style.display = "block";

  const sound1 =
    new Audio(
      "sounds/27_fixed.mp3"
    );

  const sound2 =
    new Audio(
      "sounds/28_fixed.mp3"
    );

  sound1.play().catch(() => {});
  sound2.play().catch(() => {});

  playAnimation(
    openFrames,
    "images/42.png",
    () => {
      hasOpenedOnce = true;
      isOpen = true;

      setFlipTriggerArea();
      setKeysEnabled(true);

      /* Open-phone interface */
      setFrontScreenVisible(false);
      setOpenClockVisible(true);
      setPhoneMenuVisible(true);

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

  /* Hide every screen overlay during
     the closing animation. */
  setFrontScreenVisible(false);
  setOpenClockVisible(false);
  setPhoneMenuVisible(false);

  isOpen = false;

  playAnimation(
    closeFrames,
    "images/50.png",
    () => {
      setFlipTriggerArea();

      /* Bunny, date and time appear only
         after the phone is fully closed. */
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

  /* Remove bunny screen before the
     opening animation begins. */
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
      isOpen = true;

      setFlipTriggerArea();
      setKeysEnabled(true);

      /* Restore blue-screen interface */
      setFrontScreenVisible(false);
      setOpenClockVisible(true);
      setPhoneMenuVisible(true);

      updateMenuSelection();
    }
  );
}

/* ---------------------------------
   MENU EVENTS
--------------------------------- */

function initializeMenuEvents() {
  menuItems.forEach(
    (item, index) => {
      item.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          selectedMenuIndex = index;

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
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousPanelPage();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNextPanelPage();
        }

        if (event.key === "Escape") {
          closeContentPanel();
        }

        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveMenuSelection("up");
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveMenuSelection("down");
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveMenuSelection("left");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveMenuSelection("right");
      }

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        selectCurrentMenuItem();
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

  /* No screen overlays appear before
     the initial phone animation. */
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
