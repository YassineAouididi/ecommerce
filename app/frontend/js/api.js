// API Utility Functions

const API_BASE_URL = '/api';

// Auth API
export const authAPI = {
  register: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateProfile: async (token, data) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${queryString}`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    return response.json();
  },

  create: async (token, data) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: data
    });
    return response.json();
  },

  update: async (token, id, data) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: data
    });
    return response.json();
  },

  delete: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};

// Cart API
export const cartAPI = {
  get: async (token) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  addItem: async (token, data) => {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  removeItem: async (token, productId) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });
    return response.json();
  },

  updateItem: async (token, productId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  },

  clear: async (token) => {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};

// Orders API
export const ordersAPI = {
  create: async (token, data) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getMyOrders: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/orders/my-orders?${queryString}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getById: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  getAll: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/orders?${queryString}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateStatus: async (token, id, data) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getStats: async (token) => {
    const response = await fetch(`${API_BASE_URL}/orders/stats/overview`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};
