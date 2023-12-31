import { JSXElement, onCleanup, onMount } from 'solid-js';

export type LifecycleProps = {
	onMount?: () => void;
	onCleanup?: () => void;
	children?: JSXElement;
};

export function Lifecycle(props: LifecycleProps): JSXElement {
	onMount(() => props.onMount?.());
	onCleanup(() => props.onCleanup?.());
	return <>{props.children}</>;
}
