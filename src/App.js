import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Article from "./pages/article";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/article/:id" element={<Article />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
