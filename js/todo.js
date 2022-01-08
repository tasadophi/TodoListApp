// Selectors
const todoInput = document.querySelector(".todo-input");
const addTodo = document.querySelector(".add-todo");
const filterTodos = document.querySelector(".filter-todos");
const todos = document.querySelector(".todos");

// functions

const createTodo = (content) => {
  const todoObject = JSON.parse(content);
  const todo = document.createElement("div");
  const todoIcons = document.createElement("div");
  const todoContent = document.createElement("span");
  const todoCheck = document.createElement("span");
  const todoTrash = document.createElement("span");
  const todoCheckIcon = document.createElement("i");
  const todoTrashIcon = document.createElement("i");
  todoContent.textContent = todoObject.content;
  if (todoObject.done) todoContent.classList.add("done");
  todoContent.addEventListener("click", checkTodo);
  todoCheckIcon.classList.add("fas", "fa-check-square");
  todoTrashIcon.classList.add("fas", "fa-trash-alt");
  todoCheck.appendChild(todoCheckIcon);
  todoTrash.appendChild(todoTrashIcon);
  todoTrash.addEventListener("click", removeTodo);
  todoCheck.addEventListener("click", checkTodo);
  todoIcons.append(todoCheck, todoTrash);
  todoIcons.classList.add("todo__icons");
  todo.append(todoContent, todoIcons);
  todo.classList.add("todo");
  todos.appendChild(todo);
};

const renderTodos = (filter = false, filterArrey = false) => {
  todos.innerHTML = "";
  if (filter) {
    if (filterArrey.length > 0) {
      filterArrey.forEach((todo) => createTodo(todo));
    }
    return;
  }
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  if (datas.length > 0) {
    datas.forEach((todo) => createTodo(todo, true));
  }
};

const filterTodosFunc = (e) => {
  let filter = e.target.value;
  filter =
    filter === "همه" ? "all" : filter === "انجام شده" ? "done" : "undone";
  if (filter === "all") renderTodos();
  else if (filter === "done") {
    const datas = JSON.parse(localStorage.getItem("datas")) || [];
    const doneTodos = [];
    datas.forEach((todo) => {
      todo = JSON.parse(todo);
      if (todo.done) doneTodos.push(JSON.stringify(todo));
    });
    renderTodos(true, doneTodos);
  } else if (filter === "undone") {
    const datas = JSON.parse(localStorage.getItem("datas")) || [];
    const undoneTodos = [];
    datas.forEach((todo) => {
      todo = JSON.parse(todo);
      if (!todo.done) undoneTodos.push(JSON.stringify(todo));
    });
    renderTodos(true, undoneTodos);
  }
};

const addToStorage = (content) => {
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  let todo = {
    content: content,
    done: false,
  };
  todo = JSON.stringify(todo);
  if (datas.includes(todo)) return alert("این تودو در لیست وجود دارد");
  datas.push(todo);
  createTodo(todo);
  localStorage.setItem("datas", JSON.stringify(datas));
};

const removeFromStorage = (content) => {
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  datas.splice(datas.indexOf(content), 1);
  localStorage.setItem("datas", JSON.stringify(datas));
};

const checkTodo = (e) => {
  let todoContentEl;
  if (e.target.nodeName !== "SPAN")
    todoContentEl = e.target.parentElement.parentElement.previousElementSibling;
  else todoContentEl = e.target;
  todoContentEl.classList.toggle("done");
  let datas = JSON.parse(localStorage.getItem("datas")) || [];
  let todoObject;
  let todoIndex;
  datas.forEach((todo, index) => {
    todo = JSON.parse(todo);
    if (todo.content === todoContentEl.textContent) {
      todoObject = todo;
      todoIndex = index;
      return;
    }
  });
  datas.splice(todoIndex, 1);
  if (filterTodos.value == "انجام شده") {
    todoObject.done = false;
    e.target.parentElement.remove();
  } else if (filterTodos.value == "انجام نشده") {
    todoObject.done = true;
    e.target.parentElement.remove();
  } else {
    if (todoObject.done) todoObject.done = false;
    else todoObject.done = true;
  }
  datas.push(JSON.stringify(todoObject));
  localStorage.setItem("datas", JSON.stringify(datas));
};

const removeTodo = (e) => {
  const todo = e.target.parentElement.parentElement.parentElement;
  const todoContentEl =
    e.target.parentElement.parentElement.previousElementSibling;
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
todoInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13){
        console.log(e)
        e.preventDefault();
        addTodo.click();
    };
});
filterTodos.addEventListener("change", filterTodosFunc);

// onload
renderTodos();
