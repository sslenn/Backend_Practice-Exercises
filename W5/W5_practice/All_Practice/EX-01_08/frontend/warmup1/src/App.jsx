import { Routes, Route, Link } from "react-router-dom";
import {
  FetchOnce,
  ArticleList,
  SafeFetch,
  AddArticle,
  ArticleListWithDelete,
  ArticleDetail,
  EditArticle,
} from "./components";
import "./styles/index.css";
import "./styles/App.css";

function Home() {
  return (
    <div className="min-h-screen bg-baby-pink/30">
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-baby-pink-strong to-baby-blue-strong shadow-xl border-b-4 border-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
             World of Axios
          </h1>
          <ul className="flex gap-6 flex-wrap">
            <li>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg bg-white text-baby-pink-strong font-bold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-white"
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                to="/articles/1"
                className="px-4 py-2 rounded-lg bg-white text-baby-blue-strong font-bold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-white"
              >
                📖 Article 1 Detail
              </Link>
            </li>
            <li>
              <Link
                to="/articles/1/edit"
                className="px-4 py-2 rounded-lg bg-white text-baby-pink-strong font-bold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg border-2 border-white"
              >
                ✏️ Edit Article 1
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <Section title="🌸 Exercise 2: FetchOnce">
          <FetchOnce />
        </Section>

        <Section title="💎 Exercise 3: ArticleList">
          <ArticleList />
        </Section>

        <Section title="🎀 Exercise 4: SafeFetch">
          <SafeFetch />
        </Section>

        <Section title="✨ Exercise 5: AddArticle">
          <AddArticle />
        </Section>

        <Section title="🌊 Exercise 8: ArticleListWithDelete">
          <ArticleListWithDelete />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-8 border-l-8 border-baby-blue-strong">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-baby-pink">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/articles/:id/edit" element={<EditArticle />} />
    </Routes>
  );
}

export default App;
