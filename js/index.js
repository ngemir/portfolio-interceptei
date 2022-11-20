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

  let address = `${infoNumber}, ${infoAddress}, ${infoDistrict}, ${infoCity}, ${infoState}, Brasil`;

  //Use MapBox API
  mapBoxGenerator(address);
}

const formularioNumber = document.getElementById('formularionumber');
formularioNumber.addEventListener('submit', (evento) => {
  evento.preventDefault();
  getLocation();
})

// get address end ----------------------------------------------


