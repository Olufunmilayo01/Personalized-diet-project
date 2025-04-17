document.addEventListener("DOMContentLoaded", (event) => {
  const currentYear = new Date().getFullYear();
  // Set the copyright year in the first paragraph of the footer
  document.getElementById("currentYear").textContent = ` ${currentYear}`;

  // Get the last modified date of the document
  const lastModified = document.lastModified;
  // Set the last modified date in the second paragraph of the footer
  document.getElementById(
    "lastModified"
  ).textContent = `Last Modified: ${lastModified}`;
});

const hamburgerElement = document.querySelector("#myButton");
const navElement = document.querySelector(".menuLinks");

hamburgerElement.addEventListener("click", () => {
  navElement.classList.toggle("open");
  hamburgerElement.classList.toggle("open");

  if (navElement.classList.contains("open")) {
    hamburgerElement.textContent = "❎";
  } else {
    hamburgerElement.textContent = "☰";
  }
});
