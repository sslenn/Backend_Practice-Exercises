import { useEffect, useState } from "react";
import axios from "axios";

function ArticleListWithDelete() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const loadArticles = () => {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => setArticles(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = (id, title) => {
    const ok = window.confirm(`Delete "${title}"?`);
    if (!ok) return;

    setDeleting(id);
    axios
      .delete(`http://localhost:5000/articles/${id}`)
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
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-baby-pink-strong"></div>
        <span className="ml-3 text-gray-600 font-semibold">
          Loading articles...
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
