import * as tl from './todolist/index.js'; 

let todoList = [];
let settings = {};

function toggleItemState(event) {
    // TODO: toggle the item in array first
    let element = event.target.parentElement;
    let itemPos = tl.getPosById(todoList, element.id);
    console.log('Toggle item done:', element, todoList[itemPos]);
    element.classList.toggle('done');
    let done = element.classList.contains('done');
    todoList[itemPos].state = done;
    saveToLS();
    if (!settings.showCompleted && done) element.remove();
}

// args: task, position 'top' for the list top or none for bottom
// TODO: make the whole LI an object?
function appendULItem(item, position) {
    if ((!item.state) || (item.state && settings.showCompleted)) {
        let todoUL = document.getElementById('todoUL');
        if (position == 'top') {position = todoUL.firstChild}
        let li = document.createElement('li');
        li.id = item.id;
        if (item.state) li.classList.add('done');
        let checkBtn = document.createElement('button');
        checkBtn.classList.add('doneCheckbox');
        checkBtn.setAttribute('type', 'button');
        let textDiv = document.createElement('div');
        textDiv.classList.add('text');
        let textNode = document.createTextNode(item.task);
        textDiv.appendChild(textNode);
        let trashBtn = document.createElement('div');
        trashBtn.classList.add('trashButton');
        li.appendChild(checkBtn);
        li.appendChild(textDiv);
        li.appendChild(trashBtn);
        todoUL.insertBefore(li, position);
        checkBtn.addEventListener('click', toggleItemState);
        // textDiv.addEventListener('click', editItem);
        trashBtn.addEventListener('click', deleteItem);
    }
}

// take submitted task, add task into array, update HTML, save to LS, clear input
function submitNewItem(event) {
    let taskText = event.target.value;
    if (taskText) {
        let task = {id:tl.getMaxId(todoList)+1, task: taskText, state:0};
        todoList.unshift(task);
        appendULItem(task, 'top');
        saveToLS();
        event.target.value = '';
    }
}

// listener for textarea to submit on Enter instead of newline
function checkForEnter(event) {
    if (event.which === 13) {
        submitNewItem(event);
        event.preventDefault();
    }
}

// redraws the todo list HTML
function redrawList() {
    console.log('Redrawing the list');
    let todoUL = document.getElementById('todoUL');
    todoUL.innerHTML = '';
    todoList.forEach(entry => appendULItem(entry));
}

// redraws the settings HTML
function displaySettings() {
    let checkbox = document.getElementById('showCompleted');
    checkbox.checked = settings.showCompleted;
}

function loadFromLS() {
    let todoStr = localStorage.getItem('todoList');
    let settingsStr = localStorage.getItem('settings');
    // TODO: replace dummy todos with [] when no longer needed:
    todoList = (todoStr) ? JSON.parse(todoStr) : tl.defaultTodoList;
    settings = (settingsStr) ? JSON.parse(settingsStr) : tl.defaultSettings;
// temporary
window.todoList = todoList;
window.settings = settings;
}

function saveToLS() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('settings', JSON.stringify(settings));
}

function checkboxClick(event) {
    settings.showCompleted = event.target.checked;
    saveToLS();
    redrawList();
}

function deleteItem(event) {
    // TODO: to avoid using stopPropagation, separate click areas
    event.stopPropagation();
    let todoElement = event.target.parentElement;
    console.log('Delete:', todoElement);
    todoList.splice(tl.getPosById(todoList, todoElement.id),1);
    saveToLS();
    redrawList();
}

function initOnLoad () {
    loadFromLS();
    todoList = tl.sortList(todoList);
    redrawList();
    displaySettings();
    document.getElementById('showCompleted').addEventListener('click', checkboxClick);
    document.getElementById('newItemInput').addEventListener('keypress', checkForEnter);
    document.getElementById('newItemInput').addEventListener('blur', submitNewItem);
}

document.addEventListener('DOMContentLoaded', initOnLoad);
