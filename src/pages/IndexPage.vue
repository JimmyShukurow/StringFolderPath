<template>
  <q-page class="row items-center justify-evenly">
    <div class="view-side bg-grey-4">
      <div class="parent">
        <q-btn flat dense icon="keyboard_arrow_right" class="folder-arrow" />
        <q-btn
          color="orange-4"
          dense
          flat
          icon="folder"
          class="file-or-folder"
          @click="toggleIcon($event)"
        />
        <input class="folder-name bg-grey-4" v-model="mainParent.name" />
        <q-btn
          color="negative"
          icon="delete"
          round
          dense
          class="q-ml-sm delete-node"
          @click="deleteNode($event)"
          style="display: none"
        />
        <q-btn
          color="green"
          class="q-ml-xl add-sibling"
          icon="add"
          round
          size="10px"
          @click="addSibling($event)"
        />
        <q-btn
          color="blue"
          class="q-ml-xl add-child"
          icon="add"
          round
          size="10px"
          @click="addChild($event)"
        />
        <div class="child row"></div>
      </div>
    </div>
    <q-btn @click="toString">convert</q-btn>
    <div class="string-side bg-grey-4">
      <div class="string-parent">
        &mdash; &nbsp;test/
        <div class="string-child">
          &nbsp;&nbsp;&nbsp;&nbsp; &#9589; &mdash; &nbsp; test/
        </div>
        &mdash; &nbsp;test/
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mainParent = ref({
  name: '',
  child: {},
});
// const result = ref(`&mdash; &nbsp;test/
//       <br />&nbsp;&nbsp;&nbsp;&nbsp; &#9589; &mdash;
//       &nbsp; test/ <br />&nbsp;&nbsp;&nbsp;&nbsp;
//       &#9589; &mdash; &nbsp; test/ <br />
//       &mdash; &nbsp; test/`);
const result = ref('');
const addSibling = (event: Event) => {
  if (event.currentTarget?.closest('.parent')) {
    const parent = event.currentTarget?.closest('.parent');
    const newSibling = parent.cloneNode(true);
    newSibling.setAttribute('id', 'p1');
    newSibling.querySelector('.delete-node').removeAttribute('style');
    newSibling.querySelector('.delete-node').setAttribute('size', '10px');
    const addSiblingButtons = newSibling.querySelectorAll('.add-sibling');
    addSiblingButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addSibling);
    });
    const addChildButtons = newSibling.querySelectorAll('.add-child');
    addChildButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addChild);
    });
    const deleteButtons = newSibling.querySelectorAll('.delete-node');
    deleteButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', deleteNode);
    });
    const iconButtons = newSibling.querySelectorAll('.file-or-folder');
    iconButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', toggleIcon);
    });
    parent.parentNode.insertBefore(newSibling, parent.nextSibling);
    toString();
  }
};
const addChild = (event: Event) => {
  if (event.currentTarget?.closest('.parent')) {
    const parent = event.currentTarget?.closest('.parent');
    const newChild = parent.cloneNode(true);
    parent.querySelector('.folder-arrow').classList.add('rotate-90');
    newChild.setAttribute('id', 'ch1');
    newChild.querySelector('.delete-node').removeAttribute('style');
    newChild.querySelector('.delete-node').setAttribute('size', '10px');
    const addSiblingButtons = newChild.querySelectorAll('.add-sibling');
    addSiblingButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addSibling);
    });
    const addChildButtons = newChild.querySelectorAll('.add-child');
    addChildButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addChild);
    });
    const deleteButtons = newChild.querySelectorAll('.delete-node');
    deleteButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', deleteNode);
    });
    const iconButtons = newChild.querySelectorAll('.file-or-folder');
    iconButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', toggleIcon);
    });
    const childContainer = parent.querySelector('.child');
    if (childContainer) {
      childContainer.appendChild(newChild);
    }
    toString();
  }
};
const deleteNode = (event: Event) => {
  if (event.currentTarget?.closest('.parent')) {
    const parent = event.currentTarget?.closest('.parent');
    const grandparentNode = parent?.parentNode?.parentNode;
    const parentNode = parent?.parentNode;
    parentNode.removeChild(parent);
    var check = grandparentNode.querySelector('.child');
    if (check.querySelectorAll('.parent').length == 0)
      grandparentNode
        .querySelector('.folder-arrow')
        .classList.remove('rotate-90');
  }
  toString();
};

const toString = () => {
  var parentElement = document.querySelector('.view-side');
  var elements = parentElement?.querySelectorAll(':scope > .parent');
  toStringChild(elements);
  result.value = '';
};
const toStringChild = (elements, indent = '') => {
  elements.forEach((element, idx, array) => {
    const icon = element.querySelector('.file-or-folder');
    const iconValue = icon?.querySelector('.q-icon');
    const fileOrFolder = iconValue?.innerHTML;
    const child = element.querySelector('.child');

    result.value += `${indent}&mdash; &nbsp; ${
      element.querySelector('input')?.value
    } `;
    if (fileOrFolder === 'folder') {
      result.value += '/';
    }
    result.value += '<br />';

    if (child && child.querySelectorAll(':scope > .parent').length > 0) {
      const lastIndex = indent.lastIndexOf('&#9589;');
      if (
        elements.length > 1 &&
        idx !== array.length - 1 &&
        child.querySelectorAll(':scope > .parent').length > 1
      )
        result.value += '&nbsp;&nbsp;&nbsp;&nbsp;&#9589;';
      var modifiedIndent;
      if (child.querySelectorAll(':scope > .parent').length == 1) {
        modifiedIndent =
          indent.slice(0, lastIndex).replaceAll('&#9589;', '') +
          '&nbsp;&nbsp;&nbsp;&nbsp;&#9589;';
      } else {
        modifiedIndent = indent + '&nbsp;&nbsp;&nbsp;&nbsp;&#9589;';
      }
      toStringChild(child.querySelectorAll(':scope > .parent'), modifiedIndent);
    }
  });

  var stringView = document.querySelector('.string-side');

  if (stringView) {
    stringView.innerHTML = result.value;
  }
};
const toggleIcon = (event: Event) => {
  if (event.currentTarget?.closest('.parent')) {
    const parent = event.currentTarget?.closest('.parent');
    var icon = parent.querySelector('.file-or-folder');
    var addChildButton = parent.querySelector('.add-child');

    var iconValue = icon?.querySelector('.q-icon');
    if (iconValue.innerHTML == 'folder') {
      iconValue.innerHTML = 'description';

      icon.classList.remove('text-orange-4');
      icon.classList.add('text-green-4');
      addChildButton.classList.add('not-visible');
    } else {
      iconValue.innerHTML = 'folder';

      icon.classList.remove('text-green-4');
      icon.classList.add('text-orange-4');
      addChildButton.classList.remove('not-visible');
    }
  }
  toString();
};
</script>
