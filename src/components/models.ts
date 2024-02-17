export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

// Create parent div
const parentDiv = document.createElement('div');
parentDiv.classList.add('parent');

// Create q-btn elements
const qBtn1 = document.createElement('q-btn');
qBtn1.setAttribute('flat', '');
qBtn1.setAttribute('dense', '');
qBtn1.setAttribute('icon', 'keyboard_arrow_right');
qBtn1.classList.add('');

const qBtn2 = document.createElement('q-btn');
qBtn2.setAttribute('color', 'orange-4');
qBtn2.setAttribute('dense', '');
qBtn2.setAttribute('flat', '');
qBtn2.setAttribute('icon', 'folder');

// Create input element
const inputElement = document.createElement('input');
inputElement.setAttribute('class', 'folder-name bg-grey-4');
inputElement.setAttribute('v-model', 'mainParent.name');

// Create q-btn elements for addSibling and addChild
const addSiblingBtn = document.createElement('q-btn');
addSiblingBtn.setAttribute('color', 'green');
addSiblingBtn.classList.add('q-ml-xl', 'add-sibling');
addSiblingBtn.setAttribute('icon', 'add');
addSiblingBtn.setAttribute('round', '');
addSiblingBtn.setAttribute('size', '10px');
addSiblingBtn.addEventListener('click', addSibling);

const addChildBtn = document.createElement('q-btn');
addChildBtn.setAttribute('color', 'blue');
addChildBtn.classList.add('q-ml-xl', 'add-child');
addChildBtn.setAttribute('icon', 'add');
addChildBtn.setAttribute('round', '');
addChildBtn.setAttribute('size', '10px');
addChildBtn.addEventListener('click', addChild);

// Create child div
const childDiv = document.createElement('div');
childDiv.classList.add('child', 'row');

// Append all elements to the parent div
parentDiv.appendChild(qBtn1);
parentDiv.appendChild(qBtn2);
parentDiv.appendChild(inputElement);
parentDiv.appendChild(addSiblingBtn);
parentDiv.appendChild(addChildBtn);
parentDiv.appendChild(childDiv);
