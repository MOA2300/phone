let isOpen = false;
let spriteContainer;
let keyOverlay;

window.onload = () => {
  spriteContainer = document.getElementById("spriteContainer");
  keyOverlay = document.getElementById("keyOverlay");

  document.getElementById("closedPhone").addEventListener("click", e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Red area on closed phone
    if (x >= 100 && x <= 160 && y >= 340 && y <= 390) {
      openPhone();
    }
  });

  document.getElementById("openPhone").addEventListener("click", e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // White area on open phone
    if (x >= 125 && x <= 170 && y >= 0 && y <= 40) {
      closePhone();
    }
  });
};

function openPhone() {
  document.getElementById("closedPhone").style.display = "none";
  document.getElementById("openPhone").style.display = "block";
  playSound("27_fixed.mp3");
  isOpen = true;
  renderKeys();
}

function closePhone() {
  document.getElementById("closedPhone").style.display = "block";
  document.getElementById("openPhone").style.display = "none";
  playSound("28_fixed.mp3");
  isOpen = false;
  keyOverlay.innerHTML = ""; // clear keys
}

function playSound(file) {
  const audio = new Audio(`sounds/${file}`);
  audio.play();
}

function renderKeys() {
  keyOverlay.innerHTML = ""; // clear previous

  if (!isOpen) return;

  const key = "1key";
  const pos = { x: 478, y: 565 }; // Adjust this to position the key correctly

  const button = document.createElement("button");
  button.className = "key-button";
  button.style.left = `${pos.x}px`;
  button.style.top = `${pos.y}px`;

  const hoverImg = document.createElement("img");
  hoverImg.src = `normal keys/${key}.png`;
  hoverImg.className = "key-overlay-img";
  hoverImg.style.left = `0px`;
  hoverImg.style.top = `0px`;

  button.addEventListener("click", e => {
    if (!isOpen) {
      e.preventDefault();
      return;
    }
    console.log(`Key ${key} clicked`);
  });

  button.appendChild(hoverImg);
  keyOverlay.appendChild(button);
}
