import { h } from 'hyperapp';

// main layout
export default (props, children) => (
  <div>
    {children}

    <p class="disclaimer block">
      Football data mnmlist way. Open source prototype.<br />
      (<a href="https://github.com/sobstel/golazon#readme">learn more</a>)
    </p>
  </div>
);
