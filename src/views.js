import { getFilters } from './filters.js';
import { getTodos, toggleTodo, deleteTodo } from './todos.js';

/**
 * Function: renderTodos(array, object)
 * this function will render a new todo list based on search string
*/
const renderTodos = () => {

    const { searchText, hideCompleted } = getFilters();
    let filteredTodos = getTodos().filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()));
    document.querySelector('#my-todos-list').innerHTML = '';

    if (!hideCompleted) { // if checkbox is unchecked, display all todos
        filteredTodos.forEach(todo => {
            const newTodo = generateTodoDOM(todo);
            document.querySelector('#my-todos-list').appendChild(newTodo);
        });
    } else {
        // if checkbox is checked, display only incomplete todos
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        filteredTodos.forEach(todo => {
            const newTodo = generateTodoDOM(todo);
            document.querySelector('#my-todos-list').appendChild(newTodo);
        });
    }
}
/**
 * Function: generateTodoDOM(array)
 * generate a todo element and add to DOM
*/
const generateTodoDOM = (todo) => {

    const newTodo = document.createElement('div');
    const newCheckBox = document.createElement('input');
    const newText = document.createElement('span');
    const deleteBtn = document.createElement('button');

    //  setup todo checkbox
    newCheckBox.setAttribute('type', 'checkbox');
    // newCheckBox.style.marginLeft = '30px';
    newCheckBox.style.marginRight = '10px';
    newCheckBox.checked = todo.completed;
    newCheckBox.addEventListener('change', (evt) => {
        toggleTodo(todo.id);
        renderTodos();
    })
    newTodo.appendChild(newCheckBox);

    //  setup todo text
    newText.textContent = todo.text;
    newText.style.fontSize = '20px';
    if (todo.completed) {
        newText.style.color = '#30a80b';
    } else {
        newText.style.color = '#FF0000';
    }
    newTodo.appendChild(newText);

    //  setup todo button
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', (evt) => {
        deleteTodo(todo.id);
        renderTodos();
    })
    newTodo.appendChild(deleteBtn);
    newTodo.style.margin = '10px';
    
    return newTodo;
}
/**
* Function: todosLeft(array)
* this function returns only the count of pending todos 
* based on the completed property of each object present in array.
*/
const todosLeft = (todoArray) => {

    let count = 0;
    count = todoArray.filter((element) => !element.completed)
    return count.length;
}
/**
* Function: printSummary(array)
* this function adds a h2 element to DOM and calculates how many of the todos are still
* incomplete and updates the h2 header accordingly.
*/
const printSummary = (array) => {
    const incompleteTodosCount = todosLeft(array);
    const plural = incompleteTodosCount <= 1 ? '' : 's';
    document.querySelector('#summary').innerHTML = '';
    const summary = document.createElement('h2');
    summary.textContent = `You have ${incompleteTodosCount} todo${plural} remaining!`;
    document.querySelector('#summary').appendChild(summary);
}
// Make sure to set up the exports
export { printSummary, renderTodos };
