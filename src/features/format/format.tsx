import { FORMAT_TEXT_COMMAND, LexicalEditor, TextFormatType } from 'lexical';

export function _format(editor: LexicalEditor, format: TextFormatType): boolean {
	return editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
}
