import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      };

      await register(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const primaryBlue = '#3B82F6'; // blue-500
  const primaryIndigo = '#4F46E5'; // indigo-600

  return (
    <div className="min-h-screen flex font-inter bg-white">
      {/* Left Column - Illustration & Slogan (Hidden on mobile) */}
      <div 
        className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden p-16"
        style={{
          background: 'linear-gradient(135deg, #E0F2FE 0%, #E8E0FE 100%)',
        }}
      >
        <div className="relative z-10 max-w-lg text-center">
          <h2 
            className="text-6xl font-extrabold mb-6 tracking-tight"
            style={{ color: primaryBlue, textShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          >
            KIMEI
          </h2>
          <p className="text-xl text-gray-700 font-medium mb-12 leading-relaxed italic">
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện thực những mục tiêu khát vọng."
          </p>
          <div className="flex justify-center">
            <img
              src="/images/kimei-logo-vertical.png" 
              alt="KIMEI Logo"
              className="w-80 drop-shadow-xl rounded-xl"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x150/ffffff/3B82F6?text=KIMEI+Global+Logo"; }}
            />
          </div>
        </div>
      </div>

      {/* Right Column - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4 sm:p-8 lg:p-16">
        <div className="w-full max-w-xl mx-auto space-y-12">
          <h1 
            className="text-4xl lg:text-5xl font-extrabold text-center mb-12"
            style={{ color: primaryBlue, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            Đăng ký
          </h1>

          <form onSubmit={handleSubmit} className="space-y-20">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-shake">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-xl font-medium text-gray-700 mb-2">
                  Họ và tên đệm
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 text-lg shadow-sm"
                  placeholder="Nhập họ và tên đệm"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-xl font-medium text-gray-700 mb-2">
                  Tên
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 text-lg shadow-sm"
                  placeholder="Nhập tên"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-xl font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 text-lg shadow-sm"
                placeholder="Nhập số điện thoại"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 text-lg shadow-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xl font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 text-lg shadow-sm pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors p-1"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 px-6 rounded-lg text-white font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform hover:scale-[1.005] flex items-center justify-center gap-3 text-2xl"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>

            <div className="flex justify-center text-lg pt-8">
              <Link
                to="/login"
                className="text-blue-600 hover:text-indigo-700 font-medium hover:underline transition"
              >
                Đã có tài khoản? Đăng nhập
              </Link>
            </div>
          </form>

          <p className="text-center text-xs text-gray-500 pt-16">
            © 2025 KIMEI. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
}
