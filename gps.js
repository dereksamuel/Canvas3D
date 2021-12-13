window.objective = {
  latitude: 4.579157076823368,
  longitude: -74.12120377059435,
};

window.onload = () => {
  requestCoordinates();
};

function measure(lat1, lon1, lat2, lon2) {
  let Radius = 6378.137; // Radius of earth in KM
  let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = Radius * c;

  return d * 1000; // meters
}

function getDistance(me, objective) {
  let latitudeBigger = (objective.latitude > me.latitude) ? objective.latitude - me.latitude : me.latitude - objective.latitude;
  latitudeBigger = latitudeBigger ** 2;

  let longitudeBigger = (objective.longitude > me.longitude) ? objective.longitude - me.longitude : me.longitude - objective.longitude;
  longitudeBigger = longitudeBigger ** 2;

  return Math.sqrt(latitudeBigger + longitudeBigger) * 1000;
}

function requestCoordinates() {
  // requestAnimationFrame(requestCoordinates);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      window.myCoordinates = position.coords;

      console.log(getDistance(window.myCoordinates, window.objective));
      console.log(getDistance(window.myCoordinates, {
        latitude: 4.57954,
        longitude: -74.12110,
      }));
      console.log(measure(
        window.myCoordinates.latitude,
        window.myCoordinates.longitude,
        window.objective.latitude,
        window.objective.longitude
      ));
    },
    (error) => {
      console.error(error);
    }
  );
}
