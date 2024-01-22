<template>
  <h1 class="font-semibold italic underline font-serif -tracking-tighter">Tarefas</h1>
  <form class="container mt-8 mb-8">
    <input 
      v-model="title" 
      class="w-full p-2 rounded-lg mb-2"
      placeholder="Digite sua tarefa e tecle 'enter'"
      type="text" 
      @keydown.prevent.enter="add(title)"
    />
  </form>
    <ul class="flex-col justify-items-start text-left">
      <li 
        v-for="task in tasks" :key="task.id"
        class="mb-3 space-x-3 w-auto"
      >
      <div class="flex justify-between">
        <div class="flex space-x-3 mr-4 items-center">
          <input 
            v-model="task.completed" 
            type="checkbox" 
            @change="updateTask(task.id, task.completed)" 
          />
          <span :class="{ done: task.completed }">{{ task.title }}</span>
        </div>
        <button class="bg-red-900 p-2" @click="removeTask(task.id)">
          Excluir
        </button>
      </div>
    </li>
    </ul>
  <br>

  <button class="mt-8" @click="logout">sair</button>
  
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
.done {
  text-decoration: line-through;
  color: greenyellow;
}
</style>
