<template>
  <div class="form-container">
    <form class="form">
      <h2>Cadastro</h2>
      <input v-model="signupData.email" type="email" placeholder="E-mail">
      <input v-model="signupData.senha" type="password" placeholder="Senha">
      <button @click.prevent="cadastro(signupData.email, signupData.senha)">Cadastrar</button>
    </form>
    <hr>
    <form class="form">
      <h2>Login</h2>
      <input v-model="signinData.email" type="email" placeholder="E-mail">
      <input v-model="signinData.senha" type="password" placeholder="Senha">
      <button @click.prevent="login(signinData.email, signinData.senha)">Entrar</button>
    </form>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { registerUser, signIn } from '../connections/account'

const signupData = reactive({
	email: '',
	senha: ''
})

const signinData = reactive({
	email: '',
	senha: ''
})

const cadastro = async (email:string, senha: string) => {
	try {
		await registerUser(email, senha)
		Object.assign(signupData, { email: '', senha: '' })
		console.log(`Cadastro realizado com sucesso para o e-mail ${email}!`)
	} catch (error) {
		console.error('Erro ao cadastrar usuário:', error)
	}
}

const login = async (email:string, senha: string) => {
	try {
		await signIn(email, senha)
		Object.assign(signinData, { email: '', senha: '' })
		console.log(`Login realizado com sucesso para o e-mail ${email}!`)
	} catch (error) {
		console.error('Erro ao fazer login:', error)
	}
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

hr {
  height: 30dvh;
}

.form {
  width: 45%; /* Ajuste a largura conforme necessário */
  padding: 20px;
  border-radius: 5px;
}

input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>