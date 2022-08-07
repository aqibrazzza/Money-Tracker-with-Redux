import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

export default function TransactionForm() {
	const [transactionName, setTransactionName] = useState("");
	const [amount, setAmount] = useState("");
	const { addDocument, response } = useFirestore("transactions");

	const handleSubmit = (e) => {
		e.preventDefault();
		addDocument({ transactionName, amount });
	};

	useEffect(() => {
		if (response.success) {
			console.log("added document");
			setTransactionName("");
			setAmount("");
		}
	}, [response]);

	return (
		<div className="w-full lg:w-1/2 px-6 rounded-md text-slate-400 py-12 bg-gray-800">
			<form
				onSubmit={handleSubmit}
				className="accent-blue-600 text-gray-50"
			>
				<h2 className="tracking-tight text-2xl">Add a Transaction</h2>

				<div className="mt-8">
					<label>
						<span className="block text-gray-400">
							Transaction Name:
						</span>
						<input
							className="p-3 mt-2 w-full bg-gray-700 rounded"
							type="text"
							onChange={(e) => setTransactionName(e.target.value)}
							value={transactionName}
						/>
					</label>
				</div>

				<div className="mt-4">
					<label>
						<span className="block text-gray-400">Amount ($):</span>
						<input
							className="p-3 mt-2 w-full bg-gray-700 rounded"
							type="text"
							inputMode="numeric"
							onChange={(e) => setAmount(e.target.value)}
							value={amount}
						/>
					</label>
				</div>
				{response.isPending ? (
					<button
						disabled
						type="submit"
						className="font-medium mt-8 py-2 px-4 rounded bg-blue-700 hover:bg-blue-600 active:bg-blue-800"
					>
						Loading ...
					</button>
				) : (
					<button
						type="submit"
						className="font-medium mt-8 py-2 px-4 rounded bg-blue-700 hover:bg-blue-600 active:bg-blue-800"
					>
						Add Transaction
					</button>
				)}
			</form>
		</div>
	);
}
