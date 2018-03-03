import { h, Component } from 'preact';

export default class Match extends Component {
  render({ id }) {
    return (
      <div>
        <p>id: {id}</p>
      </div>
    );
  }
}
