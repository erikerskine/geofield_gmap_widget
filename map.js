(function($){
  $(document).ready(function() {
    $('#geofield-gmap-widget-canvas').each(function() {

      var map;
      var markers = [];

      if($('.geofield-gmap-widget-latitude input').val() && $('.geofield-gmap-widget-longitude input').val()){
        var latitude = $('.geofield-gmap-widget-latitude input').val();
        var longitude = $('.geofield-gmap-widget-longitude input').val();
        var latlng = new google.maps.LatLng(latitude, longitude);
        var zoom = 14;
      }else{
        var latlng = new google.maps.LatLng(51.5031324985752, -0.15260690161130697);
        var zoom = 14;
      }

      // Map Settings
      var settings = {
        zoom: zoom,
        center: latlng,
        mapTypeControl: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };


      // Start Map
      var map = new google.maps.Map(this, settings);


      // On map click, remove all current pins, add new one and update our fields
      google.maps.event.addListener(map, 'click', function(event) {
        clearOverlays();
        markers = [];
        addMarker(event.latLng);
        $('.geofield-gmap-widget-latitude input').val(event.latLng.lat());
        $('.geofield-gmap-widget-longitude input').val(event.latLng.lng());
      });

      // If you've already set a location, create a pin
      if ($('.geofield-gmap-widget-latitude input').val() && $('.geofield-gmap-widget-longitude input').val()){
        var coordinates = {
          "lat" : $('.geofield-gmap-widget-latitude input').val(),
          "long" : $('.geofield-gmap-widget-longitude input').val()
        };
        var current_location =  new google.maps.LatLng(coordinates.lat, coordinates.long);
        addMarker(current_location);
      }

      // Add a marker to the map and push to the array.
      function addMarker(location) {
        marker = new google.maps.Marker({
          position: location,
          map: map
        });
        markers.push(marker);
      }

      // Sets the map on all markers in the array.
      function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the overlays from the map, but keeps them in the array.
      function clearOverlays() {
        setAllMap(null);
      }

      // Shows any overlays currently in the array.
      function showOverlays() {
        setAllMap(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteOverlays() {
        clearOverlays();
        markers = [];
      }


    });
  });
})(jQuery);
