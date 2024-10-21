document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('signupEmail');
    const nameInput = document.getElementById('signupName');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const jsonOutput = document.getElementById('jsonOutput');

    // Clear any previous error messages
    function clearErrors() {
        const errorMessages = signupForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');
    }

    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function validateEmail() {
        clearErrors(); // Clear previous errors
        if (!emailPattern.test(emailInput.value)) {
            const emailError = emailInput.parentElement.querySelector('.error-message');
            emailError.textContent = "Invalid email format (e.g., john@google.com)";
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }
    }

    function validateName() {
        clearErrors(); // Clear previous errors
        if (nameInput.value.length < 1) {
            const nameError = nameInput.parentElement.querySelector('.error-message');
            nameError.textContent = "Name is required.";
            nameInput.classList.add('is-invalid');
        } else {
            nameInput.classList.remove('is-invalid');
        }
    }

    function validatePasswords() {
        clearErrors(); // Clear previous errors
        const passwordError = confirmPasswordInput.parentElement.querySelector('.error-message');
        if (passwordInput.value.length < 1) {
            passwordError.textContent = "Password is required.";
            passwordInput.classList.add('is-invalid');
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = "Passwords do not match.";
            confirmPasswordInput.classList.add('is-invalid');
        } else {
            confirmPasswordInput.classList.remove('is-invalid');
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

        const emailError = emailInput.parentElement.querySelector('.error-message').textContent;
        const nameError = nameInput.parentElement.querySelector('.error-message').textContent;
        const passwordError = confirmPasswordInput.parentElement.querySelector('.error-message').textContent;

        if (!emailError && !nameError && !passwordError) {
            console.log("Form is valid, submitting...");
            const formData = {
                email: emailInput.value,
                name: nameInput.value,
                phone: document.getElementById('signupPhone').value,
                password: passwordInput.value
            };
            console.log('Signup Form Data:', JSON.stringify(formData, null, 2));
            jsonOutput.textContent = JSON.stringify(formData, null, 2); // Display JSON on the page
        }
    });
});
