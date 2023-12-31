import { Accessor, AccessorArray, createEffect, on } from 'solid-js';

export type CreateEffectOnCb<T, U, V extends U | undefined = U | undefined> = [U] extends undefined
	? (input: T, prevInput: T | undefined) => void
	: (input: T, prevInput: T | undefined, prevVal: V) => U;

export type CreateEffectOnOpts = {
	name?: string;
	render?: boolean;
	defer?: boolean;
};

/**
 * Combines SolidJS's `createEffect` and `on` for simplified usage.
 *
 * @param deps - Dependencies that trigger the effect.
 * @param cb - Callback function that executes when dependencies change.
 * @param defVal - Optional default value for the effect.
 * @param opts - Optional configuration object. `{ defer: true }` is permitted only if `defVal` is `undefined`.
 */
export function createEffectOn<T, U>(
	deps: Accessor<T> | AccessorArray<T>,
	cb: CreateEffectOnCb<T, U>,
	defVal: undefined,
	opts?: CreateEffectOnOpts
): void;
export function createEffectOn<T, U>(
	deps: Accessor<T> | AccessorArray<T>,
	cb: CreateEffectOnCb<T, U, U>,
	defVal: U,
	// The default value is not utilized by 'createEffect' when '{ defer: true }'. To make this behavior explicit, forbid deferring the effect if the default value is not undefined.
	opts?: Omit<CreateEffectOnOpts, 'defer'> & { defer?: false }
): void;
export function createEffectOn<T, U>(
	deps: Accessor<T> | AccessorArray<T>,
	cb: CreateEffectOnCb<T, U>,
	defVal?: U,
	opts?: CreateEffectOnOpts
): void {
	createEffect(on(deps, cb, opts ?? {}), defVal, opts);
}
