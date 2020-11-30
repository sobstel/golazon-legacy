export default function Loader({
  text,
  noWrapper,
}: {
  text?: string;
  noWrapper?: boolean;
}) {
  const loaderContent = <p className="loader">{text || "Loading"}</p>;

  if (noWrapper) {
    return loaderContent;
  }

  return <div className="block wrapped">{loaderContent}</div>;
}
