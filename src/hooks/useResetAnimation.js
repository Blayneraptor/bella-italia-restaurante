import { useState, useCallback } from 'react';

/**
 * Custom hook to manage animation reset state
 * @returns {[number, Function]} A tuple with the animation key and a reset function
 */
export const useResetAnimation = () => {
  const [key, setKey] = useState(0);

  const resetAnimation = useCallback(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  return [key, resetAnimation];
};
