let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function renderTodos() {
    list.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach((todo, index) => {
        if (filteredTodos.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.className = "empty";
            emptyMsg.textContent = "No todos here.";
            list.appendChild(emptyMsg);
            return;
        }

        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement("span");
        span.textContent = todo.text;

        span.addEventListener('click', function() {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.style.border = "none";
        deleteBtn.style.background = "transparent";
        deleteBtn.style.cursor = "pointer";

        deleteBtn.addEventListener('click', function() {
            li.style.opacity = "0";
            li.style.transform = "translateX(20px)";
            
            setTimeout(() => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            }, 300);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const todoText = input.value.trim();
    if (todoText === "") return;

    todos.push({
        text: todoText,
        completed: false
    });

    saveTodos();
    renderTodos();
    input.value = "";
});

const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach((btn) => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        currentFilter = this.dataset.filter;
        renderTodos();
    });
});

renderTodos();

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");

// cek tema tersimpan
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "Light";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "Dark";
    }
});

console.log("Dark active:", document.body.classList.contains("dark"));