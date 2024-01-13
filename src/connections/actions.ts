import { useCollection, useCurrentUser, useDocument } from 'vuefire'
import { db } from '../connections/firebaseConfig'
import { Timestamp, addDoc, collection, doc} from 'firebase/firestore'

const addTask = async (title: string) => {
	try {

		const user = useCurrentUser().value
		if (user?.uid !== null) {
			const uid = user!.uid
			
			await addDoc(collection(db,'task'), {
				_uid: uid,
				title,
				completed: false,
				created: Timestamp.now()
			})
			console.log(uid)
		}
	} catch (err) {
		alert(err)
	}
}

const getTask = () => {
	try {
		const uid = useCurrentUser().value?.uid
		const colec = useCollection(collection(db, 'task'))
		const userTasks = useDocument(doc(db, 'task', 'dwjxc454HVU9nnwfWiv2'))
		return colec
	} catch (err) {
		return ''
	}
}

export {
	addTask,
	getTask
}