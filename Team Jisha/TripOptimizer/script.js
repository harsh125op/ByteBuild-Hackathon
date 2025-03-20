// ===========================
// HERO VIDEO NAVIGATION
// ===========================
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const video = document.querySelector('.hero-video');

const movieList = [
    './videos/manali.mp4',
    './videos/bali.mp4',
    './videos/goa.mp4',
    './videos/kashmir.mp4'
];

let index = 0;

function updateVideo(direction) {
    if (direction === 'next') {
        index = (index + 1) % movieList.length;
    } else if (direction === 'prev') {
        index = (index - 1 + movieList.length) % movieList.length;
    }
    video.src = movieList[index];
}

nextButton.addEventListener('click', () => updateVideo('next'));
prevButton.addEventListener('click', () => updateVideo('prev'));

// ===========================
// MAP INITIALIZATION
// ===========================
const map = L.map('map').setView([28.7041, 77.1025], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let startMarker = null;
let endMarker = null;
let routeLine = null;

// ===========================
// GET ROUTE USING OSRM
// ===========================
async function getDynamicRoute(start, end) {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    if (routeLine) map.removeLayer(routeLine);

    routeLine = L.geoJSON(data.routes[0].geometry, {
        style: { color: 'blue', weight: 4 }
    }).addTo(map);

    map.fitBounds(routeLine.getBounds());
}

map.on('click', (e) => {
    if (!startMarker) {
        startMarker = L.marker(e.latlng).addTo(map).bindPopup('Start Point').openPopup();
    } else if (!endMarker) {
        endMarker = L.marker(e.latlng).addTo(map).bindPopup('End Point').openPopup();
        getDynamicRoute(startMarker.getLatLng(), endMarker.getLatLng());
    }
});

// ===========================
// MULTI-LANGUAGE SUPPORT
// ===========================
i18next.init({
    lng: 'en',
    resources: {
        en: {
            translation: {
                "welcome": "Welcome to TripOptimizer",
                "optimize": "Optimize Your Journey",
                "adventure": "Maximize Your Adventure"
            }
        },
        fr: {
            translation: {
                "welcome": "Bienvenue sur TripOptimizer",
                "optimize": "Optimisez votre voyage",
                "adventure": "Maximisez votre aventure"
            }
        },
        es: {
            translation: {
                "welcome": "Bienvenido a TripOptimizer",
                "optimize": "Optimiza tu viaje",
                "adventure": "Maximiza tu aventura"
            }
        }
    }
}, function(err, t) {
    updateTranslation(); // Initialize translation on load
});

function updateTranslation() {
    document.getElementById('translatedText').innerText = i18next.t('welcome');
    document.getElementById('optimizeText').innerText = i18next.t('optimize');
    document.getElementById('adventureText').innerText = i18next.t('adventure');
}

document.getElementById('languageSelector').addEventListener('change', (event) => {
    i18next.changeLanguage(event.target.value, () => {
        updateTranslation(); // Update translation on language change
    });
});
