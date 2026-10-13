import { useEffect, useState } from "react";
import axios from "axios";
import { articleService } from "../services/articleService";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    articleService
      .getAllArticles()
      .then((data) => {
        setArticles(data);
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
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-baby-pink border-b-baby-pink-strong mb-4"></div>
        <div className="flex justify-center gap-1 mb-3">
          <div
            className="w-2 h-2 bg-baby-pink-strong rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-baby-pink-strong rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-baby-pink-strong rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <span className="text-baby-pink-strong font-bold">
          Fetching articles
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">❌ Error: {error}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {articles.map((article) => (
        <li
          key={article.id}
          className="p-4 bg-gradient-to-r from-baby-pink/50 to-baby-blue/50 border-l-4 border-baby-blue-strong rounded-md hover:shadow-md transition-all"
        >
          <span className="inline-block bg-baby-blue-strong text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
            #{article.id}
          </span>
          <strong className="text-gray-800">{article.title}</strong>
          {article.author && (
            <p className="text-sm text-gray-600 mt-2">✍️ By {article.author}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
