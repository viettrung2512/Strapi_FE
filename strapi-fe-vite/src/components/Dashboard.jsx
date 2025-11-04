import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                OKR <span className="text-blue-600">KPI</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-gray-700">{user?.username || user?.email}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chào mừng đến với hệ thống OKR/KPI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện thực những mục tiêu khát vọng."
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mục tiêu OKR</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-gray-600 text-sm">Đang hoạt động</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chỉ số KPI</h3>
              <p className="text-3xl font-bold text-green-600">24</p>
              <p className="text-gray-600 text-sm">Đang theo dõi</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiến độ</h3>
              <p className="text-3xl font-bold text-purple-600">78%</p>
              <p className="text-gray-600 text-sm">Hoàn thành</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p className="text-gray-700">Bạn đã đăng nhập thành công</p>
                <span className="text-gray-500 text-sm">Vừa xong</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <p className="text-gray-700">Cập nhật mục tiêu quý</p>
                <span className="text-gray-500 text-sm">2 giờ trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;