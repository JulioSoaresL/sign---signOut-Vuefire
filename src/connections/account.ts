import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseConfig'

interface RegistrationResult {
  success: boolean;
  errorMessage?: string;
}

const registerUser = async (email: string, password: string): Promise<RegistrationResult> => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)
		console.log('cadastrado')
		return { success: true, errorMessage: 'cadastrado' }
	} catch (error) {
		console.log(error)
		console.log('não cadastrado')
		return { success: false, errorMessage: 'não cadastrado' }
	}
}

const signIn = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
		alert('logado')
	} catch (err) {
		alert('n logado')
	}
}

export {
	registerUser,
	signIn
}
