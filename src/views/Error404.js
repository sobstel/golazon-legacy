import { h } from 'hyperapp';

import Main from '../components/Main';

// error404 view
export default () => (
  <Main>
    <div class="block error404__wrapper">
      <p>Page not found. <a href="/">Go home</a> or use search above.</p>
    </div>
  </Main>
);
