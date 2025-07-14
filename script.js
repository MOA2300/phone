const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");
const overlaySprite = document.getElementById("overlay-sprite");

// Sprite 22 frames (intro)
const sprite22Frames = [];
for (let i = 1; i <= 16; i++) {
  sprite22Frames.push(`DefineSprite_22/${i}.png`);
}

// Sprite 339 frames (screen overlay)
const sprite339Frames = [];
for (let i = 1; i <= 18; i++) {
  sprite339Frames.push(`DefineSprite_339/${i}.png`);
}

// Phone opening and closing sequences
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

// Audio setup
const sound1 = new Audio("sounds/27_fixed.mp3");
const sound2 = new Audio("sounds/28_fixed.mp3");

let isAnimating = false;
let hasOpenedOnce = false;
let isOpen = false;
let introPlayed = false;

// Preload all images
function preloadImages(paths) {
  paths.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
preloadImages([...sprite22Frames, ...sprite339Frames, ...openFrames, ...closeFrames]);

// Animate sprite sequence
function playSpriteAnimation(frames, imgElement, intervalTime = 100, loop = true) {
  let i = 0;
  imgElement.style.visibility = "visible";
  imgElement.style.display = "block";

  return setInterval(() => {
    imgElement.src = frames[i];
    i = (i + 1) % frames.length;
    if (!loop && i === 0) {
      clearInterval(interval);
      imgElement.style.display = "none";
    }
  }, intervalTime);
}

// Play frame-by-frame animation
function playFrameAnimation(frames, finalFrame, callback) {
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
  }, 100);
}

// Initial sprite loop (Sprite 22)
let sprite22Loop;
window.onload = () => {
  frame.style.display = "none";
  overlaySprite.style.display = "none";
  sprite22Loop = playSpriteAnimation(sprite22Frames, sprite, 100, true);
};

// On first click: stop sprite, play sound, and open phone
container.addEventListener("click", (e) => {
  if (isAnimating) return;

  if (!introPlayed) {
    introPlayed = true;
    clearInterval(sprite22Loop);
    sprite.style.display = "none";
    frame.style.display = "block";
    sound1.play().catch(err => console.warn("Sound 1 error:", err));
    setTimeout(() => {
      sound2.play().catch(err => console.warn("Sound 2 error:", err));
    }, 300);
    playFrameAnimation(openFrames, "images/42.png", () => {
      hasOpenedOnce = true;
      isOpen = true;
      overlaySprite.style.display = "block";
      playSpriteAnimation(sprite339Frames, overlaySprite, 120, true);
    });
    return;
  }

  // Handle open/close toggle after intro
  const rect = container.getBoundingClientRect();
  const clickY = e.clientY - rect.top;
  const containerHeight = rect.height;
  const clickedTop = clickY < containerHeight / 2;

  if (isOpen && clickedTop) {
    playFrameAnimation(closeFrames, "images/50.png", () => {
      isOpen = false;
      overlaySprite.style.display = "none";
    });
  } else if (!isOpen && !clickedTop) {
    playFrameAnimation([...closeFrames].reverse(), "images/42.png", () => {
      isOpen = true;
      overlaySprite.style.display = "block";
    });
  }
});
