import { h } from 'hyperapp';

import Main from '../components/Main';

// error404 view
export default (state, actions) => (
  <Main state={state} actions={actions}>
    <div class="block error404__wrapper">
      <p>Page not found. <a href="/">Go home</a> or use search above.</p>
    </div>
  </Main>
);
