import { db } from '../connections/firebaseConfig'
import { Timestamp, addDoc, collection } from 'firebase/firestore'

const addTask = async (title: string) => {
	try {
		await addDoc(collection(db,'tasks'), {
			title,
			completed: false,
			created: Timestamp.now()
		})
	} catch (err) {
		alert(err)
	}
}

export {
	addTask
}