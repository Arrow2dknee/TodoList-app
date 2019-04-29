import { getSavedTodos, createTodo, getTodos } from "./todos.js";
import { setFilters } from "./filters.js";
import { printSummary, renderTodos } from "./views.js";

// Render initial todos
printSummary(getTodos());
renderTodos();

// Set up search text handler
document.querySelector("#search-todo").addEventListener("input", evt => {
  const checkboxValue = document.querySelector("#checkbox").checked;
  setFilters({
    searchText: evt.target.value,
    hideCompleted: checkboxValue
  });
  renderTodos();
  printSummary(getTodos());
});
// Set up checkbox handler
document.querySelector("#checkbox").addEventListener("change", evt => {
  setFilters({
    hideCompleted: evt.target.checked
  });
  renderTodos();
  printSummary(getTodos());
});
// Set up form submission handler
document.querySelector("#todo-form").addEventListener("submit", evt => {
  evt.preventDefault();
  const newTodo = evt.target.elements.todoForm.value.trim();
  if (newTodo.length > 0) {
    createTodo(newTodo);
    renderTodos();
    printSummary(getTodos());
  }
  evt.target.elements.todoForm.value = "";
});

// Add a watcher for local storage
window.addEventListener("storage", evt => {
  if (evt.key === "todos") {
    getSavedTodos();
    renderTodos();
  }
});
