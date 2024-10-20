document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const contactForm = document.getElementById('contactForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };

            console.log('Login Form Data:', JSON.stringify(formData, null, 2));
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                email: document.getElementById('signupEmail').value,
                name: document.getElementById('signupName').value,
                phone: document.getElementById('signupPhone').value,
                password: document.getElementById('signupPassword').value,
                confirmPassword: document.getElementById('signupConfirmPassword').value
            };

            console.log('Signup Form Data:', JSON.stringify(formData, null, 2));
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            console.log('Contact Form Data:', JSON.stringify(formData, null, 2));
        });
    }
});
