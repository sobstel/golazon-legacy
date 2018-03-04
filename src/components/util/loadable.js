import { h, Component } from 'preact';

export default (dataSource) => {
  return (WrappedComponent) => {
    return class extends Component {
      state = {
        data: false,
        loader: false
      }

      componentDidMount () {
        this.fetchData();
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

            {this.state.data &&
              <WrappedComponent
                {...this.props}
                {...this.state.data} />
            }
          </div>
        );
      }

      fetchData = () => {
        this.setState({ loader: true});
        dataSource(this.props).then((data) => {
          this.setState({ data, loader: false });
        });

        // TODO: catch
        // TODO: handle data.error
      }
    };
  };
};
