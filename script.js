const spriteOverlay = document.getElementById("sprite-overlay");
const phoneFrame = document.getElementById("phone-frame");
const container = document.getElementById("phone-container");

const spriteFramesOverlay = [];
for (let i = 1; i <= 18; i++) {
  spriteFramesOverlay.push(`DefineSprite_339/${i}.png`);
}

let overlayInterval = null;

function startOverlaySprite() {
  let i = 0;
  spriteOverlay.style.display = "block";
  overlayInterval = setInterval(() => {
    if (i >= spriteFramesOverlay.length) {
      i = 0; // loop
    }
    spriteOverlay.src = spriteFramesOverlay[i];
    i++;
  }, 100);
}

function stopOverlaySprite() {
  clearInterval(overlayInterval);
  spriteOverlay.style.display = "none";
}

// Monitor frame changes
const observer = new MutationObserver(() => {
  if (phoneFrame.src.includes("42.png")) {
    startOverlaySprite();
  } else {
    stopOverlaySprite();
  }
});

observer.observe(phoneFrame, { attributes: true, attributeFilter: ['src'] });
