import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJournalists();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [selectedJournalistId]);

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

  const fetchJournalists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/journalists');
      setJournalists(response.data);
    } catch (err) {
      console.error('Error fetching journalists:', err);
    }
  };

  const handleFilterChange = async () => {
    if (selectedJournalistId) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/journalists/${selectedJournalistId}/articles`);
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
    setSelectedJournalistId('');
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Articles by Journalist</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="journalistFilter">Select Journalist:</label>
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
            <p>No articles found for this journalist.</p>
          )}
        </ul>
      )}
    </div>
  );
}
