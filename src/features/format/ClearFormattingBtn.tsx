import { IconFormatClear } from 'lib/unplugin-icons';
import { JSXElement } from 'solid-js';
import { _clearFormatting, useFormatContext } from '.';

export function ClearFormattingBtn(): JSXElement {
	const { editor } = useFormatContext();
	const onBtnClick = () => _clearFormatting(editor());

	return (
		<button class="interactive p-2" onClick={onBtnClick}>
			<IconFormatClear />
		</button>
	);
}
