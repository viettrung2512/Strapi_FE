import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import './utils/i18n';
import { AuthProvider } from "./contexts/AuthContext";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import Profile from "./components/forms/Profile";
import ForgotPassword from "./components/forms/ForgotPassword";
import ResetPassword from "./components/forms/ResetPassword";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ArticleDetail from "./pages/ArticleDetail";
import Questions from "./pages/Questions";
import QuestionDetail from "./pages/QuestionDetail";

const AppContent = () => {
  const location = useLocation();
  const [questionsList, setQuestionsList] = useState([]);

  const isAuthPage = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ].includes(location.pathname);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:articleId"
          element={
            <ProtectedRoute>
              <ArticleDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <Questions questions={questionsList} setQuestions={setQuestionsList} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:questionId"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;