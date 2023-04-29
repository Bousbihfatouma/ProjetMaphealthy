// Creation de la MAP de base
// const map = L.map('map').setView([48.833, 2.333], 7);
const map = L.map('map').setView([48.833, 2.333], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 30,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Récupération des élements html
var modal = document.querySelector('#laModale');
var inputTitre = document.querySelector('#titre');
var inputAdresse = document.querySelector('#adresse');
var inputSite = document.querySelector('#site');
var inputDescription = document.querySelector('#description');
var vegan = document.querySelector('input[id="resto-vegan"]');
var sansGluten = document.querySelector('input[id="resto-sansgluten"]');
var sansLactose = document.querySelector('input[id="resto-sanslactose"]');
var coordonnée


var tableauMarker = [];

try {
      // on essaye de récupérer le tableau dans le localstorage
  var storageData = localStorage.getItem('savetableauMarker_v2');
  if (storageData) {
    tableauMarker = JSON.parse(storageData);
  }
} catch (error) {
      // si ça ne fonctionne pas, on crée un tableau vide
  console.error('Erreur lors de la récupération des données du localstorage :', error);
}

// var tableauMarker
// try {
//     // on essaye de récupérer le tableau dans le localstorage
//     tableauMarker = JSON.parse(localStorage.getItem('savetableauMarker')) || [];
// }
// catch (error) {
//     // si ça ne fonctionne pas, on crée un tableau vide
//     tableauMarker = [];
//     // et on ne fait rien avec l'erreur
// }

function onMapClick(e) {
    coordonnée= e.latlng;
    modal.showModal();
}
map.on('click', onMapClick);;

modal.addEventListener('close', function () {
    console.log(modal.returnValue)
    if (modal.returnValue === 'oui') {
        tableauMarker.push({
            titre: inputTitre.value,
            adresse: inputAdresse.value,
            site: inputSite.value,
            description: inputDescription.value,
            vegan:vegan.value,
            vegan:vegan.value, 
            coordonnée: coordonnée
        });
        localStorage.setItem('savetableauMarker_v2', JSON.stringify(tableauMarker));
        ajoutMarkerSurLaMap(inputTitre.value, inputAdresse.value, inputSite.value, inputDescription.value, coordonnée);
    }
});


// on charge les marqueurs du localstorage
for (var i = 0; i < tableauMarker.length; i++) {
    ajoutMarkerSurLaMap(tableauMarker[i].titre, tableauMarker[i].adresse, tableauMarker[i].site, tableauMarker[i].description,  tableauMarker[i].coordonnée);
}


function ajoutMarkerSurLaMap(titre, adresse, site, description, coordonnée) {
    var marker = new L.Marker([coordonnée.lat, coordonnée.lng]).addTo(map);
    marker.bindPopup(
        '<h2>' + titre + '</h2>'
        + '<p><a style="cursor: pointer" onclick="supprimeMarker('+ coordonnée.lat + ', ' + coordonnée.lng + ')">Supprimer</a></p>'
        + '<p>' + adresse + '</p>'
        + '<p>' + site + '</p>'
        + '<p>' + description + '</p>'
        // + '<img src="' + image + '" alt="' + titre + '">'
    );
}


function supprimeMarker(lat, lng) {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            if (layer.getLatLng().lat === lat && layer.getLatLng().lng === lng) {
                map.removeLayer(layer);
            }
        }
    });


    tableauMarker = tableauMarker.filter(function (marker) {
        return marker.coordonnée.lat !== lat || marker.coordonnée.lng !== lng;
    });
    localStorage.setItem('savetableauMarker_v2', JSON.stringify(tableauMarker));
}
