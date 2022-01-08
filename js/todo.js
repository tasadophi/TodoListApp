// Selectors
const todoInput = document.querySelector(".todo-input");
const addTodo = document.querySelector(".add-todo");
const filterTodo = document.querySelector(".filter-todo");
const todos = document.querySelector(".todos");

// functions
const removeTodo = (e) => {
    e.target.parentElement.parentElement.parentElement.remove();
};

const addTodoFunc = () => {
    if (todoInput.value);
    else return alert("لطفا چیزی بنویسید");
    if (todoInput.value.length < 20);
    else return alert("حداکثر ۲۰ کاراکتر میتوانید وارد کنید");
    const todo = document.createElement("div");
    const todoIcons = document.createElement("div");
    const todoContent = document.createElement("span");
    const todoCheck = document.createElement("span");
    const todoTrash = document.createElement("span");
    const todoCheckIcon = document.createElement("i");
    const todoTrashIcon = document.createElement("i");
    todoContent.textContent = todoInput.value;
    todoCheckIcon.classList.add("fas", "fa-check-square");
    todoTrashIcon.classList.add("fas", "fa-trash-alt");
    todoCheck.appendChild(todoCheckIcon);
    todoTrash.appendChild(todoTrashIcon);
    todoTrash.addEventListener("click", removeTodo);
    todoIcons.append(todoCheck, todoTrash);
    todoIcons.classList.add("todo__icons");
    todo.append(todoContent, todoIcons);
    todo.classList.add("todo");
    todos.appendChild(todo);
    todoInput.value = "";
};
// events
addTodo.addEventListener("click", addTodoFunc);