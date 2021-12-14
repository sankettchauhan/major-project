import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Article from "./pages/article";
import ArticleNew from "./pages/articlenew";
import ArticleSearch from "./pages/articlesearch";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/article/:id" element={<Article />} />
        <Route exact path="/article/add" element={<ArticleNew />} />
        <Route exact path="/article/search" element={<ArticleSearch />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
