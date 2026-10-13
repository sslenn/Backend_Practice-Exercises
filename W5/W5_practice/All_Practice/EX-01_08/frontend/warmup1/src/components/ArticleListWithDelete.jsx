import { useEffect, useState } from "react";
import { articleService } from "../services/articleService";

function ArticleListWithDelete() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const loadArticles = () => {
    articleService
      .getAllArticles()
      .then((data) => setArticles(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = (id, title) => {
    const ok = window.confirm(`Delete "${title}"?`);
    if (!ok) return;

    setDeleting(id);
    articleService
      .deleteArticle(id)
      .then(() => {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting article");
      })
      .finally(() => setDeleting(null));
  };

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

  return (
    <div className="space-y-3">
      {articles.length === 0 ? (
        <p className="text-gray-500 italic text-center py-8">
          No articles to delete
        </p>
      ) : (
        <ul className="space-y-2">
          {articles.map((a) => (
            <li
              key={a.id}
              className={`p-4 bg-gradient-to-r from-baby-pink/50 to-baby-blue/50 border-l-4 border-baby-blue-strong rounded-md flex items-center justify-between transition-all ${
                deleting === a.id ? "opacity-50" : ""
              }`}
            >
              <div>
                <span className="inline-block bg-baby-blue-strong text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
                  #{a.id}
                </span>
                <strong className="text-gray-800">{a.title}</strong>
              </div>
              <button
                onClick={() => handleDelete(a.id, a.title)}
                disabled={deleting === a.id}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting === a.id ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Deleting...
                  </>
                ) : (
                  "🗑️ Delete"
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticleListWithDelete;
