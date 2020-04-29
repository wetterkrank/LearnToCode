let todoList = [];
let settings = {};

const defaultSettings = {showCompleted: true};
const defaultTodoList = [
    {id:1, task:'Покормить черепаху', state:0}, 
    {id:2, task:'Полить цветы', state:1}, 
    {id:3, task:'Дочитать "Капитал"', state:0}, 
    {id:4, task:'Позвонить маме', state:1}, 
    {id:5, task:'Заплатить налоги', state:0}
];


function toggleItemState(event) {
    // TODO: toggle the item in array first
    let item = event.target;
    item.classList.toggle('done');
    let done = item.classList.contains('done');
    todoList[getPosById(todoList, item.id)].state = (done) ? 1 : 0;
    console.log(todoList[getPosById(todoList, item.id)]);
    saveToLS();
    // TODO: remove only one LI element if done and showCompleted not checked
    displayList();
}

// args: task, position 'top' for the list top or none for bottom
function appendULItem(item, position) {
    if ((!item.state) || (item.state && settings.showCompleted)) {
        let todoUL = document.getElementById('todoUL');
        if (position == 'top') {position = todoUL.firstChild}
        let node = document.createElement('li');
        node.id = item.id;
        if (item.state) node.classList.add('done');
        let textNode = document.createTextNode(item.task);
        node.appendChild(textNode);
        todoUL.insertBefore(node, position);
        addClickEvents([node]);
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

// sets click events for todo items (passed as array)
function addClickEvents(items) {
    let i;
    for (i=0; i<items.length; i++) {
        items[i].addEventListener('click', toggleItemState);
    }
}

// redraws the todo list HTML
function displayList() {
    console.log('redrawing the list...');
    todoList = sortList(todoList);
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
    const sortByDone = (entryA, entryB) => {
        return entryA.state - entryB.state;
    }
    return list.sort(sortByDone);
}

// returns array index of the task with specified id
function getPosById(list, taskId) {
    return list.findIndex(entry => entry.id == taskId);
}

function getMaxId(list) {
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
    displayList();
}

function initOnLoad () {
    loadFromLS();
    displayList();
    displaySettings();
    document.getElementById('showCompleted').addEventListener('click', checkboxClick);
    document.getElementById('newItemInput').addEventListener('keypress', checkForEnter);
    document.getElementById('newItemInput').addEventListener('blur', submitNewItem);
}

document.addEventListener('DOMContentLoaded', initOnLoad);