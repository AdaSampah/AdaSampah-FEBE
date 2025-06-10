import React, { useState, useEffect, useRef, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FaCamera } from "react-icons/fa"; // Import React Icon untuk kamera
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { createMap, getCurrentPosition, addMarker } from "../../utils/map";
import Map from "../../utils/map";
import addPhoto from "../../assets/Laporkan/addPhoto.svg";
import send from "../../assets/Laporkan/send.svg";
import lokasi from "../../assets/Laporkan/tanda.svg";
import * as cameraUtils from "../../utils/camera";
import { axiosInstance } from "../../config";
import { toast } from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

export default function FormLaporkan() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const mapRef = useRef(null);
  const [markerInstance, setMarkerInstance] = useState(null);
  const fileInputRef = useRef(null);
  const [imgSource, setImageSource] = useState("galeri");
  const videoRef = useRef(null);
  const selectCameraRef = useRef(null);
  const canvasRef = useRef(null);
  // Validation state
  const [errors, setErrors] = useState({});
  const descriptionRef = useRef(null);
  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);
  // State touched buat validation real-time
  const [touched, setTouched] = useState({
    description: false,
    latitude: false,
    longitude: false,
    file: false,
  });

  // Real-time validation hanya jika sudah pernah disentuh
  useEffect(() => {
    if (
      touched.description ||
      touched.latitude ||
      touched.longitude ||
      touched.file
    ) {
      validateAll();
    }
    // eslint-disable-next-line
  }, [description, latitude, longitude, file]);

  // Validation function
  const validateAll = () => {
    const newErrors = {};
    if (!description.trim()) newErrors.description = "Deskripsi wajib diisi.";
    if (!latitude || isNaN(latitude))
      newErrors.latitude = "Latitude wajib diisi.";
    if (!longitude || isNaN(longitude))
      newErrors.longitude = "Longitude wajib diisi.";
    if (!file) newErrors.file = "Bukti foto wajib diupload.";
    setErrors(newErrors);
    return newErrors;
  };

  // Focus to first error input
  const focusFirstError = (errs) => {
    if (errs.description && descriptionRef.current)
      descriptionRef.current.focus();
    else if (errs.latitude && latitudeRef.current) latitudeRef.current.focus();
    else if (errs.longitude && longitudeRef.current)
      longitudeRef.current.focus();
  };

  // View Transition API for switching mode
  const handleChangeImgSource = (mode) => {
    if (window?.document?.startViewTransition) {
      document.startViewTransition(() => setImageSource(mode));
    } else {
      setImageSource(mode);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk mengirim laporan.");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
      return;
    }
    setLoading(true);
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      focusFirstError(validationErrors);
      return;
    }

    // Ambil alamat dari koordinat
    const placeNames = await Map.getPlaceNameByCoordinate(latitude, longitude);

    // Validasi hanya boleh posting di provinsi DIY
    if (placeNames.province !== "Daerah Istimewa Yogyakarta") {
      toast.error(
        "Saat ini, website kami hanya melayani pelaporan di daerah DIY"
      );
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("lat", latitude);
    formData.append("lon", longitude);
    formData.append("latDetail", latitude);
    formData.append("lonDetail", longitude);
    formData.append("regency", placeNames.regency || "");
    formData.append("province", placeNames.province || "");
    formData.append("location", placeNames.short);
    formData.append("detailLocation", placeNames.full);
    if (file) formData.append("photo", file);

    try {
      const response = await axiosInstance.post("/reports", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status === "success") {
        toast.success("Laporan berhasil dikirim!");
        setRedirect(true); // Set redirect ke true setelah sukses
      } else {
        toast.error("Gagal mengirim laporan: " + response.data.message);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim laporan.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Inisialisasi peta dan marker
  useEffect(() => {
    if (!mapRef.current) {
      const map = createMap("#map", {
        zoom: 14,
        center: [-7.7944973, 110.4070047],
        locate: true,
      });
      mapRef.current = map;
      const { lat, lng } = map.getCenter();
      setLatitude(lat);
      setLongitude(lng);
      const marker = addMarker(map, [lat, lng], { draggable: true });
      setMarkerInstance(marker);

      marker.on("dragend", () => {
        const newLatLng = marker.getLatLng();
        setLatitude(newLatLng.lat);
        setLongitude(newLatLng.lng);
        map.flyTo([newLatLng.lat, newLatLng.lng], 18);
      });

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setLatitude(lat);
        setLongitude(lng);
        map.flyTo([lat, lng], 18);
      });
    } else {
      console.log(
        "useEffect: Map already initialized, skipping initialization."
      );
    }
  }, []);

  // Fungsi mendapatkan lokasi saat ini
  const handleUseCurrentLocation = async () => {
    if (mapRef.current) {
      try {
        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (lat && lng) {
          mapRef.current.setView([lat, lng], 18);
          setLatitude(lat);
          setLongitude(lng);
          if (markerInstance) {
            markerInstance.setLatLng([lat, lng]);
          }
          mapRef.current.flyTo([lat, lng], 18);
        } else {
          throw new Error("Invalid coordinates received");
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    }
  };

  // Fungsi untuk menghandle gambar yang dipilih
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setTouched((prev) => ({ ...prev, file: true }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handler untuk onBlur
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateAll();
  };

  // Handler untuk file input
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    setTouched((prev) => ({ ...prev, file: true }));
  };

  // Fungsi untuk menghapus gambar
  const handleRemoveImage = () => {
    setFile(null);
  };

  // Fungsi untuk mengambil gambar menggunakan kamera
  const handleTakePicture = async () => {
    const blob = await cameraUtils.takePicture();
    if (blob) {
      setFile(new File([blob], "camera-photo.jpg", { type: blob.type }));
      setImageSource("galeri"); // Kembali ke galeri setelah ambil gambar
    }
  };

  // Efek untuk animasi inisialisasi kamera jika imgSource = "camera"
  useEffect(() => {
    let timeoutId;
    if (imgSource === "camera") {
      cameraUtils.initializeCamera({
        video: videoRef.current,
        cameraSelect: selectCameraRef.current,
        canvas: canvasRef.current,
      });
      cameraUtils.launch();
    } else {
      timeoutId = setTimeout(() => {
        cameraUtils.stopAllStreams?.();
        cameraUtils.stop?.();
        if (videoRef.current) videoRef.current.srcObject = null;
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
      cameraUtils.stopAllStreams?.();
      cameraUtils.stop?.();
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [imgSource]);

  return (
    <section>
      {redirect && <Navigate to="/laporan" replace />} {/* Tambahkan ini */}
      <div className="sm:p-10 p-4">
        <div className="bg-white 2xl:max-w-[940px] lg:max-w-[800px] md:max-w-[680px] max-w-[640px] h-auto md:shadow-lg shadow-md md:rounded-3xl rounded-xl mx-auto 2xl:translate-y-[-620px] translate-y-[-320px]">
          <form className="sm:p-20 p-8" onSubmit={handleSubmit} noValidate>
            <h3 className="md:text-[32px] sm:text-subheadline text-body md:leading-normal leading-normal text-center font-bold py-6 mb-10">
              Tuliskan laporan secara jelas dan detail
            </h3>
            {/* Bukti Kejadian */}
            <p className="md:text-body text-normal font-semibold my-3">
              Bukti Kejadian
            </p>
            <div className="flex flex-col md:flex-row gap-3 mb-2">
              <button
                type="button"
                className={`flex-1 border ${
                  imgSource === "galeri"
                    ? "border-[#096B68] bg-[#e0f7f6]"
                    : "border-gray-300 bg-white"
                } text-[#096B68] px-5 py-2 rounded-xl font-semibold transition-colors hover:bg-[#e0f7f6]`}
                onClick={() => handleChangeImgSource("galeri")}
              >
                Upload Gambar
              </button>
              <button
                type="button"
                className={`flex-1 border ${
                  imgSource === "camera"
                    ? "border-[#096B68] bg-[#e0f7f6]"
                    : "border-gray-300 bg-white"
                } text-[#096B68] px-5 py-2 rounded-xl font-semibold transition-colors hover:bg-[#e0f7f6]`}
                onClick={() => handleChangeImgSource("camera")}
              >
                Ambil Gambar
              </button>
            </div>
            {/* Ganti: jika file sudah ada, tampilkan preview menggantikan kotak input */}
            {imgSource === "galeri" && file ? (
              <div className="flex justify-center w-full mb-4">
                <div className="relative inline-block rounded-xl border border-[#e0f7f6] bg-white overflow-hidden group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="BuktiFoto"
                    className="w-full max-h-[400px] object-cover rounded-xl border border-[#e0f7f6] bg-white"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow"
                      title="Hapus Gambar"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 shadow"
                      title="Edit Gambar"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="editGambar"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : imgSource === "galeri" ? (
              <label htmlFor="imageLaporkan">
                <div className="transition-slide-up">
                  <div
                    className={`border-dashed border-2 rounded-xl cursor-pointer max-h-[200px] bg-[#f8fefd] hover:shadow-lg hover:border-[#096B68] transition-all flex flex-col justify-center items-center py-10 ${
                      errors.file ? "border-red-400" : "border-[#b6e6e3]"
                    }`}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    onBlur={() => handleBlur("file")}
                    tabIndex={0}
                  >
                    <img
                      src={addPhoto}
                      alt="iconAddImg"
                      className="md:w-8 w-6 mb-2"
                    />
                    <p className="md:text-normal text-smallText text-center">
                      Drag and drop foto atau klik untuk upload
                    </p>
                    <p className="md:text-normal text-smallText text-center text-[#6B7280]">
                      JPEG, JPG, PNG (5MB max)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="imageLaporkan"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
              </label>
            ) : (
              <div
                className="transition-slide-up"
                style={{
                  animation:
                    "slideUpFadeIn 400ms cubic-bezier(0.4,2,0.6,1) both",
                }}
              >
                <div className="flex flex-col items-center gap-3 py-4 relative">
                  <div className="w-full flex flex-col items-center relative">
                    <div className="relative w-full max-w-lg aspect-video">
                      <video
                        ref={videoRef}
                        className="rounded-xl border border-[#e0f7f6] shadow w-full h-full object-cover bg-black"
                        autoPlay
                        playsInline
                        muted
                      />
                      {/* Action Button */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-row items-center justify-between w-full px-2 gap-2 md:gap-3">
                        <select
                          ref={selectCameraRef}
                          className="w-full md:w-auto px-3 py-2 rounded border border-[#b6e6e3] text-[#096B68] bg-white max-w-[220px] text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleTakePicture}
                          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#129990] hover:bg-[#096b69] text-white rounded-full font-bold shadow transition p-0"
                          title="Ambil Foto"
                        >
                          <FaCamera className="text-xl md:text-2xl" />
                        </button>
                      </div>
                      <canvas
                        ref={canvasRef}
                        className="hidden"
                        width={640}
                        height={480}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {touched.file && errors.file && (
              <p className="text-red-500 text-sm mt-2">{errors.file}</p>
            )}
            {/* Deskripsi */}
            <div className="mt-4">
              <label htmlFor="deskripsiLaporan">
                <p className="md:text-body text-normal font-semibold py-3">
                  Deskripsi
                </p>
              </label>
              <textarea
                ref={descriptionRef}
                cols="30"
                rows="10"
                type="text"
                id="deskripsiLaporan"
                className={`w-full h-32 p-4 block outline-none rounded-lg border-2 font-medium ${
                  errors.description ? "border-red-400" : "border-[#B0B0B0]"
                }`}
                placeholder="Jelaskan secara detail kejadian yang ingin Anda laporkan"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur("description")}
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            {/* Map section */}
            <div className="mt-4">
              <div
                id="map"
                className=" mb-4 w-full h-[400px] bg-gray-200"
              ></div>
              <div className="flex gap-3">
                <input
                  ref={latitudeRef}
                  type="number"
                  id="latitude"
                  disabled
                  className={`w-full p-1 block outline-none rounded-lg border-2 font-medium ${
                    errors.latitude ? "border-red-400" : "border-[#B0B0B0]"
                  }`}
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  onBlur={() => handleBlur("latitude")}
                />
                <input
                  ref={longitudeRef}
                  type="number"
                  id="longitude"
                  disabled
                  className={`w-full p-1 block outline-none rounded-lg border-2 font-medium ${
                    errors.longitude ? "border-red-400" : "border-[#B0B0B0]"
                  }`}
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  onBlur={() => handleBlur("longitude")}
                />
              </div>
              {(touched.latitude && errors.latitude) ||
              (touched.longitude && errors.longitude) ? (
                <div className="flex gap-3 mt-1">
                  {touched.latitude && errors.latitude && (
                    <p className="text-red-500 text-sm">{errors.latitude}</p>
                  )}
                  {touched.longitude && errors.longitude && (
                    <p className="text-red-500 text-sm">{errors.longitude}</p>
                  )}
                </div>
              ) : null}
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="w-full mt-3 flex py-2 gap-2 justify-center items-center font-medium bg-[#129990] text-white rounded-[8px] hover:bg-[#096B68] cursor-pointer"
              >
                <img src={lokasi} alt="send" className="w-8" />
                <span className="flex items-center">
                  Gunakan Lokasi Saat Ini
                </span>
              </button>
            </div>
            {/* Submit button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={Object.keys(errors).length > 0 || loading}
                className={`flex p-4 gap-2 justify-center items-center py-3 bg-[#129990] text-white rounded-[40px] text-normal font-semibold hover:bg-[#096B68] duration-100 ${
                  Object.keys(errors).length > 0 || loading
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <ImSpinner2 className="animate-spin h-5 w-5 text-white" />
                    Mengirim...
                  </span>
                ) : (
                  <>
                    Kirim Laporan <img src={send} alt="send" className="w-6" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
