import React, { useEffect, useState, useCallback } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import './index.css';
import Spinner from '../Spinner';

const PieData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const fetchPosts = useCallback(async (controller) => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://609272e485ff510017212d2d.mockapi.io/pie',
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
    <div className="chart-container">
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              startAngle={0}
              endAngle={360}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#4c9a2a"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieData;
