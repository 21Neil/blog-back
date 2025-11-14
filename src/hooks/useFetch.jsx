import { useCallback, useContext, useState } from 'react';
import LoadingContext from '../context/Loading/LoadingContext';

const baseUrl = import.meta.env.PROD
  ? 'prod url'
  : 'http://localhost:3000/api/';

const useFetch = (formdata = false) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const req = useCallback(
    async (method, url, body = null) => {
      const config = formdata
        ? {
            method,
            credentials: 'include',
            body,
          }
        : {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: body ? JSON.stringify(body) : null,
          };
      setLoading(true);
      startLoading();
      // await new Promise(res => setTimeout(res, 2000))
      setErr(null);
      try {
        const res = await fetch(baseUrl + url, config);
        const result = await res.json();
        if (!res.ok)
          throw new Error(result.message || `Server error: ${res.status}`);
        setData(result);
        return result;
      } catch (err) {
        setErr(err);
        throw err;
      } finally {
        setLoading(false);
        stopLoading();
      }
    },
    [startLoading, stopLoading, formdata]
  );

  const get = useCallback(url => req('GET', url), [req]);
  const post = useCallback((url, body) => req('POST', url, body), [req]);
  const put = useCallback((url, body) => req('PUT', url, body), [req]);
  const del = useCallback(url => req('DELETE', url), [req]);

  return { data, err, loading, get, post, put, del };
};

export default useFetch;
