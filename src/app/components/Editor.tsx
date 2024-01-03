import { Editor } from 'features/editor';
import {
	ClearFormattingBtn,
	FormatBoldBtn,
	FormatCodeBtn,
	FormatHighlightBtn,
	FormatItalicBtn,
	FormatMathBtn,
	FormatProvider,
	FormatStrikethroughBtn,
	FormatSubscriptBtn,
	FormatSuperscriptBtn
} from 'features/format';
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
				<FormatProvider editor={editor()!}>
					<FormatBoldBtn />
					<FormatItalicBtn />
					<FormatStrikethroughBtn />
					<FormatHighlightBtn />
					<div class="border-r" />
					<FormatCodeBtn />
					<FormatMathBtn />
					<FormatSubscriptBtn />
					<FormatSuperscriptBtn />
					<div class="border-r" />
					<ClearFormattingBtn />
				</FormatProvider>
			</SelectionPopover>
		</Editor>
	);
}
