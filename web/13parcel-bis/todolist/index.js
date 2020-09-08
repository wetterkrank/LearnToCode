const defaultSettings = {showCompleted: true};
const defaultTodoList = [
    {id: 1, task: 'Покормить черепаху', state: false}, 
    {id: 2, task: 'Полить цветы', state: true}, 
    {id: 3, task: 'Дочитать "Капитал"', state: false}, 
    {id: 4, task: 'Позвонить маме', state: true}, 
    {id: 5, task: 'Заплатить налоги', state: false}
];

// sorts todo list, completed entries last
function sortList(list) {
    const sortByDone = (entryA, entryB) => { return entryA.state - entryB.state; }
    return list.sort(sortByDone);
}

// returns array index of the task with specified id
function getPosById(list, taskId) {
    return list.findIndex(entry => { return entry.id == taskId; });
}

// returns the highest task id
function getMaxId(list) {
    // TODO: reuse ids
    if (list.length == 0) return 0;
    return list.reduce((max, entry) => (entry.id > max ? entry.id : max), list[0].id);
}

export {defaultSettings, defaultTodoList};
export {sortList, getPosById, getMaxId};