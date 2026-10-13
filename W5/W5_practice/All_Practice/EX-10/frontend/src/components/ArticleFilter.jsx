import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJournalists();
    fetchCategories();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [selectedJournalistId, selectedCategoryId]);

  const fetchJournalists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/journalists');
      setJournalists(response.data);
    } catch (err) {
      console.error('Error fetching journalists:', err);
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
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/articles', {
        params: {
          journalistId: selectedJournalistId || undefined,
          categoryId: selectedCategoryId || undefined
        }
      });
      setArticles(response.data);
    } catch (err) {
      console.error('Error filtering articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedJournalistId('');
    setSelectedCategoryId('');
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Combined Article Filter</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label htmlFor="journalistFilter">Journalist: </label>
          <select 
            id="journalistFilter" 
            value={selectedJournalistId} 
            onChange={(e) => setSelectedJournalistId(e.target.value)}
            disabled={loading}
          >
            <option value="">All Journalists</option>
            {journalists.map(j => (
              <option key={j.id} value={j.id}>{j.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoryFilter">Category: </label>
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
        </div>

        <button onClick={handleReset} disabled={loading}>Reset Filters</button>
      </div>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.length > 0 ? (
            articles.map(article => (
              <li key={article.id} style={{ marginBottom: '10px' }}>
                <strong>{article.title}</strong> <br />
                <small>
                  By Journalist #{article.journalistId} | Category #{article.categoryId}
                </small>
              </li>
            ))
          ) : (
            <p>No articles match the selected filters.</p>
          )}
        </ul>
      )}
    </div>
  );
}
