import { useCallback, useState } from "react";
import LoadingContext from "./LoadingContext";

const LoadingProvider = ({ children }) => {
  const [activeReq, setActiveReq] = useState(0);

  const startLoading = useCallback(() => setActiveReq(prev => prev + 1), []);

  const stopLoading = useCallback(() => setActiveReq(prev => prev - 1), []);

  const isLoading = activeReq > 0;

  const loadingData = { isLoading, startLoading, stopLoading}

  return <LoadingContext.Provider value={loadingData}>{children}</LoadingContext.Provider>;
};

export default LoadingProvider
