let begenaTuning = {};

// Fetch tuning data from JSON
async function loadBegenaTuning() {
  try {
    const response = await fetch("Assets/begenaTuning.json");
    begenaTuning = await response.json();

    populateScales();
    updateMajors();
    renderNotes(scaleSelector.value, majorSelector.value);
  } catch (err) {
    console.error("Error loading tuning data:", err);
  }
}

// Elements
const scaleSelector = document.getElementById("scale-selector");
const majorSelector = document.getElementById("major-selector");
const notesContainer = document.getElementById("notes-container");

// Play sound
function playSound(soundName) {
  soundName = soundName.replace("#", "sharp");
  const audio = new Audio(`Assets/sounds/${soundName}.mp3`);
  audio.play();

  const button = document.querySelector(`button[data-sound="${soundName}"]`);
  if (button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 150);
  }
}

// Render majors based on scale
function updateMajors() {
  majorSelector.innerHTML = "";
  const selectedScale = scaleSelector.value;
  if (!begenaTuning[selectedScale]) return;

  Object.keys(begenaTuning[selectedScale]).forEach(major => {
    const option = document.createElement("option");
    option.value = major;
    option.textContent = major;
    majorSelector.appendChild(option);
  });
}

// Render notes for chosen scale & major
function renderNotes(scaleName, majorName) {
  notesContainer.innerHTML = "";
  if (!begenaTuning[scaleName] || !begenaTuning[scaleName][majorName]) return;

  const notes = begenaTuning[scaleName][majorName];
  notes.forEach(note => {
    const btn = document.createElement("button");
    btn.textContent = note;
    btn.dataset.sound = note;
    btn.addEventListener("click", () => playSound(note));
    notesContainer.appendChild(btn);
  });

  updateKeyBindings(notes); // Update keys dynamically
}

// Dynamic key bindings
let keyMapDynamic = {};
const keys = ["q", "w", "e", "r", "t"]; // For 5-string Begena

function updateKeyBindings(notes) {
  keyMapDynamic = {};
  notes.forEach((note, i) => {
    if (keys[i]) keyMapDynamic[keys[i]] = note;
  });
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (keyMapDynamic[key]) {
    playSound(keyMapDynamic[key]);
  }
});

// Event listeners for selectors
scaleSelector.addEventListener("change", () => {
  updateMajors();
  renderNotes(scaleSelector.value, majorSelector.value);
});

majorSelector.addEventListener("change", () => {
  renderNotes(scaleSelector.value, majorSelector.value);
});

// Dynamically populate the scale selector
function populateScales() {
  scaleSelector.innerHTML = "";
  Object.keys(begenaTuning).forEach(scale => {
    const option = document.createElement("option");
    option.value = scale;
    option.textContent = scale;
    scaleSelector.appendChild(option);
  });
}

// Initialize
loadBegenaTuning();