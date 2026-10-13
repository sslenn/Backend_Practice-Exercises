import { useEffect, useState } from "react";
import axios from "axios";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => {
        setArticles(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error fetching articles:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-baby-pink-strong"></div>
        <span className="ml-3 text-gray-600 font-semibold">
          Loading articles...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">❌ Error loading articles</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {articles.length === 0 ? (
        <p className="text-gray-500 italic">No articles available</p>
      ) : (
        <ul className="space-y-2">
          {articles.map((article) => (
            <li
              key={article.id}
              className="p-4 bg-gradient-to-r from-baby-pink to-baby-blue border-l-4 border-baby-pink-strong rounded-md hover:shadow-md transition-shadow"
            >
              <span className="inline-block bg-baby-pink-strong text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
                #{article.id}
              </span>
              <strong className="text-gray-800 text-lg">{article.title}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticleList;
