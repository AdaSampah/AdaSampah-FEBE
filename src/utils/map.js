import { map, tileLayer, Icon, icon, marker, popup, latLng } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MAP_SERVICE_API_KEY } from "../config";

// Fungsi untuk menambahkan event listener ke peta
export const addMapEventListener = (mapInstance, eventName, callback) => {
  mapInstance.addEventListener(eventName, callback);
};

// Fungsi untuk mendapatkan nama tempat berdasarkan koordinat
export const getPlaceNameByCoordinate = async (latitude, longitude) => {
  try {
    const url = new URL(`https://api.maptiler.com/geocoding/${longitude},${latitude}.json`);
    url.searchParams.set("key", MAP_SERVICE_API_KEY);
    url.searchParams.set("language", "id");
    url.searchParams.set("limit", "1");

    const response = await fetch(url);
    const json = await response.json();

    const place = json.features[0].place_name.split(", ");
    return [place.at(-2), place.at(-1)].map((name) => name).join(", ");
  } catch (error) {
    console.error("getPlaceNameByCoordinate: error:", error);
    return `${latitude}, ${longitude}`;
  }
};

// Fungsi untuk memeriksa apakah geolocation tersedia
export const isGeolocationAvailable = () => "geolocation" in navigator;

// Fungsi untuk mendapatkan posisi pengguna
export const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isGeolocationAvailable()) {
      reject("Geolocation API unsupported");
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

// Fungsi untuk membuat dan menginisialisasi peta
export const createMap = (selector, options = {}) => {
  const mapContainer = document.querySelector(selector);
  const existingMapContainer = mapContainer._leaflet_id;

  if (existingMapContainer) {
    console.log("createMap: Map already initialized, returning existing map.");
    return mapContainer._leaflet_map; // Return the actual map instance
  }

  const tileOsm = tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  });

  const mapInstance = map(mapContainer, {
    zoom: options.zoom || 5,
    scrollWheelZoom: false,
    layers: [tileOsm],
    ...options,
  });

  mapContainer._leaflet_map = mapInstance;  // Attach the map instance to the container

  return mapInstance;
};

export const changeCamera = (mapInstance, coordinates, zoomLevel = null) => {
  if (!zoomLevel) {
    mapInstance.setView(latLng(coordinates), mapInstance.getZoom());
  } else {
    mapInstance.setView(latLng(coordinates), zoomLevel);
  }
};

export const createIcon = (options = {}) => {
  return icon({
    ...Icon.Default.prototype.options,
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    ...options,
  });
};

export const addMarker = (mapInstance, coordinates, markerOptions = {}, popupOptions = null) => {
  const newMarker = marker(coordinates, {
    icon: createIcon(),
    alt: "Marker",
    ...markerOptions,
  });

  // Menambahkan tooltip (label) dengan kategori di marker
  newMarker.bindTooltip(markerOptions.alt, { permanent: false, direction: 'top' }).openTooltip();

  // Menambahkan pop-up jika popupOptions diberikan
  if (popupOptions) {
    const newPopup = popup(popupOptions);
    newPopup.setLatLng(coordinates);
    newPopup.setContent(`
      <b>${popupOptions}</b><br>
      Kategori: ${markerOptions.alt}  <!-- Menampilkan kategori -->
    `);
    newMarker.bindPopup(newPopup);
  }

  newMarker.addTo(mapInstance);  // Pastikan marker ini ditambahkan ke peta yang valid

  return newMarker;
};

// Export default object for map utility functions
const Map = {
  addMapEventListener,
  getPlaceNameByCoordinate,
  isGeolocationAvailable,
  getCurrentPosition,
  createMap,
  changeCamera,
  createIcon,
  addMarker,
};

export default Map;
