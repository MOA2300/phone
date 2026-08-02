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

const dialScreen =
  document.getElementById("dial-screen");

const dialNumber =
  document.getElementById("dial-number");

const mailScreen =
  document.getElementById("mail-screen");

const cameraScreen =
  document.getElementById("camera-screen");

const cameraPreview =
  document.getElementById("camera-preview");

const cameraCanvas =
  document.getElementById("camera-canvas");

const capturedPhoto =
  document.getElementById("captured-photo");

const cameraMessage =
  document.getElementById("camera-message");

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
   PHONE SOUNDS
--------------------------------- */

function playPhoneSound(fileName) {
  const sound =
    new Audio(
      `sounds/${fileName}`
    );

  sound.currentTime = 0;

  sound
    .play()
    .catch(() => {
      // Prevents errors if audio is blocked.
    });
}

const callingSound =
  new Audio(
    "sounds/phonecalling.mp3"
  );

callingSound.loop = true;

function startCallingSound() {
  callingSound.pause();
  callingSound.currentTime = 0;

  callingSound
    .play()
    .catch(() => {
      // Prevents errors if audio is blocked.
    });
}

function stopCallingSound() {
  callingSound.pause();
  callingSound.currentTime = 0;
}

const generalSoundKeys = new Set([
  "dpad-up",
  "dpad-down",
  "dpad-left",
  "dpad-right",
  "dpad-center",
  "mail",
  "*",
  "#",
  "menu",
  "lower-right",
  "back",
  "home"
]);

