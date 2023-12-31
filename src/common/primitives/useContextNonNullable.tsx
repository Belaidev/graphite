import { Context, useContext } from 'solid-js';

export function useContextNonNullable<T>(context: Context<T>): NonNullable<T> {
	const state = useContext(context);
	if (state === undefined || state === null) throw new Error();
	return state;
}
