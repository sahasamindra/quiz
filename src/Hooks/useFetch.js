import { useState, useEffect } from "react";
export default function useFetch(url, method) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const requestFetch = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    };
    requestFetch();
  }, [url, method]);
  return {
    loading,
    error,
    result,
  };
}
