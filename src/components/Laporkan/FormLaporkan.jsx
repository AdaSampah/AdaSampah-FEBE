import React, { useState, useEffect, useRef } from 'react';
import { FaCamera } from "react-icons/fa"; // Import React Icon untuk kamera
import { createMap, getCurrentPosition, addMarker } from "../../utils/map"; 
import addPhoto from "../../assets/Laporkan/addPhoto.svg";
import send from "../../assets/Laporkan/send.svg";
import lokasi from "../../assets/Laporkan/tanda.svg";
import * as cameraUtils from "../../utils/camera";

export default function FormLaporkan() {
    const [latitude, setLatitude] = useState(""); 
    const [longitude, setLongitude] = useState("");  
    const [loading, setLoading] = useState(false); 
    const [file, setFile] = useState(null);  
    const mapRef = useRef(null); 
    const [markerInstance, setMarkerInstance] = useState(null); 
    const fileInputRef = useRef(null);
    const [imgSource, setImageSource] = useState("galeri");
    const videoRef = useRef(null);
    const selectCameraRef = useRef(null);
    const canvasRef = useRef(null);

    // Inisialisasi peta dan marker
    useEffect(() => {
        if (!mapRef.current) {
            const map = createMap('#map', { zoom: 14, center: [-7.7944973, 110.4070047], locate: true });
            mapRef.current = map;  
            const { lat, lng } = map.getCenter();
            setLatitude(lat);
            setLongitude(lng);
            const marker = addMarker(map, [lat, lng], { draggable: true });
            setMarkerInstance(marker);

            marker.on('dragend', () => {
                const newLatLng = marker.getLatLng();
                setLatitude(newLatLng.lat);
                setLongitude(newLatLng.lng);
                map.flyTo([newLatLng.lat, newLatLng.lng], 15);
            });

            map.on('click', (e) => {
                const { lat, lng } = e.latlng;
                marker.setLatLng([lat, lng]);
                setLatitude(lat);
                setLongitude(lng);
                map.flyTo([lat, lng], 15);
            });
        } else {
            console.log("useEffect: Map already initialized, skipping initialization.");
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
                    mapRef.current.setView([lat, lng], 15);
                    setLatitude(lat);
                    setLongitude(lng);
                    if (markerInstance) {
                        markerInstance.setLatLng([lat, lng]);
                    }
                    mapRef.current.flyTo([lat, lng], 15);
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
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
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

    // Efek untuk inisialisasi kamera jika imgSource = "camera"
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
            <div className="sm:p-10 p-4">
                <div className="bg-white 2xl:max-w-[940px] lg:max-w-[800px] md:max-w-[680px] max-w-[640px] h-auto md:shadow-lg shadow-md md:rounded-3xl rounded-xl mx-auto 2xl:translate-y-[-620px] translate-y-[-320px]">
                    <form className="sm:p-20 p-8">
                        <h3 className="md:text-[32px] sm:text-subheadline text-body md:leading-normal leading-normal text-center font-bold py-6 mb-10">Tuliskan laporan secara jelas dan detail</h3>

                        {file ? (
                            <>
                                <p className="md:text-body text-normal font-semibold my-3">Bukti Kejadian</p>
                                <img src={URL.createObjectURL(file)} alt="BuktiFoto" className="w-full max-h-[400px] object-cover" />
                                <div className="flex gap-3 mt-3">
                                    <button 
                                        type="button" 
                                        onClick={handleRemoveImage} 
                                        className="flex p-3 justify-center items-center bg-red-500 text-white rounded-[20px] font-small text-sm hover:bg-red-600"
                                    >
                                        Hapus Gambar
                                    </button>
                                    <label htmlFor="editGambar">
                                        <button 
                                            type="button" 
                                            onClick={() => fileInputRef.current.click()} 
                                            className="flex p-3 justify-center items-center bg-yellow-500 text-white rounded-[20px] font-small text-sm hover:bg-yellow-600"
                                        >
                                            Edit Gambar
                                        </button>
                                        <input
                                            ref={fileInputRef} 
                                            type="file" 
                                            id="editGambar" 
                                            className="hidden" 
                                            onChange={handleFileInputChange} 
                                        />
                                    </label>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="md:text-body text-normal font-semibold my-3">Bukti Kejadian</p>
                                {imgSource === "galeri" ? (
                                    <label htmlFor="imageLaporkan">
                                        <div className="border-dashed border-2 border-inputBorder rounded-lg cursor-pointer max-h-[200px]" onDrop={handleFileDrop} onDragOver={handleDragOver}>
                                            <div className="p-10 flex flex-col justify-center items-center">
                                                <img src={addPhoto} alt="iconAddImg" className="md:w-8 w-6 mb-2" />
                                                <p className="md:text-normal text-smallText text-center">Drag and drop foto atau klik untuk upload</p>
                                                <p className="md:text-normal text-smallText text-center text-[#6B7280]">JPEG, JPG, PNG (5MB max)</p>
                                            </div>
                                            <input
                                                ref={fileInputRef} 
                                                type="file" 
                                                id="imageLaporkan" 
                                                className="hidden" 
                                                onChange={handleFileInputChange} 
                                            />
                                        </div>
                                    </label>
                                ) : (
                                    <div className="flex flex-col items-center gap-3 py-4 relative">
                                        <div className="w-full flex flex-col items-center gap-4 relative">
                                            <video
                                                ref={videoRef}
                                                className="rounded-xl border border-[#e0f7f6] shadow w-full max-w-[800px] h-[500px]" // Ukuran video lebih pas dan tidak terlalu besar ke bawah
                                                autoPlay
                                                playsInline
                                                muted
                                                style={{ background: "#000", objectFit: 'cover' }} // Gunakan objectFit untuk memastikan video tidak terdistorsi
                                            />
                                                <div className="absolute bottom-2 left-0 right-0 px-4 flex flex-col sm:flex-row justify-between items-center">
                                                    <select
                                                        ref={selectCameraRef}
                                                        className="px-3 py-2 ml-2 rounded border border-[#b6e6e3] text-[#096B68] bg-white w-1/2 sm:w-1/4"
                                                        style={{ maxWidth: 300 }}
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={handleTakePicture}
                                                        className="px-4 py-3 mb-2 ml-2 sm:ml-5 bg-[#129990] hover:bg-[#096B68] text-white rounded-full font-bold shadow transition w-auto sm:w-full flex items-center justify-center gap-2 cursor-pointer mt-4 sm:mt-2"
                                                    >
                                                        <FaCamera className="w-6 h-6 sm:w-6 sm:h-6" /> {/* Ukuran ikon kamera yang lebih besar */}
                                                    </button>
                                                </div>
                                            <canvas ref={canvasRef} className="hidden" width={640} height={480} />
                                        </div>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className={` ${
                                    imgSource === "galeri"
                                        ? "border-[#096B68] bg-[#e0f7f6]"
                                        : "border-gray-300 bg-white"
                                    } text-[#096B68] mt-2 mr-3 border border-[#096B68] text-[#096B68]  px-5 py-2 rounded-[40px] transition-colors hover:bg-[#e0f7f6]`}
                                    onClick={() => setImageSource("galeri")}
                                > 
                                    Upload Gambar
                                </button>
                                
                                <button
                                    type="button"
                                    className={` ${
                                    imgSource === "camera"
                                        ? "border-[#096B68] bg-[#e0f7f6]"
                                        : "border-gray-300 bg-white"
                                    } mt-2 border border-[#096B68] text-[#096B68] px-5 py-2 rounded-[40px] transition-colors hover:bg-[#e0f7f6]`}
                                    onClick={() => setImageSource("camera")}
                                >
                                    Ambil Gambar
                                </button>
                            </>
                        )}

                        {/* Lokasi dan Deskripsi */}
                        <div className="mt-4">
                            <label htmlFor="deskripsiLaporan">
                                <p className="md:text-body text-normal font-semibold py-3">Deskripsi</p>
                            </label>
                            <textarea
                                cols="30"
                                rows="10" 
                                type="text"
                                id="deskripsiLaporan"
                                className="w-full h-32 p-4 block outline-none rounded-lg border-2 border-[#B0B0B0] font-medium"
                                placeholder="Jelaskan secara detail kejadian yang ingin Anda laporkan"
                            />
                        </div>

                        {/* Map section */}
                        <div className="mt-4">
                            <div id="map" className=" mb-4 w-full h-[400px] bg-gray-200"></div>
                            <div className="flex gap-3">
                                <input
                                    type="number" 
                                    id="latitude"
                                    className="w-full p-1 block outline-none rounded-lg border-2 border-[#B0B0B0] font-medium"
                                    placeholder="Latitude"
                                    value={latitude} 
                                    onChange={(e) => setLatitude(e.target.value)}
                                    disabled
                                />
                                <input
                                    type="number"  
                                    id="longitude"
                                    className="w-full p-1 block outline-none rounded-lg border-2 border-[#B0B0B0] font-medium"
                                    placeholder="Longitude"
                                    value={longitude} 
                                    onChange={(e) => setLongitude(e.target.value)}
                                    disabled
                                />
                            </div> 
                            <button
                                type="button"
                                onClick={handleUseCurrentLocation} 
                                className="w-full mt-3 flex py-2 gap-2 justify-center items-center font-medium bg-[#129990] text-white rounded-[8px] hover:bg-[#096B68] cursor-pointer"
                            >
                                <img src={lokasi} alt="send" className="w-8" />
                                <span className="flex items-center">Gunakan Lokasi Saat Ini</span>
                            </button>
                        </div>

                        {/* Submit button */}
                        <div className="flex justify-end mt-8">
                            <button type="submit" className="flex p-4 gap-2 justify-center items-center py-3 bg-[#129990] text-white rounded-[40px] text-normal font-semibold hover:bg-[#096B68] duration-100">
                                <span>{loading ? "Mengirim" : "Kirim Laporan "}</span>
                                <img src={send} alt="send" className="w-6" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
