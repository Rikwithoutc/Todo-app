const todoForm = document.querySelector('form');
const todoInput = document.getElementById('task-input');
const todoListUL = document.getElementById('task-list');
const clearAll = document.querySelector('.clear-all');

let todoTasks = getTodos();
updateTodo();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    todoInput.value='';
})

clearAll.addEventListener('click', (e) => {
    todoTasks = [];
    saveTodos();
    updateTodo();
})


function addTodo() {
    let input = todoInput.value;
    if(input) {
        const todoObj = {
            task: input,
            completed: false
        }
        todoTasks.push(todoObj);
        updateTodo();
        saveTodos();
        // console.log(todoTasks);
    }
}

function updateTodo() {
    todoListUL.innerHTML = '';
    todoTasks.forEach((element, index) => {
        
        const todoLI = document.createElement('li');
        todoLI.classList.add('task');
        todoLI.innerHTML = `
        <input type="checkbox" id="todo-${index}">
        <label for="todo-${index}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>  
        </label>
        <label for="todo-${index}" class="todo-text">
            ${element.task}
        </label>
        <div class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
        </div>
        `;

        todoListUL.appendChild(todoLI);

        const deleteButton = todoLI.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });

        const checkbox = todoLI.querySelector("input");
        checkbox.addEventListener('change', (e) => {
            todoTasks[index].completed = checkbox.checked;
            saveTodos();
        })
        checkbox.checked = element.completed;
        
        return todoLI;
    });
}


function deleteTask(index) {
     todoTasks = todoTasks.filter((_, i) => i !== index);
     saveTodos();
     updateTodo();
}


function saveTodos() {
    const todoJson = JSON.stringify(todoTasks);
    localStorage.setItem('todos', todoJson);
}

// saveTodos();

function getTodos() {
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}