import { useCallback,useState } from "react";

const useFetch = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    setLoading(true)
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const data = await response.json();
      applyData(data);
      setLoading(false);
    } catch(error) {
      setError(error.message || 'something went wrong')
    }
  },[]);

    return {
      error,loading,sendRequest
    }
};
export default useFetch;
