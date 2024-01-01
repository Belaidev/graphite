import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { registerRichText } from '@lexical/rich-text';
import {
	$selectAll,
	COMMAND_PRIORITY_LOW,
	EditorState,
	KEY_MODIFIER_COMMAND,
	LexicalEditor,
	createEditor
} from 'lexical';
import { debounce } from 'lodash';
import { JSXElement, Show, createSignal, onCleanup, onMount, untrack } from 'solid-js';
import { useEditorContext } from '.';

export type EditorProps = {
	onEditorSet?: (editor: LexicalEditor) => void;
	onContentResize?: (contentRect: DOMRect) => void;
	children?: JSXElement;
};

export function Editor(props: EditorProps): JSXElement {
	/* || Variables */

	const { autosaveDelay, historyDelay } = useEditorContext();

	let contentEl: HTMLElement;
	const editor = createEditor();
	const [empty, setEmpty] = createSignal(true);

	const loadState = () => {
		const serializedState = localStorage.getItem('editorState');
		if (!serializedState) return;
		const state = editor.parseEditorState(serializedState);
		editor.setEditorState(state);
	};

	const saveState = debounce(
		(state: EditorState) => localStorage.setItem('editorState', JSON.stringify(state)),
		autosaveDelay()
	);

	/* || Procedures */

	untrack(() => props.onEditorSet?.(editor));
	loadState();
	onCleanup(editor.registerTextContentListener((content) => setEmpty(!content)));
	onCleanup(editor.registerUpdateListener(({ editorState }) => saveState(editorState)));

	// Register an editor command to reliably handle the 'select all' browser command. This is necessary because the browser's native behavior for this command is inconsistent with other selection methods.
	onCleanup(
		editor.registerCommand(
			KEY_MODIFIER_COMMAND,
			(e) => {
				if (e.ctrlKey && e.key.toLowerCase() === 'a') {
					e.preventDefault();
					$selectAll();
				}
				return true;
			},
			COMMAND_PRIORITY_LOW
		)
	);

	onMount(() => {
		editor.setRootElement(contentEl);
		registerRichText(editor);
		const historyState = createEmptyHistoryState();
		registerHistory(editor, historyState, historyDelay());

		const resizeObserver = new ResizeObserver(
			() => props.onContentResize?.(contentEl.getBoundingClientRect())
		);
		onCleanup(() => resizeObserver.disconnect());
		resizeObserver.observe(contentEl);
	});

	/* || JSX */

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			class="flex flex-grow cursor-text flex-col items-center p-8"
			onClick={() => contentEl.focus()}
		>
			<div class="relative h-full w-full max-w-[75ch]" style={{ 'font-family': 'Noto Serif' }}>
				{/* Content */}
				<div
					class="text-on-surface-1 outline-none"
					contentEditable={true}
					spellcheck={false}
					ref={(el) => (contentEl = el)}
				/>

				{/* Placeholder */}
				<Show when={empty()}>
					<p class="pointer-events-none absolute top-0 -z-10 text-on-surface-3">
						Write something...
					</p>
				</Show>

				{/* Popovers */}
				{props.children}
			</div>
		</div>
	);
}
