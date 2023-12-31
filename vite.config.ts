import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [solid({ ssr: false }), Icons({ compiler: 'solid', scale: 1 }), tsconfigPaths()]
});
