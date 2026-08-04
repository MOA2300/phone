"use strict";

/* ---------------------------------
   HTML ELEMENTS
--------------------------------- */

const instructionText =
  document.getElementById(
    "instruction-text"
  );

const audioToggle =
  document.getElementById(
    "audio-toggle"
  );

const audioToggleImage =
  document.getElementById(
    "audio-toggle-image"
  );

const spriteButton =
  document.getElementById(
    "sprite-button"
  );

const sprite =
  document.getElementById(
    "sprite"
  );

const frame =
  document.getElementById(
    "phone-frame"
  );

const container =
  document.getElementById(
    "phone-container"
  );

const keyOverlay =
  document.getElementById(
    "key-overlay"
  );

const flipTrigger =
  document.getElementById(
    "flip-trigger"
  );

const frontScreen =
  document.getElementById(
    "front-screen"
  );

const frontScreenDate =
  document.getElementById(
    "front-screen-date"
  );

const frontScreenTime =
  document.getElementById(
    "front-screen-time"
  );

const openScreenClock =
  document.getElementById(
    "open-screen-clock"
  );

const openScreenDate =
  document.getElementById(
    "open-screen-date"
  );

const openScreenTime =
  document.getElementById(
    "open-screen-time"
  );

const phoneMenu =
  document.getElementById(
    "phone-menu"
  );

const dialScreen =
  document.getElementById(
    "dial-screen"
  );

const dialNumber =
  document.getElementById(
    "dial-number"
  );

const mailScreen =
  document.getElementById(
    "mail-screen"
  );

const cameraScreen =
  document.getElementById(
    "camera-screen"
  );

const cameraPreview =
  document.getElementById(
    "camera-preview"
  );

const cameraCanvas =
  document.getElementById(
    "camera-canvas"
  );

const capturedPhoto =
  document.getElementById(
    "captured-photo"
  );

const cameraMessage =
  document.getElementById(
    "camera-message"
  );

const galleryScreen =
  document.getElementById(
    "gallery-screen"
  );

const galleryGridView =
  document.getElementById(
    "gallery-grid-view"
  );

const galleryGrid =
  document.getElementById(
    "gallery-grid"
  );

const galleryPageNumber =
  document.getElementById(
    "gallery-page-number"
  );

const galleryPhotoView =
  document.getElementById(
    "gallery-photo-view"
  );

const galleryFullImage =
  document.getElementById(
    "gallery-full-image"
  );

const galleryPhotoNumber =
  document.getElementById(
    "gallery-photo-number"
  );

const galleryDeleteDialog =
  document.getElementById(
    "gallery-delete-dialog"
  );

const galleryKeepPhoto =
  document.getElementById(
    "gallery-keep-photo"
  );

const galleryDeletePhoto =
  document.getElementById(
    "gallery-delete-photo"
  );

const galleryDeleteOptions =
  Array.from(
    document.querySelectorAll(
      ".gallery-delete-option"
    )
  );

const menuItems =
  Array.from(
    document.querySelectorAll(
      ".phone-menu-item"
    )
  );

const contentPanel =
  document.getElementById(
    "content-panel"
  );

const panelTitle =
  document.getElementById(
    "panel-title"
  );

const panelPage =
  document.getElementById(
    "panel-page"
  );

const panelPageNumber =
  document.getElementById(
    "panel-page-number"
  );

const panelPrevious =
  document.getElementById(
    "panel-previous"
  );

const panelNext =
  document.getElementById(
    "panel-next"
  );

const panelClose =
  document.getElementById(
    "panel-close"
  );

/* ---------------------------------
   PHONE IMAGE FRAMES
--------------------------------- */

const spriteFrames = [];

