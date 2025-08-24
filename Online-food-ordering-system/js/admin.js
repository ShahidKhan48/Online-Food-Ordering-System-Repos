// Admin Dashboard JavaScript
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let foodItems = JSON.parse(localStorage.getItem('adminFoodItems')) || [
    {id: 1, name: "Chicken Curry", price: 12.99, image: "images/cu1.png", category: "Chicken", available: true},
    {id: 2, name: "Fried Chicken", price: 8.99, image: "images/cu2.png", category: "Chicken", available: true},
    {id: 3, name: "Mixed Fruit Bowl", price: 6.99, image: "images/f1.png", category: "Fruits", available: true},
    {id: 4, name: "Vanilla Ice Cream", price: 4.99, image: "images/i1.png", category: "Ice Cream", available: true}
];

// Initialize Admin Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        // Simple admin login
        const password = prompt('Enter Admin Password:');
        if (password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
        } else {
            alert('Access Denied');
            window.location.href = 'index.html';
            return;
        }
    }
    
    loadDashboard();
    generateSampleData();
});

// Generate Sample Data for Demo
function generateSampleData() {
    if (orders.length === 0) {
        // Generate sample orders
        const sampleOrders = [
            {
                id: 1001,
                userId: 1,
                customerName: "John Doe",
                customerEmail: "john@example.com",
                items: [{name: "Chicken Curry", quantity: 2, price: 12.99}],
                total: 25.98,
                status: "Pending",
                date: new Date().toISOString()
            },
            {
                id: 1002,
                userId: 2,
                customerName: "Jane Smith",
                customerEmail: "jane@example.com",
                items: [{name: "Fried Chicken", quantity: 1, price: 8.99}],
                total: 8.99,
                status: "Confirmed",
                date: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 1003,
                userId: 3,
                customerName: "Mike Johnson",
                customerEmail: "mike@example.com",
                items: [{name: "Mixed Fruit Bowl", quantity: 3, price: 6.99}],
                total: 20.97,
                status: "Delivered",
                date: new Date(Date.now() - 172800000).toISOString()
            }
        ];
        
        orders = sampleOrders;
        localStorage.setItem('orders', JSON.stringify(orders));
    }
    
    if (users.length === 0) {
        // Generate sample users
        const sampleUsers = [
            {id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", registrationDate: new Date().toISOString()},
            {id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", registrationDate: new Date().toISOString()},
            {id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "555-123-4567", registrationDate: new Date().toISOString()}
        ];
        
        users = sampleUsers;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Show Section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all sidebar items
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).style.display = 'block';
    
    // Add active class to clicked item
    event.target.classList.add('active');
    
    // Load section data
    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'foods':
            loadFoodItems();
            break;
        case 'users':
            loadUsers();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Load Dashboard
function loadDashboard() {
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalRevenue').textContent = '$' + orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalFoodItems').textContent = foodItems.length;
    
    // Load recent orders
    const recentOrders = orders.slice(-5).reverse();
    document.getElementById('recentOrders').innerHTML = recentOrders.map(order => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                <strong>#${order.id}</strong> - ${order.customerName}
            </div>
            <span class="badge bg-${getStatusColor(order.status)}">${order.status}</span>
        </div>
    `).join('');
    
    // Load popular items
    const itemCounts = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
    });
    
    const popularItems = Object.entries(itemCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    
    document.getElementById('popularItems').innerHTML = popularItems.map(([name, count]) => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span>${name}</span>
            <span class="badge bg-primary">${count} orders</span>
        </div>
    `).join('');
}

// Load Orders
function loadOrders() {
    const ordersTable = document.getElementById('ordersTable');
    ordersTable.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>
                <strong>${order.customerName}</strong><br>
                <small class="text-muted">${order.customerEmail}</small>
            </td>
            <td>
                ${order.items.map(item => `${item.name} (${item.quantity})`).join('<br>')}
            </td>
            <td>$${order.total.toFixed(2)}</td>
            <td>
                <select class="form-select form-select-sm" onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewOrderDetails(${order.id})">View</button>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Load Food Items
function loadFoodItems() {
    const foodItemsGrid = document.getElementById('foodItemsGrid');
    foodItemsGrid.innerHTML = foodItems.map(item => `
        <div class="col-md-3 mb-4">
            <div class="card food-admin-card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h6 class="card-title">${item.name}</h6>
                    <p class="card-text">
                        <small class="text-muted">${item.category}</small><br>
                        <strong>$${item.price}</strong>
                    </p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-outline-primary" onclick="editFoodItem(${item.id})">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteFoodItem(${item.id})">Delete</button>
                    </div>
                    <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" ${item.available ? 'checked' : ''} 
                               onchange="toggleAvailability(${item.id})">
                        <label class="form-check-label">Available</label>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Users
function loadUsers() {
    const usersTable = document.getElementById('usersTable');
    usersTable.innerHTML = users.map(user => {
        const userOrders = orders.filter(order => order.userId === user.id);
        return `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${new Date(user.registrationDate).toLocaleDateString()}</td>
                <td>${userOrders.length}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewUserDetails(${user.id})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Edit</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Load Analytics
function loadAnalytics() {
    // Category Analytics
    const categoryStats = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            const foodItem = foodItems.find(f => f.name === item.name);
            const category = foodItem ? foodItem.category : 'Other';
            categoryStats[category] = (categoryStats[category] || 0) + (item.quantity * item.price);
        });
    });
    
    const maxRevenue = Math.max(...Object.values(categoryStats));
    document.getElementById('categoryAnalytics').innerHTML = Object.entries(categoryStats)
        .map(([category, revenue]) => `
            <div class="analytics-item">
                <span>${category}</span>
                <span>$${revenue.toFixed(2)}</span>
            </div>
            <div class="analytics-bar" style="width: ${(revenue/maxRevenue)*100}%"></div>
        `).join('');
    
    // Monthly Revenue (simplified)
    document.getElementById('revenueChart').innerHTML = `
        <div class="analytics-item">
            <span>This Month</span>
            <span>$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</span>
        </div>
        <div class="analytics-bar" style="width: 100%"></div>
    `;
}

// Utility Functions
function getStatusColor(status) {
    const colors = {
        'Pending': 'warning',
        'Confirmed': 'info',
        'Preparing': 'primary',
        'Delivered': 'success',
        'Cancelled': 'danger'
    };
    return colors[status] || 'secondary';
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        showNotification(`Order #${orderId} status updated to ${newStatus}`);
        loadDashboard();
    }
}

