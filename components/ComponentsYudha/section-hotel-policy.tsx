import type { NextPage } from "next";

const SectionHotelPolicy: NextPage = () => {
  return (
    <div className="self-stretch flex flex-col py-9 px-[92px] items-start justify-start text-left text-xl text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
          <b className="self-stretch relative">Hotel Policy</b>
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="relative font-medium">
              Syarat dan Ketentuan Umum
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start text-[inherit] text-darkslategray-100 font-inherit">
            <div className="self-stretch relative font-medium opacity-[0.75]">
              <ul className="m-0 pl-[27px]">
                <li className="mb-0">
                  Waktu check-in adalah pukul 14.00 dan waktu check-out adalah
                  pukul 12.00. b. Early check-in dan late check-out tergantung
                  pada ketersediaan kamar dan dapat dikenakan biaya tambahan. c.
                  Diperlukan ID yang sah yang dikeluarkan oleh pemerintah dan
                  kartu kredit pada saat check-in.
                </li>
                <li className="mb-0">
                  Reservasi: a. Semua reservasi harus dijamin dengan kartu
                  kredit yang sah. b. Kebijakan pembatalan dapat bervariasi
                  tergantung pada tarif atau paket yang dipesan. Tamu disarankan
                  untuk memeriksa kebijakan pembatalan sebelum membuat
                  reservasi. c. Reservasi yang dilakukan melalui situs web pihak
                  ketiga tunduk pada syarat dan ketentuan yang ditetapkan oleh
                  agen pemesanan.
                </li>
                <li className="mb-0">
                  Pembayaran untuk seluruh masa inap harus dibayarkan pada saat
                  check-in. b. Kami menerima pembayaran dengan tunai, kartu
                  kredit, dan kartu debit. c. Biaya tambahan apa pun yang timbul
                  selama masa inap harus diselesaikan pada saat check-out.
                </li>
                <li className="mb-0">
                  Kebijakan Merokok: a. Hotel kami adalah properti bebas asap
                  rokok. Merokok tidak diperbolehkan di dalam kamar, lobi, dan
                  area publik lainnya. b. Biaya pembersihan akan dikenakan
                  kepada tamu yang melanggar kebijakan merokok.
                </li>
                <li className="mb-0">
                  Tamu bertanggung jawab atas setiap kerusakan yang disebabkan
                  pada properti hotel, termasuk tetapi tidak terbatas pada
                  kamar, perabotan, dan perlengkapan. b. Barang yang hilang atau
                  dicuri harus segera dilaporkan ke hotel. Hotel tidak
                  bertanggung jawab atas kehilangan atau kerusakan barang
                  pribadi tamu.
                </li>
                <li className="mb-0">
                  Jam malam adalah dari pukul 22.00 hingga 07.00 pagi. b. Tamu
                  diharapkan untuk menghormati hak tamu lain untuk menikmati
                  kamar mereka dengan tenang.
                </li>
                <li className="mb-0">
                  Kami tidak mengizinkan hewan peliharaan di dalam hotel. b.
                  Hewan penuntun adalah diperbolehkan, tergantung pada kebijakan
                  hotel dan hukum setempat.
                </li>
                <li className="mb-0">
                  Pengunjung diperbolehkan di area publik hotel tetapi tidak
                  diperbolehkan masuk ke dalam kamar tamu. b. Pengunjung harus
                  mendaftar dengan resepsionis dan meninggalkan ID yang sah. c.
                  Hotel berhak untuk menolak masuk kepada siapa pun pengunjung.
                </li>
                <li className="mb-0">
                  Hotel tidak bertanggung jawab atas cedera, kehilangan, atau
                  kerusakan pada barang pribadi tamu selama masa inap mereka. b.
                  Hotel tidak bertanggung jawab atas cedera atau kecelakaan yang
                  terjadi di properti hotel.
                </li>
                <li>
                  Hotel berhak untuk menolak layanan kepada siapa saja yang
                  melanggar
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHotelPolicy;
