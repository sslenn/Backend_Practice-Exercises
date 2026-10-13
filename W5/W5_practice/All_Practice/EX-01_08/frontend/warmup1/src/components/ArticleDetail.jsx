import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articleService } from "../services/articleService";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    articleService
      .getArticleById(id)
      .then((data) => {
        setArticle(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-baby-blue/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-baby-blue border-b-baby-blue-strong mx-auto mb-6"></div>
          <div className="flex justify-center gap-1 mb-4">
            <div
              className="w-3 h-3 bg-baby-blue-strong rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 bg-baby-blue-strong rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-baby-blue-strong rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <p className="text-baby-blue-strong font-bold text-lg">
            Loading your article
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-baby-pink/30">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
          <p className="text-red-600 font-bold text-lg mb-4">
            ❌ Error loading article
          </p>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-baby-blue-strong text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Article not found
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-baby-blue-strong text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-baby-blue/30">
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-baby-blue-strong to-baby-pink-strong shadow-xl border-b-4 border-gray-900">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            📖 Article Details
          </h1>
          <Link
            to="/"
            className="px-6 py-2 bg-white text-baby-blue-strong font-bold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg border-2 border-white"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-baby-blue-strong to-baby-pink-strong p-8 text-white">
            <div className="inline-block bg-white bg-opacity-20 px-4 py-1 rounded-full mb-4">
              <span className="text-sm font-semibold">
                Article #{article.id}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
            {article.author && (
              <p className="text-white/80 flex items-center gap-2">
                ✍️ By {article.author}
              </p>
            )}
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg">{article.content}</p>
              {article.journalist && (
                <p className="text-sm text-gray-500 mt-6 pt-6 border-t">
                  📰 Journalist: {article.journalist}
                </p>
              )}
              {article.category && (
                <p className="text-sm text-gray-500">
                  🏷️ Category: {article.category}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;
