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

	const setPos = (selectionRect: DOMRect | null, size: [number, number]) => {
		if (!selectionRect || !size[0] || !size[1]) return;
		console.log(selectionRect.height);
		const x = clamp(
			selectionRect.x - props.containerRect.x,
			0,
			props.containerRect.width - size[0]
		);
		const y =
			selectionRect.y - props.containerRect.y - size[1] >= 0
				? selectionRect.y - props.containerRect.y - size[1]
				: selectionRect.y - props.containerRect.y + selectionRect.height;
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

	createEffectOn([selectionRect, size], ([selectionRect, size]) => setPos(selectionRect, size));

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
				<div class="flex border bg-surface-1 drop-shadow">
					{props.children}
					<Lifecycle onMount={onChildrenMount} />
				</div>
			</div>
		</Show>
	);
}
