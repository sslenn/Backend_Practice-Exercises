import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    setSaving(true);
    axios
      .put(`http://localhost:5000/articles/${id}`, { title, content })
      .then(() => {
        alert("✅ Article updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        alert("Error updating article: " + err.message);
        console.error(err);
      })
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-baby-pink/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-baby-pink-strong mx-auto mb-4"></div>
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

  return (
    <div className="min-h-screen bg-baby-pink/30 py-12">
      <Link
        to="/"
        className="fixed top-6 left-6 px-4 py-2 bg-baby-blue-strong text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg z-10"
      >
        ← Back
      </Link>

      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="bg-gradient-to-r from-baby-pink-strong to-baby-blue-strong p-6 rounded-lg mb-6 text-white">
            <h1 className="text-3xl font-bold">✏️ Edit Article #{id}</h1>
            <p className="text-white/80 mt-2">Make your changes below</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📌 Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-baby-blue-strong focus:ring-2 focus:ring-baby-blue transition-all text-lg"
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
                rows="8"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-baby-blue-strong focus:ring-2 focus:ring-baby-blue transition-all resize-none"
              />
            </div>

            <div className="bg-baby-blue p-4 rounded-lg border-l-4 border-baby-blue-strong">
              <p className="text-sm text-gray-600">
                <strong>💡 Tip:</strong> Make sure to review your changes before
                saving. Once saved, they'll be updated on the backend.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-baby-pink-strong to-baby-blue-strong text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Saving...
                  </>
                ) : (
                  "💾 Save Changes"
                )}
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditArticle;
