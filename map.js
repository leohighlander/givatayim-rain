let map;

function initMap() {
    // Define the coordinates for the bounding box
    const boundingBox = {
        north: 32.07714935047551,   // Northern latitude boundary
        south: 32.06594281658462,   // Southern latitude boundary
        east:  34.8159085352225, // Eastern longitude boundary
        west: 34.80216586409351   // Western longitude boundary
    };

    // Initialize the Google Map, centering it roughly within the bounding box
    const mapCenter = {
        lat: (boundingBox.north + boundingBox.south) / 2,
        lng: (boundingBox.east + boundingBox.west) / 2,
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 13,
        fullscreenControl: true,
    });

    // Create a new custom overlay
    const rainOverlay = new google.maps.OverlayView();

    rainOverlay.onAdd = function () {
        const layer = document.createElement('canvas');
        layer.style.position = 'absolute';
        layer.id = 'rain-canvas';
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(layer);
    };

    rainOverlay.draw = function () {
        const overlayProjection = this.getProjection();
        const sw = new google.maps.LatLng(boundingBox.south, boundingBox.west);
        const ne = new google.maps.LatLng(boundingBox.north, boundingBox.east);
        const swPoint = overlayProjection.fromLatLngToDivPixel(sw);
        const nePoint = overlayProjection.fromLatLngToDivPixel(ne);

        // Resize the canvas
        const canvas = document.getElementById('rain-canvas');
        canvas.style.left = `${swPoint.x}px`;
        canvas.style.top = `${nePoint.y}px`;
        canvas.width = Math.abs(nePoint.x - swPoint.x);
        canvas.height = Math.abs(swPoint.y - nePoint.y);

        // Start the raindrop animation
        animateRain(canvas);
    };

    rainOverlay.onRemove = function () {
        const canvas = document.getElementById('rain-canvas');
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
    };

    rainOverlay.setMap(map);
}

// Load the map
window.onload = initMap;
