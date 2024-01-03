import { useContextNonNullable } from 'common/primitives';
import { LexicalEditor } from 'lexical';
import { Accessor, JSXElement, createContext, createMemo } from 'solid-js';

/* || Context */

export type FormatContextProps = {
	editor: Accessor<LexicalEditor>;
};

const _FormatContext = createContext<FormatContextProps>();

export function useFormatContext(): FormatContextProps {
	return useContextNonNullable(_FormatContext);
}

/* || Provider */

export type FormatProviderProps = {
	editor: LexicalEditor;
	children?: JSXElement;
};

export function FormatProvider(props: FormatProviderProps): JSXElement {
	const editor = createMemo(() => props.editor);

	return <_FormatContext.Provider value={{ editor }}>{props.children}</_FormatContext.Provider>;
}
