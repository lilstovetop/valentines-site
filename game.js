const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const actions = document.getElementById("actions");
const result = document.getElementById("result");
const hearts = document.getElementById("hearts");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const replayBtn = document.getElementById("replayBtn");
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const card = document.getElementById("card");
const collageBg = document.getElementById("collageBg");
const bgm = document.getElementById("bgm");
const finalGif = document.getElementById("finalGif");

const collageImages = [
  "Photos/photo-01.jpg",
  "Photos/photo-02.jpg",
  "Photos/photo-03.jpg",
  "Photos/photo-04.jpg",
  "Photos/photo-05.jpg",
  "Photos/photo-06.jpg",
  "Photos/photo-07.jpg",
  "Photos/photo-08.jpg",
  "Photos/photo-09.jpg",
  "Photos/photo-10.jpg",
  "Photos/photo-11.jpg",
  "Photos/photo-12.jpg",
  "Photos/photo-13.jpg",
  "Photos/photo-14.jpg",
  "Photos/photo-15.jpg",
  "Photos/photo-16.jpg",
  "Photos/photo-17.jpg",
  "Photos/photo-18.jpg",
  "Photos/photo-19.jpg",
  "Photos/photo-20.jpg",
  "Photos/photo-21.jpg",
  "Photos/photo-22.jpg",
  "Photos/photo-23.jpg",
  "Photos/photo-24.jpg",
  "Photos/photo-25.jpg",
];

const original = {
  title: title.textContent,
  subtitle: subtitle.textContent,
};

let noMoves = 0;

function buildCollage() {
  if (!collageBg) return;

  const cellSize = window.innerWidth <= 520 ? 92 : 120;
  const cols = Math.ceil(window.innerWidth / (cellSize + 8));
  const rows = Math.ceil(window.innerHeight / (cellSize + 8));
  const total = Math.max(cols * rows + cols, collageImages.length);
  const ordered = [...collageImages].sort(() => Math.random() - 0.5);

  for (let index = 0; index < total; index += 1) {
    const src = ordered[index % ordered.length];
    const tile = document.createElement("div");
    const img = document.createElement("img");

    tile.className = "collage-tile";
    img.src = src;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";

    tile.style.setProperty("--r", `${(Math.random() * 2.4 - 1.2).toFixed(2)}deg`);
    tile.style.setProperty("--s", `${(Math.random() * 0.06 + 0.97).toFixed(2)}`);
    tile.style.animationDelay = `${index * 20}ms`;
    tile.appendChild(img);
    collageBg.appendChild(tile);
  }
}

function openEnvelope() {
  envelope.classList.add("opening");
  openBtn.disabled = true;
  document.body.classList.add("proposal-open");
  if (bgm) {
    bgm.play().catch(() => {});
  }

  setTimeout(() => {
    envelope.hidden = true;
    card.hidden = false;
  }, 650);
}

function moveNoButton() {
  if (actions.hidden) return;

  const containerRect = actions.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, containerRect.width - btnRect.width);
  const maxY = Math.max(0, containerRect.height - btnRect.height);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noMoves += 1;

  if (noMoves === 3) {
    subtitle.textContent = "Okay, the No button is a little shy.";
  }
  if (noMoves === 6) {
    subtitle.textContent = "It keeps running away because it knows the answer.";
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const size = 12 + Math.random() * 16;
  const startLeft = 15 + Math.random() * 70;
  const startTop = 65 + Math.random() * 20;
  const driftX = (Math.random() * 120 - 60).toFixed(1);
  const driftY = (-120 - Math.random() * 120).toFixed(1);

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${startLeft}%`;
  heart.style.top = `${startTop}%`;
  heart.style.setProperty("--x", `${driftX}px`);
  heart.style.setProperty("--y", `${driftY}px`);

  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 2600);
}

function celebrate() {
  for (let i = 0; i < 24; i += 1) {
    setTimeout(createHeart, i * 80);
  }
}

function onYes() {
  actions.hidden = true;
  result.hidden = false;
  card.classList.add("final-state");
  title.textContent = "You just made my day.";
  subtitle.textContent = "It’s a date.";
  if (noBtn && noBtn.parentElement) {
    noBtn.remove();
  }
  celebrate();
}

function onReplay() {
  actions.hidden = false;
  result.hidden = true;
  card.classList.remove("final-state");
  title.textContent = original.title;
  subtitle.textContent = original.subtitle;
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noMoves = 0;
  hearts.innerHTML = "";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("pointerdown", moveNoButton);

yesBtn.addEventListener("click", onYes);
replayBtn.addEventListener("click", onReplay);
openBtn.addEventListener("click", openEnvelope);

if (finalGif) {
  finalGif.addEventListener("load", () => {
    finalGif.hidden = false;
  });
  finalGif.addEventListener("error", () => {
    finalGif.hidden = true;
  });
}

buildCollage();
