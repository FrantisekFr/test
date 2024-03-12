(function() {
    console.log('Klaviyo GA tracking Tag has fired');

    // Handle dataLayer events
    function handleDataLayerPush(event) {
        console.log('dataLayer event detected by handler:', event);

        var klaviyo = window.klaviyo || [];

        var KLAVIYO_EVENT_KEY_MAP = {
            "view_item": "Viewed Product",
            "add_to_cart": "Added to Cart",
            "begin_checkout": "Started Checkout",
            "purchase": "Placed Order"
        }

        // Validate the main formatting expected for standard GA4 ecommerce events
        var eventName;
        var ecommerceItems;

        try {
            eventName = event.event;
            ecommerceItems = event.ecommerce.items;
        } catch (err) {}

        console.log(eventName);
        console.log(ecommerceItems);

        // Track select ecommerce events assuming standard GA4 ecommerce event formatting. 
        if (eventName && ecommerceItems) {
            
            if (eventName == "view_item") {
                ecommerceItems[0].$value = ecommerceItems[0].price;
                console.log(eventName);
                console.log('KL KEY EVENT MAP');
                console.log(KLAVIYO_EVENT_KEY_MAP.eventName);
                klaviyo.track(KLAVIYO_EVENT_KEY_MAP.eventName, ecommerceItems[0]);
            } else if (eventName == "add_to_cart") {
                ecommerceItems[0].$value = ecommerceItems[0].price;
                klaviyo.track(KLAVIYO_EVENT_KEY_MAP.eventName, ecommerceItems);
            } else if (eventName == "begin_checkout" || eventName == "purchase") {
                var checkoutValue = 0;
                var checkoutData = {};

                for (var i = 0; i < ecommerceItems.length; i++) {
                    checkoutValue += ecommerceItems[i].price * ecommerceItems[i].quantity;
                };
                checkoutData.$value = parseFloat(checkoutValue.toFixed(2));
                checkoutData.Items = ecommerce_items;

                klaviyo.track(KLAVIYO_EVENT_KEY_MAP.eventName, checkoutData);
            }
        }
    }
    // Attach an event listener to the push event of the dataLayer array
    window.dataLayer.push = function() {
        // Capture the arguments passed to the original push method
        var args = Array.prototype.slice.call(arguments);
        // Call the original push method
        Array.prototype.push.apply(window.dataLayer, args);
        // Extract the event object from the arguments
        var event = args[0];
        // Handle the dataLayer push event
        handleDataLayerPush(event);
    };
    
})();
