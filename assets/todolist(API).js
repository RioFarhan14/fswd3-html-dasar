const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todocomplete = document.querySelector(".complete-btn");
const tododelete = document.querySelector(".trash-btn")
const filterOption = document.querySelector(".filter-todo");
const btnYes = document.querySelector(".yes");
const btnNo = document.querySelector(".no");

const loaded = document.addEventListener("DOMContentLoaded", getAPITodos);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodo);
todoList.addEventListener("click",deleteCheck);

function addTodo(event) {
  event.preventDefault();
  if (todoInput.value === "") {
    // check if input value is empty
    document.getElementById("warning").style.display = "inline";
    return;
  } else {
    document.getElementById("warning").style.display = "none";
    const data = todoInput.value;
    const todo = {data: data,status: 'incomplete'};
      fetch("https://crudcrud.com/api/e653c6a4fee7475f90443dd2a6067378/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        // call getAPITodos() to reload the updated todo list
        getAPITodos();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add todo. Please try again.");
      });
      todoInput.value = '';
    }

    }
  
function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;
  if (item.classList[0] === "complete-btn") {
    completedTodos(todo);
    return;
  }
  else if (item.classList[0] === "trash-btn") {
  document.getElementById("bgpop").style.display = "block";
  btnYes.addEventListener("click", () => {
    document.getElementById("bgpop").style.display = "none";
      try {
        removeAPITodos(todo);
      } catch (error) {
        console.log(error);
        alert("Failed to delete todo. Please try again.");
      }
    
  })};

  btnNo.addEventListener("click", () => {
    // revert to original value here
    document.getElementById("bgpop").style.display = "none";
    return;
  });
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function getAPITodos() {
  todoList.innerHTML = "";
   fetch("https://crudcrud.com/api/e653c6a4fee7475f90443dd2a6067378/todos")
    .then((response) => response.json())
    .then((data) => {
      data.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo.data;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.setAttribute("dataid",todo._id);
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.setAttribute("dataid",todo._id);
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
        if(todo.status == "complete"){
          todoDiv.classList.toggle("completed");
        }
      });
    })
    .catch((error) => console.log(error));
}

function removeAPITodos(todo) {
  const todoIndex = todo.querySelector('.trash-btn').getAttribute("dataid");
  fetch(
    `https://crudcrud.com/api/e653c6a4fee7475f90443dd2a6067378/todos/`+ todoIndex,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(() => {
      getAPITodos();
    })
}
function completedTodos(todo) {
  const dataupdate = todo.querySelector('.todo-item').innerText;
  const todoIndex = todo.querySelector('.complete-btn').getAttribute("dataid");
  const update = {data: dataupdate,status: 'complete'};
  fetch(
    `https://crudcrud.com/api/e653c6a4fee7475f90443dd2a6067378/todos/`+ todoIndex,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update)

    }
  )
    .then(() => {
      getAPITodos();
    })
}
