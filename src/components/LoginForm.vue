<template>
  <div class="flex">
    <Transition name="form-transition" mode="out-in">
      <form class="container sm:border sm:rounded-2xl sm:p-10 sm:bg-gray-950" v-if="formChoice === 'login'">
        <h2 class="text-3xl font-semibold mb-8 uppercase">Login</h2>
        <input 
          v-model="signinData.email" 
          class="w-full p-4 rounded-md mb-2" 
          type="email" placeholder="E-mail"
        />
        <input 
          v-model="signinData.senha" 
          class="w-full p-4 rounded-md mb-2"
          type="password" placeholder="Senha"
        />
        <button
          class="bg-lime-700 w-full mt-4 rounded-3xl"
          @click.prevent="login(signinData.email, signinData.senha)"
        >
          Entrar
        </button>
        <p class="mt-8">
          Não possui conta? 
          <a @click.prevent="formChoice = 'register'" class="cursor-pointer underline text-gray-300">
            Crie aqui
          </a>
        </p>
      </form>

      <form class="container sm:border sm:rounded-2xl sm:p-10 sm:bg-gray-950" v-else>
        <h2 class="text-3xl font-semibold mb-8 uppercase">Cadastro</h2>
        <input 
          v-model="signupData.email" 
          class="w-full p-4 rounded-md mb-2"
          type="email" placeholder="E-mail"
        />
        <input 
          v-model="signupData.senha"
          class="w-full p-4 rounded-md mb-2"
          type="password" placeholder="Senha"
        />
        <button
          class="bg-lime-700 w-full mt-4 rounded-3xl"
          @click.prevent="cadastro(signupData.email, signupData.senha)"
        >
          Cadastrar
        </button>
        <p class="mt-8">
          Já possui conta? 
          <a @click.prevent="formChoice = 'login'" class="cursor-pointer underline text-gray-300">
            Faça login
          </a>
        </p>
      </form>
    </Transition>

  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { registerUser, signIn } from '../connections/account'

const formChoice = ref('login')

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
.form-transition-enter-active, .form-transition-leave-active {
  transition: opacity 0.8s, transform 0.8s;
}
.form-transition-enter, .form-transition-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>