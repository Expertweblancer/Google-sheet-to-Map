var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var union_price = 2.5;
var saudi_union_price = 1.5;
var border_price = 200;
var trailer_price = 2.5;
var reefer_price = 2.5;
var seasonal_extra = 0;
var seasonal_discount = 0;
var vehicle_type = 0;
var ppk_price = 2.5;
var zoom_level = 3;
var open_flag = 0;
var initial_width = -1;
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var locations = [];
var infowindow;
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1o0J_u-aS2LwU6xJodKn6d6jyknpkVu62Aj33nbjvHRI/edit#gid=0';
var m_cluster;
$(document).ready(function () {
  $('#close-bar').css('display', 'none');

  var height = $(window).height() - 80;
  $('#map').css("height", height);
  $('#statistics').sheetrock({
    url: mySpreadsheet
  });
  setTimeout(() => {
    initLocations();
    initMap();
    $('#mySidenav').css("left", $(window).width());
    $('#mySidenav').removeClass('d-none');
    open_flag = 0;
  }, 2000);

  // $('input[type="checkbox"]').change(function () {
  $('.category').change(function () {

    
    if($(".category:checked").length == 0) {
      locations = [];
      initLocations();
      initMap();
    } else if($(".category:checked").length ==  $('.category').length) {
      locations = [];
      initLocations();
      initMap();
    }else{
      set_Filter();
    }
  });

  $('#logo-image').click(function () {
    locations = [];
    initLocations();
    initMap();
  });
  $('#reset_filter').click(function () {
    locations = [];
    initLocations();
    initMap();
  });
  
});

function initLocations() {
  for (let i = 0; i < $('tbody tr').length; i++) {
    locations.push({ lat: parseFloat($('tbody tr').eq(i).children().eq(4).text()), lng: parseFloat($('tbody tr').eq(i).children().eq(5).text()) });
  }
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom_level,
    center: { lat: 20, lng: -25 },
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ],
  });
  const markers = locations.map((location, i) => {
    var marker = new google.maps.Marker({
      position: location,
      icon: {
        // url: "assets/images/Givaudan-textile-Logo.png", // url
        url: "assets/images/G-hotspot.png", // url
        scaledSize: new google.maps.Size(20, 20), // scaled size
      },
    });
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.close();
      map.setCenter(this.getPosition());
      if (zoom_level != 18) {
        console.log($('tbody tr').eq(i).children().eq(7).text());
        window.location.href = "https://" + $('tbody tr').eq(i).children().eq(7).text();
      }
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
      var contents = `
        <div class='map_info_wrapper'>
          <div class='property_content_wrap'>
            <div class='property_title'>
              <span>` + $('tbody tr').eq(i).children().eq(0).text() + `</span>
            </div>
    
            <div class='property_detail'>
              <span>` + $('tbody tr').eq(i).children().eq(1).text() + `</span><br>
           
              <span>` + $('tbody tr').eq(i).children().eq(2).text() + `</span><br>
            
              <span>` + $('tbody tr').eq(i).children().eq(3).text() + `</span>
            </div>

            <div class='property_activity'>
              <span>Activities</span>
            </div>
    
            <div class='property_category'>
              <span>` + $('tbody tr').eq(i).children().eq(6).text() + `</span><br>
            
            </div>
          </div>
        </div>`;
      infowindow = new google.maps.InfoWindow({
        content: contents,
      });
      infowindow.open(map, this);
    });
    google.maps.event.addListener(marker, 'mouseout', function () {
      infowindow.close();
    });
    return marker;
  });
  m_cluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    averageCenter: true,
  });
  var latlng = new google.maps.LatLng(-23.5344015, -46.7500668);
  latlng = new google.maps.LatLng(46.20656289999999, 6.0785769);
  var geocoder = new google.maps.Geocoder();
  // var autocomplete_pickup = new google.maps.places.Autocomplete(place_pickup);
  // var autocomplete_delivery = new google.maps.places.Autocomplete(place_delivery);
  // autocomplete_pickup.bindTo('bounds', map);
  infowindow = new google.maps.InfoWindow({
    content: document.getElementById("infobox"),
    disableAutoPan: false,
    maxWidth: 150,
    pixelOffset: new google.maps.Size(-140, 0),
    zIndex: null,
    boxStyle: {
      background: "url('https://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
      opacity: 0.90,
      width: "300px"
    },
    closeBoxMargin: "12px 4px 2px 2px",
    closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif",
    infoBoxClearance: new google.maps.Size(1, 1)
  });
}
function smoothZoom(map, max, cnt) {
  if (cnt >= max) {
    return;
  }
  else {
    z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
      google.maps.event.removeListener(z);
      smoothZoom(map, max, cnt + 1);
    });
    setTimeout(function () { map.setZoom(cnt) }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
  }
}

