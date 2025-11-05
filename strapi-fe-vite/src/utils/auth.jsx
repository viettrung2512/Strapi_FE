const API_URL = "http://localhost:1337/api";

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  });

  if (!res.ok) throw new Error("Invalid email or password");
  return res.json();
};

export const register = async ({ username, email, password }) => {
  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export const logout = () => true;
