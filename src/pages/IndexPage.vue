<template>
  <q-page class="row items-center justify-evenly">
    <div class="view-side bg-grey-4">
      <div class="parent">
        <q-btn flat dense icon="keyboard_arrow_right" class="" />
        <q-btn color="orange-4" dense flat icon="folder" />
        <input class="folder-name bg-grey-4" v-model="mainParent.name" />
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
    <div class="string-side bg-grey-4">
      &mdash; &mdash; &mdash; &nbsp;{{ mainParent.name }}/
      <br />&#9589;&nbsp;&nbsp;&nbsp;&nbsp; &#9589; &mdash; &mdash; &mdash;
      &nbsp; {{ mainParent.name }} / <br />
      &mdash; &mdash; &mdash; &nbsp; {{ mainParent.name }} /
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rawParent = ref();
const rawChild = ref();

const mainParent = ref({
  name: '',
  child: {},
});
const addSibling = (event: Event) => {
  if (event.currentTarget?.closest('.parent')) {
    const parent = event.currentTarget?.closest('.parent');

    const newSibling = parent.cloneNode(true);

    const addSiblingButtons = newSibling.querySelectorAll('.add-sibling');

    addSiblingButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addSibling);
    });

    const addChildButtons = newSibling.querySelectorAll('.add-child');

    addChildButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addChild);
    });

    parent.parentNode.insertBefore(newSibling, parent.nextSibling);
  }
};
const addChild = (event: Event) => {
  if (event.currentTarget?.closest('.parent')) {
    const parent = event.currentTarget?.closest('.parent');

    const newChild = parent.cloneNode(true);
    const addSiblingButtons = newChild.querySelectorAll('.add-sibling');

    addSiblingButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addSibling);
    });
    const addChildButtons = newChild.querySelectorAll('.add-child');

    addChildButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', addChild);
    });

    const childContainer = parent.querySelector('.child');
    if (childContainer) {
      childContainer.appendChild(newChild);
    }
  }
};
</script>
