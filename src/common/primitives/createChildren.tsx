import { Accessor, JSXElement, children as createChildrenResolved, createMemo } from 'solid-js';

export function createChildren<T>(children: Accessor<JSXElement>): Accessor<T[]> {
	const childrenResolved = createChildrenResolved(children);
	const childrenMemo = createMemo(() => childrenResolved.toArray() as unknown as T[]);
	return childrenMemo;
}
