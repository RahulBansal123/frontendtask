import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import Spinner from '../Spinner';

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const fetchPosts = useCallback(async (controller) => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://609272e485ff510017212d2d.mockapi.io/table',
        {
          signal: controller.signal,
        }
      );
      const posts = await response.json();
      setData(posts);
    } catch (error) {
      console.error(error);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller);
    return () => controller.abort();
  }, [fetchPosts]);

  if (loading) return <Spinner />;
  return (
    <div className="table-container">
      {data && (
        <table className="customers">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
          {data?.map((val) => (
            <tr>
              <td>{val?.name}</td>
              <td>{val?.email}</td>
              <td>{val?.username}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default Table;
