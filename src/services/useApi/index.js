import { useState, useEffect } from "react";
import ReturnApi from "../../services/returnapi";

function useApi(request) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!request) return;

    setLoading(true);
    ReturnApi(request)
      .then(result => {
        setData(result);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [request]);

  return { data, error, loading };
}

export default useApi;
