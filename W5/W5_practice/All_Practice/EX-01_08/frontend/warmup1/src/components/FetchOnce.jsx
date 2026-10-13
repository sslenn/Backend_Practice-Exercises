import { useEffect, useState } from "react";
import { articleService } from "../services/articleService";

function FetchOnce() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articleService
      .getAllArticles()
      .then((articles) => setData(articles))
      .catch((err) => console.error(err))
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
        <span className="text-baby-pink-strong font-bold">Fetching data</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 overflow-auto max-h-64">
      <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap break-words">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default FetchOnce;