/* ---------------------------------
   PANEL CONTENT
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
    title: "World History",

    pages: [
      `
        <p class="panel-quote">
          First, there was a giant explosion that
          led to the creation of planets, stars,
          dinosaurs, people, the Industrial
          Revolution, wars, governments, Wi-Fi,
          planes, and now this application.
        </p>

        <p>
          Yet, there is still so much history that
          is waiting to be written. Hopefully, I
          can be a part of the history of Wieden
          and Kennedy's residency program.
        </p>

        <p>
          Together we can write the future.
        </p>
      `
    ]
  },

  resume: {
    title: "Resume",

    pages: [
      `
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
        <h2>
          The Student Life
        </h2>

        <p class="resume-meta">
          Staff Photographer ·
          January 2024–May 2025
        </p>

        <ul>
          <li>
            Produced 20+ edited photos weekly
            across sports, clubs, and campus
            events, consistently meeting
            deadlines and adapting to different
            assignment needs
          </li>

          <li>
            Managed photography gear and
            workflows independently, solved
            on-site technical issues, and
            delivered high-quality images using
            Adobe Lightroom Classic
          </li>
        </ul>
      `,

      `
        <h2>
          Alicia’s Studio
        </h2>

        <p class="resume-meta">
          Graphic Designer ·
          December 2024–March 2025
        </p>

        <ul>
          <li>
            Created digital graphics, posters,
            and digital materials for artists,
            including Psychic Fever, Beno,
            Andre Martin, and Enrico, under
            tight deadlines, balancing speed,
            accuracy, and clear communication
            with editors.
          </li>

          <li>
            Coordinated with editors via email,
            incorporating feedback efficiently,
            and delivered polished design assets
          </li>
        </ul>
      `,

      `
        <h2>
          HowRU?
        </h2>

        <p class="resume-meta">
          Marketing Intern ·
          September 2024–January 2025
        </p>

        <ul>
          <li>
            Supported with various tasks assigned
            by upper management, such as sending
            outreach emails, organizing content
            schedules, creating and editing visual
            assets, and updating social channels
            for artists and their fan communities
          </li>

          <li>
            Assisted weekly marketing meetings by
            researching trends/fan behavior,
            reporting on artists, and pitching
            creative ideas for social media
            platforms or events for artists such
            as Bayli, Tiana Major9, Frex, and
            Esther Yu
          </li>

          <li>
            Wrote weekly recap emails summarizing
            completed work for 4+ artists while
            maintaining clear documentation and
            confidentiality across internal teams
          </li>

          <li>
            Supported campaigns in fast-paced
            environments, adapting quickly to new
            tools and evolving workflows
          </li>
        </ul>
      `,

      `
        <h2>
          Scripps College
        </h2>

        <p class="resume-meta">
          Media Services Intern ·
          August 2023–December 2023
        </p>

        <ul>
          <li>
            Facilitated technical support for the
            Media Services Department and assisted
            the Scripps Community through office
            support, acting as the primary customer
            contact for urgent issues
          </li>

          <li>
            Served as a first line of support for
            students and faculty requesting AV
            equipment, camera checkouts, or campus
            tech help
          </li>

          <li>
            Set up and troubleshot hardware for
            audio-visual equipment, projectors,
            and computers; escalated complex
            issues to senior staff and ensured
            they moved toward a resolution
          </li>

          <li>
            Verified the condition and availability
            of equipment, maintained accurate
            records on Excel, and provided support
            in time-sensitive classroom environments
          </li>
        </ul>
      `,

      `
        <h2>
          Freelance Photographer
        </h2>

        <p class="resume-meta">
          August 2021–Present
        </p>

        <ul>
          <li>
            Concert photographer for KLandMexico
            and Blender Magazine, an emerging
            music magazine covering Korean artists
            and other rising international artists
          </li>

          <li>
            Contributed 5+ photographs within
            published issues of Local Wolves
            Magazine, selecting and editing images
            using Adobe Lightroom Classic and
            Capture One
          </li>

          <li>
            Built a portfolio of fashion, portrait
            photography, and concert photography
            for artists such as Seo In Guk,
            Psychic Fever, Milena, and Enjambre
          </li>
        </ul>
      `,

      `
        <h2>
          Skills and Interests
        </h2>

        <h3>
          Creative Tools
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

        <h3>
          Interests
        </h3>

        <p>
          Photography, Soccer, Design,
          Printmaking, Films, Digital Marketing
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
    name: "home",
    label: "Home",
    x: 49,
    y: 341,
    width: 36,
    height: 21
  },

  {
    name: "back",
    label: "Back",
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
    y: 362.5,
    width: 6,
    height: 12,
    className: "dpad-key"
  },

  {
    name: "dpad-right",
    label: "Right",
    x: 131,
    y: 362.5,
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
    label: "Select or take photo",
    x: 98,
    y: 357,
    width: 28,
    height: 28
  },

  {
    name: "mail",
    label: "Open mail message",
    x: 49,
    y: 381,
    width: 36,
    height: 21
  },

  {
    name: "lower-right",
    label: "Open camera",
    x: 139,
    y: 381,
    width: 36,
    height: 21
  },

  {
    name: "call",
    label: "Call entered number",
    x: 48,
    y: 408,
    width: 39,
    height: 23
  },

  {
    name: "menu",
    label: "Open menu",
    x: 94,
    y: 408,
    width: 38,
    height: 23
  },

  {
    name: "end",
    label: "End call",
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
    name: "*",
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
    name: "#",
    label: "Pound",
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

let isMenuVisible = false;
let isDialScreenVisible = false;
let isMailScreenVisible = false;
let isCameraScreenVisible = false;

let isCalling = false;
let enteredPhoneNumber = "";
let callLaunchTimer = null;

let cameraStream = null;
let hasCapturedPhoto = false;

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
   CAMERA
--------------------------------- */

function setCameraScreenVisible(visible) {
  isCameraScreenVisible = visible;

  cameraScreen.classList.toggle(
    "is-visible",
    visible
  );

  cameraScreen.setAttribute(
    "aria-hidden",
    visible
      ? "false"
      : "true"
  );

  if (visible) {
    isMenuVisible = false;
    isDialScreenVisible = false;
    isMailScreenVisible = false;

    phoneMenu.classList.remove(
      "is-visible"
    );

    phoneMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    dialScreen.classList.remove(
      "is-visible"
    );

    dialScreen.setAttribute(
      "aria-hidden",
      "true"
    );

    mailScreen.classList.remove(
      "is-visible"
    );

    mailScreen.setAttribute(
      "aria-hidden",
      "true"
    );
  }
}

