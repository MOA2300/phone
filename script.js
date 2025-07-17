const sprite = document.getElementById("sprite");
const phoneContainer = document.getElementById("phone-container");
const phoneFrame = document.getElementById("phone-frame");

// Animate sprite frames
let frame = 1;
let spriteInterval = setInterval(() => {
  frame++;
  sprite.src = `DefineSprite_22/${frame}.png`;
  if (frame >= 16) frame = 1;
}, 100);

// On sprite click, show phone
sprite.addEventListener("click", () => {
  clearInterval(spriteInterval);
  sprite.style.display = "none";
  phoneContainer.style.display = "block";
});

// Button flash effect
const keys = document.querySelectorAll('.phone-key');
keys.forEach(key => {
  key.addEventListener('click', (e) => {
    e.stopPropagation();
    key.classList.remove('flash');
    void key.offsetWidth;
    key.classList.add('flash');
    setTimeout(() => key.classList.remove('flash'), 150);
  });
});
