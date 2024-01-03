import { TextFormatType } from 'lexical';
import {
	IconCodeTags,
	IconFormatBold,
	IconFormatColorHighlight,
	IconFormatItalic,
	IconFormatStrikethroughVariant,
	IconFormatSubscript,
	IconFormatSuperscript,
	IconFunctionVariant
} from 'lib/unplugin-icons';
import { JSXElement } from 'solid-js';
import { _format, useFormatContext } from '.';

export type _FormatBtnProps = {
	format: TextFormatType;
	children?: JSXElement;
};

export function _FormatBtn(props: _FormatBtnProps): JSXElement {
	const { editor } = useFormatContext();
	const onBtnClick = () => _format(editor(), props.format);

	return (
		<button class="interactive p-2" onClick={onBtnClick}>
			{props.children}
		</button>
	);
}

export function FormatBoldBtn(): JSXElement {
	return (
		<_FormatBtn format="bold">
			<IconFormatBold />
		</_FormatBtn>
	);
}

export function FormatItalicBtn(): JSXElement {
	return (
		<_FormatBtn format="italic">
			<IconFormatItalic />
		</_FormatBtn>
	);
}

export function FormatStrikethroughBtn(): JSXElement {
	return (
		<_FormatBtn format="strikethrough">
			<IconFormatStrikethroughVariant />
		</_FormatBtn>
	);
}

export function FormatHighlightBtn(): JSXElement {
	return (
		<_FormatBtn format="highlight">
			<IconFormatColorHighlight />
		</_FormatBtn>
	);
}

export function FormatCodeBtn(): JSXElement {
	return (
		<_FormatBtn format="code">
			<IconCodeTags />
		</_FormatBtn>
	);
}

export function FormatMathBtn(): JSXElement {
	return (
		<button class="interactive p-2">
			<IconFunctionVariant />
		</button>
	);
}

export function FormatSubscriptBtn(): JSXElement {
	return (
		<_FormatBtn format="subscript">
			<IconFormatSubscript />
		</_FormatBtn>
	);
}

export function FormatSuperscriptBtn(): JSXElement {
	return (
		<_FormatBtn format="superscript">
			<IconFormatSuperscript />
		</_FormatBtn>
	);
}
