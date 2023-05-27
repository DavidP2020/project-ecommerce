import { AdminPages, userPages, pages } from "../Home/Menu";
import ItemNavbar from "./ItemNavbar";

export default function ItemNavbarContainer({ ctr, ...props }) {
  const accessRole = localStorage.getItem("auth-role");
  return (
    <>
      {accessRole === "ADMIN" ? (
        <ItemNavbar button={ctr} Links={AdminPages} />
      ) : accessRole === "USER" ? (
        <ItemNavbar button={ctr} Links={userPages} />
      ) : (
        <ItemNavbar button={ctr} Links={pages} />
      )}
    </>
  );
}
