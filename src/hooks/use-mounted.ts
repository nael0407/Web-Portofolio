import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true once the component has mounted on the client,
 * avoiding hydration mismatch and cascading renders without triggering
 * React 19's react-hooks/set-state-in-effect lint error.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