function stopCameraStream() {
  if (cameraStream) {
    cameraStream
      .getTracks()
      .forEach((track) => {
        track.stop();
      });
  }

  cameraStream = null;
  cameraPreview.srcObject = null;
}

function resetCameraDisplay() {
  cameraPreview.style.display =
    "block";

  capturedPhoto.classList.remove(
    "is-visible"
  );

  capturedPhoto.removeAttribute(
    "src"
  );

  hasCapturedPhoto = false;

  cameraMessage.textContent =
    "CENTER: TAKE PHOTO";
}

function stopCamera() {
  stopCameraStream();
  setCameraScreenVisible(false);
  resetCameraDisplay();
}

async function openCamera() {
  endCurrentCall();
  stopCameraStream();
  resetCameraDisplay();

  setCameraScreenVisible(true);

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {
    cameraMessage.textContent =
      "CAMERA NOT SUPPORTED";

    return;
  }

  cameraMessage.textContent =
    "OPENING CAMERA...";

  try {
    cameraStream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user"
        },

        audio: false
      });

    cameraPreview.srcObject =
      cameraStream;

    await cameraPreview.play();

    cameraMessage.textContent =
      "CENTER: TAKE PHOTO";
  } catch (error) {
    console.error(
      "Could not open camera:",
      error
    );

    cameraMessage.textContent =
      "CAMERA PERMISSION DENIED";
  }
}

function takeCameraPhoto() {
  if (
    !isCameraScreenVisible ||
    !cameraStream ||
    cameraPreview.videoWidth === 0 ||
    cameraPreview.videoHeight === 0
  ) {
    return;
  }

  const context =
    cameraCanvas.getContext("2d");

  if (!context) {
    cameraMessage.textContent =
      "CAMERA ERROR";

    return;
  }

  cameraCanvas.width =
    cameraPreview.videoWidth;

  cameraCanvas.height =
    cameraPreview.videoHeight;

  context.save();

  context.translate(
    cameraCanvas.width,
    0
  );

  context.scale(-1, 1);

  context.drawImage(
    cameraPreview,
    0,
    0,
    cameraCanvas.width,
    cameraCanvas.height
  );

  context.restore();

  capturedPhoto.src =
    cameraCanvas.toDataURL(
      "image/png"
    );

  capturedPhoto.classList.add(
    "is-visible"
  );

  cameraPreview.style.display =
    "none";

  hasCapturedPhoto = true;

  cameraMessage.textContent =
    "CENTER: RETAKE · BACK: CLOSE";

  stopCameraStream();
}

/* ---------------------------------
   VISIBILITY HELPERS
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

  if (visible) {
    stopCamera();

    setDialScreenVisible(false);
    setMailScreenVisible(false);
  }
}

function setDialScreenVisible(visible) {
  isDialScreenVisible = visible;

  dialScreen.classList.toggle(
    "is-visible",
    visible
  );

  dialScreen.setAttribute(
    "aria-hidden",
    visible
      ? "false"
      : "true"
  );

  if (visible) {
    stopCamera();

    isMenuVisible = false;

    phoneMenu.classList.remove(
      "is-visible"
    );

    phoneMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    setMailScreenVisible(false);
  }
}

function setMailScreenVisible(visible) {
  isMailScreenVisible = visible;

  mailScreen.classList.toggle(
    "is-visible",
    visible
  );

  mailScreen.setAttribute(
    "aria-hidden",
    visible
      ? "false"
      : "true"
  );

  if (visible) {
    endCurrentCall();
    stopCamera();

    isMenuVisible = false;
    isDialScreenVisible = false;

    phoneMenu.classList.remove(
      "is-visible"
    );

    phoneMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    dialScreen.classList.remove(
      "is-visible"
    );

    dialScreen.setAttribute(
      "aria-hidden",
      "true"
    );
  }
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
   CALLING
--------------------------------- */

function cancelCallLaunch() {
  if (callLaunchTimer === null) {
    return;
  }

  window.clearTimeout(callLaunchTimer);
  callLaunchTimer = null;
}

