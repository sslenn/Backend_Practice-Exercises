import { useState } from "react";
import { articleService } from "../services/articleService";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    setLoading(true);
    articleService
      .createArticle({
        title,
        content,
        journalistId: 1,
        categoryId: 1,
      })
      .then((res) => {
        setSuccess(`✅ Created article #${res.id}`);
        setTitle("");
        setContent("");
        setTimeout(() => setSuccess(null), 3000);
      })
      .catch((err) => {
        alert("Error creating article: " + err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-4">
      {success && (
        <div className="p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg animate-pulse">
          {success}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-baby-pink/10 p-6 rounded-lg border-2 border-baby-pink"
      >
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            📌 Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-baby-blue-strong focus:ring-2 focus:ring-baby-blue transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            📝 Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter article content..."
            rows="5"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-baby-blue-strong focus:ring-2 focus:ring-baby-blue transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-baby-pink-strong to-baby-blue-strong text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Creating...
            </>
          ) : (
            "✨ Create Article"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddArticle;
