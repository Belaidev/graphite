import { Editor } from 'features/editor';
import { SelectionPopover } from 'features/selection-popover';
import { LexicalEditor } from 'lexical';
import { JSXElement, createSignal } from 'solid-js';

export function _Editor(): JSXElement {
	const [editor, setEditor] = createSignal<LexicalEditor>();
	const [containerRect, setContainerRect] = createSignal<DOMRect>();

	return (
		<Editor
			onEditorSet={(editor) => setEditor(editor)}
			onContentResize={(rect) => setContainerRect(rect)}
		>
			<SelectionPopover editor={editor()!} containerRect={containerRect()!}>
				<button class="interactive p-2">🍑</button>
				<button class="interactive p-2">💦</button>
				<button class="interactive p-2">🍆</button>
				<button class="interactive p-2">🍒</button>
			</SelectionPopover>
		</Editor>
	);
}
