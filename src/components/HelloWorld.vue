<template>
  <h1>Tarefas</h1>
  <form>
    <input type="text" v-model="title" @keydown.prevent.enter="add(title)">
  </form>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <input type="checkbox" @change="updateTask(task.id, task.completed)" v-model="task.completed" />
      <span :class="{ done: task.completed }">{{ task.title }}</span>
      <button @click="removeTask(task.id)">Excluir</button>
    </li>
  </ul>
  <br>
  <button @click="logout">sair</button>
  
</template>

<script setup lang="ts">
import { DocumentData } from 'firebase/firestore'
import { logout } from '../connections/account'
import { addTask, getTask, removeTask, updateTask} from '../connections/actions'
import { onMounted, ref } from 'vue'

const title = ref<string>('')
const tasks = ref<DocumentData>(getTask())

const add = (taskTitle: string): void => {
	addTask(taskTitle)
	title.value = ''
}

onMounted(() => {
	tasks.value = getTask().value.map(doc => doc).reverse()
})
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
  line-height: 1.8rem;
  font-size: 18px ;
  font-family: 'Courier New', Courier, monospace;
  li {
    padding: .5rem 0;
    margin: .5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.done {
  text-decoration: line-through;
  color: greenyellow;
}
</style>
