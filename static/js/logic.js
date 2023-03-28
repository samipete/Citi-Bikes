var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// get data from JSON endpoint; open index.html with python -m https
// console log data to ensure load
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then((bikeData) => {
  var stationArray = bikeData.data.stations;
  console.log(stationArray);

// create maps functions
  function createMap(markers) {
    var lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var baseMaps = {
      "Street Map": lightmap,
    };

    var overlayMaps = {
      "Bikes": markers
    };

    var myMap = L.map("map-id", {
      center: newYorkCoords,
      zoom: mapZoomLevel,
      layers: [lightmap]
    });

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false    
    }).addTo(myMap);
  }

  // create markers functions
  function createMarkers(inputStations) {
    let bikeMarkers = [];
    for (let i = 0; i < inputStations.length; i++) {
      let currentStation = inputStations[i];
      bikeMarkers.push(
        L.marker([currentStation.lat, currentStation.lon])
          .bindPopup("<h3>" + currentStation.name + "<h3><h3>Capacity: " + currentStation.capacity + "</h3>")
      );
    }
    return L.layerGroup(bikeMarkers);
  }
// call create map function and add markers function with station array 
  createMap(createMarkers(stationArray));
});
