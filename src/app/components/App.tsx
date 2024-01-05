import { EditorProvider } from 'features/editor';
import { JSXElement } from 'solid-js';
import { _Editor, _PlaceholderMenuBar, _PlaceholderTabs } from '.';

export function App(): JSXElement {
	return (
		<>
			<_PlaceholderMenuBar />
			<_PlaceholderTabs>
				<EditorProvider autosaveDelay={100} historyDelay={1000}>
					<_Editor />
				</EditorProvider>
			</_PlaceholderTabs>
		</>
	);
}
