import { makePersisted } from '@solid-primitives/storage';
import { Accessor, createSignal } from 'solid-js';
import { PageData } from '.';

export type PagesRepo = {
	all: Accessor<PageData[]>;
	update: (page: PageData) => PageData | undefined;
	create: (page: PageData) => PageData | undefined;
	del: (page: PageData) => boolean;
};

export function createPagesRepo(): PagesRepo {
	// eslint-disable-next-line solid/reactivity
	const [pages, setPages] = makePersisted(createSignal<PageData[]>([]), { name: 'pages' });

	const create = (page: PageData): PageData | undefined => {
		setPages((pages) => [...pages, page]);
		return page;
	};

	const update = (page: PageData): PageData | undefined => {
		const prev = pages();
		const idx = prev.findIndex((p) => p.id === page.id);
		if (idx === -1) return;
		setPages([...prev.slice(0, idx), page, ...prev.slice(idx + 1)]);
		return page;
	};

	const del = (page: { id: number }): boolean => {
		const prev = pages();
		const idx = prev.findIndex((p) => p.id === page.id);
		if (idx === -1) return false;
		setPages([...prev.slice(0, idx), ...prev.slice(idx + 1)]);
		return true;
	};

	return {
		all: pages,
		create,
		update,
		del
	};
}
