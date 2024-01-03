import { IconClose, IconPlus } from 'lib/unplugin-icons';
import { For, JSXElement } from 'solid-js';

export type _PlaceholderTabsProps = {
	children?: JSXElement;
};

export function _PlaceholderTabs(props: _PlaceholderTabsProps): JSXElement {
	const tabNames = ['Untitled 1', 'Untitled 2'];

	return (
		<div class="flex flex-col">
			{/* Tab bar */}
			<div class="flex bg-surface-2 [&>*:not(:last-child)]:border-r">
				{/* Tabs */}
				<For each={tabNames}>
					{(name, i) => (
						// Tab
						<div
							class="interactive flex w-32 items-center border-b data-[active=true]:border-b-surface-1 data-[active=true]:bg-surface-1"
							data-active={i() === 0}
							draggable={true}
						>
							{/* Tab name */}
							<button class="flex-1 p-2 text-left text-sm leading-none">{name}</button>

							{/* Close tab */}
							<button class="interactive p-2">
								<IconClose />
							</button>
						</div>
					)}
				</For>

				{/* Common commands */}
				<div class="flex-grow border-b bg-surface-2">
					<button class="interactive p-2">
						<IconPlus />
					</button>
				</div>
			</div>

			{/* Current tab content */}
			{props.children}
		</div>
	);
}
