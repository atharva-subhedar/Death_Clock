const yearRing = document.getElementById("yearRing");
const minuteRing = document.getElementById("minuteRing");
const secondRing = document.getElementById("secondRing");
const labelText = document.getElementById("labelText");
const quoteBox = document.getElementById("quoteBox");
const milestoneBox = document.getElementById("milestoneBox");
const chime = document.getElementById("chime");

const quotes = [
  "“You may delay, but time will not.” – Benjamin Franklin",
  "“Lost time is never found again.”",
  "“The future depends on what you do today.” – Gandhi",
  "“Someday” is a disease that will take your dreams to the grave.",
  "“Time is what we want most, but what we use worst.”"
];

let lastMinute = -1;

function startClock() {
  const deathYear = parseInt(document.getElementById("deathYear").value);
  const currentYear = new Date().getFullYear();
  if (!deathYear || deathYear <= currentYear) {
    alert("Enter a valid future year.");
    return;
  }

  document.getElementById("clockContainer").style.display = "block";
  const endDate = new Date(`January 1, ${deathYear} 00:00:00`).getTime();

  setInterval(() => {
    const now = new Date();
    const distance = endDate - now;
    const yearsLeft = deathYear - now.getFullYear();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    yearRing.style.strokeDashoffset = (879 * (1 - (yearsLeft / (deathYear - currentYear)))).toFixed(2);
    minuteRing.style.strokeDashoffset = (691 * (minutes / 60)).toFixed(2);
    secondRing.style.strokeDashoffset = (503 * (seconds / 60)).toFixed(2);

    labelText.innerText = `${yearsLeft}y ${59 - minutes}m ${59 - seconds}s left`;

    // Play chime + quote every new minute
    if (minutes !== lastMinute) {
      lastMinute = minutes;
      chime.play();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      quoteBox.innerText = randomQuote;
      milestoneBox.innerText = `🎉 Another minute closer. Make it count.`;
      setTimeout(() => milestoneBox.innerText = "", 5000);
    }

  }, 1000);
}

// Goal logic
function addGoal() {
  const input = document.getElementById("goalInput");
  const text = input.value.trim();
  if (!text) return;
  const list = document.getElementById("goalList");
  const div = document.createElement("div");
  div.className = "goal-item";
  div.innerHTML = `<span>${text}</span><button onclick="markDone(this)">Done</button>`;
  list.appendChild(div);
  input.value = "";
}

function markDone(btn) {
  const item = btn.parentElement;
  item.classList.toggle("done");
  btn.innerText = item.classList.contains("done") ? "Undo" : "Done";
}
