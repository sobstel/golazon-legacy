import { h, Component } from 'preact';

export default class Match extends Component {
  componentDidMount () {
    document.title = `Match ${this.props.id}`;
  }

  render () {
    return (
      <div>
        <p class="block nav">
          <a href="/">Golazon</a>
        </p>
        <p class="block">
          id: {this.props.id}
        </p>
      </div>
    );
  }
}
