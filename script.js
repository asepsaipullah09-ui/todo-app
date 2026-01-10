const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const todoText = input.value.trim();
    if (todoText === '') return;

    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = todoText;

    span.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.border = 'none';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.cursor = 'pointer';

    deleteBtn.addEventListener('click', function() {
        list.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = '';
});