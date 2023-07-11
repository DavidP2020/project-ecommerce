import { userPages, pages, ownerPages, adminPages } from "../Home/Menu";
import ItemNavbar from "./ItemNavbar";

export default function ItemNavbarContainer({ ctr, ...props }) {
  const accessRole = localStorage.getItem("auth-role");
  return (
    <>
      {accessRole === "ADMIN" ? (
        <ItemNavbar button={ctr} Links={adminPages} />
      ) : accessRole === "USER" ? (
        <ItemNavbar button={ctr} Links={userPages} />
      ) : accessRole === "OWNER" ? (
        <ItemNavbar button={ctr} Links={ownerPages} />
      ) : (
        <ItemNavbar button={ctr} Links={pages} />
      )}
    </>
  );
}
