import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const useInfiniteFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // Memoize the fetch function to avoid re-creation on every render
  const fetchData = useCallback(async (currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(url(currentPage));
      const result = response.data;
      // Append new data to the existing data (useful for infinite scrolling)
      setData((prevData) => (currentPage > 1 ? [...prevData, ...result] : result));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Trigger data fetching when the component mounts or `page` changes
  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  // Infinite scrolling handler
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { data, loading, error, loadMore };
};

export default useInfiniteFetch;
