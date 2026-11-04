const STORAGE_KEY = "tareas";

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const empty = document.getElementById("empty");

let tareas = load();

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

function render() {
  list.innerHTML = "";
  empty.classList.toggle("hidden", tareas.length > 0);

  tareas.forEach((tarea, i) => {
    const li = document.createElement("li");
    li.className = "item" + (tarea.done ? " done" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = tarea.done;
    check.addEventListener("change", () => {
      tareas[i].done = check.checked;
      save();
      render();
    });

    const span = document.createElement("span");
    span.textContent = tarea.text;

    const del = document.createElement("button");
    del.textContent = "\u00d7";
    del.title = "Eliminar";
    del.addEventListener("click", () => {
      tareas.splice(i, 1);
      save();
      render();
    });

    li.append(check, span, del);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tareas.push({ text, done: false });
  input.value = "";
  save();
  render();
});

render();
