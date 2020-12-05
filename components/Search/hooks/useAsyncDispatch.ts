import { Dispatch } from "react";

export default function useAsyncDispatch(dispatch: Dispatch<unknown>) {
  return (action) => action(dispatch);
}
