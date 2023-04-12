import { Box, Fade, Modal, Popover, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Setting/Logout";

export default function Navbar() {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogout, setOpenLogout] = useState(false);
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
    <>
      <div className="pt-7 pr-14 text-right w-full">
        <Link to="/cart">
          <i className="fas fa-duotone fa-cart-shopping text-xl hover:opacity-70 hover:scale-125 mr-3"></i>
        </Link>
        <i
          className="fas fa-sharp fa-solid fa-gear text-xl hover:opacity-70 hover:scale-125"
          onClick={(e) => handleClickPop(e)}
        ></i>
      </div>
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
              <Box sx={style} style={{ background: "white" }} component={"div"}>
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
    </>
  );
}
