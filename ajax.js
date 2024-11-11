/* AJAX Implementation by Valeed Anjum */

const ajaxCalls = {
    // Initialize local storage with sample data
    initializeStorage: function() {
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
    },

    // Search products
    searchProducts: function(searchTerm) {
        return new Promise((resolve) => {
            const products = JSON.parse(localStorage.getItem('products'));
            const filteredProducts = products.filter(product => {
                const searchString = searchTerm.toLowerCase();
                return product.name.toLowerCase().includes(searchString) ||
                       product.id.toLowerCase().includes(searchString) ||
                       product.category.toLowerCase().includes(searchString);
            });
            resolve(filteredProducts);
        });
    },

    // Rest of the existing AJAX functions...
    getProducts: function() {
        return new Promise((resolve) => {
            const products = JSON.parse(localStorage.getItem('products'));
            resolve(products);
        });
    },

    getCart: function() {
        return new Promise((resolve) => {
            const cart = JSON.parse(localStorage.getItem('cart'));
            resolve(cart);
        });
    },

    addToCart: function(productId) {
        return new Promise((resolve, reject) => {
            try {
                const products = JSON.parse(localStorage.getItem('products'));
                const cart = JSON.parse(localStorage.getItem('cart'));
                
                const product = products.find(p => p.id === productId);
                if (!product) {
                    reject('Product not found');
                    return;
                }

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
                resolve(cart);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateQuantity: function(productId, quantity) {
        return new Promise((resolve, reject) => {
            try {
                let cart = JSON.parse(localStorage.getItem('cart'));
                const itemIndex = cart.findIndex(item => item.id === productId);
                
                if (itemIndex !== -1) {
                    cart[itemIndex].quantity = quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    resolve(cart);
                } else {
                    reject('Item not found in cart');
                }
            } catch (error) {
                reject(error);
            }
        });
    },

    removeFromCart: function(productId) {
        return new Promise((resolve, reject) => {
            try {
                let cart = JSON.parse(localStorage.getItem('cart'));
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                resolve(cart);
            } catch (error) {
                reject(error);
            }
        });
    }
};
