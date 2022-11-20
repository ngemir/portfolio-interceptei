import { mapBoxGenerator } from "./mapbox.js";


// Input Mask ----------------------------------
var input = document.getElementById('cepInput');
var CepMask = {
  mask: '00000-000',
  lazy: false,
  autofix: true,
  overwrite: true
};

input.addEventListener('focus', (evento) => {
  var mask = IMask(input, CepMask);
})
// Input Mask end ---------------------------

//Google MAP API START -------------------------------
// let address = "Avenida paulista, São Paulo, SP, Brasil";

// function googleinitialize() {
//   let map;
//   let latInfo;
//   let lngInfo;

//   //collect address lat and lng
//   geocoder = new google.maps.Geocoder();
//   geocoder.geocode({
//     address: address
//   }, (results, status) => {
//     if (status == google.maps.GeocoderStatus.OK) {
//       latInfo = results[0].geometry.location.lat();
//       lngInfo = results[0].geometry.location.lng();

//       let geoPosition = { lat: latInfo, lng: lngInfo };

//       //Show map
//       map = new google.maps.Map(document.getElementById("map"), {
//         center: geoPosition,
//         zoom: 14,
//       });

//       //show marker
//       const marker = new google.maps.Marker({
//         position: geoPosition,
//         map: map,
//       });

//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });

//   window.googleinitialize = googleinitialize;
// }
//Google MAP API END---------------------------------

//Mapbox Initialize *******
mapBoxGenerator();

// Get CEP info -----------------------------------------------
const formularioCep = document.getElementById('formulariocep');

formularioCep.addEventListener('submit', (evento) => {
  evento.preventDefault();
  let cepInput = document.getElementById('cepInput').value;
  let cep = cepInput.replace(/-/, '');

  // Get cep Data
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => {
      // convert data to JSON
      return response.json();
    })
    .then((dados) => {
      //get html element
      let infoCep = document.getElementById('infocep');
      let infoAddress = document.getElementById('infoaddress');
      let infoDistrict = document.getElementById('infodistrict');
      let infoCity = document.getElementById('infocity');
      let infoState = document.getElementById('infostate');

      //put CEP data to html element
      infoCep.value = dados.cep;
      infoAddress.value = dados.logradouro;
      infoDistrict.value = dados.bairro;
      infoCity.value = dados.localidade;
      infoState.value = dados.uf;
    })
})

// get cep info end ------------------------------------------



// Get Address info and return address map location -------------
function getLocation() {
  let infoNumber = document.getElementById('infonumber').value;
  let infoCep = document.getElementById('infocep').value;
  let infoAddress = document.getElementById('infoaddress').value;
  let infoDistrict = document.getElementById('infodistrict').value;
  let infoCity = document.getElementById('infocity').value;
  let infoState = document.getElementById('infostate').value;

  address = `${infoNumber}, ${infoAddress}, ${infoDistrict}, ${infoCity}, ${infoState}, Brasil`;

  //Use Google Map API
  //googleinitialize(); 

  //Use MapBox API
  mapBoxGenerator(address);
}

const formularioNumber = document.getElementById('formularionumber');
formularioNumber.addEventListener('submit', (evento) => {
  evento.preventDefault();
  getLocation();
})

// get address end ----------------------------------------------


