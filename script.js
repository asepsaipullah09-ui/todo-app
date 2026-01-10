let todos = JSON.parse(localStorage.getItem('todos')) || [];

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
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
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
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

    seveTodos();
    renderTodos();
    input.value = "";
});

renderTodos();