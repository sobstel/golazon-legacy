import { h } from 'hyperapp';

import Search from './Search';

// main layout
export default ({ state, actions }, children) => (
  <div>
    <Search
      actions={actions}
      clearButtonVisible={state.search.clearButtonVisible}
      hint={state.search.hint}
      loading={state.search.loading}
      results={state.search.results}
      resultsHint={state.search.resultsHint}
      value={state.search.value}
    />

    {children}

    <p class="disclaimer block">
      Football data mnmlist way. Open source prototype.<br />
      (<a href="https://github.com/sobstel/golazon#readme">learn more</a>)
    </p>
  </div>
);
