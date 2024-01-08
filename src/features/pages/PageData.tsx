import { SerializedEditorState } from 'lexical';

export type PageData = {
	id: number;
	title?: string;
	state?: SerializedEditorState;
};
