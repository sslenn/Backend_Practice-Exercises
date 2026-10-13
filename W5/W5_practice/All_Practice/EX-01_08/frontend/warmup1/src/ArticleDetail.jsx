import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        setArticle(res.data);
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-baby-blue-strong mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading article...</p>
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
    <div className="min-h-screen bg-baby-blue/30 py-12">
      <Link
        to="/"
        className="fixed top-6 left-6 px-4 py-2 bg-baby-pink-strong text-white font-bold rounded-lg hover:bg-pink-600 transition-all shadow-lg z-10"
      >
        ← Back
      </Link>

      <article className="max-w-2xl mx-auto px-6">
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
            </div>

            {article.category && (
              <div className="mt-8 pt-6 border-t-2 border-baby-pink">
                <span className="inline-block bg-baby-pink text-baby-pink-strong px-4 py-2 rounded-full font-semibold">
                  📂 {article.category}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;
