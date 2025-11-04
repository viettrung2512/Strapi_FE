import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

// Tạo instance axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor để thêm token vào headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/local', {
      identifier: email,
      password,
    });

    const { user, jwt } = response.data;
    
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/local/register', {
      username: userData.email,
      email: userData.email,
      password: userData.password,
      fullName: userData.fullName,
      phone: userData.phone,
    });

    const { user, jwt } = response.data;
    
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Registration failed');
  }
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    throw new Error('Not authenticated');
  }

  try {
    // Verify token với server
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw new Error('Authentication failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default api;