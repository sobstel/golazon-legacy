import { h, Component } from 'preact';

export default (fetchData) => {
  return (WrappedComponent) => {
    return class extends Component {
      state = {
        data: false,
        loader: false,
        error: false
      }

      componentDidMount () {
        this.setState({ loader: true});

        fetchData(this.props).then((data) => {
          this.setState({ data, loader: false });
        }).catch((err) => {
          this.setState({ error: err.message, loader: false });
        });
      }

      render () {
        return (
          <div>
            {this.state.loader &&
              <div class="block wrapped">
                <p class="loader">
                  loading
                </p>
              </div>
            }

            {this.state.error &&
              <div class="block wrapped">
                <p class="error">
                  ERROR: {this.state.error || 'unknown'}
                </p>
              </div>
            }

            {this.state.data &&
              <WrappedComponent
                {...this.props}
                {...this.state.data} />
            }
          </div>
        );
      }
    };
  };
};