function endCurrentCall() {
  cancelCallLaunch();
  stopCallingSound();

  isCalling = false;
}

function launchDeviceCall() {
  if (
    !isDialScreenVisible ||
    enteredPhoneNumber.length === 0 ||
    isCalling
  ) {
    return;
  }

  const callableNumber =
    enteredPhoneNumber.replace(
      /[^0-9+*#]/g,
      ""
    );

  if (callableNumber.length === 0) {
    return;
  }

  isCalling = true;

  startCallingSound();

  callLaunchTimer =
    window.setTimeout(() => {
      stopCallingSound();

      callLaunchTimer = null;
      isCalling = false;

      window.location.href =
        `tel:${encodeURIComponent(
          callableNumber
        )}`;
    }, 900);
}

/* ---------------------------------
   DIALING SCREEN
--------------------------------- */

function renderDialNumber() {
  dialNumber.textContent =
    enteredPhoneNumber;
}

function typeDialCharacter(character) {
  endCurrentCall();

  if (enteredPhoneNumber.length >= 18) {
    return;
  }

  enteredPhoneNumber += character;

  setDialScreenVisible(true);
  renderDialNumber();
}

function deleteDialCharacter() {
  endCurrentCall();

  if (enteredPhoneNumber.length === 0) {
    setDialScreenVisible(false);
    return;
  }

  enteredPhoneNumber =
    enteredPhoneNumber.slice(0, -1);

  renderDialNumber();

  if (enteredPhoneNumber.length === 0) {
    setDialScreenVisible(false);
  }
}

function clearDialNumber() {
  enteredPhoneNumber = "";
  renderDialNumber();
}

/* ---------------------------------
   PHONE MENU
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

  endCurrentCall();
  stopCamera();

  setPhoneMenuVisible(false);
  setDialScreenVisible(false);
  setMailScreenVisible(false);

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
    activePageIndex ===
    totalPages - 1;

  panelPage.scrollTop = 0;

  panelPage.style.animation =
    "none";

  window.requestAnimationFrame(() => {
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
   PHONE ANIMATION
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

    button.type = "button";
    button.className = "phone-key";

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

  if (generalSoundKeys.has(keyName)) {
    playPhoneSound(
      "27_fixed.mp3"
    );
  }

  const dialCharacters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "#"
  ];

  /* Camera button */
  if (keyName === "lower-right") {
    if (panelIsOpen) {
      closeContentPanel();
    }

    openCamera();

    return;
  }

  /* Mail button */
  if (keyName === "mail") {
    endCurrentCall();
    stopCamera();

    if (panelIsOpen) {
      closeContentPanel();
    }

    setPhoneMenuVisible(false);
    setDialScreenVisible(false);
    setMailScreenVisible(true);

    return;
  }

  /* Green call button */
  if (keyName === "call") {
    launchDeviceCall();

    return;
  }

  /* Number, star and pound keys */
  if (dialCharacters.includes(keyName)) {
    stopCamera();

    if (panelIsOpen) {
      closeContentPanel();
    }

    setMailScreenVisible(false);

    if (/^[0-9]$/.test(keyName)) {
      playPhoneSound(
        `${keyName}.mp3`
      );
    }

    typeDialCharacter(keyName);

    return;
  }

  /* Home button */
  if (keyName === "home") {
    endCurrentCall();
    stopCamera();

    if (panelIsOpen) {
      closeContentPanel();
    }

    clearDialNumber();

    setDialScreenVisible(false);
    setMailScreenVisible(false);
    setPhoneMenuVisible(true);

    updateMenuSelection();

    return;
  }

  /* Back button */
  if (keyName === "back") {
    endCurrentCall();

    if (isCameraScreenVisible) {
      stopCamera();

      return;
    }

    if (isMailScreenVisible) {
      setMailScreenVisible(false);

      return;
    }

    if (isDialScreenVisible) {
      deleteDialCharacter();

      return;
    }

    if (panelIsOpen) {
      closeContentPanel();

      return;
    }

    if (isMenuVisible) {
      setPhoneMenuVisible(false);
    }

    return;
  }

  /* Red hang-up button */
  if (keyName === "end") {
    endCurrentCall();
    stopCamera();

    if (isMailScreenVisible) {
      setMailScreenVisible(false);

      return;
    }

    if (isDialScreenVisible) {
      clearDialNumber();
      setDialScreenVisible(false);

      return;
    }

    if (panelIsOpen) {
      closeContentPanel();

      return;
    }

    setPhoneMenuVisible(false);

    return;
  }

  /* A/menu button */
  if (keyName === "menu") {
    endCurrentCall();
    stopCamera();

    if (panelIsOpen) {
      closeContentPanel();
    }

    setDialScreenVisible(false);
    setMailScreenVisible(false);
    setPhoneMenuVisible(true);

    updateMenuSelection();

    return;
  }

  /* Middle directional button */
  if (keyName === "dpad-center") {
    if (isCameraScreenVisible) {
      if (hasCapturedPhoto) {
        openCamera();
      } else {
        takeCameraPhoto();
      }

      return;
    }

    if (
      isDialScreenVisible ||
      isMailScreenVisible
    ) {
      return;
    }

    if (!isMenuVisible) {
      setPhoneMenuVisible(true);
      updateMenuSelection();
    } else {
      selectCurrentMenuItem();
    }

    return;
  }

  if (panelIsOpen) {
    switch (keyName) {
      case "dpad-left":
        showPreviousPanelPage();
        return;

      case "dpad-right":
        showNextPanelPage();
        return;

      default:
        return;
    }
  }

  if (
    isDialScreenVisible ||
    isMailScreenVisible ||
    isCameraScreenVisible
  ) {
    return;
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

    default:
      console.log(
        `Phone key pressed: ${keyName}`
      );
  }
}

