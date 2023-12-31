import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { Config } from 'tailwindcss';
import { PluginCreator } from 'tailwindcss/types/config';

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	plugins: [
		typography,
		forms,
		aspectRatio,

		// See https://github.com/tailwindlabs/tailwindcss-container-queries/issues/18#issuecomment-1655908173 for related discussion
		containerQueries as { handler: PluginCreator; config?: Partial<Config> }
	],
	theme: {
		colors: {
			/* || Primary */

			'primary-1': '#3b82f6' /* Blue 500 */,
			'primary-2': '#dbeafe' /* Blue 100 */,
			'on-primary-1': ' white' /* White */,
			'on-primary-2': '#1d4ed8' /* Blue 700 */,

			/* || Danger */

			'danger-1': '#ef4444' /* Red 500 */,
			'danger-2': '#fee2e2' /* Red 100 */,
			'on-danger-1': ' white' /* White */,
			'on-danger-2': '#b91c1c' /* Red 700 */,

			/* || Surface */

			'surface-1': ' white' /* White */,
			'surface-2': '#fafaf9' /* Stone 50 */,
			'surface-3': '#f5f5f4' /* Stone 100 */,
			'on-surface-1': '#292524' /* Stone 800 */,
			'on-surface-2': '#57534e' /* Stone 600 */,
			'on-surface-3': '#a8a29e' /* Stone 400 */,

			/* || Other */

			outline: '#e7e5e4' /* Stone 200 */,
			shadow: '#292524' /* Stone 800 */,
			transparent: 'transparent',
			inherit: 'inherit'
		},

		// Reproduce font classes without line height
		fontSize: {
			'9xl': '8rem',
			'8xl': '6rem',
			'7xl': '4.5rem',
			'6xl': '3.75rem',
			'5xl': '3rem',
			'4xl': '2.25rem',
			'3xl': '1.875rem',
			'2xl': '1.5rem',
			lg: '1.125rem',
			xl: '1.25rem',
			base: '1rem',
			sm: '0.875rem',
			xs: '0.75rem'
		}
	}
} satisfies Config;
