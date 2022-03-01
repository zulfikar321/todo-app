// CREATE NEW LIST
const inputTodo = document.querySelector("#input-todo");
inputTodo.addEventListener("keypress", (e) => {
  const target = e.key;
  let inputValue = inputTodo.value;
  if (target === "Enter") {
    if (inputValue === "") return;
    createList(inputValue);
    inputTodo.value = "";
  }
  itemLeftDisplay();
});

function createList(value) {
  const list = document.createElement("div");
  const todoList = document.querySelector(".todo-list");
  list.className = "card list draggable";
  list.draggable = true;
  list.innerHTML = `<div class="list-wrapper">
              <div class="dot" onclick="checkedDot(this)">
                <img
                  src="images/icon-check.svg"
                  alt="checked"
                  class="checked"
                />
              </div>
              <p class="text-list" onclick="complete(this)">
                ${value}
              </p>
            </div>
            <img
              src="/images/icon-cross.svg"
              alt="cross"
              class="cross"
              onclick="deleteList(this.parentElement)"
            />
  `;
  todoList.insertAdjacentElement("afterbegin", list);
}
// CREATE NEW LIST

// CHECK ACTIVE DOT & COMPLETE LIST
function complete(text) {
  let dot = text.previousElementSibling;
  if (!dot.classList.contains("dot-checked")) {
    alert("This list not active, Check the active dot first");
    return;
  }
  text.classList.toggle("complete");
  text.parentElement.parentElement.classList.toggle("succes");
  // console.log(text.parentElement.parentElement);
}

function checkedDot(dot) {
  let text = dot.nextElementSibling;
  if (text.classList.contains("complete")) {
    alert("This list already completed");
    return;
  }
  dot.classList.toggle("dot-checked");
  dot.children[0].classList.toggle("on");
  dot.parentElement.parentElement.classList.toggle("active-list");
}

// CHECK ACTIVE DOT & COMPLETE LIST

// DELETE LIST
function deleteList(list) {
  list.remove();
  itemLeftDisplay();
}

const clear = document.querySelector(".clear-list");
clear.onclick = () => {
  const list = document.querySelectorAll(".list");
  list.forEach((el) => {
    if (el.classList.contains("succes")) {
      el.remove();
    }
  });
  itemLeftDisplay();
};
// DELETE LIST

// Item Left
function itemLeftDisplay() {
  let itemLeft = document.querySelector(".item-left");
  const list = document.querySelectorAll(".list");
  itemLeft.innerText = `${list.length} items left`;
}
itemLeftDisplay();
// Item Left

// SORT LIST ACTIVE
const sortList = document.querySelectorAll(".sort-list");
sortList.forEach((list) => {
  list.onclick = () => {
    removeActive();
    list.classList.add("active");
    if (list.innerText === "All") {
      showAll();
    }
    if (list.innerText === "Active") {
      showActive();
    }
    if (list.innerText === "Completed") {
      showComplete();
    }
  };
});
function removeActive() {
  sortList.forEach((list) => list.classList.remove("active"));
}

const list = document.querySelectorAll(".list");
const todoList = document.querySelectorAll(".todo-list");
function showActive() {
  list.forEach((el) => {
    if (!el.classList.contains("active-list")) {
      el.style.display = "none";
    }
  });
}

function showComplete() {
  list.forEach((el) => {
    if (!el.classList.contains("succes")) {
      el.style.display = "none";
    }
  });
}

function showAll() {
  list.forEach((el) => {
    el.style.display = "flex";
  });
}
// SORT LIST ACTIVE

const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

const toggleTheme = document.querySelector(".icon");
const html = document.querySelector("html");
const bg = document.querySelector(".bg");
toggleTheme.onclick = () => {
  toggleTheme.classList.toggle("dark");
  if (toggleTheme.classList.contains("dark")) {
    html.dataset.colorMode = "dark";
    bg.style.backgroundImage = "url('images/bg-desktop-dark.jpg')";
  } else {
    html.dataset.colorMode = "light";
    toggleTheme.setAttribute("src", "images/icon-moon.svg");
    bg.style.backgroundImage = "url('images/bg-desktop-light.jpg')";
  }
};
