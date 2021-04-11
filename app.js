'use strict';

const inputEl = document.querySelector('input');
const todoContainerEl = document.querySelector('.todo-container');

let todoArr = localStorage.getItem('todo')
  ? JSON.parse(localStorage.getItem('todo'))
  : [];

console.log(todoArr);

function validData(e) {
  if (e.key === 'Enter') {
    if (inputEl.value !== '') {
      storeData();
      showData();
    }
  }
}

function storeData() {
  const random = new Date().getTime();
  todoArr.push({ id: random, todo: inputEl.value });

  inputEl.value = '';

  //data store to LS
  localStorage.setItem('todo', JSON.stringify(todoArr));
}

function showData() {
  todoContainerEl.innerHTML = '';

  todoArr.forEach((el) => {
    const div = document.createElement('div');

    div.classList.add('content');

    div.innerHTML = `
		<p class="close" id=${el.id} onclick="delTodo(event)">X</p>
		<p class="work">${el.todo}</p>
		`;

    todoContainerEl.appendChild(div);
  });
}

showData();

function delTodo(e) {
  const id = +e.target.id;
  todoArr = todoArr.filter((el) => {
    if (el.id !== id) return el;
  });

  showData();

  //update data store to LS
  localStorage.setItem('todo', JSON.stringify(todoArr));
}

inputEl.addEventListener('keyup', validData);
