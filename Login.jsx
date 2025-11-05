import { useState } from "react";
import { useAuth } from "./strapi-fe-vite/src/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import GradientButton from "./strapi-fe-vite/src/components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-indigo-600/10" />
        <div className="relative z-10 max-w-lg text-center animate-fade-in">
          <h2 className="text-6xl font-extrabold text-blue-900 mb-6 tracking-tight">
            KIMEI
          </h2>
          <p className="text-xl text-blue-800 font-medium mb-10 leading-relaxed italic">
            “Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện thực những mục tiêu khát vọng.”
          </p>
          <div className="flex justify-center">
            <img
              src="/images/kimei-logo-vertical.png"
              alt="KIMEI Logo"
              className="w-96 drop-shadow-xl animate-float"
            />
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Mobile Logo */}
          <div className="bg-white min-h-[70vh]">
            <h1 className="text-4xl lg:text-5xl font-bold text-center mb-8 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Đăng nhập
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm flex items-center gap-3 animate-shake mb-6">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-transparent transition-all duration-200 text-lg shadow-sm hover:shadow-md"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-3">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-transparent transition-all duration-200 text-lg shadow-sm hover:shadow-md pr-14"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full bg-white/60"
                    aria-label="toggle password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <GradientButton
                type="primary"
                htmlType="submit"
                disabled={loading}
                size="large"
                className="w-full py-4 px-6 rounded-2xl text-white font-bold transition-all duration-300 shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </GradientButton>

              {/* Links */}
              <div className="flex justify-between text-base mt-4">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-indigo-700 font-medium hover:underline transition"
                >
                  Quên mật khẩu?
                </Link>
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-blue-700 font-medium hover:underline transition"
                >
                  Đăng ký
                </Link>
              </div>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              © 2025 KIMEI. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}