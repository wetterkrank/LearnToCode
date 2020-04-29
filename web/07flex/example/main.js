function onClick(element) {
  element.target.classList.toggle('done')
}

function onLoad() {
    document.getElementById("button").addEventListener('click', addTask);
}

function addTask() {

  let taskText = document.getElementById('taskInput').value;
  let ulNode = document.getElementById('tasks');

  let liNode = document.createElement('li');
  const liText = document.createTextNode(taskText);

  liNode.appendChild(liText);
  ulNode.appendChild(liNode);

}

document.addEventListener("click", onClick);
document.addEventListener("DOMContentLoaded", onLoad);
