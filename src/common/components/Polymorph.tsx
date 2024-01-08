import { combineProps } from '@solid-primitives/props';
import { JSXElement, ValidComponent, createMemo } from 'solid-js';
import { Dynamic, DynamicProps } from 'solid-js/web';

export type PolymorphProps<T extends ValidComponent> = DynamicProps<T> & {
	as?: JSXElement;
	children?: JSXElement;
};

export function Polymorph<T extends ValidComponent>(props: PolymorphProps<T>): JSXElement {
	const propsCombined = createMemo<PolymorphProps<ValidComponent>>(() =>
		props.as ? combineProps(props.as as unknown as AsProps<ValidComponent>, props) : props
	);

	return <Dynamic {...propsCombined()}>{props.children}</Dynamic>;
}

export type AsProps<T extends ValidComponent> = Omit<DynamicProps<T>, 'component'> & {
	component?: JSXElement;
	children?: JSXElement;
};

export function As<T extends ValidComponent>(props: AsProps<T>): JSXElement {
	return props as unknown as JSXElement;
}
