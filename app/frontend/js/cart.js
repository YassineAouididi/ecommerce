// Cart-specific functions

async function addToCartFromModal(productId) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('Please login first');
    window.location.href = '/pages/login.html';
    return;
  }

  const quantity = parseInt(document.getElementById('quantity').value) || 1;

  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });

    const result = await response.json();

    if (result.success) {
      updateCartCount();
      showNotification('Product added to cart!', 'success');
    } else {
      showNotification(result.message || 'Error adding to cart', 'danger');
    }
  } catch (error) {
    console.error('Error:', error);
    showNotification('Error adding to cart', 'danger');
  }
}

// Show notifications
function showNotification(message, type = 'info') {
  const alertClass = `alert alert-${type}`;
  const alert = document.createElement('div');
  alert.className = `${alertClass} alert-dismissible fade show position-fixed`;
  alert.style.top = '20px';
  alert.style.right = '20px';
  alert.style.zIndex = '9999';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}
