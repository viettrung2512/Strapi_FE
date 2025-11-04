"use client";

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

  return (
    <div className="min-h-screen flex bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-indigo-600/10" />
        <div className="relative z-10 max-w-lg text-center animate-fade-in">
          <h2 className="text-6xl font-extrabold text-blue-900 mb-6 tracking-tight">
            KIMEI
          </h2>
          <p className="text-xl text-blue-800 font-medium mb-10 leading-relaxed italic">
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện thực những mục tiêu khát vọng."
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

      {/* Right side - Signup Form (ENLARGED) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-12 py-20">
        <div className="w-full max-w-2xl">
          {/* Logo nhỏ trên mobile */}
          <div className="flex justify-center lg:hidden mb-8">
            <span className="text-3xl font-bold text-blue-900">KIMEI</span>
          </div>
          <div className="bg-white backdrop-blur-xl p-16 rounded-3xl  border-white/20 transition-all duration-300 hover:shadow-3xl min-h-[70vh]">
            <h1 className="text-4xl lg:text-5xl font-bold text-center mb-8 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Đăng ký
            </h1>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm flex items-center gap-3 animate-shake">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-base font-semibold text-gray-700 mb-3">
                    Họ và tên đệm
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-transparent transition-all duration-200 text-lg shadow-sm hover:shadow-md"
                    placeholder="Nhập họ và tên đệm"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-base font-semibold text-gray-700 mb-3">
                    Tên
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-transparent transition-all duration-200 text-lg shadow-sm hover:shadow-md"
                    placeholder="Nhập tên"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-base font-semibold text-gray-700 mb-3">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-transparent transition-all duration-200 text-lg shadow-sm hover:shadow-md"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-transparent transition-all duration-200 text-lg shadow-sm hover:shadow-md"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-3">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
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
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl text-white font-bold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Đang đăng ký...
                  </>
                ) : (
                  "Đăng ký"
                )}
              </button>

              {/* Links */}
              <div className="flex justify-center text-base mt-4">
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-blue-700 font-medium hover:underline transition"
                >
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </div>
            </form>

            {/* Footer */}
            <p className="mt-10 text-center text-sm text-gray-500">
              © 2025 KIMEI. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
