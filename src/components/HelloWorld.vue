<template>
  <h1>Logado</h1>
  {{ user?.email }}
  <ul>
    <li v-for="todo in teste" :key="todo._uid">
    {{ todo.title }}</li>
  </ul>
  <button @click="addTask('teste')">add</button>  
  <button @click="logout">sair</button>
  <br>
  
</template>

<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
import { logout } from '../connections/account'
import { addTask, getTask} from '../connections/actions'

const teste = getTask()

const user = useCurrentUser()

</script>

<style scoped>
</style>
