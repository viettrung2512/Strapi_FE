import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import ContactModal from "./components/ContactModal";
import FloatingButton from "./components/FloatingButton";

const AppContent = () => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const location = useLocation();

  const handleOpenContactModal = () => {
    setContactModalVisible(true);
  };

  const handleCloseContactModal = () => {
    setContactModalVisible(false);
  };

  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);

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
              <Questions />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAuthPage && (
        <>
          <FloatingButton
            onClick={handleOpenContactModal}
            tooltip="Đi đến trang Liên hệ"
          />
          <ContactModal
            visible={contactModalVisible}
            onClose={handleCloseContactModal}
          />
        </>
      )}
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
