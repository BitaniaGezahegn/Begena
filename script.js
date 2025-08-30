// Full Begena Scale & Major Mapping
const begenaTuning = {
  Selamta: {
    "A#1 Major": ["D#2", "A#1", "C2", "G2", "F2"],
    "C2 Major": ["F2", "C2", "D2", "A2", "G2"]
    // Add more majors...
  },
  Ambasel: {
    "A1 Major": ["E2", "A1", "B1", "F#2", "D2"],
    "C2 Major": ["G2", "C2", "D2", "A2", "F2"]
    // Add more majors...
  },
  // Add other scales...
};

// Elements
const scaleSelector = document.getElementById("scale-selector");
const majorSelector = document.getElementById("major-selector");
const notesContainer = document.getElementById("notes-container");

// Play sound
function playSound(soundName) {
    
  soundName = soundName.replace("#", "sharp");

  const audio = new Audio(`sounds/${soundName}.mp3`);
  audio.play();

  const button = document.querySelector(`button[data-sound="${soundName}"]`);
  if (button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 150);
  }
}

// Render majors based on scale
function updateMajors(scaleName) {
  majorSelector.innerHTML = "";
  const majors = Object.keys(begenaTuning[scaleName]);
  majors.forEach(major => {
    const option = document.createElement("option");
    option.value = major;
    option.textContent = major;
    majorSelector.appendChild(option);
  });
}

// Render notes for chosen scale & major
function renderNotes(scaleName, majorName) {
  notesContainer.innerHTML = "";
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
  updateMajors(scaleSelector.value);
  renderNotes(scaleSelector.value, majorSelector.value);
});

majorSelector.addEventListener("change", () => {
  renderNotes(scaleSelector.value, majorSelector.value);
});

// Dynamically populate the scale selector
function populateScales() {
  const scaleSelector = document.getElementById("scale-selector");
  scaleSelector.innerHTML = "";

  Object.keys(begenaTuning).forEach(scale => {
    const option = document.createElement("option");
    option.value = scale;
    option.textContent = scale;
    scaleSelector.appendChild(option);
  });
}

// Initialize
populateScales();
updateMajors(scaleSelector.value);
renderNotes(scaleSelector.value, majorSelector.value);