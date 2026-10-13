// In-memory data
let articles = [
  {
    id: 1,
    title: "Understanding React Hooks",
    content: "Hooks are a new addition in React 16.8...",
    journalistId: 101,
    categoryId: 1
  },
  {
    id: 2,
    title: "Mastering Express.js",
    content: "Express is a minimal and flexible Node.js web application framework...",
    journalistId: 102,
    categoryId: 2
  }
];

// Q1 - Display All Articles
export const getArticles = (req, res) => {
  console.log("GET /articles");
  res.json(articles);
};

// Q2 - View Article Details
export const getArticleById = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /articles/${id}`);
  const article = articles.find(a => a.id === id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
};

// Q3 - Add New Article
export const createArticle = (req, res) => {
  console.log("POST /articles", req.body);
  const { title, content, journalistId, categoryId } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const newArticle = {
    id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
    title,
    content,
    journalistId: parseInt(journalistId),
    categoryId: parseInt(categoryId)
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
};

// Q4 - Update Existing Article
export const updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /articles/${id}`, req.body);
  const index = articles.findIndex(a => a.id === id);
  if (index !== -1) {
    const { title, content, journalistId, categoryId } = req.body;
    articles[index] = {
      ...articles[index],
      title: title || articles[index].title,
      content: content || articles[index].content,
      journalistId: journalistId ? parseInt(journalistId) : articles[index].journalistId,
      categoryId: categoryId ? parseInt(categoryId) : articles[index].categoryId
    };
    res.json(articles[index]);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
};

// Delete Article
export const deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /articles/${id}`);
  const index = articles.findIndex(a => a.id === id);
  if (index !== -1) {
    const deletedArticle = articles.splice(index, 1);
    res.json(deletedArticle[0]);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
};
