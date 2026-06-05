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

function cleanExpired() {
  trackers = trackers.filter(t => daysUntil(t.date) >= 0);
  localStorage.setItem("trackers", JSON.stringify(trackers));
}

function render() {
  cleanExpired();

  trackers.sort((a, b) => new Date(a.date) - new Date(b.date));

  container.innerHTML = "";
  trackers.forEach(t => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-title">Days Until ${t.title}</div>
      <div class="card-days">${daysUntil(t.date)}</div>

      <div class="card-actions">
        <button class="card-btn" onclick="editTracker('${t.id}')">Edit</button>
        <button class="card-btn" onclick="deleteTracker('${t.id}')">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

addBtn.onclick = () => {
  document.getElementById("titleInput").value = "";
  document.getElementById("dateInput").value = "";
  resetSaveHandler();
  modal.style.display = "flex";
};

function deleteTracker(id) {
  trackers = trackers.filter(t => t.id !== id);
  localStorage.setItem("trackers", JSON.stringify(trackers));
  render();
}

function editTracker(id) {
  const t = trackers.find(x => x.id === id);
  if (!t) return;

  document.getElementById("titleInput").value = t.title;
  document.getElementById("dateInput").value = t.date;

  modal.style.display = "flex";

  saveBtn.onclick = () => {
    t.title = document.getElementById("titleInput").value;
    t.date = document.getElementById("dateInput").value;

    localStorage.setItem("trackers", JSON.stringify(trackers));
    modal.style.display = "none";
    render();

    resetSaveHandler();
  };
}

function resetSaveHandler() {
  saveBtn.onclick = () => {
    const title = document.getElementById("titleInput").value;
    const date = document.getElementById("dateInput").value;

    if (!title || !date) return;

    trackers.push({ id: crypto.randomUUID(), title, date });
    localStorage.setItem("trackers", JSON.stringify(trackers));

    modal.style.display = "none";
    render();
  };
}

modal.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

resetSaveHandler();
render();
