export function newIdGen(seq = 0): () => number {
	let id = seq;
	const genId = () => {
		if (id >= Number.MAX_SAFE_INTEGER)
			throw new Error(
				'ID value is greater than or equal to the maximum safe integer in JavaScript. Cannot generate new ID.'
			);
		return ++id;
	};
	return genId;
}
