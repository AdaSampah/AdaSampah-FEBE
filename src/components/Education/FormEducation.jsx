import React, { useRef, useState, useEffect } from "react";
import addPhoto from "../../assets/Laporkan/addPhoto.svg";
import { FiTrash2, FiEdit2, FiCheckCircle } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { FaCamera } from "react-icons/fa";

import * as cameraUtils from "../../utils/camera";

export default function FormEducation() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const [imgSource, setImageSource] = useState("galeri");
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [forceMirror, setForceMirror] = useState(false);
  const videoRef = useRef(null);
  const selectCameraRef = useRef(null);
  const canvasRef = useRef(null);

  // Inisialisasi kamera saat imgSource === 'camera'
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
      // Delay stop to ensure camera is really stopped even if switching quickly
      timeoutId = setTimeout(() => {
        cameraUtils.stopAllStreams?.();
        cameraUtils.stop?.();
        if (videoRef.current) videoRef.current.srcObject = null;
      }, 100);
    }
    // Cleanup kamera saat unmount atau ganti mode
    return () => {
      clearTimeout(timeoutId);
      cameraUtils.stopAllStreams?.();
      cameraUtils.stop?.();
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [imgSource]);

  // Deteksi kamera depan
  useEffect(() => {
    if (imgSource !== "camera") {
      setIsFrontCamera(false);
      setForceMirror(false);
      return;
    }
    const select = selectCameraRef.current;
    if (!select) return;
    const handleChange = () => {
      const selectedOption = select.options[select.selectedIndex];
      setIsFrontCamera(
        selectedOption &&
          /front|depan|selfie/i.test(selectedOption.textContent || "")
      );
    };
    select.addEventListener("change", handleChange);
    handleChange();
    return () => {
      select.removeEventListener("change", handleChange);
    };
  }, [imgSource]);

  // Fungsi ambil gambar dari kamera
  const handleTakePicture = async () => {
    const blob = await cameraUtils.takePicture(isFrontCamera || forceMirror);
    if (blob) {
      setFile(new File([blob], "camera-photo.jpg", { type: blob.type }));
      setImageSource("galeri"); // Kembali ke mode galeri setelah ambil gambar
    }
  };

  // Fungsi prediksi (ganti dengan REST API ML nanti)
  const predictWaste = async (imageFile) => {
    setLoading(true);
    // Nanti ganti pake axios atau fetch untuk kirim gambar ke API ML
    // Contoh dengan axios:
    // import axios from "axios";
    // const formData = new FormData();
    // formData.append('file', imageFile);
    // const response = await axios.post('URL_API_ML', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // const data = response.data;
    // return { jenis: data.jenis, kategori: data.kategori, info: data.info, link: data.link };

    // Simulasi delay dan hasil prediksi dummy
    await new Promise((r) => setTimeout(r, 1200));
    // Dummy: randomize antara organik/anorganik dengan kategori
    const dummyData = [
      {
        jenis: "Organik",
        kategori: "Sisa Makanan",
        info: "Sampah organik dapat diolah menjadi kompos atau pupuk cair untuk tanaman.",
        link: "https://www.youtube.com/watch?v=QwQ2FQK5KjA",
      },
      {
        jenis: "Anorganik",
        kategori: "Plastik",
        info: "Sampah anorganik seperti plastik dapat didaur ulang menjadi kerajinan tangan atau barang berguna lainnya.",
        link: "https://www.youtube.com/watch?v=8vK2wM5Qn1g",
      },
      {
        jenis: "Anorganik",
        kategori: "Kaleng",
        info: "Kaleng bekas dapat dimanfaatkan sebagai pot tanaman atau bahan kerajinan.",
        link: "https://www.youtube.com/watch?v=2pQJwQwQwQw",
      },
      {
        jenis: "Anorganik",
        kategori: "Kaca",
        info: "Sampah kaca dapat didaur ulang menjadi barang baru atau digunakan kembali sebagai wadah.",
        link: "https://www.youtube.com/watch?v=3kQJwQwQwQw",
      },
    ];
    // Pilih salah satu secara acak
    const res = dummyData[Math.floor(Math.random() * dummyData.length)];
    return res;
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
    setResult(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setFile(null);
    setResult(null);
  };

  const handleEditImage = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!file) return;
    setResult(null);
    const res = await predictWaste(file);
    setResult(res);
    setLoading(false);
  };

  // Fungsi untuk handle transisi mode dengan View Transition API
  const handleChangeImgSource = (mode) => {
    if (window?.document?.startViewTransition) {
      document.startViewTransition(() => setImageSource(mode));
    } else {
      setImageSource(mode);
    }
  };

  return (
    <section className="relative w-full">
      {/* Dekorasi kiri */}
      <div className="hidden md:block absolute left-0 top-0 h-full w-32 z-0">
        <div className="h-2/3 w-32 bg-gradient-to-br from-[#e0f7f6] to-transparent rounded-br-[80px] blur-[2px]" />
      </div>
      {/* Dekorasi kanan */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-32 z-0">
        <div className="h-2/3 w-32 bg-gradient-to-bl from-[#e0f7f6] to-transparent rounded-bl-[80px] blur-[2px]" />
      </div>
      <div className="flex justify-center w-full px-2 py-10 bg-transparent relative z-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#e0f7f6] p-0 overflow-hidden">
          <form className="sm:p-12 p-5" onSubmit={handlePredict}>
            <h3 className="text-[28px] md:text-[32px] font-extrabold text-center text-[#096B68] mb-2 tracking-tight">
              Edukasi Sampah
            </h3>
            <p className="text-center text-gray-500 mb-8 text-base md:text-lg">
              Upload foto sampahmu dan dapatkan informasi jenis serta inspirasi
              pemanfaatannya!
            </p>
            {file ? (
              <>
                <p className="text-body text-normal font-semibold my-3 text-[#096B68]">
                  Foto Sampah
                </p>
                <div className="flex justify-center w-full mb-4">
                  <div className="relative inline-block rounded-xl border border-[#e0f7f6] bg-white overflow-hidden group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="BuktiFoto"
                      className="max-h-[240px] mx-auto object-contain rounded-xl border border-[#e0f7f6] bg-white"
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
                        onClick={handleEditImage}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 shadow"
                        title="Edit Gambar"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="editGambarEducation"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-body text-normal font-semibold my-3 text-[#096B68]">
                  Foto Sampah
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
                {/* Animasi transisi area galeri/kamera */}
                <div key={imgSource} className="transition-slide-up">
                  {imgSource === "galeri" ? (
                    <label htmlFor="imageEducation">
                      <div
                        className="border-dashed mt-8 border-2 border-[#b6e6e3] rounded-xl cursor-pointer max-h-[220px] bg-[#f8fefd] hover:shadow-lg hover:border-[#096B68] transition-all flex flex-col justify-center items-center py-10"
                        onDrop={handleFileDrop}
                        onDragOver={handleDragOver}
                      >
                        <img
                          src={addPhoto}
                          alt="iconAddImg"
                          className="md:w-10 w-8 mb-2"
                        />
                        <p className="text-normal text-center text-[#096B68] font-medium">
                          Drag & drop foto atau klik untuk upload
                        </p>
                        <p className="text-smallText text-center text-[#6B7280]">
                          JPEG, JPG, PNG
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="imageEducation"
                          className="hidden"
                          onChange={handleFileInputChange}
                        />
                      </div>
                    </label>
                  ) : (
                    // UI kamera
                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="w-full flex flex-col items-center relative">
                        <div className="relative w-full max-w-lg aspect-video">
                          {/* Mirror toggle switch */}
                          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                            <label
                              htmlFor="forceMirror"
                              className="flex items-center cursor-pointer select-none"
                              title="Mirror Video"
                            >
                              <span className="hidden md:inline text-xs font-semibold mr-2 bg-white/70 text-black rounded px-2 py-0.5 shadow">
                                {" "}
                                Mirror
                              </span>
                              <span className="relative">
                                <input
                                  type="checkbox"
                                  id="forceMirror"
                                  checked={forceMirror}
                                  onChange={(e) =>
                                    setForceMirror(e.target.checked)
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner peer-checked:bg-[#129990] transition-colors duration-200"></div>
                                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white border border-gray-300 rounded-full shadow peer-checked:translate-x-5 transition-transform duration-200"></div>
                              </span>
                            </label>
                          </div>
                          <video
                            ref={videoRef}
                            className="rounded-xl border border-[#e0f7f6] shadow w-full h-full object-cover bg-black"
                            autoPlay
                            playsInline
                            muted
                            style={
                              isFrontCamera || forceMirror
                                ? { transform: "scaleX(-1)" }
                                : undefined
                            }
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
                  )}
                </div>
              </>
            )}
            {/* Tombol prediksi */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={!file || loading}
                className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#129990] to-[#096B68] text-white rounded-full text-base font-bold shadow-lg hover:brightness-110 transition-all duration-150 ${
                  !file || loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin h-5 w-5 text-white" />
                    Menganalisis...
                  </>
                ) : (
                  <>Cari tahu yuk</>
                )}
              </button>
            </div>
            {/* Output hasil prediksi */}
            {result && (
              <div className="mt-10 p-6 bg-gradient-to-br from-[#e0f7f6] to-[#f8fefd] rounded-2xl shadow-inner border border-[#b6e6e3] flex flex-col items-center transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <FiCheckCircle
                    size={28}
                    className="text-[#129990] bg-white rounded-full"
                  />
                  <h4 className="text-xl font-bold text-[#096B68]">
                    Jenis Sampah:{" "}
                    <span className="font-extrabold">{result.jenis}</span>
                    {result.kategori && (
                      <>
                        {" "}
                        <span className="font-normal text-gray-600">
                          ({result.kategori})
                        </span>
                      </>
                    )}
                  </h4>
                </div>
                <p className="text-gray-700 text-base text-center">
                  {result.info}
                </p>
                {result.link && (
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-[#129990] underline font-semibold hover:text-[#096B68] transition"
                  >
                    Yuk lihat cara pemanfaatannya!
                  </a>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
