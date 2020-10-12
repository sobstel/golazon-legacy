// https://stackoverflow.com/a/9229821/219272
export function uniqBy(a, key) {
  const index = [];
  return a.filter((item) => {
    const k = item[key];
    return index.indexOf(k) >= 0 ? false : index.push(k);
  });
}
