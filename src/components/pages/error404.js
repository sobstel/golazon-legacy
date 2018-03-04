import { h, Component } from 'preact';
import { Link } from 'preact-router';

export default class extends Component {
  componentDidMount () {
    document.title = '404';
  }

  render() {
    return (
      <div class="block error404__wrapper">
        <p>Page not found. <Link href="/">Go home</Link> or use the search input above.</p>
      </div>
    );
  }
}
