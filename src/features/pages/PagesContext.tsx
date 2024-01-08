import { useContextNonNullable } from 'common/primitives';
import { JSXElement, createContext } from 'solid-js';
import { PagesRepo, createPagesRepo } from '.';

/* || Context */

export type PagesContextProps = {
	repo: PagesRepo;
};

const PagesContext = createContext<PagesContextProps>();

export function usePagesContext(): PagesContextProps {
	return useContextNonNullable(PagesContext);
}

/* || Provider */

export type PagesProviderProps = {
	children?: JSXElement;
};

export function PagesProvider(props: PagesProviderProps): JSXElement {
	const repo = createPagesRepo();
	return <PagesContext.Provider value={{ repo }}>{props.children}</PagesContext.Provider>;
}
