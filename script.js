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





/* Shopping Cart and Product Management Script Implementation by Valeed Anjum */

$(document).ready(function() {
    initializeStorage();
    loadProducts();
    loadCart();

    function initializeStorage() {
        if (!localStorage.getItem('products')) {
            const initialProducts = [
                { id: "001", name: "Mens Jeans", price: 59.99, category: "Men's Clothing" },
                { id: "004", name: "Womens T-Shirt", price: 19.99, category: "Women's Clothing" }
            ];
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }

    function loadProducts() {
        try {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const select = $('#productSelect');
            select.empty();
            
            select.append(<option value="" id="default-option" name="default-option">Select a product</option>);
            products.forEach(product => {
                select.append(`<option value="${product.id}" id="product-${product.id}" name="product-${product.id}">
                    ${product.name} - $${product.price.toFixed(2)}
                </option>`);
            });
        } catch (e) {
            console.error("Error loading products:", e);
        }
    }

    function loadCart() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            updateCartDisplay(cart);
        } catch (e) {
            console.error("Error loading cart:", e);
        }
    }

    function updateCartDisplay(cart) {
        const tbody = $('#cartTable');
        tbody.empty();
        
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            tbody.append(`
                <tr id="cart-row-${item.id}" name="cart-row-${item.id}">
                    <td id="product-id-${item.id}" name="product-id-${item.id}">${item.id}</td>
                    <td id="product-name-${item.id}" name="product-name-${item.id}">${item.name}</td>
                    <td id="product-price-${item.id}" name="product-price-${item.id}">$${item.price.toFixed(2)}</td>
                    <td>
                        <input type="number" 
                               class="form-control quantity-input" 
                               value="${item.quantity}" 
                               min="1"
                               id="quantity-input-${item.id}"
                               name="quantity-input-${item.id}"
                               data-product-id="${item.id}"
                               aria-label="Quantity for ${item.name}">
                    </td>
                    <td id="item-total-${item.id}" name="item-total-${item.id}">$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button type="button"
                                class="btn btn-danger btn-sm remove-item" 
                                id="remove-button-${item.id}"
                                name="remove-button-${item.id}"
                                data-product-id="${item.id}">
                            Remove
                        </button>
                    </td>
                </tr>
            `);
        });

        $('#totalAmount').text($${total.toFixed(2)});
    }

    // Add to cart button click handler
    $('#add-to-cart-btn').click(function() {
        const productId = $('#productSelect').val();
        if (productId) {
            addToCart(productId);
        }
    });

    function addToCart(productId) {
        try {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const product = products.find(p => p.id === productId);
            if (product) {
                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            }
        } catch (e) {
            console.error("Error adding to cart:", e);
        }
    }

    // Handle quantity changes
    $(document).on('change', '.quantity-input', function() {
        const productId = $(this).data('product-id');
        const quantity = Math.max(1, parseInt($(this).val()) || 1);
        $(this).val(quantity);
        updateCartQuantity(productId, quantity);
    });

    function updateCartQuantity(productId, quantity) {
        try {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex !== -1) {
                cart[itemIndex].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            }
        } catch (e) {
            console.error("Error updating quantity:", e);
        }
    }

    // Handle remove button clicks
    $(document).on('click', '.remove-item', function() {
        const productId = $(this).data('product-id');
        removeFromCart(productId);
    });

    // Remove from cart
    function removeFromCart(productId) {
        try {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        } catch (e) {
            console.error("Error removing from cart:", e);
        }
    }

    // Handle checkout button
    $('#checkout-btn').click(function() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length > 0) {
                const checkoutItems = cart.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    total: (item.price * item.quantity).toFixed(2)
                }));

                $('#jsonDisplay').remove();
                $('.container').append(
                    $('<div>').attr({
                        'id': 'jsonDisplay',
                        'name': 'jsonDisplay'
                    })
                    .addClass('mt-3')
                    .append($('<pre>')
                        .addClass('p-3 bg-light border rounded')
                        .attr({
                            'id': 'jsonContent',
                            'name': 'jsonContent'
                        })
                        .text(JSON.stringify(checkoutItems, null, 2))
                    )
                );
            }
        } catch (e) {
            console.error("Error processing checkout:", e);
        }
    });
});
