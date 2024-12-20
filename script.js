document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
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
            clearErrors();
            if (!emailPattern.test(emailInput.value)) {
                const emailError = emailInput.parentElement.querySelector('.error-message');
                emailError.textContent = "Invalid email format (e.g., john@google.com)";
                emailInput.classList.add('is-invalid');
            } else {
                emailInput.classList.remove('is-invalid');
            }
        }

        function validateName() {
            clearErrors();
            if (nameInput.value.length < 1) {
                const nameError = nameInput.parentElement.querySelector('.error-message');
                nameError.textContent = "Name is required.";
                nameInput.classList.add('is-invalid');
            } else {
                nameInput.classList.remove('is-invalid');
            }
        }

        function validatePasswords() {
            clearErrors();
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
                const formData = {
                    email: emailInput.value,
                    name: nameInput.value,
                    phone: document.getElementById('signupPhone').value,
                    password: passwordInput.value
                };
                console.log('Signup Form Data:', JSON.stringify(formData, null, 2));
                jsonOutput.textContent = JSON.stringify(formData, null, 2);
            }
        });
    }
});

/* Shopping Cart and Product Management Implementation */
$(document).ready(function() {
    // Initialize storage and load data
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
            if (select.length) {
                select.empty();
                select.append(`<option value="" disabled selected>Select a product</option>`);
                products.forEach(product => {
                    select.append(`
                        <option value="${product.id}" id="product_${product.id}" name="product_${product.id}">
                            ${product.name} - $${product.price.toFixed(2)}
                        </option>
                    `);
                });
            }
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
        if (tbody.length) {
            tbody.empty();
            let total = 0;
            
            cart.forEach((item) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                tbody.append(`
                    <tr id="row_${item.id}">
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <input type="number" 
                                   class="form-control quantity-input" 
                                   id="qty_${item.id}"
                                   name="qty_${item.id}"
                                   value="${item.quantity}" 
                                   min="1"
                                   data-product-id="${item.id}">
                        </td>
                        <td id="total_${item.id}">$${itemTotal.toFixed(2)}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-danger btn-sm remove-item" 
                                    id="remove_${item.id}"
                                    name="remove_${item.id}"
                                    onclick="removeCartItem('${item.id}')"
                                    data-product-id="${item.id}">
                                Remove
                            </button>
                        </td>
                    </tr>
                `);
            });

            $('#totalAmount').text(`$${total.toFixed(2)}`);
        }
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

    // Modified checkout handler with MongoDB integration
    $('#checkout-btn').click(async function() {
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

                // Display JSON
                $('#jsonDisplay').remove();
                $('.container').append(`
                    <div id="jsonDisplay" class="mt-3">
                        <pre id="json-content" class="p-3 bg-light border rounded">
                            ${JSON.stringify(checkoutItems, null, 2)}
                        </pre>
                    </div>
                `);

                // Log to MongoDB
                await logToMongo(checkoutItems);
                
                // Navigate to billing details
                window.location.href = 'billingDetails.html';
            }
        } catch (e) {
            console.error("Error processing checkout:", e);
        }
    });

    // Billing form submission
    $('#billingForm').submit(async function(e) {
        e.preventDefault();
        const billingDetails = {
            address: $('#billingAddress').val(),
            city: $('#billingCity').val(),
            state: $('#billingState').val(),
            zipCode: $('#billingZip').val(),
            country: $('#billingCountry').val(),
            cardNumber: $('#cardNumber').val(),
            cardholderName: $('#cardholderName').val(),
            expirationDate: $('#expirationDate').val()
        };

        try {
            await logToMongo(null, billingDetails, null);
            window.location.href = 'shipping.html';
        } catch (error) {
            console.error('Error saving billing details:', error);
        }
    });

    // Shipping form submission
    $('#shippingForm').submit(async function(e) {
        e.preventDefault();
        const shippingDetails = {
            address: $('#shippingAddress').val(),
            city: $('#shippingCity').val(),
            state: $('#shippingState').val(),
            zipCode: $('#shippingZip').val(),
            carrier: $('#shippingCarrier').val(),
            method: $('#shippingMethod').val()
        };

        try {
            await logToMongo(null, null, shippingDetails);
            alert('Order completed successfully!');
            localStorage.removeItem('cart'); // Clear cart after successful order
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error saving shipping details:', error);
        }
    });
});

// Global functions
window.removeCartItem = function(productId) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartDisplay(updatedCart);
    } catch (e) {
        console.error("Error removing item from cart:", e);
    }
};

window.updateCartDisplay = function(cart) {
    const tbody = $('#cartTable');
    if (tbody.length) {
        tbody.empty();
        let total = 0;
        
        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            tbody.append(`
                <tr id="row_${item.id}">
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <input type="number" 
                               class="form-control quantity-input" 
                               id="qty_${item.id}"
                               name="qty_${item.id}"
                               value="${item.quantity}" 
                               min="1"
                               data-product-id="${item.id}">
                    </td>
                    <td id="total_${item.id}">$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button type="button"
                                class="btn btn-danger btn-sm remove-item" 
                                id="remove_${item.id}"
                                name="remove_${item.id}"
                                onclick="removeCartItem('${item.id}')"
                                data-product-id="${item.id}">
                            Remove
                        </button>
                    </td>
                </tr>
            `);
        });

        $('#totalAmount').text(`$${total.toFixed(2)}`);
    }
};

// Debug function to check localStorage content
window.checkStorage = function() {
    console.log("Products:", JSON.parse(localStorage.getItem('products')));
    console.log("Cart:", JSON.parse(localStorage.getItem('cart')));
};

// Check storage on page load
$(document).ready(function() {
    checkStorage();
});
