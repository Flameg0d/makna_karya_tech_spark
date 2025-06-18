import React, { useEffect, useState } from 'react';
import Footer from '../components/Section/Footer';
import { Link } from 'react-router-dom';
import client from '../sanityClient'; // Import your Sanity client
import { urlFor } from '../sanity/imageUrlBuilder'; // Adjust the path as necessary

export default function NewsPage() {
  const [news, setNews] = useState(null); // State for featured news
  const [recentNews, setRecentNews] = useState([]); // State for recent news
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const featuredNewsData = await client.fetch('*[_type == "news" && isFeatured == true][0]'); // Fetch only one featured news article
        setNews(featuredNewsData);
        
        const recentNewsData = await client.fetch('*[_type == "news"] | order(date desc)[0...5]'); // Fetch recent news articles
        setRecentNews(recentNewsData);
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow py-10 text-gray-800 mr-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
          
          {/* Featured News */}
          <div className="flex-1 md:pr-6" data-aos="fade-up">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 pt-10">Featured News</h1>
            
            {loading ? (
              <p>Loading news articles...</p> // Loading state
            ) : error ? (
              <p>Error: {error}</p> // Error state
            ) : news ? (
              <div key={news._id}>
                <img
                  src={news.image ? urlFor(news.image).url() : 'https://example.com/default-image.jpg'} // Use a valid fallback image URL
                  alt={news.title}
                  className="w-full rounded-lg shadow-md mb-6 object-cover"
                />
                <h2 className="text-lg md:text-2xl font-semibold mb-4">{news.title}</h2>
                <p className="text-gray-800 mb-4 leading-relaxed">{news.description}</p>
                <hr className="border-gray-400 mb-6" />
              </div>
            ) : (
              <p>No featured news articles found.</p> // No articles state
            )}
          </div>

          {/* Sidebar Recent News */}
          <div className="w-full md:w-[320px] lg:w-[360px] sticky top-24 self-start bg-white p-6 rounded-lg space-y-4 shadow" data-aos="fade-up">
            <h2 className="text-xl font-bold mb-4 pt-4">Recent News</h2>
            {recentNews.length > 0 ? (
              recentNews.map((article) => (
                <div key={article._id} className="bg-white rounded-md shadow hover:shadow-lg overflow-hidden transition duration-300">
                  <img
                    src={article.image ? urlFor(article.image).url() : 'https://example.com/default-image.jpg'} // Use a valid fallback image URL
                    alt={article.title}
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-3">
                    <Link to={`/news/${article.slug.current}`} className="text-blue-700 hover:underline text-sm font-medium block">
                      {article.title}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No recent news articles found.</p> // No recent articles state
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
