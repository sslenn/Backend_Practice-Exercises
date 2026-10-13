import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArticleById(id)
      .then(setArticle)
      .catch(() => setError("Failed to fetch article."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist: </strong>
        {article.journalist_id ? (
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate(`/journalists/${article.journalist_id}/articles`)}
          >
            {article.journalist_name || article.journalist}
          </span>
        ) : (
          article.journalist
        )}
      </div>
      <div>
        <strong>Category:</strong> {article.category}
      </div>
    </div>
  );
}
