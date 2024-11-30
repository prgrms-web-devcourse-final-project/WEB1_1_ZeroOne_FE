import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type UsePageLifecycleOptions = {
  onNavigate?: () => void;
  onBack?: () => void;
  onRefresh?: () => void;
};

export const usePageLifecycle = ({ onNavigate, onBack, onRefresh }: UsePageLifecycleOptions) => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const previousKey = useRef(location.key);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (onRefresh) {
        onRefresh();
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [onRefresh]);

  useEffect(() => {
    if (location.pathname !== previousPath.current) {
      previousPath.current = location.pathname;
      previousKey.current = location.key;

      if (previousPath.current.startsWith('/archive/write')) return;

      if (onNavigate) onNavigate();
    }
  }, [location.pathname, location.key, onNavigate]);

  useEffect(() => {
    const handlePopState = () => {
      if (onBack) onBack();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBack]);
};
