import { useCallback, useEffect, useState } from 'react';

const baseUrl = import.meta.env.PROD
  ? 'prod url'
  : 'http://localhost:3000/api/';

const useFetch = (url = null) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const req = useCallback(async (method, url, body = null) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500))
    setErr(null);
    try {
      const res = await fetch(baseUrl + url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : null,
      });
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
    }
  }, []);

  const get = useCallback(url => req('GET', url), [req]);
  const post = useCallback((url, body) => req('POST', url, body), [req]);
  const update = useCallback((url, body) => req('UPDATE', url, body), [req]);
  const del = useCallback(url => req('DELETE', url), [req]);

  useEffect(() => {
    if (url) get(url);
  }, [url, get]);

  return { data, err, loading, get, post, update, del };
};

export default useFetch;
