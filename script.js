const container = document.getElementById("container");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("saveBtn");
const addBtn = document.getElementById("addBtn");

let trackers = JSON.parse(localStorage.getItem("trackers") || "[]");

function daysUntil(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function render() {
  container.innerHTML = "";
  trackers.forEach(t => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-title">Days Until ${t.title}</div>
      <div class="card-days">${daysUntil(t.date)}</div>
    `;

    container.appendChild(card);
  });
}

addBtn.onclick = () => {
  modal.style.display = "flex";
};

saveBtn.onclick = () => {
  const title = document.getElementById("titleInput").value;
  const date = document.getElementById("dateInput").value;

  if (!title || !date) return;

  trackers.push({ title, date });
  localStorage.setItem("trackers", JSON.stringify(trackers));

  modal.style.display = "none";
  render();
};

modal.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

render();
