// Food Categories
const categories = [
    {id: 0, name: "All", image: "images/logo.png"},
    {id: 1, name: "Chicken", image: "images/c1.png"},
    {id: 2, name: "Curry", image: "images/c2.png"},
    {id: 3, name: "Rice", image: "images/c3.png"},
    {id: 4, name: "Fish", image: "images/c4.png"},
    {id: 5, name: "Fruits", image: "images/c6.png"},
    {id: 6, name: "Ice Cream", image: "images/c7.png"}
];

// Food Items with real images
const foodItems = [
    {id: 1, name: "Chicken Curry", price: 12.99, image: "images/cu1.png", category: "Chicken"},
    {id: 2, name: "Fried Chicken", price: 8.99, image: "images/cu2.png", category: "Chicken"},
    {id: 3, name: "Chicken Biryani", price: 15.99, image: "images/cu3.png", category: "Chicken"},
    {id: 4, name: "Grilled Chicken", price: 11.99, image: "images/cu4.png", category: "Chicken"},
    {id: 5, name: "Chicken Wings", price: 9.99, image: "images/cu5.png", category: "Chicken"},
    {id: 6, name: "Chicken Tikka", price: 13.99, image: "images/cu6.png", category: "Chicken"},
    {id: 7, name: "Mixed Fruit Bowl", price: 6.99, image: "images/f1.png", category: "Fruits"},
    {id: 8, name: "Fresh Strawberries", price: 4.99, image: "images/f2.png", category: "Fruits"},
    {id: 9, name: "Orange Juice", price: 3.99, image: "images/f3.png", category: "Fruits"},
    {id: 10, name: "Apple Slices", price: 2.99, image: "images/f4.png", category: "Fruits"},
    {id: 11, name: "Vanilla Ice Cream", price: 4.99, image: "images/i1.png", category: "Ice Cream"},
    {id: 12, name: "Chocolate Ice Cream", price: 4.99, image: "images/i2.png", category: "Ice Cream"},
    {id: 13, name: "Strawberry Ice Cream", price: 4.99, image: "images/i3.png", category: "Ice Cream"},
    {id: 14, name: "Fish Curry", price: 14.99, image: "images/fi1.png", category: "Fish"},
    {id: 15, name: "Grilled Fish", price: 16.99, image: "images/fi2.png", category: "Fish"},
    {id: 16, name: "Fish Fry", price: 12.99, image: "images/fi3.png", category: "Fish"},
    {id: 17, name: "Vegetable Rice", price: 8.99, image: "images/r1.png", category: "Rice"},
    {id: 18, name: "Fried Rice", price: 9.99, image: "images/r2.png", category: "Rice"},
    {id: 19, name: "Chicken Rice", price: 11.99, image: "images/r3.png", category: "Rice"},
    {id: 20, name: "Spicy Curry", price: 10.99, image: "images/d1.png", category: "Curry"},
    {id: 21, name: "Dal Curry", price: 7.99, image: "images/d2.png", category: "Curry"},
    {id: 22, name: "Vegetable Curry", price: 8.99, image: "images/d3.png", category: "Curry"}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCategories() {
    const container = document.getElementById('categories');
    if (!container) return;
    
    container.innerHTML = categories.map(category => `
        <div class="col-md-2 col-sm-4 col-6 mb-4">
            <div class="category-card ${category.name === 'All' ? 'border-primary' : ''}" onclick="filterByCategory('${category.name}')">
                <img src="${category.image}" alt="${category.name}" class="img-fluid">
                <h6 class="mt-2">${category.name}</h6>
            </div>
        </div>
    `).join('');
}

function displayFoodItems(items = foodItems) {
    const container = document.getElementById('foodItems');
    if (!container) return;
    
    container.innerHTML = items.map(item => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card food-card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text text-muted">${item.category}</p>
                    <p class="card-text fw-bold text-primary">$${item.price}</p>
                    <button class="btn btn-add-to-cart mt-auto" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterByCategory(categoryName) {
    // Remove active class from all categories
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('border-primary');
    });
    
    // Add active class to clicked category
    event.target.closest('.category-card').classList.add('border-primary');
    
    if (categoryName === 'All') {
        displayFoodItems();
    } else {
        const filteredItems = foodItems.filter(item => item.category === categoryName);
        displayFoodItems(filteredItems);
    }
    
    // Scroll to food items section
    document.getElementById('foodItems').scrollIntoView({behavior: 'smooth'});
}

function addToCart(itemId) {
    const item = foodItems.find(f => f.id === itemId);
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    showNotification('Item added to cart!');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    displayCategories();
    displayFoodItems();
    updateCartCount();
});