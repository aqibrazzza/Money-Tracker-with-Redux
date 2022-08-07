import { useReducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { useSelector } from "react-redux";

export const useFirestore = (collection) => {
	const { user } = useSelector((state) => state.user);

	const firestoreReducer = (state, action) => {
		switch (action.type) {
			case "PENDING":
				return {
					isPending: true,
					error: null,
					success: false,
					document: null,
				};

			case "ADDED_DOCUMENT":
				return {
					document: action.payload,
					isPending: false,
					error: null,
					success: true,
				};

			case "DELETED_DOCUMENT":
				return {
					document: action.payload,
					isPending: false,
					error: null,
					success: true,
				};

			case "ERROR":
				return {
					error: action.payload,
					isPending: false,
					success: false,
					document: null,
				};
			default:
				return state;
		}
	};

	const [response, dispatch] = useReducer(firestoreReducer, {
		document: null,
		isPending: false,
		error: null,
		success: false,
	});

	// reference to firestore collection
	const ref = projectFirestore.collection(collection);
	//document creation timestamp
	const createdAt = timestamp.fromDate(new Date());

	//add a document to firestore
	const addDocument = async (doc) => {
		try {
			dispatch({ type: "PENDING" });
			const addedDocument = await ref.add({
				...doc,
				uid: user.uid,
				createdAt,
			});
			dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
		} catch (error) {
			dispatch({ type: "ERROR", payload: error.message });
		}
	};

	//delete a document from firestore
	const deleteDocument = async (id) => {
		console.log(id);
		try {
			dispatch({ type: "PENDING" });
			const deletedDocument = await ref.doc(id).delete();
			console.log(deletedDocument);
			dispatch({ type: "DELETED_DOCUMENT", payload: deletedDocument });
		} catch (error) {
			dispatch({ type: "ERROR", payload: error.message });
		}
	};

	return { addDocument, deleteDocument, response };
};
