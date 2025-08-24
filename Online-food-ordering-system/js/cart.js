// Cart Management Module
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <img src="images/emptyCart.svg" alt="Empty Cart" style="width: 200px; opacity: 0.5;">
                <h4 class="mt-3 text-muted">Your cart is empty</h4>
                <a href="index.html" class="btn btn-primary mt-3">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" style="height: 80px; object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <h5>${item.name}</h5>
                    <p class="text-muted mb-1">${item.category || ''}</p>
                    <p class="fw-bold text-primary">$${item.price}</p>
                </div>
                <div class="col-md-4">
                    <div class="d-flex align-items-center justify-content-end">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="mx-3 fw-bold">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="btn btn-sm btn-outline-danger ms-3" onclick="removeFromCart(${item.id})">×</button>
                    </div>
                    <div class="text-end mt-2">
                        <small class="text-muted">Subtotal: $${(item.price * item.quantity).toFixed(2)}</small>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    updateTotal();
}

function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(c => c.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Please login to checkout');
            window.location.href = 'login.html';
            return;
        }
        
        // Order Management - Create order
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            id: Date.now(),
            userId: currentUser.id,
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: 'Pending',
            date: new Date().toISOString()
        };
        
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        alert('Order placed successfully!');
        window.location.href = 'index.html';
    });
});