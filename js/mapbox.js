mapboxgl.accessToken = 'pk.eyJ1IjoibmdlbWlyIiwiYSI6ImNqcGlkYzNxbzBzamUzcW1zb2YxMmpybHgifQ.GBnR3uwlJIFJ2FLL6KQvig';
const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
export function mapBoxGenerator(insertedAddress) {
  let address;
  if (!insertedAddress) {
    address = 'Avenida Paulista, São Paulo, Brasil';
  } else {
    address = insertedAddress;
  }
  mapboxClient.geocoding
    .forwardGeocode({
      query: address,
      autocomplete: false,
      limit: 1
    })
    .send()
    .then((response) => {
      if (
        !response ||
        !response.body ||
        !response.body.features ||
        !response.body.features.length
      ) {
        console.error('Invalid response:');
        console.error(response);
        return;
      }
      const feature = response.body.features[0];

      const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: feature.center,
        zoom: 15
      });

      // Create a marker and add it to the map.
      new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    });
}