function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders = orders.filter(o => o.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        loadDashboard();
        showNotification('Order deleted successfully');
    }
}

function showAddFoodModal() {
    new bootstrap.Modal(document.getElementById('addFoodModal')).show();
}

function addFoodItem() {
    const name = document.getElementById('foodName').value;
    const category = document.getElementById('foodCategory').value;
    const price = parseFloat(document.getElementById('foodPrice').value);
    const image = document.getElementById('foodImage').value;
    
    if (name && category && price && image) {
        const newItem = {
            id: Date.now(),
            name: name,
            category: category,
            price: price,
            image: image,
            available: true
        };
        
        foodItems.push(newItem);
        localStorage.setItem('adminFoodItems', JSON.stringify(foodItems));
        
        bootstrap.Modal.getInstance(document.getElementById('addFoodModal')).hide();
        loadFoodItems();
        loadDashboard();
        showNotification('Food item added successfully');
        
        // Clear form
        document.getElementById('addFoodForm').reset();
    }
}

function deleteFoodItem(itemId) {
    if (confirm('Are you sure you want to delete this food item?')) {
        foodItems = foodItems.filter(item => item.id !== itemId);
        localStorage.setItem('adminFoodItems', JSON.stringify(foodItems));
        loadFoodItems();
        loadDashboard();
        showNotification('Food item deleted successfully');
    }
}

function toggleAvailability(itemId) {
    const item = foodItems.find(f => f.id === itemId);
    if (item) {
        item.available = !item.available;
        localStorage.setItem('adminFoodItems', JSON.stringify(foodItems));
        showNotification(`${item.name} ${item.available ? 'enabled' : 'disabled'}`);
    }
}

function filterOrders() {
    const filter = document.getElementById('orderStatusFilter').value;
    const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);
    
    const ordersTable = document.getElementById('ordersTable');
    ordersTable.innerHTML = filteredOrders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>
                <strong>${order.customerName}</strong><br>
                <small class="text-muted">${order.customerEmail}</small>
            </td>
            <td>
                ${order.items.map(item => `${item.name} (${item.quantity})`).join('<br>')}
            </td>
            <td>$${order.total.toFixed(2)}</td>
            <td>
                <select class="form-select form-select-sm" onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewOrderDetails(${order.id})">View</button>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function adminLogout() {
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

// Placeholder functions for future implementation
function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customerName}\nTotal: $${order.total}\nStatus: ${order.status}`);
}

function editFoodItem(itemId) {
    alert('Edit functionality will be implemented in future version');
}

function viewUserDetails(userId) {
    const user = users.find(u => u.id === userId);
    alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}`);
}

function editUser(userId) {
    alert('Edit user functionality will be implemented in future version');
}