/* ---------------------------------
   FIRST OPEN
--------------------------------- */

function openPhoneForFirstTime() {
  if (
    isAnimating ||
    hasOpenedOnce
  ) {
    return;
  }

  endCurrentCall();
  stopCamera();
  stopSpriteLoop();

  spriteButton.hidden = true;
  spriteButton.style.display = "none";
  sprite.style.display = "none";

  setKeysEnabled(false);
  setFrontScreenVisible(false);
  setOpenClockVisible(false);
  setPhoneMenuVisible(false);
  setDialScreenVisible(false);
  setMailScreenVisible(false);
  setCameraScreenVisible(false);

  container.style.display = "block";

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
      hasOpenedOnce = true;
      isOpen = true;

      setFlipTriggerArea();
      setKeysEnabled(true);
      setFrontScreenVisible(false);
      setOpenClockVisible(true);
      setPhoneMenuVisible(false);
      setDialScreenVisible(false);
      setMailScreenVisible(false);
      setCameraScreenVisible(false);

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

  endCurrentCall();
  stopCamera();

  playPhoneSound(
    "closingphone.mp3"
  );

  closeContentPanel();
  clearDialNumber();

  setKeysEnabled(false);
  setFrontScreenVisible(false);
  setOpenClockVisible(false);
  setPhoneMenuVisible(false);
  setDialScreenVisible(false);
  setMailScreenVisible(false);
  setCameraScreenVisible(false);

  isOpen = false;

  playAnimation(
    closeFrames,
    "images/50.png",
    () => {
      setFlipTriggerArea();
      setFrontScreenVisible(true);
      setOpenClockVisible(false);
      setPhoneMenuVisible(false);
      setDialScreenVisible(false);
      setMailScreenVisible(false);
      setCameraScreenVisible(false);
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

  endCurrentCall();
  stopCamera();

  setFrontScreenVisible(false);
  setOpenClockVisible(false);
  setPhoneMenuVisible(false);
  setDialScreenVisible(false);
  setMailScreenVisible(false);
  setCameraScreenVisible(false);
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
      setFrontScreenVisible(false);
      setOpenClockVisible(true);
      setPhoneMenuVisible(false);
      setDialScreenVisible(false);
      setMailScreenVisible(false);
      setCameraScreenVisible(false);

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

          endCurrentCall();
          stopCamera();

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
    () => {
      endCurrentCall();
      closeContentPanel();
    }
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

      if (/^[0-9]$/.test(event.key)) {
        stopCamera();

        if (panelIsOpen) {
          closeContentPanel();
        }

        setMailScreenVisible(false);

        playPhoneSound(
          `${event.key}.mp3`
        );

        typeDialCharacter(
          event.key
        );

        return;
      }

      if (
        event.key === "*" ||
        event.key === "#"
      ) {
        stopCamera();

        if (panelIsOpen) {
          closeContentPanel();
        }

        setMailScreenVisible(false);

        playPhoneSound(
          "27_fixed.mp3"
        );

        typeDialCharacter(
          event.key
        );

        return;
      }

      if (
        event.key === "Backspace" &&
        isDialScreenVisible
      ) {
        event.preventDefault();

        playPhoneSound(
          "27_fixed.mp3"
        );

        deleteDialCharacter();

        return;
      }

      if (
        event.key === "Escape" &&
        isCameraScreenVisible
      ) {
        stopCamera();

        return;
      }

      if (
        event.key === "Enter" &&
        isCameraScreenVisible
      ) {
        event.preventDefault();

        playPhoneSound(
          "27_fixed.mp3"
        );

        if (hasCapturedPhoto) {
          openCamera();
        } else {
          takeCameraPhoto();
        }

        return;
      }

      if (
        event.key === "Escape" &&
        isMailScreenVisible
      ) {
        setMailScreenVisible(false);

        return;
      }

      if (panelIsOpen) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();

          playPhoneSound(
            "27_fixed.mp3"
          );

          showPreviousPanelPage();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();

          playPhoneSound(
            "27_fixed.mp3"
          );

          showNextPanelPage();
        }

        if (event.key === "Escape") {
          closeContentPanel();
        }

        return;
      }

      if (
        event.key === "Escape" &&
        isDialScreenVisible
      ) {
        endCurrentCall();
        clearDialNumber();
        setDialScreenVisible(false);

        return;
      }

      if (
        event.key === "Enter" &&
        isDialScreenVisible
      ) {
        event.preventDefault();

        launchDeviceCall();

        return;
      }

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();

        if (
          isDialScreenVisible ||
          isMailScreenVisible
        ) {
          return;
        }

        playPhoneSound(
          "27_fixed.mp3"
        );

        if (!isMenuVisible) {
          setPhoneMenuVisible(true);
          updateMenuSelection();
        } else {
          selectCurrentMenuItem();
        }

        return;
      }

      if (event.key === "Escape") {
        endCurrentCall();
        stopCamera();
        setPhoneMenuVisible(false);

        return;
      }

      if (
        !isMenuVisible ||
        isDialScreenVisible ||
        isMailScreenVisible ||
        isCameraScreenVisible
      ) {
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        playPhoneSound(
          "27_fixed.mp3"
        );

        moveMenuSelection("up");
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();

        playPhoneSound(
          "27_fixed.mp3"
        );

        moveMenuSelection("down");
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        playPhoneSound(
          "27_fixed.mp3"
        );

        moveMenuSelection("left");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        playPhoneSound(
          "27_fixed.mp3"
        );

        moveMenuSelection("right");
      }
    }
  );
}

/* ---------------------------------
   STOP HARDWARE WHEN LEAVING PAGE
--------------------------------- */

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      endCurrentCall();
      stopCameraStream();
    }
  }
);

window.addEventListener(
  "pagehide",
  () => {
    endCurrentCall();
    stopCameraStream();
  }
);

/* ---------------------------------
   INITIALIZE
--------------------------------- */

function initializePhone() {
  renderKeys();
  initializeMenuEvents();

  endCurrentCall();
  stopCamera();

  setKeysEnabled(false);
  setFrontScreenVisible(false);
  setOpenClockVisible(false);
  setPhoneMenuVisible(false);
  setDialScreenVisible(false);
  setMailScreenVisible(false);
  setCameraScreenVisible(false);

  clearDialNumber();

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
