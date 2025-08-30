document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    const soundName = button.dataset.sound;
    const audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();
  });
});