import uuidv4 from 'uuid/v4'; 
import { printSummary } from './views.js'
// Setup the empty todos array
let todos = [];

/**
 * Function: getSavedTodos()
 * fetch existing todos from local storage
*/
function getSavedTodos() {
    
    const todoJSON = localStorage.getItem('todos');
    try {
        if (todoJSON) { // when json does not contain null value
            todos = JSON.parse(todoJSON);
        } else {
            todos = [];
        }
    } catch (e) {
        todos = []; // if the data in local storage was invalid,
        // then reset the local storage with an empty array
    } 
} 
/**
 * Function: saveTodos()
 * save all todos to local storage
*/
const saveTodos = () => {
    localStorage.setItem('todos',JSON.stringify(todos));
}
/**
 * Function: getTodos()
 * returns the todos array
 */
const getTodos = () => todos;
/**
 * Function: createTodo(todo)
 * creates a new todo and adds to array
 */
const createTodo = (newTodo) => {
    if (newTodo.length > 0) {
        todos.push({
            id: uuidv4(),
            text: newTodo,
            completed: false
        });
    }
    saveTodos();
}
/**
 * Function: deleteTodo()
 * delete a todo based on user interaction 
 * the todo will be deleted from DOM and array as well.
 */
const deleteTodo = (uniqueID) => {
    const getPosition = todos.findIndex(todo => todo.id === uniqueID);
    if (getPosition > -1) {
        todos.splice(getPosition, 1);
        saveTodos();
        printSummary(todos);
    }
}
/**
 * Function toggleTodo(id)
 * reacts when the checkbox is clicked
 * and subsequently toggles whether todo is completed or not
 */
const toggleTodo = (todoID) => {
    const todo = todos.find(todo => todo.id == todoID);
    todo.completed = !todo.completed;
    saveTodos();
    printSummary(todos);
}

getSavedTodos();
export { getSavedTodos, createTodo, getTodos, saveTodos, deleteTodo, toggleTodo };