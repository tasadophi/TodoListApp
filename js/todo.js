// Selectors
const todoInput = document.querySelector(".todo-input");
const addTodo = document.querySelector(".add-todo");
const filterTodos = document.querySelector(".filter-todos");
const todos = document.querySelector(".todos");

// functions

const createTodo = (content) => {
  const todoObject = JSON.parse(content);
  const todoContent = todoObject.content;
  const todoDone = todoObject.done;
  const todo = `<span>${todoContent}</span><div class="todo__icons"><span><i class="fas fa-check-square"></i></span><span><i class="fas fa-trash-alt"></i></span></div>`;
  const todoEl = document.createElement("div");
  todoEl.innerHTML = todo;
  todoEl.classList.add("todo");
  [...todoEl.childNodes][0].addEventListener("click", checkTodo);
  [...todoEl.childNodes][1].childNodes[0].addEventListener("click", checkTodo);
  [...todoEl.childNodes][1].childNodes[1].addEventListener("click", removeTodo);
  if (todoDone) todoEl.classList.add("done");
  todos.appendChild(todoEl);
};

const renderTodos = (filter = false, filterArrey = false) => {
  if (filter) {
    if (filterArrey.length > 0) {
      filterArrey.forEach((todo) => todo.style.display = "flex");
    }
    return;
  }
  todos.innerHTML = "";
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  if (datas.length > 0) {
    datas.forEach((todo) => createTodo(todo));
  }
};

const filterTodosFunc = (e) => {
  const filter = e.target.value;
  const datas = [...todos.childNodes];
  datas.forEach((todo) => (todo.style.display = "none"));
  let filterTodos;
  if (filter === "all") renderTodos(true, datas);
  else if (filter === "done") {
    filterTodos = datas.filter((todo) => {
      return todo.classList.contains("done");
    });
  } else if (filter === "undone") {
    filterTodos = datas.filter((todo) => {
      return !todo.classList.contains("done");
    });
  }
  renderTodos(true, filterTodos);
};


const checkTodo = (e) => {
  let todoEl;
  if (e.target.nodeName !== "SPAN")
    todoEl = e.target.parentElement.parentElement.parentElement;
  else todoEl = e.target.parentElement;
  todoEl.classList.toggle("done");
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  let todoObject;
  let todoIndex;
  datas.forEach((todo, index) => {
    todo = JSON.parse(todo);
    if (todo.content === todoEl.textContent) {
      todoObject = todo;
      todoIndex = index;
      return;
    }
  });
  datas.splice(todoIndex, 1);
  if (filterTodos.value == "done") {
    todoObject.done = false;
    todoEl.style.display = "none";
  } else if (filterTodos.value == "undone") {
    todoObject.done = true;
    todoEl.style.display = "none";
  } else {
    if (todoObject.done) todoObject.done = false;
    else todoObject.done = true;
  }
  datas.push(JSON.stringify(todoObject));
  localStorage.setItem("datas", JSON.stringify(datas));
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


const addTodoFunc = () => {
  if (todoInput.value);
  else return alert("لطفا چیزی بنویسید");
  if (todoInput.value.length < 20);
  else return alert("حداکثر ۲۰ کاراکتر میتوانید وارد کنید");
  addToStorage(todoInput.value);
  todoInput.value = "";
};


const removeFromStorage = (content) => {
  const datas = JSON.parse(localStorage.getItem("datas")) || [];
  let todoObject;
  let todoIndex;
  datas.forEach((todo, index) => {
    todo = JSON.parse(todo);
    if (todo.content === content){
      todoObject = todo;
      todoIndex = index;
      return;
    }
  })
  datas.splice(todoIndex, 1);
  localStorage.setItem("datas", JSON.stringify(datas));
};


const removeTodo = (e) => {
  const todo = e.target.parentElement.parentElement.parentElement;
  const todoContentEl =
    e.target.parentElement.parentElement.previousElementSibling;
  removeFromStorage(todoContentEl.innerText);
  todo.remove();
};


// events
addTodo.addEventListener("click", addTodoFunc);
todoInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addTodo.click();
  }
});
filterTodos.addEventListener("change", filterTodosFunc);

// onload
renderTodos();
