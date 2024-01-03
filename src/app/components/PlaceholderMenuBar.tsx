import {
	IconCog,
	IconConsoleLine,
	IconDockLeft,
	IconDockRight,
	IconMagnify
} from 'lib/unplugin-icons';
import { JSXElement } from 'solid-js';

export function _PlaceholderMenuBar(): JSXElement {
	return (
		<div class="flex justify-between bg-surface-1">
			{/* Common commands */}
			<div>
				{/* Open about */}
				<button class="interactive p-2">
					<img class="w-[1em]" src="favicon.svg" alt="Graphite logo" />
				</button>

				{/* Open settings */}
				<button class="interactive p-2">
					<IconCog />
				</button>

				{/* Open page */}
				<button class="interactive p-2">
					<IconMagnify />
				</button>

				{/* Open command palette */}
				<button class="interactive p-2">
					<IconConsoleLine />
				</button>
			</div>

			{/* Tool pane toggles */}
			<div>
				{/* Toggle left */}
				<button class="interactive p-2">
					<IconDockLeft />
				</button>

				{/* Toggle right */}
				<button class="interactive p-2">
					<IconDockRight />
				</button>
			</div>
		</div>
	);
}
