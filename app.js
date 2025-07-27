// app.js
const overlay = document.getElementById("overlay");
const deathInput = document.getElementById("deathYear");
const yearsLeftSpan = document.getElementById("yearsLeft");
const timeLeftSpan = document.getElementById("timeLeft");
const finalYearSpan = document.getElementById("finalYear");

let deathYear;

function startClock() {
  deathYear = parseInt(deathInput.value);
  if (!deathYear || deathYear < new Date().getFullYear()) {
    alert("Please enter a valid future year.");
    return;
  }
  overlay.style.display = "none";
  finalYearSpan.textContent = deathYear;
  generateRings();
  updateTime();
  setInterval(updateTime, 1000);
}

function generateRings() {
  const currentYear = new Date().getFullYear();
  const totalYears = deathYear - currentYear;
  const yearRing = document.getElementById("yearRing");
  const minuteRing = document.getElementById("minuteRing");
  const secondRing = document.getElementById("secondRing");

  createRing(yearRing, totalYears + 1, "year", 200);
  createRing(minuteRing, 60, "minute", 140);
  createRing(secondRing, 60, "second", 80);
}

function createRing(svg, segments, type, radius) {
  svg.innerHTML = "";
  const center = radius;
  svg.setAttribute("width", radius * 2);
  svg.setAttribute("height", radius * 2);

  for (let i = 0; i < segments; i++) {
    const angle = (360 / segments) * i;
    const x = center + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = center + radius * Math.sin((angle - 90) * Math.PI / 180);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.setAttribute("fill", "#ccc");
    text.setAttribute("font-size", "12");
    text.setAttribute("transform", `rotate(${angle}, ${x}, ${y})`);

    if (type === "year") {
      text.textContent = new Date().getFullYear() + i;
    } else {
      text.textContent = (i < 10 ? "0" : "") + i;
    }

    svg.appendChild(text);
  }
}

function updateTime() {
  const now = new Date();
  const end = new Date(deathYear, 0, 1);
  const diff = end - now;

  if (diff <= 0) {
    yearsLeftSpan.textContent = "0";
    timeLeftSpan.textContent = "00:00:00";
    return;
  }

  const years = deathYear - now.getFullYear();
  const hours = 23 - now.getHours();
  const minutes = 59 - now.getMinutes();
  const seconds = 59 - now.getSeconds();

  yearsLeftSpan.textContent = years;
  timeLeftSpan.textContent = `${hours.toString().padStart(2, '0')} : ${minutes
    .toString()
    .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;

  // Rotate rings
  document.getElementById("secondRing").style.transform = `translate(-50%, -50%) rotate(-${6 * now.getSeconds()}deg)`;
  document.getElementById("minuteRing").style.transform = `translate(-50%, -50%) rotate(-${6 * now.getMinutes()}deg)`;
  const yearProgress = ((deathYear - now.getFullYear()) / (deathYear - (new Date().getFullYear()))) * 360;
  document.getElementById("yearRing").style.transform = `translate(-50%, -50%) rotate(-${yearProgress}deg)`;
}
