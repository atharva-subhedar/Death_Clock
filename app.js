// app.js
const overlay = document.getElementById('overlay');
const deathInput = document.getElementById('deathYear');
const yearRing = document.getElementById('yearRing');
const minuteRing = document.getElementById('minuteRing');
const secondRing = document.getElementById('secondRing');
const yearsLeftEl = document.getElementById('yearsLeft');
const timeLeftEl = document.getElementById('timeLeft');
const finalYearEl = document.getElementById('finalYear');

let finalYear = null;
let totalYears = null;
let ringRadius = 200;

function createRing(svg, total, type, radius) {
  svg.setAttribute('viewBox', '-250 -250 500 500');
  svg.innerHTML = '';

  const angleStep = 360 / total;
  for (let i = 0; i < total; i++) {
    const angle = i * angleStep - 90;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('alignment-baseline', 'middle');
    text.setAttribute('fill', '#ccc');
    text.setAttribute('font-size', '12');
    text.setAttribute('transform', `rotate(${angle + 90} ${x} ${y})`);

    if (type === 'year') {
      text.textContent = new Date().getFullYear() + i;
    } else {
      text.textContent = String(i).padStart(2, '0');
    }

    svg.appendChild(text);
  }
}

function startClock() {
  finalYear = parseInt(deathInput.value);
  const currentYear = new Date().getFullYear();
  totalYears = finalYear - currentYear;

  if (isNaN(finalYear) || totalYears <= 0) {
    alert('Please enter a valid future year.');
    return;
  }

  overlay.style.display = 'none';
  finalYearEl.textContent = finalYear;

  createRing(yearRing, totalYears + 1, 'year', 180);
  createRing(minuteRing, 60, 'minute', 140);
  createRing(secondRing, 60, 'second', 100);

  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const end = new Date(finalYear, 0, 1);
  const totalSec = Math.floor((end - now) / 1000);

  const yearsLeft = end.getFullYear() - now.getFullYear();
  const mins = now.getMinutes();
  const secs = now.getSeconds();

  const degY = ((totalYears - yearsLeft) / totalYears) * 360;
  const degM = (mins / 60) * 360;
  const degS = (secs / 60) * 360;

  yearRing.style.transform = `translate(-50%, -50%) rotate(-${degY}deg)`;
  minuteRing.style.transform = `translate(-50%, -50%) rotate(-${degM}deg)`;
  secondRing.style.transform = `translate(-50%, -50%) rotate(-${degS}deg)`;

  yearsLeftEl.textContent = yearsLeft;
  timeLeftEl.textContent = now.toTimeString().split(' ')[0];
}
