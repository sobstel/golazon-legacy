import { h, Component } from 'preact';

export default class Competition extends Component {
  render({ id }) {
    return (
      <div>
        <p>id: {id}</p>
      </div>
    );
  }
}
