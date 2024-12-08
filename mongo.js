async function logToMongo(cartItems, billingDetails, shippingDetails) {
    try {
        // Log cart items
        if (cartItems) {
            const cartResponse = await fetch('http://localhost:3000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: cartItems, timestamp: new Date().toISOString() })
            });
            if (!cartResponse.ok) throw new Error('Failed to save cart items');
        }

        // Log billing details
        if (billingDetails) {
            const billingResponse = await fetch('http://localhost:3000/api/billing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...billingDetails, timestamp: new Date().toISOString() })
            });
            if (!billingResponse.ok) throw new Error('Failed to save billing details');
        }

        // Log shipping details
        if (shippingDetails) {
            const shippingResponse = await fetch('http://localhost:3000/api/shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...shippingDetails, timestamp: new Date().toISOString() })
            });
            if (!shippingResponse.ok) throw new Error('Failed to save shipping details');
        }

        console.log('Successfully logged all data to MongoDB');
    } catch (error) {
        console.error('Error logging to MongoDB:', error);
        throw error;
    }
}
