// Selectors
const todoInput = document.querySelector(".todo-input");
const addTodo = document.querySelector(".add-todo");
const filterTodos = document.querySelector(".filter-todos");
const todos = document.querySelector(".todos");

// functions

const createTodo = (content) => {
  const todo = document.createElement("div");
  const todoIcons = document.createElement("div");
  const todoContent = document.createElement("span");
  const todoCheck = document.createElement("span");
  const todoTrash = document.createElement("span");
  const todoCheckIcon = document.createElement("i");
  const todoTrashIcon = document.createElement("i");
  todoContent.textContent = content;
  todoContent.addEventListener("click", checkTodo);
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
};

const renderTodos = () => {
  todos.innerHTML = "";
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  if (datas.length > 0) {
    datas.forEach(todo => createTodo(todo));
  }
};

const addToStorage = (content) => {
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  const todo = content;
  if (datas.includes(todo)) return alert("این تودو در لیست وجود دارد");
  datas.push(todo);
  createTodo(todoInput.value);
  localStorage.setItem("datas", JSON.stringify(datas));
};

const removeFromStorage = (content) => {
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  datas.splice(datas.indexOf(content), 1);
  localStorage.setItem("datas", JSON.stringify(datas));
};

const checkTodo = (e) => {
  e.target.classList.toggle("done");
};

const removeTodo = (e) => {
    const todo = e.target.parentElement.parentElement.parentElement;
    const todoContentEl = e.target.parentElement.parentElement.previousElementSibling;
    removeFromStorage(todoContentEl.innerText);
    todo.remove();
};

const addTodoFunc = () => {
  if (todoInput.value);
  else return alert("لطفا چیزی بنویسید");
  if (todoInput.value.length < 20);
  else return alert("حداکثر ۲۰ کاراکتر میتوانید وارد کنید");
  addToStorage(todoInput.value);
  todoInput.value = "";
};
// events
addTodo.addEventListener("click", addTodoFunc);

// onload
renderTodos();