function smoothZoomout(map, min, cnt) {
  if (cnt < min) {
    return;
  }
  else {
    z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
      google.maps.event.removeListener(z);
      smoothZoomout(map, min, cnt - 1);
    });
    setTimeout(function () { map.setZoom(cnt) }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
  }
}

function openNav() {
  if (open_flag == 0) {
    $('#mySidenav').css("left", $(window).width() - $('#mySidenav').width());
    $('#open-bar').css('display', 'none');
    $('#close-bar').css('display', 'block');
    open_flag = 1;
  } else {
    $('#mySidenav').css("left", $(window).width());
    $('#open-bar').css('display', 'block');
    $('#close-bar').css('display', 'none');
    open_flag = 0;
  }
}

function set_Filter() {
  locations = [];
  data = [];
  var filter_str = [];
  for (let i = 0; i < $('input[type="checkbox"]').length; i++) {
    if ($('input[type="checkbox"]').eq(i).prop("checked") == true)
      // filter_str.push($('input[type="checkbox"]').eq(i).parent().find('span').text());
      filter_str.push($('input[type="checkbox"]').eq(i).parent().find('span').attr('data-value'));
  }
  for (let i = 0; i < $('tbody tr').length; i++) {
    for (let j = 0; j < filter_str.length; j++) {
      // if ($('tbody tr').eq(i).children().eq(6).text() == filter_str[j])
      if ($('tbody tr').eq(i).children().eq(6).text().indexOf(filter_str[j]) != -1)
        locations.push({ lat: parseFloat($('tbody tr').eq(i).children().eq(4).text()), lng: parseFloat($('tbody tr').eq(i).children().eq(5).text()) });
        data.push({"number": i});
    }
  }
  m_cluster.clearMarkers();
  const markers = locations.map((location, i) => {
    var marker = new google.maps.Marker({
      position: location,
      icon: {
        url: "assets/images/G-hotspot.png", // url
        scaledSize: new google.maps.Size(20, 20), // scaled size
      },
    });
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.close();
      map.setCenter(this.getPosition());
      if (zoom_level != 18) {
        window.location.href = "http://www.blanklink.com";
      }
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
      var contents = `
      <div class='map_info_wrapper'>
          <div class='property_content_wrap'>
            <div class='property_title'>
               <span>` + $('tbody tr').eq(data[i+1].number).children().eq(0).text() + `</span>
            </div>
    
            <div class='property_content'>
              <span>` + $('tbody tr').eq(data[i+1].number).children().eq(1).text() + `</span>
            </div>
            <div class='property_content'>
              <span>` + $('tbody tr').eq(data[i+1].number).children().eq(2).text() + `</span>
            </div>
            <div class='property_content'>
              <span>` + $('tbody tr').eq(data[i+1].number).children().eq(3).text() + `</span>
            </div>

            <div class='property_activity'>
              <span>Activities</span>
            </div>
    
            <div class='property_category'>
            <span>` + $('tbody tr').eq(data[i+1].number).children().eq(6).text() + `</span><br>
            </div>
          </div>
        </div>`;
      infowindow = new google.maps.InfoWindow({
        content: contents,
      });
      infowindow.open(map, this);
    });
    google.maps.event.addListener(marker, 'mouseout', function () {
      infowindow.close();
    });
    return marker;
  });
  m_cluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    averageCenter: true,
  });
}