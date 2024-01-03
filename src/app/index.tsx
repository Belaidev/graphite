/* @refresh reload */

import { _App } from 'app/components';
import { APP_NAME } from 'common/consts';
import { render } from 'solid-js/web';
// eslint-disable-next-line no-restricted-imports
import './index.css';

document.title = APP_NAME;

const root = document.getElementById('root');
if (!(root instanceof HTMLElement)) throw new Error('Root element not found.');
render(() => <_App />, root);
