import { AdminPages, Other, userPages, pages, Icons } from "../Menu";
import Item from "./Item";
import { Link } from "react-router-dom";
import SocialIcon from "../SocialIcon";

export default function ItemFooterContainer() {
  const accessRole = localStorage.getItem("auth-role");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:px-8 px-5 py-16">
      {accessRole === "ADMIN" ? (
        <Item Links={AdminPages} title="HALAMAN" />
      ) : accessRole === "ADMIN" ? (
        <Item Links={userPages} title="HALAMAN" />
      ) : (
        <Item Links={pages} title="HALAMAN" />
      )}
      <div>
        <h1 className="mb-3 font-semibold text-xl">KONTAK</h1>{" "}
        <p className="text-sm font-medium pb-4">
          <div className="font-bold">Email</div>
          <div>Hartono@gmail.com</div>
        </p>
        <p className="text-sm font-normal pb-4">
          <div className="font-medium">Address</div>
          <div>Jl. Arif Rahman Hakim No.24</div>
        </p>
        <p className="text-sm font-normal pb-4">
          <div className="font-medium">Hours</div>
          <div>(Mon - Fri) 6am - 4pm PST </div>
          <div>(Sat - Sun) 6:30am - 3pm PST</div>
        </p>
      </div>
      <div>
        <Item Links={Other} title="LAINNYA" />
        <h1 className="mt-4 font-semibold text-xl">Temukan Kami</h1>{" "}
        <p className="text-xs font-normal">
          <div className="py-2">Temukan Lokasi Toko Terdekat.</div>
          <Link to="/location" className="hover:underline">
            <button className="bg-white rounded-md text-black px-12 py-2 mt-2 hover:opacity-70 text-lg font-bold">
              Lokasi Toko
            </button>
          </Link>
        </p>
      </div>
      <div className="py-2">
        <h1 className="mt-4 font-semibold text-xl">Ikuti Sosial Media Kami</h1>{" "}
        <div className="py-4">
          <SocialIcon Icons={Icons} />
        </div>
      </div>
    </div>
  );
}
