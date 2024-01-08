import { Polymorph } from 'common/components';
import { UNNAMED } from 'common/consts';
import { createChildren, createEffectOn } from 'common/primitives';
import { IconClose, IconPlus } from 'lib/unplugin-icons';
import { capitalize, clamp } from 'lodash';
import { For, JSXElement, createSignal } from 'solid-js';

export type TabsProps = {
	idx?: number;
	onOpen?: () => void;
	onChange?: (idx: number) => void;
	onClose?: (idx: number) => void;
	as?: JSXElement;
	children?: JSXElement;
};

export function Tabs(props: TabsProps): JSXElement {
	const tabs = createChildren<TabProps>(() => props.children);
	const [idx, setIdx] = createSignal(0);

	createEffectOn(
		() => props.idx,
		(idx) => idx !== undefined && setIdx(idx)
	);
	createEffectOn(idx, (idx) => props.onChange?.(idx));
	createEffectOn(tabs, (tabs) => setIdx((idx) => clamp(idx, 0, tabs.length - 1)));

	const onOpenTabClick = () => props.onOpen?.();
	const onTabNameClick = (idx: number) => setIdx(idx);
	const onCloseTabClick = (idx: number) => props.onClose?.(idx);

	return (
		<Polymorph component="div" class="flex flex-col" as={props.as}>
			{/* Tab bar */}
			<div class="flex bg-surface-2 [&>*:not(:last-child)]:border-r">
				{/* Tabs */}
				<For each={tabs()}>
					{(tab, i) => (
						// Tab
						<div
							class="interactive flex w-32 items-center border-b data-[active=true]:border-b-surface-1 data-[active=true]:bg-surface-1"
							data-active={i() === idx()}
							draggable={true}
						>
							{/* Tab name */}
							<button
								class="flex flex-1 items-center p-2 text-left text-sm leading-none"
								onClick={() => onTabNameClick(i())}
							>
								{tab.icon}&nbsp;{capitalize(tab.name ?? UNNAMED)}
							</button>

							{/* Close tab */}
							<button class="interactive p-2" onClick={() => onCloseTabClick(i())}>
								<IconClose />
							</button>
						</div>
					)}
				</For>

				{/* Common commands */}
				<div class="flex-grow border-b bg-surface-2">
					{/* Open tab */}
					<button class="interactive p-2" onClick={() => onOpenTabClick()}>
						<IconPlus />
					</button>
				</div>
			</div>

			{/* Current tab content */}
			{tabs()[idx()]?.children}
		</Polymorph>
	);
}

export type TabProps = {
	name?: string;
	icon?: JSXElement;
	children?: JSXElement;
};

export function Tab(props: TabProps): JSXElement {
	return props as unknown as JSXElement;
}
