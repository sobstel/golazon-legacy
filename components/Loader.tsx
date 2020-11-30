export default function Loader({ noWrapper }: { noWrapper?: boolean }) {
  const loaderContent = <p className="loader">Loading</p>;

  if (noWrapper) {
    return loaderContent;
  }

  return <div className="block wrapped">{loaderContent}</div>;
}
