// User Management Module
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation - in real app, this would connect to backend
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials!');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            if (users.find(u => u.email === email)) {
                alert('User already exists!');
                return;
            }
            
            const newUser = {id: Date.now(), name, email, phone, password};
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Registration successful!');
            window.location.href = 'login.html';
        });
    }
});