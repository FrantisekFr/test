// function handleDataLayerPush(event){  
//    console.log(event);
//    _learnq.push(['track', event.event, {
//     "payload":event.ecommerce.items
//   }]);
// }

// function initializeDataLayerListener() {
//    console.log('Hi from Universal Integration');
//     if (window.dataLayer && Array.isArray(window.dataLayer)) {
//         // Attach an event listener to the push event of the dataLayer array
//         window.dataLayer.addEventListener('push', function(event) {
//             // Handle the dataLayer push event
//             handleDataLayerPush(event);
//         });
//     }    
// }

// initializeDataLayerListener()


(function() {
    console.log('triggered');
    // Define the function to handle dataLayer push events
    function handleDataLayerPush(event) {
        console.log('dataLayer event received:', event);
        _learnq.push(['track', event.event, {
          "payload":event.ecommerce.items
        }]);
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
