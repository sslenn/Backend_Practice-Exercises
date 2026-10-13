import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategoryId]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/articles');
      setArticles(response.data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleFilterChange = async () => {
    if (selectedCategoryId) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/categories/${selectedCategoryId}/articles`);
        setArticles(response.data);
      } catch (err) {
        console.error('Error filtering articles:', err);
      } finally {
        setLoading(false);
      }
    } else {
      fetchArticles();
    }
  };

  const handleReset = () => {
    setSelectedCategoryId('');
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Articles by Category</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="categoryFilter">Select Category:</label>
        <select 
          id="categoryFilter" 
          value={selectedCategoryId} 
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          disabled={loading}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button onClick={handleReset} disabled={loading}>Reset</button>
      </div>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.length > 0 ? (
            articles.map(article => (
              <li key={article.id} style={{ marginBottom: '10px' }}>
                <strong>{article.title}</strong> <br />
                <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small>
              </li>
            ))
          ) : (
            <p>No articles found for this category.</p>
          )}
        </ul>
      )}
    </div>
  );
}
