import { Lifecycle } from 'common/components';
import { createEffectOn } from 'common/primitives';
import { COMMAND_PRIORITY_LOW, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import { clamp, noop } from 'lodash';
import { JSXElement, Show, createSignal, onCleanup } from 'solid-js';

export type SelectionPopoverProps = {
	editor: LexicalEditor;
	containerRect: DOMRect;
	children?: JSXElement;
};

export function SelectionPopover(props: SelectionPopoverProps): JSXElement {
	/* || Variables */

	let rootEl: HTMLElement;
	let cleanupCmd: () => void = noop;
	const [selectionRect, _setSelectionRect] = createSignal<DOMRect | null>(null);
	const [size, setSize] = createSignal<[number, number]>([0, 0]);
	const [pos, _setPos] = createSignal<[number, number]>([0, 0]);

	const setSelectionRect = () => {
		const selection = window.getSelection();
		if (selection && !selection.isCollapsed) {
			_setSelectionRect(selection.getRangeAt(0).getBoundingClientRect());
		} else {
			_setSelectionRect(null);
		}
		return false;
	};

	const setPos = (
		containerRect: DOMRect,
		selectionRect: DOMRect | null,
		size: [number, number]
	) => {
		if (!selectionRect || !size[0] || !size[1]) return;
		const x = clamp(selectionRect.x - containerRect.x, 0, containerRect.width - size[0]);
		const y =
			selectionRect.y - containerRect.y - size[1] >= 0
				? selectionRect.y - containerRect.y - size[1]
				: selectionRect.y - containerRect.y + selectionRect.height;
		_setPos([x, y]);
	};

	/* || Procedures */

	const onChildrenMount = () => {
		const rect = rootEl.getBoundingClientRect();
		setSize([rect.width, rect.height]);
	};

	createEffectOn(
		() => props.editor,
		(editor) => {
			cleanupCmd();
			cleanupCmd = editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				setSelectionRect,
				COMMAND_PRIORITY_LOW
			);
		}
	);

	createEffectOn([() => props.containerRect, selectionRect, size], (inputs) => setPos(...inputs));

	onCleanup(cleanupCmd);

	/* || JSX */

	return (
		<Show when={selectionRect()}>
			<div
				class="absolute py-2"
				style={{
					left: `${pos()[0]}px`,
					top: `${pos()[1]}px`
				}}
				ref={(el) => (rootEl = el)}
			>
				<div class="flex border bg-surface-1 shadow">
					{props.children}
					<Lifecycle onMount={onChildrenMount} />
				</div>
			</div>
		</Show>
	);
}
