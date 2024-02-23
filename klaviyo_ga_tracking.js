function handleDataLayerPush(event){  
   console.log(event);
   _learnq.push(['track', event.event, {
    "payload":event.ecommerce.items
  }]);
}

function initializeDataLayerListener() {
   console.log('Hi from Universal Integration');
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
        // Attach an event listener to the push event of the dataLayer array
        window.dataLayer.addEventListener('push', function(event) {
            // Handle the dataLayer push event
            handleDataLayerPush(event);
        });
    }    
}

initializeDataLayerListener()
