import { isFunction } from "lodash-es"
import { useCallback, useRef, useState } from "react"

export const useStateWithGetter = <S>(
  initialState: S | (() => S),
): [S, (nextState: S | ((prevState: S) => S)) => void, () => S] => {
  const [value, setValue] = useState<S>(initialState)
  const ref = useRef<S>(value)
  const setState = useCallback((nextState: S | ((prevState: S) => S)) => {
    if (isFunction(nextState)) {
      setValue((prevState) => {
        const computedState = nextState(prevState)
        ref.current = computedState
        return computedState
      })
    } else {
      ref.current = nextState
      setValue(nextState)
    }
  }, [])
  const getState = useCallback(() => ref.current, [])

  return [value, setState, getState]
}
