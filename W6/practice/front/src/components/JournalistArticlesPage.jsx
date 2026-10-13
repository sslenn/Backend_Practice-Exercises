import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalist } from "../services/api";

export default function JournalistArticlesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArticlesByJournalist(id)
      .then(setArticles)
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Articles by {articles[0]?.journalist_name ?? `Journalist #${id}`}</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((a) => (
          <div key={a.id} className="article-card" style={{ marginBottom: "1rem" }}>
            <div className="article-title">{a.title}</div>
            <div>{a.content}</div>
            <button className="button-secondary" onClick={() => navigate(`/articles/${a.id}`)}>
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
}
