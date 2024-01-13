import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseConfig'
import { routes } from '../routes/routes'

interface RegistrationResult {
  success: boolean;
  errorMessage?: string;
}

const registerUser = async (email: string, password: string): Promise<RegistrationResult> => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)
		alert('cadastrado com sucesso')
		return { success: true, errorMessage: 'cadastrado' }
	} catch (error) {
		return { success: false, errorMessage: 'não cadastrado' }
	}
}

const signIn = async (email: string, password: string) => {
	try {
		const credential = await signInWithEmailAndPassword(auth, email, password)
		const token = await credential.user.getIdToken()
		localStorage.setItem('token', token)
		routes.push('/about')
		alert('logado')
	} catch (err) {
		alert('n logado')
	}
}

const logout = async () => {
	try {
		await auth.signOut()
		localStorage.removeItem('token')
		routes.push('/')
	} catch (err) {
		return 'deslogado'
	}
}

export {
	registerUser,
	signIn,
	logout
}
