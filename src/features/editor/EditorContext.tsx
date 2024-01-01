import { useContextNonNullable } from 'common/primitives';
import { Accessor, JSXElement, createContext, createMemo } from 'solid-js';

/* || Context */

export type EditorContextProps = {
	autosaveDelay: Accessor<number>;
	historyDelay: Accessor<number>;
};

const EditorContext = createContext<EditorContextProps>();

export function useEditorContext(): EditorContextProps {
	return useContextNonNullable(EditorContext);
}

/* || Provider */

export type EditorProviderProps = {
	autosaveDelay: number;
	historyDelay: number;
	children?: JSXElement;
};

export function EditorProvider(props: EditorProviderProps): JSXElement {
	const autosaveDelay = createMemo(() => props.autosaveDelay);
	const historyDelay = createMemo(() => props.historyDelay);

	return (
		<EditorContext.Provider
			value={{
				autosaveDelay,
				historyDelay
			}}
		>
			{props.children}
		</EditorContext.Provider>
	);
}
