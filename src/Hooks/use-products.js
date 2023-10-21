import { useCallback, useState } from "react";

const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isComplete, setCompleter] = useState(null);

  const SendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    setCompleter(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        setCompleter(null);
        throw new Error("Request failed!");
      } else {
        setCompleter(true);
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    isComplete,
    SendRequest,
  };
};

export default useProducts;
