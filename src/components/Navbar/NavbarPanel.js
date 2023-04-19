import logo from "../../assets/logo.png";
import { Box, Fade, Modal, Popover, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Setting/Logout";

export default function NavbarPanel() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [navbar, setNavbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogout, setOpenLogout] = useState(false);
  const accessToken = sessionStorage.getItem("auth-token");
  const username = sessionStorage.getItem("auth-name");
  const accessRole = sessionStorage.getItem("auth-role");
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => setOpenLogout(false);

  const handleClickPop = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(false);
  };
  return (
    <nav className="bg-primary text-white flex flex-col mx-auto" id="Nav">
      <div className="flex w-full font-light text-sm py-4 px-20">
        <div className="flex justify-between items-center">
          <img
            src={logo}
            alt="logo.png"
            width={60}
            className={`cursor-pointer duration-500`}
          />
        </div>

        <div
          className={`lg:flex lg:justify-between flex-col justify-end pl-8 w-full py-3 ${
            navbar ? "hidden" : "hidden"
          }`}
        >
          <div className="flex justify-end items-start w-full">
            <ul className="text-xs font-medium flex gap-5 pb-4">
              <li>
                <Link to="/help" className="hover:underline">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:underline">
                  Location
                </Link>
              </li>
              {accessToken ? (
                ""
              ) : (
                <li>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>{" "}
                  |{" "}
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                </li>
              )}
              <li>EN | ID</li>
              {accessToken ? (
                <li className="font-extrabold">{username}</li>
              ) : (
                ""
              )}
            </ul>
          </div>

          <div className="flex w-full justify-between items-center">
            <ul className="text-sm font-semibold uppercase flex gap-8">
              {accessRole === "ADMIN" ? (
                <>
                  <li className="hover:underline">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/category">Category</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/product">Product</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/brand">Brand</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/color">Color</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/order">Order</Link>
                  </li>
                </>
              ) : (
                <>
                  {accessRole ? (
                    <li className="hover:underline">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li className="hover:underline">
                    <Link to="/category">Category</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/brand">Brand</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/order">Order</Link>
                  </li>
                </>
              )}
            </ul>
            <div className="flex flex-col">
              <div className="flex gap-9">
                <ul className="text-sm font-medium flex gap-4">
                  <li>
                    <Link to="/cart">
                      <i className="fas fa-cart-shopping text-xl hover:opacity-70 hover:scale-125 mr-3"></i>
                    </Link>
                  </li>
                  {accessToken ? (
                    <li>
                      <i
                        className="fas fa-sharp fa-solid fa-gear text-xl hover:opacity-70 hover:scale-125"
                        onClick={(e) => handleClickPop(e)}
                      ></i>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
                <Popover
                  id={idPop}
                  open={openPop}
                  className="-ml-4"
                  anchorEl={anchorEl}
                  onClose={handleClosePop}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Typography className="w-full" component={"div"}>
                    <div className="popOver">
                      <button className="nav-links-sign" onClick={handleLogout}>
                        <i
                          className="mr-6 m-2 fas fa-solid fa-user"
                          aria-hidden="true"
                        ></i>
                        Profile
                      </button>
                    </div>
                    <div className="popOver">
                      <button className="nav-links-sign" onClick={handleLogout}>
                        <i
                          className="mr-6 m-2 fas fa-sharp fa-regular fa-circle-info"
                          aria-hidden="true"
                        ></i>
                        About
                      </button>
                    </div>
                    <div className="popOver">
                      <button
                        className="nav-links-sign"
                        onClick={() => handleOpenLogout()}
                      >
                        <i
                          className="mr-6 m-2 fas fa-solid fa-right-from-bracket"
                          aria-hidden="true"
                        ></i>
                        Log Out
                      </button>
                    </div>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={openLogout}
                      onClose={handleCloseLogout}
                      closeAfterTransition
                      component={"div"}
                    >
                      <Fade in={openLogout}>
                        <Box
                          sx={style}
                          style={{ background: "white" }}
                          component={"div"}
                        >
                          <Toolbar style={{ marginLeft: "-1rem" }}>
                            <Typography component="div" sx={{ flexGrow: 2 }}>
                              <b className="text-xl">Logout</b>
                            </Typography>
                            <i
                              className="icon fa fa-times"
                              aria-hidden="true"
                              onClick={handleCloseLogout}
                            ></i>
                          </Toolbar>
                          <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                            component={"div"}
                          >
                            <Logout handleClose={handleCloseLogout} />
                          </Typography>
                        </Box>
                      </Fade>
                    </Modal>
                  </Typography>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full lg:hidden">
          <button
            className="lg:hidden inline-flex items-center justify-center border h-10 w-10 rounded-md outline-none focus:outline-none ml-auto"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <i className="fas fa-close"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
        </div>
      </div>
      <div className={`mobileMenu ${navbar ? "" : "hidden"}`}>
        <ul className="text-sm font-semibold uppercase flex flex-col gap-8">
          {accessRole === "ADMIN" ? (
            <>
              <li className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="navbar-links">
                <Link to="/category">Category</Link>
              </li>
              <li className="navbar-links">
                <Link to="/product">Product</Link>
              </li>
              <li className="navbar-links">
                <Link to="/brand">Brand</Link>
              </li>
              <li className="navbar-links">
                <Link to="/color">Color</Link>
              </li>{" "}
              <li className="navbar-links">
                <Link to="/order">Order</Link>
              </li>
            </>
          ) : (
            <>
              {accessRole ? (
                <li className="navbar-links">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              ) : (
                ""
              )}
              <li className="navbar-links">
                <Link to="/category">Category</Link>
              </li>
              <li className="navbar-links">
                <Link to="/brand">Brand</Link>
              </li>
              <li className="navbar-links">
                <Link to="/order">Order</Link>
              </li>
            </>
          )}

          <div className="flex px-6 font-bold">
            <div className="flex-row">Others</div>
            <ul className="flex justify-end items-end w-full gap-2">
              <li>
                <Link to="/cart">
                  <i className="fas fa-cart-shopping text-xl hover:opacity-70 hover:scale-125 mr-3"></i>
                </Link>
              </li>
              {accessToken ? (
                <li>
                  <i
                    className="fas fa-sharp fa-solid fa-gear text-xl hover:opacity-70 hover:scale-125"
                    onClick={(e) => handleClickPop(e)}
                  ></i>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <ul className="text-xs font-medium flex-col w-full -mt-8 mb-4">
            <li className="nav-links">
              <Link to="/help" className="hover:underline">
                Help
              </Link>
            </li>
            <li className="nav-links">
              <Link to="/location" className="hover:underline">
                Location
              </Link>
            </li>
            {accessToken ? (
              ""
            ) : (
              <li className="nav-links">
                <Link to="/login" className="hover:underline">
                  Login
                </Link>{" "}
                |{" "}
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            )}
            <li className="nav-links">EN | ID</li>
          </ul>
        </ul>
      </div>
    </nav>
  );
}
