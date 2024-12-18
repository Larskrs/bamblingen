// hooks/useFetch.js
import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const result = await response.data;
      setData(result);
  } catch (err) {
      setError(err.message);
  } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      fetchData()
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
