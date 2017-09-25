import { h } from 'hyperapp';

// Main layout
export default (props, children) => (
  <div>
    <div id="main">
      {children}
    </div>

    <p class="disclaimer block">
      Football data mnmlist way. Open source prototype.<br />
      (<a href="https://github.com/sobstel/golazon#readme">learn more</a>)
    </p>
  </div>
);
