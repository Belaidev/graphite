import { $getNearestBlockElementAncestorOrThrow } from '@lexical/utils';
import { $getSelection, $isRangeSelection, $isTextNode, LexicalEditor } from 'lexical';

/**
 * Based on Lexical Playground's [`ToolbarPlugin`](https://github.com/facebook/lexical/blob/ac61359777161743e2c647ddfc42b0df61ff5144/packages/lexical-playground/src/plugins/ToolbarPlugin/index.tsx#L741).
 */
export function _clearFormatting(editor: LexicalEditor): void {
	editor.update(() => {
		const selection = $getSelection();
		if (!$isRangeSelection(selection)) return;

		const anchor = selection.anchor;
		const focus = selection.focus;
		const nodes = selection.getNodes();
		if (anchor.key === focus.key && anchor.offset === focus.offset) return;

		nodes.forEach((node, idx) => {
			if (!$isTextNode(node)) return;

			// Use a local variable instead of the parameter to preserve type refinement
			let textNode = node;
			if (idx === 0 && anchor.offset !== 0) {
				textNode = textNode.splitText(anchor.offset)[1] || textNode;
			}
			if (idx === nodes.length - 1) {
				textNode = textNode.splitText(focus.offset)[0] || textNode;
			}
			if (textNode.__style !== '') {
				textNode.setStyle('');
			}
			if (textNode.__format !== 0) {
				textNode.setFormat(0);
				$getNearestBlockElementAncestorOrThrow(textNode).setFormat('');
			}
			node = textNode;
		});
	});
}
