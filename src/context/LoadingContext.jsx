import { createContext, useState } from 'react';

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [activeReq, setActiveReq] = useState(0);

  const startLoading = () => setActiveReq(prev => prev + 1);

  const stopLoading = () => setActiveReq(prev => prev - 1);

  const isLoading = activeReq > 0;

  const loadingData = { isLoading, startLoading, stopLoading}

  return <LoadingContext.Provider value={loadingData}>{children}</LoadingContext.Provider>;
};
