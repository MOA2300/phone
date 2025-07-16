const sprite = document.getElementById("sprite");
const frame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

const sound1 = new Audio("sounds/27_fixed.mp3");
const sound2 = new Audio("sounds/28_fixed.mp3");

// Set sprite animation
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

// Animate phone frame
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

// Sprite click starts animation
sprite.addEventListener("click", () => {
  if (isAnimating) return;

  clearInterval(spriteLoop);
  sprite.style.display = "none";

  sound1.play().catch(console.error);
  setTimeout(() => sound2.play().catch(console.error), 300);

  playAnimation(openFrames, "images/42.png", () => {
    container.style.display = "block";
    isOpen = true;
  });
});

// Phone flip logic
container.addEventListener("click", (e) => {
  if (isAnimating) return;

  const rect = frame.getBoundingClientRect();
  const clickY = e.clientY;

  if (isOpen && clickY < rect.top + rect.height / 2) {
    playAnimation(closeFrames, "images/50.png", () => {
      container.style.display = "none";
      isOpen = false;
    });
  } else if (!isOpen && clickY >= rect.top + rect.height / 2) {
    const reopenFrames = [...closeFrames].reverse();
    container.style.display = "block";
    playAnimation(reopenFrames, "images/42.png", () => {
      isOpen = true;
    });
  }
});

// 💡 Set button positions only after image loads
frame.addEventListener("load", () => {
  const positions = [
    [410, 38], [410, 98], [410, 158], // 1–3
    [468, 38], [468, 98], [468, 158], // 4–6
    [526, 38], [526, 98], [526, 158], // 7–9
    [584, 38], [584, 98], [584, 158]  // *, 0, #
  ];

  const ids = [
    "key1", "key2", "key3",
    "key4", "key5", "key6",
    "key7", "key8", "key9",
    "key*", "key0", "key#"
  ];

  ids.forEach((id, i) => {
    const btn = document.getElementById(id);
    btn.style.top = positions[i][0] + "px";
    btn.style.left = positions[i][1] + "px";
  });
});

// Flash feedback
document.querySelectorAll('.phone-button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.remove('flash');
    requestAnimationFrame(() => {
      btn.classList.add('flash');
      setTimeout(() => {
        btn.classList.remove('flash');
      }, 150);
    });
    console.log(`${btn.id} clicked`);
  });
});
