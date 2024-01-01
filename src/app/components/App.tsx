import { Editor, EditorProvider } from 'features/editor';
import { JSXElement } from 'solid-js';
import { PlaceholderMenuBar, PlaceholderTabs } from '.';

export function App(): JSXElement {
	return (
		<>
			<PlaceholderMenuBar />
			<PlaceholderTabs>
				<EditorProvider autosaveDelay={100} historyDelay={1000}>
					<Editor />
				</EditorProvider>
			</PlaceholderTabs>
		</>
	);
}
