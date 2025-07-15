const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

// Audio
const sound1 = new Audio("sounds/27_fixed.mp3");
const sound2 = new Audio("sounds/28_fixed.mp3");

// Sprite animation loop (1.png to 16.png)
let spriteIndex = 1;
let spriteLoop = setInterval(() => {
  spriteIndex = spriteIndex < 16 ? spriteIndex + 1 : 1;
  sprite.src = `DefineSprite_22/${spriteIndex}.png`;
}, 100);

// Animation frames
const openFrames = [
  "images/25.png", "images/28.png", "images/30.png",
  "images/32.png", "images/34.png", "images/36.png",
  "images/38.png", "images/40.png", "images/42.png"
];

const closeFrames = [
  "images/46.png", "images/48.png", "images/50.png"
];

let isAnimating = false;
let isOpen = false;

// Animate frame sequence
function playAnimation(frames, finalFrame, callback) {
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
  }, 90);
}

// Handle click on sprite
sprite.addEventListener("click", () => {
  if (isAnimating) return;

  // Stop sprite animation
  clearInterval(spriteLoop);
  sprite.style.display = "none";

  // Play sound
  sound1.play().catch(console.error);
  setTimeout(() => sound2.play().catch(console.error), 300);

  // Show phone and animate open
  container.style.display = "flex";
  playAnimation(openFrames, "images/42.png", () => {
    isOpen = true;
  });
});

// Handle clicks on phone
container.addEventListener("click", (e) => {
  if (isAnimating) return;

  const rect = frame.getBoundingClientRect();
  const clickY = e.clientY;

  // Close if clicked top half, Open if clicked bottom half
  if (isOpen && clickY < rect.top + rect.height / 2) {
    playAnimation(closeFrames, "images/50.png", () => {
      isOpen = false;
    });
  } else if (!isOpen && clickY >= rect.top + rect.height / 2) {
    const reopenFrames = [...closeFrames].reverse();
    playAnimation(reopenFrames, "images/42.png", () => {
      isOpen = true;
    });

    // Button press feedback
document.querySelectorAll('.phone-button').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log(`${btn.id} pressed`);
    // You can trigger more logic here
  });
});


  }
});
