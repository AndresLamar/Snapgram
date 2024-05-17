import { useRef, useEffect } from 'react';

interface History {
    pushState(data: any, title: string, url: string): void;
  }

const useShallowNavigation = () => {
  const historyRef = useRef<History | null>(null);

  useEffect(() => {
    historyRef.current = window.history;
  }, []);

  const navigateShallowTo = (path: string) => {
    const history = historyRef.current;
    if (history) {
      history.pushState({}, '', path);
    }
  };

  return navigateShallowTo;
};

export default useShallowNavigation;
