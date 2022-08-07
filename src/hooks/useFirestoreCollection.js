import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export default function useFirestoreCollection(collection, _query, _orderBy) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState([]);
	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	useEffect(() => {
		const func = async () => {
			setIsPending(true);
			let ref = await projectFirestore.collection(collection);
			if (query) {
				ref = ref.where(...query);
			}
			if (orderBy) {
				ref = ref.orderBy(...orderBy);
			}
			console.log(ref);
			const unsub = ref.onSnapshot(
				(snapshot) => {
					let result = [];
					snapshot.forEach((doc) => {
						result.push({ id: doc.id, ...doc.data() });
					});
					setDocuments(result);
					setIsPending(false);
					setError(null);
				},
				(error) => {
					setIsPending(false);
					setError(error.message);
					console.log(error.message);
				}
			);
			return () => unsub();
		};

		func();
	}, [collection, orderBy, query]);

	return { isPending, error, documents };
}
