import { combineProps } from '@solid-primitives/props';
import { createChildren } from 'common/primitives';
import { JSXElement, Show, ValidComponent, createMemo, on } from 'solid-js';
import { Dynamic, DynamicProps } from 'solid-js/web';

export type PolymorphProps<T extends ValidComponent = ValidComponent> = DynamicProps<T> & {
	children?: JSXElement;
};

export function Polymorph<T extends ValidComponent>(props: PolymorphProps<T>): JSXElement {
	const children = createChildren<AsProps | JSXElement>(() => props.children);

	const isAsProps = (child: AsProps | JSXElement | undefined): child is AsProps =>
		!!child && typeof child === 'object' && 'component' in child;

	const propsCombined = createMemo(
		on(children, ([child]) => (isAsProps(child) ? combineProps(child, props) : props))
	);

	return (
		// @ts-expect-error
		<Dynamic {...propsCombined()}>
			<Show when={isAsProps(children()[0])} fallback={children() as JSXElement}>
				{(children()[0] as AsProps).children}
			</Show>
		</Dynamic>
	);
}

export type AsProps<T extends ValidComponent = ValidComponent> = DynamicProps<T> & {
	children?: JSXElement;
};

export function As<T extends ValidComponent>(props: AsProps<T>): JSXElement {
	return props as unknown as JSXElement;
}
