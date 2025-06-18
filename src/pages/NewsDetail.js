// src/pages/NewsDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../sanityClient'; // Import your Sanity client
import { urlFor } from '../sanity/imageUrlBuilder'; // Import the urlFor function

const NewsDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await client.fetch(`*[_type == "news" && slug.current == $slug][0]`, { slug });
        setNews(newsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!news) return <p>No news found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <img src={urlFor(news.image).url()} alt={news.title} className="w-full rounded-lg mb-4" />
      <p className="text-gray-800 mb-4">{news.description}</p>
      <Link to="/news" className="text-blue-500 hover:underline">Back to News</Link>
    </div>
  );
};

export default NewsDetail;
