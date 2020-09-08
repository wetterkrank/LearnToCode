'use strict';

// TODO: Mobile-friendly delete icons

let todoList = [];
let settings = {};

const defaultSettings = {showCompleted: true};
const defaultTodoList = [
    {id: 1, task: 'Покормить черепаху', state: false}, 
    {id: 2, task: 'Полить цветы', state: true}, 
    {id: 3, task: 'Дочитать "Капитал"', state: false}, 
    {id: 4, task: 'Позвонить маме', state: true}, 
    {id: 5, task: 'Заплатить налоги', state: false}
];


function toggleItemState(event) {
    // TODO: toggle the item in array first
    let element = event.target.parentElement;
    let itemPos = getPosById(todoList, element.id);
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
        let task = {id:getMaxId(todoList)+1, task: taskText, state:0};
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

function sortList(list) {
    const sortByDone = (entryA, entryB) => { return entryA.state - entryB.state; }
    return list.sort(sortByDone);
}

// returns array index of the task with specified id
function getPosById(list, taskId) {
    return list.findIndex(entry => entry.id == taskId);
}

function getMaxId(list) {
    if (list.length == 0) return 0;
    return list.reduce((max, entry) => (entry.id > max ? entry.id : max), list[0].id);
}

function loadFromLS() {
    let todoStr = localStorage.getItem('todoList');
    let settingsStr = localStorage.getItem('settings');
    // TODO: replace dummy todos with [] when no longer needed:
    todoList = (todoStr) ? JSON.parse(todoStr) : defaultTodoList;
    settings = (settingsStr) ? JSON.parse(settingsStr) : defaultSettings;
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
    todoList.splice(getPosById(todoList, todoElement.id),1);
    saveToLS();
    redrawList();
}

function initOnLoad () {
    loadFromLS();
    todoList = sortList(todoList);
    redrawList();
    displaySettings();
    document.getElementById('showCompleted').addEventListener('click', checkboxClick);
    document.getElementById('newItemInput').addEventListener('keypress', checkForEnter);
    document.getElementById('newItemInput').addEventListener('blur', submitNewItem);
}

document.addEventListener('DOMContentLoaded', initOnLoad);