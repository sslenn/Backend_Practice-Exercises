import { useEffect, useState } from "react";
import { articleService } from "../services/articleService";

function SafeFetch() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    articleService
      .getAllArticles()
      .then((data) => setArticles(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-baby-blue border-b-baby-blue-strong mb-4"></div>
        <div className="flex justify-center gap-1 mb-3">
          <div
            className="w-2 h-2 bg-baby-blue-strong rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-baby-blue-strong rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-baby-blue-strong rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <span className="text-baby-blue-strong font-bold">
          Verifying connection
        </span>
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
