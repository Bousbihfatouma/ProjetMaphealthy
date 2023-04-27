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
var coordonnée

// La variable qui stockera les coordonnées au click
// let selectedCoord;
// La fonction executée au click de la souris sur la map :
// On sauvegarde les coordonnées en mémoire,
// Puis on ouvre la modale
function onMapClick(e) {
    modal.showModal();
    console.log(e.latlng);
    var marker = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    coordonnée = e.latlng
    marker.bindPopup("<strong>" + e.latlng.lat + "</strong><p>" + e.latlng.lng + "</p>");
}

map.on('click', onMapClick);
// Quand la modale se ferme, on ajoute le nouveau marker sur la map
modal.addEventListener('close', function () {
    console.log(modal.returnValue);
    if (modal.returnValue == 'oui') {
        ajoutMarker(inputTitre.value, inputAdresse.value, inputSite, inputDescription);
    }
});

function ajoutMarker(w , x, y, z, coordonnée) {
    tableauMarker.push({
        titre : x,
        adresse : y,
        infosite : z,
        description: w,
        coordonnée : coordonnée
    })
    console.log(tableauMarker);
    // Enregistre tableauMarker dans le localstorage avec le nom savetableauMarker
    localStorage.setItem('savetableauMarker', JSON.stringify(tableauMarker));
}
var tableauMarker = JSON.parse(localStorage.getItem('savetableauMarker')) || [];
var savedMarkers = localStorage.getItem('savetableauMarker');
if (savedMarkers) {
    savedMarkers = JSON.parse(savedMarkers);
    // Ajoute chaque marker à la carte
    savedMarkers.forEach(function(marker) {
        var newMarker = new L.marker(marker.coordonée).addTo(map);
        newMarker.bindPopup("<strong>" + marker.titre + "</strong><br><img src='" + marker.image + "'><br>" + marker.info);
    });
}