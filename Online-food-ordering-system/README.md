# Online Food Ordering System

## System Requirements
- **Operating System**: Windows/Linux
- **Languages**: HTML, CSS, Bootstrap, JavaScript, Java
- **Database**: MySQL
- **Browser**: IE 10+, Mozilla FF 31+, Google Chrome
- **Server**: Tomcat Server
- **Technology**: XAMPP

## Modules
1. **Food Management**: Handles food item details
2. **Order Management**: Tracks orders and their statuses
3. **Cart Management**: Processes customer selections
4. **Customer Management**: Stores customer profiles and order history
5. **Login and User Management**: Ensures secure access

## Setup Instructions
1. Install XAMPP
2. Start Apache and MySQL services
3. Import `database.sql` into MySQL
4. Place project files in htdocs folder
5. Access via `http://localhost/Online-food-ordering-system`

## File Structure
```
├── index.html          # Main page
├── login.html          # User login
├── register.html       # User registration
├── cart.html           # Shopping cart
├── css/
│   └── style.css       # Styles
├── js/
│   ├── app.js          # Main functionality
│   ├── auth.js         # Authentication
│   └── cart.js         # Cart management
└── database.sql        # Database schema
```

## Features
- User registration and login
- Browse food items
- Add items to cart
- Place orders
- Order tracking
- Responsive design with Bootstrap