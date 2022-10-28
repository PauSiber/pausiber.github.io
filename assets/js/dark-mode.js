const darkModeBtn = document.querySelector(".dark-mode-btn");
const darkModeIcon = document.querySelector(".dark-mode-icon");
const promoSection = document.querySelector("#promo");
const aboutSection = document.querySelector("#hakkimizda");
const featuresSection = document.querySelector("#neler-yapariz");
const eventsSection = document.querySelector("#etkinlikler");
const twitterSection = document.querySelector("#twitter");
const contactSection = document.querySelector("#contact");
// const moonIcon = document.querySelector("#moonIcon");
// const sunIcon = document.querySelector("#sunIcon");

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  aboutSection.classList.toggle("dark-mode");
  eventsSection.classList.toggle("dark-mode");
  contactSection.classList.toggle("dark-mode");
  promoSection.classList.toggle("dark-mode-blue");
  featuresSection.classList.toggle("dark-mode-blue");
  twitterSection.classList.toggle("dark-mode-blue");
  if (document.body.classList.contains("dark-mode")) {
    darkModeIcon.style.filter = "invert(0)";
    darkModeBtn.style.backgroundColor = "#fff";
  } else {
    darkModeIcon.style.filter = "invert(1)";
    darkModeBtn.style.backgroundColor = "#292929";
  }
});
