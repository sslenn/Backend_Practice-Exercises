import { useEffect, useState } from "react";
import axios from "axios";

function SafeFetch() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-baby-blue-strong"></div>
        <span className="ml-3 text-gray-600 font-semibold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
        <p className="font-bold">❌ Error occurred</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg">
      <p className="font-bold text-lg">✅ Success!</p>
      <p className="mt-2">
        Loaded <strong>{articles.length}</strong> articles from the backend.
      </p>
    </div>
  );
}

export default SafeFetch;
