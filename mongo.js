async function logToMongo(cartItems, billingDetails, shippingDetais) {
    const logEntry = {
        cartItems: cartItems,
        billingDetails: billingDetails,
        shippingDetais: shippingDetais,
        timestamp: new Date().toISOString()
    };

    const server = "mongodb://team3:team3@localhost:27017";

    try {
        const response = await fetch(server, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logEntry)
        });

        if (response.ok) {
            console.log(`Logged action: ${action}, status: ${status}`);
        } else {
            console.error(`Failed to log action. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error logging action: ${error}`);
    }
}
