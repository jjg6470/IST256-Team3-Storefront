document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('signupEmail');
    const nameInput = document.getElementById('signupName');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');

    const emailError = document.createElement('div');
    const nameError = document.createElement('div');
    const passwordError = document.createElement('div');

    emailError.classList.add('error-message');
    nameError.classList.add('error-message');
    passwordError.classList.add('error-message');

    emailInput.parentElement.appendChild(emailError);
    nameInput.parentElement.appendChild(nameError);
    confirmPasswordInput.parentElement.appendChild(passwordError);

    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function validateEmail() {
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Invalid email format (e.g., john@google.com)";
            emailInput.classList.add('invalid');
        } else {
            emailError.textContent = "";
            emailInput.classList.remove('invalid');
        }
    }

    function validateName() {
        if (nameInput.value.length < 1) {
            nameError.textContent = "Name is required.";
            nameInput.classList.add('invalid');
        } else {
            nameError.textContent = "";
            nameInput.classList.remove('invalid');
        }
    }

    function validatePasswords() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = "Passwords do not match.";
            confirmPasswordInput.classList.add('invalid');
        } else {
            passwordError.textContent = "";
            confirmPasswordInput.classList.remove('invalid');
        }
    }

    emailInput.addEventListener('input', validateEmail);
    nameInput.addEventListener('input', validateName);
    passwordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateEmail();
        validateName();
        validatePasswords();

        if (!emailError.textContent && !nameError.textContent && !passwordError.textContent) {
            console.log("Form is valid, submitting...");
            const formData = {
                email: emailInput.value,
                name: nameInput.value,
                phone: document.getElementById('signupPhone').value,
                password: passwordInput.value
            };
            console.log('Signup Form Data:', JSON.stringify(formData, null, 2));
        }
    });
});
