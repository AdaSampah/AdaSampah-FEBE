import { map, tileLayer, Icon, icon, marker, popup, latLng } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MAP_SERVICE_API_KEY } from "../config";

// Fungsi untuk menambahkan event listener ke peta
export const addMapEventListener = (mapInstance, eventName, callback) => {
  mapInstance.addEventListener(eventName, callback);
};

// Daftar kabupaten/kota dan provinsi DIY
const DIY_KABUPATEN = [
  "Bantul",
  "Kabupaten Gunung Kidul",
  "Kulon Progo",
  "Sleman",
  "Yogyakarta",
];
const DIY_PROVINSI = "Daerah Istimewa Yogyakarta";

// Fungsi untuk mendapatkan nama tempat berdasarkan koordinat
export const getPlaceNameByCoordinate = async (latitude, longitude) => {
  // Bounding box DIY (kurang lebih):
  // Barat: 110.002, Timur: 110.850, Selatan: -8.200, Utara: -7.560
  // const isInDIY =
  //   longitude >= 110.002 &&
  //   longitude <= 110.85 &&
  //   latitude >= -8.2 &&
  //   latitude <= -7.56;

  try {
    const url = new URL(
      `https://api.maptiler.com/geocoding/${longitude},${latitude}.json`
    );
    url.searchParams.set("key", MAP_SERVICE_API_KEY);
    url.searchParams.set("language", "id");
    url.searchParams.set("limit", "1");

    const response = await fetch(url);
    const json = await response.json();

    const feature = json.features[0];
    const placeNameFull = feature.place_name;
    const place = placeNameFull.split(", ");

    // --- Ambil regency (kabupaten/kota) dari context atau string, validasi hanya yang ada di DIY ---
    // Ambil regency dan province langsung dari context API, lalu normalisasi ke DIY_KABUPATEN
    let regency = "";
    let province = "";
    const clean = (str) =>
      str
        .toLowerCase()
        .replace(/kabupaten|kota|regency/gi, "")
        .replace(/\s+/g, " ")
        .trim();
    if (feature.context) {
      // Ambil regency dari context yang paling cocok untuk kabupaten/kota
      let regencyObj = feature.context.find((c) =>
        c.id.startsWith("subregion")
      );
      if (!regencyObj)
        regencyObj = feature.context.find((c) => c.id.startsWith("district"));
      if (!regencyObj)
        regencyObj = feature.context.find((c) =>
          c.id.startsWith("joint_municipality")
        );
      if (!regencyObj)
        regencyObj = feature.context.find((c) => c.id.startsWith("place"));
      if (regencyObj) {
        // Normalisasi ke DIY_KABUPATEN
        regency =
          DIY_KABUPATEN.find((kab) => clean(regencyObj.text) === clean(kab)) ||
          regencyObj.text;
      }
      // Ambil province dari context yang mengandung 'region'
      const provinceObj = feature.context.find((c) =>
        c.id.startsWith("region")
      );
      if (provinceObj) province = provinceObj.text;
    }
    // Jika context tidak ada, cek di array place, toleransi variasi nama kabupaten/kota
    if (!regency) {
      regency =
        DIY_KABUPATEN.find((kab) =>
          place.some((p) => clean(p) === clean(kab))
        ) || "";
    }
    if (!regency) regency = "Tidak diketahui";
    if (!province) province = "Tidak diketahui";

    // Format location: "kabupaten/kota, provinsi" atau fallback koordinat
    const placeNameShort =
      regency !== "Tidak diketahui" && province !== "Tidak diketahui"
        ? `${regency}, ${province}`
        : `Lat: ${latitude}, Lon: ${longitude}`;

    // Format detailLocation: gabungkan nama jalan + context yang relevan (tanpa duplikat)
    let detailLocationComponents = [];
    let seenComponent = new Set();
    // Tambahkan nama jalan (place[0])
    if (place[0]) {
      const jalan = place[0].trim();
      if (jalan && !seenComponent.has(jalan)) {
        seenComponent.add(jalan);
        detailLocationComponents.push(jalan);
      }
    }
    // Tambahkan context yang relevan (dari paling spesifik ke umum)
    if (feature.context) {
      feature.context.forEach((c) => {
        // Hanya ambil context yang admin_area atau place-type
        if (
          [
            "place",
            "municipal_district",
            "joint_municipality",
            "subregion",
            "district",
            "region",
          ].some((prefix) => c.id.startsWith(prefix))
        ) {
          const val = c.text.trim();
          if (val && !seenComponent.has(val)) {
            seenComponent.add(val);
            detailLocationComponents.push(val);
          }
        }
      });
    }
    // Tambahkan regency dan province jika belum ada
    if (regency && !seenComponent.has(regency))
      detailLocationComponents.push(regency);
    if (province && !seenComponent.has(province))
      detailLocationComponents.push(province);
    let detailLocation = detailLocationComponents.join(", ");
    // Fallback jika kosong
    if (!detailLocation || /^\d+$/.test(detailLocation.trim())) {
      detailLocation = placeNameShort;
    }

    return {
      short: placeNameShort,
      full: detailLocation,
      regency,
      province,
    };
  } catch (error) {
    console.error("getPlaceNameByCoordinate: error:", error);
    // // Fallback: jika di DIY, tetap isi regency/province DIY
    // if (isInDIY) {
    //   return {
    //     short: `Yogyakarta, ${DIY_PROVINSI}`,
    //     full: `Yogyakarta, ${DIY_PROVINSI}`,
    //     regency: "Yogyakarta",
    //     province: DIY_PROVINSI,
    //   };
    // }
    return {
      short: `Lat: ${latitude}, Lon: ${longitude}`,
      full: `Lat: ${latitude}, Lon: ${longitude}`,
      regency: "Tidak diketahui",
      province: "Tidak diketahui",
    };
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
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  });

  const mapInstance = map(mapContainer, {
    zoom: options.zoom || 5,
    scrollWheelZoom: false,
    layers: [tileOsm],
    ...options,
  });

  mapContainer._leaflet_map = mapInstance; // Attach the map instance to the container

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

export const addMarker = (
  mapInstance,
  coordinates,
  markerOptions = {},
  popupOptions = null
) => {
  const newMarker = marker(coordinates, {
    icon: createIcon(),
    alt: "Marker",
    ...markerOptions,
  });

  // Menambahkan tooltip (label) dengan kategori di marker
  newMarker
    .bindTooltip(markerOptions.alt, { permanent: false, direction: "top" })
    .openTooltip();

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

  newMarker.addTo(mapInstance); // Pastikan marker ini ditambahkan ke peta yang valid

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
