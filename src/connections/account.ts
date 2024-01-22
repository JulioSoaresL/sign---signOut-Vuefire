import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebaseConfig'
import { routes } from '../routes/routes'

interface RegistrationResult {
  success: boolean;
  errorMessage?: string;
}

const registerUser = async (email: string, password: string): Promise<RegistrationResult> => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)
		return { success: true, errorMessage: 'cadastrado' }
	} catch (error) {
		alert('Erro ao cadastrar')
		return { success: false, errorMessage: 'não cadastrado' }
	}
}

const signIn = async (email: string, password: string) => {
	try {
		const credential = await signInWithEmailAndPassword(auth, email, password)
		const token = await credential.user.getIdToken()
		localStorage.setItem('token', token)
		routes.push('/about')
	} catch (err) {
		alert('Não foi possível fazer o login')
		throw new Error('Algo deu errado tente novamente')
	}
}

const logout = async () => {
	try {
		signOut(auth)
		localStorage.removeItem('token')
		routes.push('/')
	} catch (err) {
		throw new Error('Erro ao deslogar')
	}
}

export {
	registerUser,
	signIn,
	logout
}
