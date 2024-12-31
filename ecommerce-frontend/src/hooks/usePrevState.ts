import { useEffect, useRef } from "react";

const usePrevState = <T,>(currentState: T): T | undefined => {
  // Create a mutable reference using useRef
  // Premitive type
  const ref = useRef<T | undefined>(undefined);
  const prevState = ref.current; // Holds the previous state value

  // Update ref.current whenever currentState changes
  useEffect(() => {
    ref.current = currentState;
  }, [currentState]);

  return prevState; // Return the previous state value
};

export default usePrevState;
