import React, { useRef, useState, useEffect } from "react";
import addPhoto from "../../assets/Laporkan/addPhoto.svg";
import { FiTrash2, FiEdit2, FiCheckCircle } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { FaCamera } from "react-icons/fa";
import { mlAxiosInstance } from "../../config";
import { ToastBar } from "react-hot-toast";

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
  const [showImageActions, setShowImageActions] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

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

  // Fungsi prediksi
  const predictWaste = async (imageFile) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await mlAxiosInstance.post("/predictModel2", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      toast.error("Gagal memproses gambar. Coba lagi.");
      return null;
    } finally {
      setLoading(false);
    }
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
      <div className="flex justify-center w-full px-2 py-10 bg-transparent relative z-10">
        <div className="w-full max-w-5xl bg-white p-0 overflow-hidden">
          <form className="sm:p-12 p-5" onSubmit={handlePredict}>
            <h3 className="text-[28px] md:text-[32px] font-extrabold text-center text-[#096B68] mb-2 tracking-tight">
              Kenali Sampahmu{" "}
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
                  <div
                    className="relative inline-block rounded-xl border border-[#e0f7f6] bg-white overflow-hidden group"
                    onClick={() => setShowImageActions((v) => !v)}
                    onMouseLeave={() => setShowImageActions(false)}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="BuktiFoto"
                      className="max-h-[240px] mx-auto object-contain rounded-xl border border-[#e0f7f6] bg-white"
                    />
                    <div
                      className={`absolute top-2 right-2 flex gap-2 z-10 transition-opacity ${
                        canHover
                          ? "md:opacity-0 md:group-hover:opacity-100"
                          : ""
                      } ${
                        showImageActions || (canHover && false)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
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
                className={`flex items-center gap-2 px-8 py-3 bg-[#096B68] hover:bg-[#075A57] text-white rounded-[40px] text-base font-bold shadow-md transition-colors duration-200 ${
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
              <div className="cardKu items-center shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] mt-10 md:rounded-3xl rounded-2xl w-full max-w-6xl mx-auto px-0 py-0 border border-[#e0f7f6] bg-white/90 flex flex-col gap-6 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-8 pt-8">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle
                      size={32}
                      className="text-[#129990] bg-white rounded-full shadow"
                    />
                    <div>
                      <div className="text-2xl font-bold text-[#096B68] tracking-tight mb-1">
                        {result.predictedLabel?.charAt(0).toUpperCase() +
                          result.predictedLabel?.slice(1) || "-"}
                        {result.scores && (
                          <span className="ml-3 px-2 py-0.5 text-xs rounded-full bg-[#e0f7f6] text-[#129990] font-semibold align-middle">
                            {(result.scores * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        Prediksi Jenis Sampah
                      </div>
                    </div>
                  </div>
                </div>
                {result.detail && (
                  <div className="flex flex-col gap-4 px-8 pb-8">
                    <div className="bg-[#f8fefd] border border-[#e0f7f6] rounded-xl px-5 py-4 mb-2">
                      <div className="text-xs font-semibold text-[#129990] mb-1 uppercase tracking-wider">
                        Penanganan
                      </div>
                      <div className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                        {result.detail.handling}
                      </div>
                    </div>
                    {result.detail.reuse_recommendations &&
                      result.detail.reuse_recommendations.length > 0 && (
                        <div className="bg-[#f8fefd] border border-[#e0f7f6] rounded-xl px-5 py-4 mb-2">
                          <div className="text-xs font-semibold text-[#129990] mb-1 uppercase tracking-wider">
                            Rekomendasi Pemanfaatan Ulang
                          </div>
                          <ul className="list-disc ml-5 mt-1 text-gray-800 text-base space-y-1">
                            {result.detail.reuse_recommendations.map(
                              (item, idx) => (
                                <li key={idx}>{item}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    {result.detail.articles &&
                      result.detail.articles.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold text-[#129990] mb-2 uppercase tracking-wider px-1">
                            Bacaan & Inspirasi
                          </div>
                          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            {result.detail.articles.map((art, idx) => (
                              <div
                                key={idx}
                                className="cardKu flex flex-col bg-[#f8fefd] border border-[#e0f7f6] rounded-2xl p-0 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] hover:shadow-lg transition group w-full overflow-hidden"
                              >
                                <a
                                  href={art.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block h-full"
                                >
                                  <img
                                    src={art.image}
                                    alt={art.title}
                                    className="w-full h-40 object-cover rounded-t-2xl group-hover:scale-105 transition duration-200"
                                    style={{ minHeight: 120, maxHeight: 180 }}
                                  />
                                  <div className="flex flex-col px-5 py-4 h-full">
                                    <div className="font-bold text-[#096B68] text-base mb-2 text-center truncate">
                                      {art.title}
                                    </div>
                                    <div className="text-gray-600 text-sm max-h-24 overflow-y-auto whitespace-pre-line text-center pr-1 custom-scrollbar">
                                      {art.description}
                                    </div>
                                    <span className="text-xs text-[#129990] underline mt-2 block text-center font-semibold">
                                      Baca selengkapnya
                                    </span>
                                  </div>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
