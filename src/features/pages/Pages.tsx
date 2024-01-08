import { UNNAMED } from 'common/consts';
import { capitalize } from 'lodash';
import { For, JSXElement } from 'solid-js';
import { PageData, usePagesContext } from '.';

export type PagesProps = {
	onPageBtnClick?: (page: PageData) => void;
};

export function Pages(props: PagesProps): JSXElement {
	const { repo } = usePagesContext();

	const onPageBtnClick = (page: PageData) => props.onPageBtnClick?.(page);

	return (
		<div class="flex flex-col">
			<For each={repo.all()}>
				{(page) => (
					<button
						class="interactive whitespace-nowrap px-4 text-left text-sm"
						onClick={() => onPageBtnClick(page)}
					>
						{capitalize(page.title ?? UNNAMED)}
					</button>
				)}
			</For>
		</div>
	);
}
