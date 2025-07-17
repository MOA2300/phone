const spriteCanvas = document.getElementById('spriteCanvas');
const ctx = spriteCanvas.getContext('2d');
const phoneImage = document.getElementById('phoneImage');
const flipSound = document.getElementById('flipSound');

let spriteFrames = [];
let currentFrame = 0;
let spriteLoaded = false;
let animationDone = false;

// Load sprite animation (DefineSprite_22)
for (let i = 1; i <= 22; i++) {
  const img = new Image();
  img.src = `DefineSprite_22/${i}.png`;
  img.onload = () => {
    spriteFrames[i - 1] = img;
    if (spriteFrames.length === 22) {
      spriteLoaded = true;
      requestAnimationFrame(drawSprite);
    }
  };
}

function drawSprite() {
  if (!spriteLoaded || animationDone) return;

  ctx.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
  ctx.drawImage(spriteFrames[currentFrame], 0, 0, 236, 656);

  currentFrame++;
  if (currentFrame < spriteFrames.length) {
    requestAnimationFrame(drawSprite);
  } else {
    animationDone = true;
    spriteCanvas.style.display = 'none';
    phoneImage.style.display = 'block';
    flipSound.play();
  }
}

// Handle key flashes
document.getElementById('container').addEventListener('click', (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const key = getKeyAtPosition(x, y);

  if (key) {
    flashKey(key);
  }
});

function flashKey(keyId) {
  const img = document.createElement('img');
  img.src = `compressed/${keyId}.png`;
  img.className = 'flash-button';
  img.style.left = getKeyLeft(keyId) + 'px';
  img.style.top = getKeyTop(keyId) + 'px';
  img.style.width = '45px';
  img.style.height = '25px';

  document.getElementById('container').appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 200);
}

function getKeyAtPosition(x, y) {
  // Estimate positions (you can fine-tune these)
  const keyMap = [
    { id: 'key1', x: 90, y: 340 },
    { id: 'key2', x: 135, y: 340 },
    { id: 'key3', x: 180, y: 340 },
    { id: 'key4', x: 90, y: 370 },
    { id: 'key5', x: 135, y: 370 },
    { id: 'key6', x: 180, y: 370 },
    { id: 'key7', x: 90, y: 400 },
    { id: 'key8', x: 135, y: 400 },
    { id: 'key9', x: 180, y: 400 },
    { id: 'key0', x: 135, y: 430 },
    { id: 'key10', x: 90, y: 430 }, // Star
    { id: 'key', x: 180, y: 430 },  // Hash
    { id: 'keyanswerphone', x: 70, y: 470 },
    { id: 'keyhangup', x: 170, y: 470 }
  ];

  for (const key of keyMap) {
    if (
      x >= key.x && x <= key.x + 45 &&
      y >= key.y && y <= key.y + 25
    ) {
      return key.id;
    }
  }

  return null;
}

function getKeyLeft(id) {
  const map = {
    key1: 90, key2: 135, key3: 180,
    key4: 90, key5: 135, key6: 180,
    key7: 90, key8: 135, key9: 180,
    key0: 135, key10: 90, key: 180,
    keyanswerphone: 70, keyhangup: 170
  };
  return map[id] || 0;
}

function getKeyTop(id) {
  const map = {
    key1: 340, key2: 340, key3: 340,
    key4: 370, key5: 370, key6: 370,
    key7: 400, key8: 400, key9: 400,
    key0: 430, key10: 430, key: 430,
    keyanswerphone: 470, keyhangup: 470
  };
  return map[id] || 0;
}
