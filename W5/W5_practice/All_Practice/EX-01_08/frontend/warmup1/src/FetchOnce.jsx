import { useEffect, useState } from "react";
import axios from "axios";

function FetchOnce() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-baby-pink-strong"></div>
        <span className="ml-3 text-gray-600 font-semibold">Loading...</span>
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
