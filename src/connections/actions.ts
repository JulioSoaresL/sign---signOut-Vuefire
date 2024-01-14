import { useCollection, useCurrentUser } from 'vuefire'
import { db } from '../connections/firebaseConfig'
import { Timestamp, addDoc, collection, deleteDoc, doc, updateDoc} from 'firebase/firestore'

const addTask = async (title: string): Promise<void> => {
	try {
		const user = useCurrentUser().value

		if (!user || !user.uid) throw new Error('Usuário não autenticado ou UID não disponível.')

		await addDoc(collection(db, user.uid), {
			title,
			completed: false,
			created: Timestamp.now()
		})

	} catch (error) {
		throw new Error('Não foi possível adicionar tarefa.')
	}
}

const removeTask = async (taskUid: string): Promise<void> => {
	try {
		const currentUser = useCurrentUser().value
		if (!currentUser || !currentUser.uid) throw new Error('Usuário não autenticado.')

		await deleteDoc(doc(db, currentUser.uid, taskUid))
	} catch (error) {
		throw new Error('Erro ao remover tarefa.')
	}
}

const getTask = () => {
	try {
		const currentUser = useCurrentUser().value

		if (!currentUser || !currentUser.uid) throw new Error('Usuário não autenticado.')

		const taskCollection = collection(db, currentUser.uid)
		const querySnapshot = useCollection(taskCollection)

		return querySnapshot
	} catch (error) {
		throw new Error('Erro ao obter tarefas.')
	}
}

const updateTask = async (taskUid: string, change: boolean): Promise<void> => {
	try {
		const currentUser = useCurrentUser().value
		if (!currentUser || !currentUser.uid) throw new Error('Usuário não autenticado.')

		const docRef = doc(db, currentUser.uid, taskUid)
		await updateDoc(docRef, {
			completed: change
		})

	} catch (error) {
		throw new Error('Erro ao atualizar tarefa.')
	}
}

export {
	addTask,
	getTask,
	removeTask,
	updateTask
}