for (let index = 1; index <= 16; index += 1) {
  spriteFrames.push(
    `DefineSprite_22/${index}.png`
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
   STATE
--------------------------------- */

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;

let isMenuVisible = false;
let isDialScreenVisible = false;
let isMailScreenVisible = false;
let isCameraScreenVisible = false;
let isGalleryScreenVisible = false;
let isGalleryPhotoVisible = false;
let isGalleryDeleteVisible = false;

let isCalling = false;
let enteredPhoneNumber = "";
let callLaunchTimer = null;

let cameraStream = null;
let hasCapturedPhoto = false;
let isOpeningCamera = false;

let savedPhotos = [];

let galleryPageIndex = 0;
let gallerySelectedIndex = 0;
let galleryFullPhotoIndex = 0;
let galleryDeleteChoice = 0;

let spriteIndex = 0;
let spriteInterval = null;
let clockInterval = null;

let selectedMenuIndex = 0;
let activeSectionName = null;
let activePageIndex = 0;

const PHOTOS_PER_PAGE = 9;

const PHOTO_STORAGE_KEY =
  "leslie-phone-gallery";

/* ---------------------------------
   SOUNDS
--------------------------------- */

function playPhoneSound(fileName) {
  const sound =
    new Audio(
      `sounds/${fileName}`
    );

  sound.currentTime = 0;

  sound
    .play()
    .catch(() => {});
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
    .catch(() => {});
}

function stopCallingSound() {
  callingSound.pause();
  callingSound.currentTime = 0;
}

/* ---------------------------------
   MINI PHONE AUDIO TOGGLE
--------------------------------- */

const miniPhoneRingSound =
  new Audio(
    "sounds/phonering.mp3"
  );

miniPhoneRingSound.loop = true;
miniPhoneRingSound.preload = "auto";
miniPhoneRingSound.volume = 0.75;

let isMiniPhoneAudioOn = false;

function updateAudioToggle() {
  if (isMiniPhoneAudioOn) {
    audioToggleImage.src =
      "images/audioon.png";

    audioToggleImage.alt =
      "Turn audio off";

    audioToggle.setAttribute(
      "aria-label",
      "Turn phone ringing audio off"
    );

    audioToggle.setAttribute(
      "aria-pressed",
      "true"
    );

    return;
  }

  audioToggleImage.src =
    "images/audiooff.png";

  audioToggleImage.alt =
    "Turn audio on";

  audioToggle.setAttribute(
    "aria-label",
    "Turn phone ringing audio on"
  );

  audioToggle.setAttribute(
    "aria-pressed",
    "false"
  );
}

async function turnMiniPhoneAudioOn() {
  if (
    hasOpenedOnce ||
    spriteButton.hidden
  ) {
    return;
  }

  try {
    miniPhoneRingSound.currentTime = 0;

    await miniPhoneRingSound.play();

    isMiniPhoneAudioOn = true;

    updateAudioToggle();
  } catch (error) {
    console.warn(
      "The ringtone could not start:",
      error
    );

    isMiniPhoneAudioOn = false;

    updateAudioToggle();
  }
}

function turnMiniPhoneAudioOff() {
  miniPhoneRingSound.pause();
  miniPhoneRingSound.currentTime = 0;

  isMiniPhoneAudioOn = false;

  updateAudioToggle();
}

function toggleMiniPhoneAudio() {
  if (isMiniPhoneAudioOn) {
    turnMiniPhoneAudioOff();

    return;
  }

  turnMiniPhoneAudioOn();
}

const generalSoundKeys =
  new Set([
    "dpad-up",
    "dpad-down",
    "dpad-left",
    "dpad-right",
    "dpad-center",
    "mail",
    "*",
    "#",
    "camera",
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
    label: "Select highlighted item",
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
    label: "Open photo gallery",
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
    name: "camera",
    label: "Open camera or take photo",
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
    label: "Pound or delete photo",
    x: 139,
    y: 523,
    width: 39,
    height: 21
  }
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
  ...closeFrames,
  "images/bunny.png",
  "images/diva.jpg",
  "images/instructiontext.png",
  "images/audiooff.png",
  "images/audioon.png"
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
   STARTING PHONE EXPERIENCE
--------------------------------- */

function removeStartingPhoneExperience() {
  turnMiniPhoneAudioOff();
  stopSpriteLoop();

  instructionText.classList.add(
    "is-hidden"
  );

  audioToggle.classList.add(
    "is-hidden"
  );

  spriteButton.classList.add(
    "is-stopping"
  );

  window.setTimeout(() => {
    spriteButton.hidden = true;

    spriteButton.style.display =
      "none";

    sprite.style.display =
      "none";

    audioToggle.hidden = true;
  }, 180);
}

/* ---------------------------------
   CLOCK
--------------------------------- */

function padNumber(value) {
  return String(value).padStart(
    2,
    "0"
  );
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
    `${padNumber(
      date.getMonth() + 1
    )}/` +
    `${padNumber(
      date.getDate()
    )}` +
    `(${weekdays[
      date.getDay()
    ]})`
  );
}

function formatOpenPhoneTime(date) {
  return (
    `${padNumber(
      date.getHours()
    )}:` +
    `${padNumber(
      date.getMinutes()
    )}:` +
    `${padNumber(
      date.getSeconds()
    )}`
  );
}

function formatFrontPhoneDate(date) {
  return (
    `${date.getFullYear()}/` +
    `${padNumber(
      date.getMonth() + 1
    )}/` +
    `${padNumber(
      date.getDate()
    )}`
  );
}

function formatFrontPhoneTime(date) {
  return (
    `${padNumber(
      date.getHours()
    )}:` +
    `${padNumber(
      date.getMinutes()
    )}`
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
   BASIC SCREEN HELPERS
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

function hidePhoneMenu() {
  isMenuVisible = false;

  phoneMenu.classList.remove(
    "is-visible"
  );

  phoneMenu.setAttribute(
    "aria-hidden",
    "true"
  );
}

function hideDialScreen() {
  isDialScreenVisible = false;

  dialScreen.classList.remove(
    "is-visible"
  );

  dialScreen.setAttribute(
    "aria-hidden",
    "true"
  );
}

function hideMailScreen() {
  isMailScreenVisible = false;

  mailScreen.classList.remove(
    "is-visible"
  );

  mailScreen.setAttribute(
    "aria-hidden",
    "true"
  );
}

function hideCameraScreen() {
  isCameraScreenVisible = false;

  cameraScreen.classList.remove(
    "is-visible"
  );

  cameraScreen.setAttribute(
    "aria-hidden",
    "true"
  );
}

/* ---------------------------------
   GALLERY DELETE DIALOG
--------------------------------- */

function updateGalleryDeleteChoice() {
  galleryDeleteOptions.forEach(
    (option, index) => {
      option.classList.toggle(
        "is-selected",
        index ===
          galleryDeleteChoice
      );
    }
  );
}

function closeGalleryDeleteDialog() {
  isGalleryDeleteVisible = false;
  galleryDeleteChoice = 0;

  galleryDeleteDialog.classList.remove(
    "is-visible"
  );

  galleryDeleteDialog.setAttribute(
    "aria-hidden",
    "true"
  );

  updateGalleryDeleteChoice();
}

function openGalleryDeleteDialog() {
  if (
    !isGalleryScreenVisible ||
    savedPhotos.length === 0
  ) {
    return;
  }

  if (isGalleryPhotoVisible) {
    galleryFullPhotoIndex =
      Math.max(
        0,
        Math.min(
          galleryFullPhotoIndex,
          savedPhotos.length - 1
        )
      );
  } else {
    galleryFullPhotoIndex =
      getGalleryPageStart() +
      gallerySelectedIndex;
  }

  if (
    !savedPhotos[
      galleryFullPhotoIndex
    ]
  ) {
    return;
  }

  isGalleryDeleteVisible = true;
  galleryDeleteChoice = 0;

  galleryDeleteDialog.classList.add(
    "is-visible"
  );

  galleryDeleteDialog.setAttribute(
    "aria-hidden",
    "false"
  );

  updateGalleryDeleteChoice();
}

function moveGalleryDeleteChoice(direction) {
  if (!isGalleryDeleteVisible) {
    return;
  }

  if (direction === "left") {
    galleryDeleteChoice = 0;
  }

  if (direction === "right") {
    galleryDeleteChoice = 1;
  }

  updateGalleryDeleteChoice();
}

function confirmGalleryDeleteChoice() {
  if (!isGalleryDeleteVisible) {
    return;
  }

  if (galleryDeleteChoice === 0) {
    closeGalleryDeleteDialog();

    return;
  }

  deleteCurrentGalleryPhoto();
}

function deleteCurrentGalleryPhoto() {
  if (
    savedPhotos.length === 0 ||
    !savedPhotos[
      galleryFullPhotoIndex
    ]
  ) {
    closeGalleryDeleteDialog();

    return;
  }

  savedPhotos.splice(
    galleryFullPhotoIndex,
    1
  );

  persistSavedPhotos();
  closeGalleryDeleteDialog();

  if (savedPhotos.length === 0) {
    galleryPageIndex = 0;
    gallerySelectedIndex = 0;
    galleryFullPhotoIndex = 0;

    isGalleryPhotoVisible = false;

    galleryPhotoView.classList.remove(
      "is-visible"
    );

    galleryPhotoView.setAttribute(
      "aria-hidden",
      "true"
    );

    galleryGridView.style.display =
      "flex";

    galleryFullImage.removeAttribute(
      "src"
    );

    renderGalleryPage();

    return;
  }

  galleryFullPhotoIndex =
    Math.min(
      galleryFullPhotoIndex,
      savedPhotos.length - 1
    );

  galleryPageIndex =
    Math.floor(
      galleryFullPhotoIndex /
      PHOTOS_PER_PAGE
    );

  gallerySelectedIndex =
    galleryFullPhotoIndex %
    PHOTOS_PER_PAGE;

  if (isGalleryPhotoVisible) {
    renderFullGalleryPhoto();
  } else {
    renderGalleryPage();
  }
}

/* ---------------------------------
   GALLERY VISIBILITY
--------------------------------- */

function hideGalleryScreen() {
  closeGalleryDeleteDialog();

  isGalleryScreenVisible = false;
  isGalleryPhotoVisible = false;

  galleryScreen.classList.remove(
    "is-visible"
  );

  galleryScreen.setAttribute(
    "aria-hidden",
    "true"
  );

  galleryGridView.style.display =
    "flex";

  galleryPhotoView.classList.remove(
    "is-visible"
  );

  galleryPhotoView.setAttribute(
    "aria-hidden",
    "true"
  );

  galleryFullImage.removeAttribute(
    "src"
  );
}

function hideAllPhoneScreens() {
  hidePhoneMenu();
  hideDialScreen();
  hideMailScreen();
  hideCameraScreen();
  hideGalleryScreen();
}

function setPhoneMenuVisible(visible) {
  if (!visible) {
    hidePhoneMenu();

    return;
  }

  stopCamera();

  hideDialScreen();
  hideMailScreen();
  hideGalleryScreen();

  isMenuVisible = true;

  phoneMenu.classList.add(
    "is-visible"
  );

  phoneMenu.setAttribute(
    "aria-hidden",
    "false"
  );
}

function setDialScreenVisible(visible) {
  if (!visible) {
    hideDialScreen();

    return;
  }

  stopCamera();

  hidePhoneMenu();
  hideMailScreen();
  hideGalleryScreen();

  isDialScreenVisible = true;

  dialScreen.classList.add(
    "is-visible"
  );

  dialScreen.setAttribute(
    "aria-hidden",
    "false"
  );
}

function setMailScreenVisible(visible) {
  if (!visible) {
    hideMailScreen();

    return;
  }

  endCurrentCall();
  stopCamera();

  hidePhoneMenu();
  hideDialScreen();
  hideGalleryScreen();

  isMailScreenVisible = true;

  mailScreen.classList.add(
    "is-visible"
  );

  mailScreen.setAttribute(
    "aria-hidden",
    "false"
  );
}

function setCameraScreenVisible(visible) {
  if (!visible) {
    hideCameraScreen();

    return;
  }

  hidePhoneMenu();
  hideDialScreen();
  hideMailScreen();
  hideGalleryScreen();

  isCameraScreenVisible = true;

  cameraScreen.classList.add(
    "is-visible"
  );

  cameraScreen.setAttribute(
    "aria-hidden",
    "false"
  );
}

function setGalleryScreenVisible(visible) {
  if (!visible) {
    hideGalleryScreen();

    return;
  }

  endCurrentCall();
  stopCamera();

  hidePhoneMenu();
  hideDialScreen();
  hideMailScreen();
  hideCameraScreen();

  isGalleryScreenVisible = true;
  isGalleryPhotoVisible = false;

  galleryScreen.classList.add(
    "is-visible"
  );

  galleryScreen.setAttribute(
    "aria-hidden",
    "false"
  );

  galleryGridView.style.display =
    "flex";

  galleryPhotoView.classList.remove(
    "is-visible"
  );

  galleryPhotoView.setAttribute(
    "aria-hidden",
    "true"
  );

  normalizeGallerySelection();
  renderGalleryPage();
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
   SAVED PHOTO STORAGE
--------------------------------- */

function loadSavedPhotos() {
  try {
    const storedPhotos =
      window.localStorage.getItem(
        PHOTO_STORAGE_KEY
      );

    if (!storedPhotos) {
      savedPhotos = [];

      return;
    }

    const parsedPhotos =
      JSON.parse(
        storedPhotos
      );

    savedPhotos =
      Array.isArray(parsedPhotos)
        ? parsedPhotos.filter(
            (photo) =>
              typeof photo ===
              "string"
          )
        : [];
  } catch (error) {
    console.warn(
      "Could not load photos:",
      error
    );

    savedPhotos = [];
  }
}

function persistSavedPhotos() {
  try {
    window.localStorage.setItem(
      PHOTO_STORAGE_KEY,
      JSON.stringify(
        savedPhotos
      )
    );

    return true;
  } catch (error) {
    console.warn(
      "Could not save all photos:",
      error
    );

    return false;
  }
}

function savePhotoToGallery(photoData) {
  if (!photoData) {
    return;
  }

  savedPhotos.push(photoData);

  persistSavedPhotos();

  const newPhotoIndex =
    savedPhotos.length - 1;

  galleryPageIndex =
    Math.floor(
      newPhotoIndex /
      PHOTOS_PER_PAGE
    );

  gallerySelectedIndex =
    newPhotoIndex %
    PHOTOS_PER_PAGE;

  galleryFullPhotoIndex =
    newPhotoIndex;
}

/* ---------------------------------
   CAMERA
--------------------------------- */

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
  isOpeningCamera = false;
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
    "PRESS CAMERA TO TAKE PHOTO";
}

function stopCamera() {
  stopCameraStream();
  hideCameraScreen();
  resetCameraDisplay();
}

async function openCamera() {
  if (isOpeningCamera) {
    return;
  }

  endCurrentCall();
  stopCameraStream();
  resetCameraDisplay();

  setCameraScreenVisible(true);

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices
      .getUserMedia
  ) {
    cameraMessage.textContent =
      "CAMERA NOT SUPPORTED";

    return;
  }

  isOpeningCamera = true;

  cameraMessage.textContent =
    "OPENING CAMERA...";

  try {
    const stream =
      await navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "user"
          },

          audio: false
        });

    if (!isCameraScreenVisible) {
      stream
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      isOpeningCamera = false;

      return;
    }

    cameraStream = stream;

    cameraPreview.srcObject =
      cameraStream;

    await cameraPreview.play();

    isOpeningCamera = false;

    cameraMessage.textContent =
      "PRESS CAMERA TO TAKE PHOTO";
  } catch (error) {
    isOpeningCamera = false;

    console.error(
      "Could not open camera:",
      error
    );

    if (
      window.location.protocol !==
        "https:" &&
      window.location.hostname !==
        "localhost"
    ) {
      cameraMessage.textContent =
        "CAMERA NEEDS HTTPS";
    } else {
      cameraMessage.textContent =
        "CAMERA PERMISSION DENIED";
    }
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
    cameraCanvas.getContext(
      "2d"
    );

  if (!context) {
    cameraMessage.textContent =
      "CAMERA ERROR";

    return;
  }

  const outputWidth = 480;

  const outputHeight =
    Math.round(
      outputWidth *
      (
        cameraPreview.videoHeight /
        cameraPreview.videoWidth
      )
    );

  cameraCanvas.width =
    outputWidth;

  cameraCanvas.height =
    outputHeight;

  context.save();

  context.translate(
    outputWidth,
    0
  );

  context.scale(
    -1,
    1
  );

  context.drawImage(
    cameraPreview,
    0,
    0,
    outputWidth,
    outputHeight
  );

  context.restore();

  const capturedPhotoData =
    cameraCanvas.toDataURL(
      "image/jpeg",
      0.72
    );

  capturedPhoto.src =
    capturedPhotoData;

  capturedPhoto.classList.add(
    "is-visible"
  );

  cameraPreview.style.display =
    "none";

  hasCapturedPhoto = true;

  savePhotoToGallery(
    capturedPhotoData
  );

  cameraMessage.textContent =
    "SAVED · PRESS CAMERA TO RETAKE";

  stopCameraStream();
}

function handleCameraButton() {
  if (!isCameraScreenVisible) {
    openCamera();

    return;
  }

  if (isOpeningCamera) {
    return;
  }

  if (!hasCapturedPhoto) {
    takeCameraPhoto();

    return;
  }

  openCamera();
}

/* ---------------------------------
   PHOTO GALLERY
--------------------------------- */

function getGalleryPageCount() {
  return Math.max(
    1,
    Math.ceil(
      savedPhotos.length /
      PHOTOS_PER_PAGE
    )
  );
}

function getGalleryPageStart() {
  return (
    galleryPageIndex *
    PHOTOS_PER_PAGE
  );
}

function getGalleryPhotosOnPage() {
  const pageStart =
    getGalleryPageStart();

  return savedPhotos.slice(
    pageStart,
    pageStart +
      PHOTOS_PER_PAGE
  );
}

function normalizeGallerySelection() {
  const totalPages =
    getGalleryPageCount();

  galleryPageIndex =
    Math.max(
      0,
      Math.min(
        galleryPageIndex,
        totalPages - 1
      )
    );

  const pagePhotos =
    getGalleryPhotosOnPage();

  if (pagePhotos.length === 0) {
    gallerySelectedIndex = 0;

    return;
  }

  gallerySelectedIndex =
    Math.max(
      0,
      Math.min(
        gallerySelectedIndex,
        pagePhotos.length - 1
      )
    );
}

function renderGalleryPage() {
  normalizeGallerySelection();

  galleryGrid.innerHTML = "";

  const pagePhotos =
    getGalleryPhotosOnPage();

  if (savedPhotos.length === 0) {
    const emptyMessage =
      document.createElement(
        "div"
      );

    emptyMessage.className =
      "gallery-empty-message";

    emptyMessage.textContent =
      "NO PHOTOS YET";

    galleryGrid.appendChild(
      emptyMessage
    );

    galleryPageNumber.textContent =
      "01 / 01";

    return;
  }

  for (
    let index = 0;
    index < PHOTOS_PER_PAGE;
    index += 1
  ) {
    const photo =
      pagePhotos[index];

    if (!photo) {
      const emptySlot =
        document.createElement(
          "div"
        );

      emptySlot.className =
        "gallery-empty-slot";

      emptySlot.setAttribute(
        "aria-hidden",
        "true"
      );

      galleryGrid.appendChild(
        emptySlot
      );

      continue;
    }

    const absoluteIndex =
      getGalleryPageStart() +
      index;

    const button =
      document.createElement(
        "button"
      );

    button.type = "button";

    button.className =
      "gallery-thumbnail";

    button.setAttribute(
      "role",
      "gridcell"
    );

    button.setAttribute(
      "aria-label",
      `View photo ${
        absoluteIndex + 1
      }`
    );

    button.classList.toggle(
      "is-selected",
      index ===
        gallerySelectedIndex
    );

    const image =
      document.createElement(
        "img"
      );

    image.src = photo;

    image.alt =
      `Captured photo ${
        absoluteIndex + 1
      }`;

    button.appendChild(image);

    button.addEventListener(
      "mouseenter",
      () => {
        gallerySelectedIndex =
          index;

        updateGallerySelection();
      }
    );

    button.addEventListener(
      "focus",
      () => {
        gallerySelectedIndex =
          index;

        updateGallerySelection();
      }
    );

    button.addEventListener(
      "click",
      () => {
        gallerySelectedIndex =
          index;

        openSelectedGalleryPhoto();
      }
    );

    galleryGrid.appendChild(
      button
    );
  }

  galleryPageNumber.textContent =
    `${padNumber(
      galleryPageIndex + 1
    )} / ${padNumber(
      getGalleryPageCount()
    )}`;
}

function updateGallerySelection() {
  const thumbnails =
    Array.from(
      galleryGrid.querySelectorAll(
        ".gallery-thumbnail"
      )
    );

  thumbnails.forEach(
    (thumbnail, index) => {
      thumbnail.classList.toggle(
        "is-selected",
        index ===
          gallerySelectedIndex
      );
    }
  );
}

function moveToPreviousGalleryPage() {
  if (galleryPageIndex <= 0) {
    return false;
  }

  galleryPageIndex -= 1;

  const previousPagePhotos =
    getGalleryPhotosOnPage();

  gallerySelectedIndex =
    Math.max(
      0,
      previousPagePhotos.length - 1
    );

  renderGalleryPage();

  return true;
}

function moveToNextGalleryPage() {
  if (
    galleryPageIndex >=
    getGalleryPageCount() - 1
  ) {
    return false;
  }

  galleryPageIndex += 1;
  gallerySelectedIndex = 0;

  renderGalleryPage();

  return true;
}

function moveGallerySelection(direction) {
  if (
    !isGalleryScreenVisible ||
    isGalleryPhotoVisible ||
    isGalleryDeleteVisible ||
    savedPhotos.length === 0
  ) {
    return;
  }

  const pagePhotos =
    getGalleryPhotosOnPage();

  const currentIndex =
    gallerySelectedIndex;

  const currentColumn =
    currentIndex % 3;

  let nextIndex =
    currentIndex;

  if (direction === "up") {
    nextIndex =
      currentIndex - 3;

    if (nextIndex < 0) {
      nextIndex =
        currentColumn;
    }
  }

  if (direction === "down") {
    nextIndex =
      currentIndex + 3;

    if (
      nextIndex >=
      pagePhotos.length
    ) {
      const finalRowStart =
        Math.floor(
          (
            pagePhotos.length -
            1
          ) / 3
        ) * 3;

      nextIndex =
        Math.min(
          finalRowStart +
            currentColumn,
          pagePhotos.length - 1
        );
    }
  }

  if (direction === "left") {
    if (currentIndex === 0) {
      if (
        moveToPreviousGalleryPage()
      ) {
        return;
      }
    } else if (currentColumn > 0) {
      nextIndex =
        currentIndex - 1;
    }
  }

  if (direction === "right") {
    if (
      currentIndex ===
      pagePhotos.length - 1
    ) {
      if (
        moveToNextGalleryPage()
      ) {
        return;
      }
    } else if (
      currentColumn < 2
    ) {
      nextIndex =
        currentIndex + 1;
    }
  }

  gallerySelectedIndex =
    Math.max(
      0,
      Math.min(
        nextIndex,
        pagePhotos.length - 1
      )
    );

  updateGallerySelection();
}

function openSelectedGalleryPhoto() {
  const absoluteIndex =
    getGalleryPageStart() +
    gallerySelectedIndex;

  if (!savedPhotos[absoluteIndex]) {
    return;
  }

  galleryFullPhotoIndex =
    absoluteIndex;

  renderFullGalleryPhoto();
}

function renderFullGalleryPhoto() {
  const photo =
    savedPhotos[
      galleryFullPhotoIndex
    ];

  if (!photo) {
    return;
  }

  isGalleryPhotoVisible = true;

  galleryGridView.style.display =
    "none";

  galleryPhotoView.classList.add(
    "is-visible"
  );

  galleryPhotoView.setAttribute(
    "aria-hidden",
    "false"
  );

  galleryFullImage.src =
    photo;

  galleryPhotoNumber.textContent =
    `${padNumber(
      galleryFullPhotoIndex + 1
    )} / ${padNumber(
      savedPhotos.length
    )}`;
}

function closeFullGalleryPhoto() {
  closeGalleryDeleteDialog();

  isGalleryPhotoVisible = false;

  galleryPhotoView.classList.remove(
    "is-visible"
  );

  galleryPhotoView.setAttribute(
    "aria-hidden",
    "true"
  );

  galleryGridView.style.display =
    "flex";

  galleryPageIndex =
    Math.floor(
      galleryFullPhotoIndex /
      PHOTOS_PER_PAGE
    );

  gallerySelectedIndex =
    galleryFullPhotoIndex %
    PHOTOS_PER_PAGE;

  renderGalleryPage();
}

function showPreviousGalleryPhoto() {
  if (
    !isGalleryPhotoVisible ||
    isGalleryDeleteVisible ||
    savedPhotos.length === 0
  ) {
    return;
  }

  galleryFullPhotoIndex =
    Math.max(
      0,
      galleryFullPhotoIndex - 1
    );

  renderFullGalleryPhoto();
}

function showNextGalleryPhoto() {
  if (
    !isGalleryPhotoVisible ||
    isGalleryDeleteVisible ||
    savedPhotos.length === 0
  ) {
    return;
  }

  galleryFullPhotoIndex =
    Math.min(
      savedPhotos.length - 1,
      galleryFullPhotoIndex + 1
    );

  renderFullGalleryPhoto();
}

/* ---------------------------------
   CALLING
--------------------------------- */

function cancelCallLaunch() {
  if (callLaunchTimer === null) {
    return;
  }

  window.clearTimeout(
    callLaunchTimer
  );

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

  if (
    enteredPhoneNumber.length >=
    18
  ) {
    return;
  }

  enteredPhoneNumber += character;

  setDialScreenVisible(true);
  renderDialNumber();
}

function deleteDialCharacter() {
  endCurrentCall();

  if (
    enteredPhoneNumber.length === 0
  ) {
    hideDialScreen();

    return;
  }

  enteredPhoneNumber =
    enteredPhoneNumber.slice(
      0,
      -1
    );

  renderDialNumber();

  if (
    enteredPhoneNumber.length === 0
  ) {
    hideDialScreen();
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
        index ===
        selectedMenuIndex;

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
    nextRow * 2 +
    nextColumn;

  updateMenuSelection();
}

function selectCurrentMenuItem() {
  if (!isMenuVisible) {
    return;
  }

  const selectedItem =
    menuItems[
      selectedMenuIndex
    ];

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
  hideGalleryScreen();

  hidePhoneMenu();
  hideDialScreen();
  hideMailScreen();

  activeSectionName =
    sectionName;

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
    sectionContent[
      activeSectionName
    ];

  if (!section) {
    return;
  }

  const totalPages =
    section.pages.length;

  panelTitle.textContent =
    section.title;

  panelPage.innerHTML =
    section.pages[
      activePageIndex
    ];

  panelPageNumber.textContent =
    `${padNumber(
      activePageIndex + 1
    )} / ${padNumber(
      totalPages
    )}`;

  panelPrevious.disabled =
    activePageIndex === 0;

  panelNext.disabled =
    activePageIndex ===
    totalPages - 1;

  panelPage.scrollTop = 0;

  panelPage.style.animation =
    "none";

  window.requestAnimationFrame(
    () => {
      panelPage.style.animation =
        "";
    }
  );
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
    sectionContent[
      activeSectionName
    ];

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

  if (
    generalSoundKeys.has(
      keyName
    )
  ) {
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

  if (isGalleryDeleteVisible) {
    if (keyName === "dpad-left") {
      moveGalleryDeleteChoice(
        "left"
      );

      return;
    }

    if (keyName === "dpad-right") {
      moveGalleryDeleteChoice(
        "right"
      );

      return;
    }

    if (keyName === "dpad-center") {
      confirmGalleryDeleteChoice();

      return;
    }

    if (keyName === "back") {
      closeGalleryDeleteDialog();

      return;
    }

    return;
  }

  if (
    keyName === "#" &&
    isGalleryScreenVisible
  ) {
    openGalleryDeleteDialog();

    return;
  }

  if (keyName === "camera") {
    endCurrentCall();

    if (panelIsOpen) {
      closeContentPanel();
    }

    hideGalleryScreen();

    handleCameraButton();

    return;
  }

  if (keyName === "lower-right") {
    endCurrentCall();

    if (panelIsOpen) {
      closeContentPanel();
    }

    setGalleryScreenVisible(
      true
    );

    return;
  }

  if (keyName === "mail") {
    endCurrentCall();
    stopCamera();
    hideGalleryScreen();

    if (panelIsOpen) {
      closeContentPanel();
    }

    setMailScreenVisible(
      true
    );

    return;
  }

  if (keyName === "call") {
    launchDeviceCall();

    return;
  }

  if (
    dialCharacters.includes(
      keyName
    )
  ) {
    stopCamera();
    hideGalleryScreen();

    if (panelIsOpen) {
      closeContentPanel();
    }

    hideMailScreen();

    if (
      /^[0-9]$/.test(
        keyName
      )
    ) {
      playPhoneSound(
        `${keyName}.mp3`
      );
    }

    typeDialCharacter(
      keyName
    );

    return;
  }

  if (keyName === "home") {
    endCurrentCall();
    stopCamera();
    hideGalleryScreen();

    if (panelIsOpen) {
      closeContentPanel();
    }

    clearDialNumber();

    hideDialScreen();
    hideMailScreen();

    setPhoneMenuVisible(
      true
    );

    updateMenuSelection();

    return;
  }

  if (keyName === "back") {
    endCurrentCall();

    if (isGalleryScreenVisible) {
      if (isGalleryPhotoVisible) {
        closeFullGalleryPhoto();
      } else {
        hideGalleryScreen();
      }

      return;
    }

    if (isCameraScreenVisible) {
      stopCamera();

      return;
    }

    if (isMailScreenVisible) {
      hideMailScreen();

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
      hidePhoneMenu();
    }

    return;
  }

  if (keyName === "end") {
    endCurrentCall();
    stopCamera();
    hideGalleryScreen();

    if (isMailScreenVisible) {
      hideMailScreen();

      return;
    }

    if (isDialScreenVisible) {
      clearDialNumber();
      hideDialScreen();

      return;
    }

    if (panelIsOpen) {
      closeContentPanel();

      return;
    }

    hidePhoneMenu();

    return;
  }

  if (keyName === "dpad-center") {
    if (isGalleryScreenVisible) {
      if (!isGalleryPhotoVisible) {
        openSelectedGalleryPhoto();
      }

      return;
    }

    if (
      isDialScreenVisible ||
      isMailScreenVisible ||
      isCameraScreenVisible
    ) {
      return;
    }

    if (!isMenuVisible) {
      setPhoneMenuVisible(
        true
      );

      updateMenuSelection();
    } else {
      selectCurrentMenuItem();
    }

    return;
  }

  if (isGalleryScreenVisible) {
    if (isGalleryPhotoVisible) {
      if (
        keyName ===
        "dpad-left"
      ) {
        showPreviousGalleryPhoto();
      }

      if (
        keyName ===
        "dpad-right"
      ) {
        showNextGalleryPhoto();
      }

      return;
    }

    if (keyName === "dpad-up") {
      moveGallerySelection(
        "up"
      );
    }

    if (keyName === "dpad-down") {
      moveGallerySelection(
        "down"
      );
    }

    if (keyName === "dpad-left") {
      moveGallerySelection(
        "left"
      );
    }

    if (keyName === "dpad-right") {
      moveGallerySelection(
        "right"
      );
    }

    return;
  }

  if (panelIsOpen) {
    if (keyName === "dpad-left") {
      showPreviousPanelPage();
    }

    if (keyName === "dpad-right") {
      showNextPanelPage();
    }

    return;
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
      moveMenuSelection(
        "up"
      );
      break;

    case "dpad-down":
      moveMenuSelection(
        "down"
      );
      break;

    case "dpad-left":
      moveMenuSelection(
        "left"
      );
      break;

    case "dpad-right":
      moveMenuSelection(
        "right"
      );
      break;

    default:
      break;
  }
}

/* ---------------------------------
   FIRST PHONE OPENING
--------------------------------- */

function openPhoneForFirstTime() {
  if (
    isAnimating ||
    hasOpenedOnce
  ) {
    return;
  }

  removeStartingPhoneExperience();

  endCurrentCall();
  stopCamera();

  setKeysEnabled(false);
  setFrontScreenVisible(false);
  setOpenClockVisible(false);

  hideAllPhoneScreens();

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
      hasOpenedOnce = true;
      isOpen = true;

      setFlipTriggerArea();
      setKeysEnabled(true);
      setFrontScreenVisible(false);
      setOpenClockVisible(true);

      hideAllPhoneScreens();
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

  hideAllPhoneScreens();

  isOpen = false;

  playAnimation(
    closeFrames,
    "images/50.png",
    () => {
      setFlipTriggerArea();
      setFrontScreenVisible(true);
      setOpenClockVisible(false);

      hideAllPhoneScreens();
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
  setKeysEnabled(false);

  hideAllPhoneScreens();

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

      hideAllPhoneScreens();
      updateMenuSelection();
    }
  );
}

/* ---------------------------------
   EVENTS
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

  galleryKeepPhoto.addEventListener(
    "click",
    () => {
      galleryDeleteChoice = 0;

      confirmGalleryDeleteChoice();
    }
  );

  galleryDeletePhoto.addEventListener(
    "click",
    () => {
      galleryDeleteChoice = 1;

      confirmGalleryDeleteChoice();
    }
  );

  galleryDeleteOptions.forEach(
    (option, index) => {
      option.addEventListener(
        "mouseenter",
        () => {
          galleryDeleteChoice =
            index;

          updateGalleryDeleteChoice();
        }
      );

      option.addEventListener(
        "focus",
        () => {
          galleryDeleteChoice =
            index;

          updateGalleryDeleteChoice();
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

      if (isGalleryDeleteVisible) {
        if (
          event.key ===
          "ArrowLeft"
        ) {
          event.preventDefault();

          moveGalleryDeleteChoice(
            "left"
          );

          return;
        }

        if (
          event.key ===
          "ArrowRight"
        ) {
          event.preventDefault();

          moveGalleryDeleteChoice(
            "right"
          );

          return;
        }

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

          confirmGalleryDeleteChoice();

          return;
        }

        if (
          event.key === "Escape" ||
          event.key ===
            "Backspace"
        ) {
          event.preventDefault();

          closeGalleryDeleteDialog();

          return;
        }

        return;
      }

      if (
        /^[0-9]$/.test(
          event.key
        )
      ) {
        playPhoneSound(
          `${event.key}.mp3`
        );

        typeDialCharacter(
          event.key
        );

        return;
      }

      if (event.key === "#") {
        if (
          isGalleryScreenVisible
        ) {
          openGalleryDeleteDialog();

          return;
        }

        typeDialCharacter("#");

        return;
      }

      if (event.key === "*") {
        typeDialCharacter("*");

        return;
      }

      if (
        event.key.toLowerCase() ===
        "c"
      ) {
        event.preventDefault();

        if (panelIsOpen) {
          closeContentPanel();
        }

        hideGalleryScreen();
        handleCameraButton();

        return;
      }

      if (
        event.key.toLowerCase() ===
        "a"
      ) {
        event.preventDefault();

        if (panelIsOpen) {
          closeContentPanel();
        }

        setGalleryScreenVisible(
          true
        );

        return;
      }

      if (
        event.key ===
        "Backspace"
      ) {
        event.preventDefault();

        if (
          isGalleryScreenVisible
        ) {
          if (
            isGalleryPhotoVisible
          ) {
            closeFullGalleryPhoto();
          } else {
            hideGalleryScreen();
          }

          return;
        }

        if (isDialScreenVisible) {
          deleteDialCharacter();
        }

        return;
      }

      if (event.key === "Escape") {
        endCurrentCall();

        if (
          isGalleryScreenVisible
        ) {
          if (
            isGalleryPhotoVisible
          ) {
            closeFullGalleryPhoto();
          } else {
            hideGalleryScreen();
          }

          return;
        }

        if (
          isCameraScreenVisible
        ) {
          stopCamera();

          return;
        }

        if (isMailScreenVisible) {
          hideMailScreen();

          return;
        }

        if (isDialScreenVisible) {
          clearDialNumber();
          hideDialScreen();

          return;
        }

        if (panelIsOpen) {
          closeContentPanel();

          return;
        }

        hidePhoneMenu();

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
          isGalleryScreenVisible
        ) {
          if (
            !isGalleryPhotoVisible
          ) {
            openSelectedGalleryPhoto();
          }

          return;
        }

        if (
          isMailScreenVisible ||
          isCameraScreenVisible ||
          isDialScreenVisible
        ) {
          return;
        }

        if (!isMenuVisible) {
          setPhoneMenuVisible(
            true
          );

          updateMenuSelection();
        } else {
          selectCurrentMenuItem();
        }

        return;
      }

      const arrowMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right"
      };

      const direction =
        arrowMap[event.key];

      if (!direction) {
        return;
      }

      event.preventDefault();

      if (
        isGalleryScreenVisible
      ) {
        if (
          isGalleryPhotoVisible
        ) {
          if (
            direction === "left"
          ) {
            showPreviousGalleryPhoto();
          }

          if (
            direction === "right"
          ) {
            showNextGalleryPhoto();
          }
        } else {
          moveGallerySelection(
            direction
          );
        }

        return;
      }

      if (panelIsOpen) {
        if (
          direction === "left"
        ) {
          showPreviousPanelPage();
        }

        if (
          direction === "right"
        ) {
          showNextPanelPage();
        }

        return;
      }

      if (isMenuVisible) {
        moveMenuSelection(
          direction
        );
      }
    }
  );
}

/* ---------------------------------
   VISIBILITY CLEANUP
--------------------------------- */

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      endCurrentCall();
      stopCameraStream();

      if (isMiniPhoneAudioOn) {
        miniPhoneRingSound.pause();
      }

      return;
    }

    if (
      isMiniPhoneAudioOn &&
      !hasOpenedOnce &&
      !spriteButton.hidden
    ) {
      miniPhoneRingSound
        .play()
        .catch(() => {});
    }
  }
);

window.addEventListener(
  "pagehide",
  () => {
    endCurrentCall();
    stopCameraStream();
    turnMiniPhoneAudioOff();
  }
);

/* ---------------------------------
   INITIALIZE
--------------------------------- */

function initializePhone() {
  loadSavedPhotos();

  renderKeys();
  initializeMenuEvents();

  instructionText.classList.remove(
    "is-hidden"
  );

  audioToggle.hidden = false;

  audioToggle.classList.remove(
    "is-hidden"
  );

  spriteButton.hidden = false;

  spriteButton.style.display =
    "block";

  spriteButton.classList.remove(
    "is-stopping"
  );

  sprite.style.display =
    "block";

  isMiniPhoneAudioOn = false;

  updateAudioToggle();

  endCurrentCall();
  stopCamera();
  closeGalleryDeleteDialog();

  setKeysEnabled(false);
  setFrontScreenVisible(false);
  setOpenClockVisible(false);

  hideAllPhoneScreens();

  clearDialNumber();

  startSpriteLoop();
  startPhoneClock();

  audioToggle.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      toggleMiniPhoneAudio();
    }
  );

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
