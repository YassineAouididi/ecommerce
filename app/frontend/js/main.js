// Auth Management
function updateAuthNav() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const authNav = document.getElementById('authNav');
  const userNav = document.getElementById('userNav');

  if (token && user.id) {
    authNav.style.display = 'none';
    userNav.style.display = 'block';
    document.getElementById('userName').textContent = user.name || 'User';

    // Show admin link if user is admin
    if (user.role === 'admin') {
      document.getElementById('adminLink').style.display = 'block';
    }
  } else {
    authNav.style.display = 'block';
    userNav.style.display = 'none';
  }

  updateCartCount();
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

// Cart Management
async function updateCartCount() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    document.getElementById('cartCount').textContent = '0';
    return;
  }

  try {
    const response = await fetch('/api/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('cartCount').textContent = result.data.items.length;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Show notifications
function showNotification(message, type = 'info') {
  const alertClass = `alert alert-${type}`;
  const alert = document.createElement('div');
  alert.className = `${alertClass} alert-dismissible fade show`;
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.insertBefore(alert, document.body.firstChild);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateAuthNav();
});
