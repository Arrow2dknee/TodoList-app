import { getFilters } from "./filters.js";
import { getTodos, toggleTodo, deleteTodo } from "./todos.js";

/**
 * Function: renderTodos(array, object)
 * this function will render a new todo list based on search string
 */
const renderTodos = () => {
  const todoListDOMSelection = document.querySelector("#my-todos-list");
  const { searchText, hideCompleted } = getFilters();
  let filteredTodos = getTodos().filter(todo =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );
  todoListDOMSelection.innerHTML = "";

  // if there are todos to show
  if (filteredTodos.length > 0) {
    if (!hideCompleted) {
      // if checkbox is unchecked, display all todos
      filteredTodos.forEach(todo => {
        const newTodo = generateTodoDOM(todo);
        todoListDOMSelection.appendChild(newTodo);
      });
    } else {
      // if checkbox is checked, display only incomplete todos
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      filteredTodos.forEach(todo => {
        const newTodo = generateTodoDOM(todo);
        todoListDOMSelection.appendChild(newTodo);
      });
    }
  } else {
    // if no todos to show
    const noMatchesFound = document.createElement("p");
    noMatchesFound.textContent = "No To-Do's to show";
    noMatchesFound.classList.add("empty-message");
    todoListDOMSelection.appendChild(noMatchesFound);
  }
};
/**
 * Function: generateTodoDOM(array)
 * generate a todo element and add to DOM
 */
const generateTodoDOM = todo => {
  const newTodoLabel = document.createElement("label");
  const newTodo = document.createElement("div");
  const newCheckBox = document.createElement("input");
  const newText = document.createElement("span");
  const deleteBtn = document.createElement("button");

  //  setup todo checkbox
  newCheckBox.setAttribute("type", "checkbox");
  newCheckBox.checked = todo.completed;
  newCheckBox.addEventListener("change", evt => {
    toggleTodo(todo.id);
    renderTodos();
  });
  newTodo.appendChild(newCheckBox);

  //  setup todo text
  newText.textContent = todo.text;
  if (todo.completed) {
    newText.style.color = "#30a80b";
    newText.style.textDecoration = "line-through";
  } else {
    newText.style.color = "#FF0000";
  }
  newTodo.appendChild(newText);

  // setup the todo container
  newTodoLabel.classList.add("list-item");
  newTodo.classList.add("list-item__container");
  newTodoLabel.appendChild(newTodo);

  //  setup todo delete button
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("button", "button--text");
  deleteBtn.addEventListener("click", evt => {
    deleteTodo(todo.id);
    renderTodos();
  });
  newTodoLabel.appendChild(deleteBtn);

  return newTodoLabel;
};
/**
 * Function: todosLeft(array)
 * this function returns only the count of pending todos
 * based on the completed property of each object present in array.
 */
const todosLeft = todoArray => {
  let count = 0;
  count = todoArray.filter(element => !element.completed);
  return count.length;
};
/**
 * Function: printSummary(array)
 * this function adds a h2 element to DOM and calculates how many of the todos are still
 * incomplete and updates the h2 header accordingly.
 */
const printSummary = array => {
  const incompleteTodosCount = todosLeft(array);
  const plural = incompleteTodosCount == 1 ? "" : "s";
  document.querySelector("#summary").innerHTML = "";
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodosCount} todo${plural} remaining!`;
  document.querySelector("#summary").appendChild(summary);
  summary.classList.add("list-title");
};

// Make sure to set up the exports
export { printSummary, renderTodos };
