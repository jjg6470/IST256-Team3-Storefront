$(document).ready(function() {
    // Object to store saved products
    let savedProducts = {};

    function showError(element, message) {
        element.addClass('is-invalid');
        element.siblings('.invalid-feedback').text(message);
    }

    function clearErrors() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').text('');
    }

    // Form submission handler
    $('#productForm').on('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        let isValid = true;
        const requiredFields = {
            'productId': 'Product ID',
            'productDescription': 'Product Description',
            'productCategory': 'Product Category',
            'productUOM': 'Unit of Measure',
            'productAmount': 'Amount',
            'productPrice': 'Product Price'
        };

        for (let [fieldId, fieldName] of Object.entries(requiredFields)) {
            const element = $(`#${fieldId}`);
            if (!element.val()) {
                showError(element, `${fieldName} is required`);
                isValid = false;
            }
        }

        if (isValid) {
            const productData = {
                productId: $('#productId').val(),
                description: $('#productDescription').val(),
                category: $('#productCategory').val(),
                unitOfMeasure: $('#productUOM').val(),
                productAmount: $('#productAmount').val(),
                price: parseFloat($('#productPrice').val()).toFixed(2),
                weight: $('#productWeight').val() ? parseFloat($('#productWeight').val()).toFixed(1) : null
            };
            
            // Save the product
            savedProducts[productData.productId] = productData;
            
            // Show success message
            $('#saveMessage').removeClass('d-none');
            
            // Hide message after 3 seconds
            setTimeout(function() {
                $('#saveMessage').addClass('d-none');
            }, 3000);

            // Clear the form
            $('#productForm')[0].reset();
        }
    });

    // Search button handler
    $('#searchBtn').on('click', function() {
        const searchId = $('#searchProductId').val();
        clearErrors();
        
        if (!searchId) {
            showError($('#searchProductId'), 'Please enter a Product ID to search');
            return;
        }

        // Look up the product
        const foundProduct = savedProducts[searchId];

        if (foundProduct) {
            // Show search results section and display JSON
            $('#searchResults').removeClass('d-none');
            $('#searchJsonOutput').html(
                '<pre class="mb-0">' + 
                JSON.stringify(foundProduct, null, 2) + 
                '</pre>'
            );
        } else {
            // Show not found message
            $('#searchResults').removeClass('d-none');
            $('#searchJsonOutput').html(
                '<div class="alert alert-warning mb-0">No product found with ID: ' + searchId + '</div>'
            );
        }
    });

    // Price formatting
    $('#productPrice').on('change', function() {
        if (this.value) {
            this.value = parseFloat(this.value).toFixed(2);
        }
    });

    // Clear search results when search input changes
    $('#searchProductId').on('input', function() {
        $('#searchResults').addClass('d-none');
    });
});