import { h } from 'hyperapp';

export default ({ active, error = null }) => {
  const reloadPage = () => location.reload();

  return (
    <div class="loading__container">
      {active &&
        <p class="loading__loader loader">loading</p>
      }
      {error &&
        <p class="loading__error">
          ERROR [{error}]
          (<button onclick={reloadPage}>reload</button>)
        </p>
      }
    </div>
  );
};
