import { useEffect } from 'react';
import { toast } from 'sonner';

const useNetworkStatus = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success('Connection is back!');
    };
    const handleOffline = () => {
      toast.error('You lost connection!');
    };
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
};

export default useNetworkStatus;