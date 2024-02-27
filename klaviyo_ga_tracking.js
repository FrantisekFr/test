(function() {
    console.log('Klaviyo GA tracking Tag has fired');

    // Handle dataLayer events
    function handleDataLayerPush(event) {
        console.log('dataLayer event detected by handler:', event);
        
        var klaviyo = window.klaviyo || [];
        // Validate supported event type and formatting        
        var eventName;
        var ecommerceEvent;
        var ecommerceItems;
        
        try {
            eventName = event.event;
        } catch (err) {        
        }

        try {
            ecommerceEvent = event.ecommerce;
        } catch (err) {        
        }

        try {
            ecommerceItems = event.ecommerce.items;
        } catch (err) {        
        }

        console.log(eventName);
        console.log(ecommerceEvent);
        console.log(ecommerceItems);
        
        // Track standard events as relevant for Klaviyo assuming standard GA event formatting        
        if(ecommerceEvent){
            
            switch (eventName && ecommerceEvent && ecommerceItems) {                    
            
                case 'view_item':
                    ecommerce_items[0].$value = ecommerce_items[0].price;                    
                    klaviyo.track("Viewed Product", ecommerce_items[0]);
                    break;
                
                case 'add_to_cart':
                    ecommerce_items[0].$value = ecommerce_items[0].price;                    
                    klaviyo.track("Added to Cart", ecommerce_items);
                    break;
                
                case 'begin_checkout':
                    var checkoutValue = 0;
                    var checkoutData = {};

                    for (var i = 0; i < ecommerce_items.length; i++) {
                        checkoutValue += ecommerce_items[i].price * ecommerce_items[i].quantity;
                    };
                    checkoutData.$value = parseFloat(checkoutValue.toFixed(2));
                    checkoutData.Items = ecommerce_items;
                    
                    klaviyo.track("Started Checkout", checkoutData);
                    break;
                    
                case 'purchase':
                    var purchaseValue = 0;
                    var purchaseData = {};

                    for (var i = 0; i < ecommerce_items.length; i++) {
                        purchaseValue += ecommerce_items[i].price * ecommerce_items[i].quantity;
                    };
                    purchaseData.$value = parseFloat(purchaseValue.toFixed(2));
                    purchaseData.Items = ecommerce_items;
                    
                    klaviyo.track("Placed Order", purchaseData);
                    break;

                default:
                    // Track other ecommerce events as they stand i.e. without formatting the payload
                    klaviyo.track(eventName, ecommerce_data);
            }
        } 
        //Track non-ecommerce events without payload formatting
        else if (eventName && !ecommerceEvent) {            
            klaviyo.track(eventName, event);
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
