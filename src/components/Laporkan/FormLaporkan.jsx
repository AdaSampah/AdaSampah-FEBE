import addPhoto from "../../assets/Laporkan/addPhoto.svg";
import send from "../../assets/Laporkan/send.svg";


export default function FormLaporkan() {
    const file = false;
    const loading = false;
    return(
        <main>
      <div className="sm:p-10 p-4">
        <div className="bg-white 2xl:max-w-[940px] lg:max-w-[800px] md:max-w-[680px] max-w-[640px] h-auto md:shadow-lg shadow-md md:rounded-3xl rounded-xl mx-auto 2xl:translate-y-[-620px] translate-y-[-320px]">
          <form onSubmi="" className="sm:p-20 p-8">
            <h3 className="md:text-[32px] sm:text-subheadline text-body md:leading-normal leading-normal  text-center font-bold py-6 mb-10">Tuliskan laporan secara jelas dan detail</h3>
            {file ? (
              <>
                <p className="md:text-body text-normal font-semibold my-3">Bukti Kejadian</p>
                <img src="" alt="BuktiFoto" className="w-full max-h-[200px] object-cover" />
              </>
            ) : (
              <label htmlFor="imageLaporkan">
                <p className="md:text-body text-normal font-semibold my-3">Bukti Kejadian</p>
                <div className="border-dashed border-2 border-inputBorder rounded-lg cursor-pointer max-h-[200px]" onDrop="" onDragOver="">
                  <div className="p-10 flex flex-col justify-center items-center">
                    <img src={addPhoto} alt="iconAddImg" className="md:w-8 w-6 mb-2" />
                    <p className="md:text-normal text-smallText text-center">Drag and drop foto atau klik untuk upload</p>
                    <p className="md:text-normal text-smallText  text-center text-[#6B7280]">JPEG, JPG, PNGF (5MB maximum)</p>
                  </div>
                  <input type="file" id="imageLaporkan" className="hidden" onChange="" />
                </div>
              </label>
            )}
            <div className="mt-4">
              <label htmlFor="deskripsiLaporan">
                <p className="md:text-body text-normal font-semibold py-3">Deskripsi</p>
              </label>
              <textarea
                cols="30"
                rows="10"
                type="text"
                id="deskripsiLaporan"
                className="w-full h-32 p-4 block outline-none rounded-lg border-2 border-inputBorder font-medium"
                placeholder="Jelaskan secara detail kejadian yang ingin Anda laporkan"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="alamat Detail">
                <p className="md:text-body text-normal font-semibold py-3">Alamat Detail</p>
              </label>
              <input
                type="text"
                id="alamat Detail"
                className="w-full p-4 block outline-none rounded-lg border-2 border-inputBorder font-medium"
                placeholder="Contoh : Jl Mangga 1, didepan mall A"
                onChange={(e) => setAlamatDetail(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-8">
              <button type="submit" className="flex gap-2 justify-center items-center py-3 px-5 bg-greenMain text-white rounded-[40px] text-normal font-semibold hover:brightness-150 duration-100">
                <span>{loading ? "Mengirim" : "Kirim Laporan"}</span>
                <img src={send} alt="send" className="w-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    )
}