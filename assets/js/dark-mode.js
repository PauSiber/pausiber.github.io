const darkModeBtn = document.querySelector(".dark-mode-btn");
const aboutSection = document.querySelector("#hakkimizda");
const eventsSection = document.querySelector("#etkinlikler");
const contactSection = document.querySelector("#contact");
const darkModeIcon = document.querySelector(".dark-mode-icon");
// const moonIcon = document.querySelector("#moonIcon");
// const sunIcon = document.querySelector("#sunIcon");

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  aboutSection.classList.toggle("dark-mode");
  eventsSection.classList.toggle("dark-mode");
  contactSection.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkModeIcon.style.filter = "invert(0)";
    darkModeBtn.style.backgroundColor = "#fff";
  } else {
    darkModeIcon.style.filter = "invert(1)";
    darkModeBtn.style.backgroundColor = "#292929";
  }
});
