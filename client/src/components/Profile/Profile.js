import React, { useState, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Profile.css";
import SocketContext from "../../context/socketContext";
import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion";
const arr = [...Array(24).keys()];

const Profile = () => {
  const ctx = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [selAvatar, setSelAvatar] = useState(
    localStorage.getItem("avatar") || 1
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disable, setDisable] = useState(true);
  const [change, setChange] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 600,
    bgcolor: "#0086ff",
    boxShadow: 24,
    p: 4,
  };

  const handleAvatar = (selectedAvatar) => {
    setSelAvatar(selectedAvatar);
    localStorage.setItem("avatar", selectedAvatar);
  };

  const handleChange = () => {
    setDisable(false);
    setChange(true);
  };

  const handleSubmit = () => {
    setDisable(true);
    setChange(false);
    localStorage.setItem("name", ctx.name);
  };

  return (
    <motion.div
      className="profile-page-cont"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
    >
      <div className="avatar-cont">
        <LazyLoadImage
          effect="blur"
          src={`avatars/${selAvatar}.png`}
          className="avatar-img"
          alt="Avatar"
        />
        <div onClick={handleOpen} className="change-avatar">
          <i className="fa-solid fa-arrows-rotate"></i>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="avatar-options" sx={style}>
            <div className="display-cont">
              <LazyLoadImage
                effect="blur"
                className="display"
                src={`avatars/${selAvatar}.png`}
                onClick={() => handleAvatar()}
                alt="avatar"
              />
            </div>
            <div className="img-options">
              {arr.map((avatar, i) => {
                return (
                  <LazyLoadImage
                    key={i}
                    effect="blur"
                    src={`avatars/${i + 1}.png`}
                    onClick={() => handleAvatar(i + 1)}
                    alt="avatar"
                    className={
                      selAvatar === i + 1
                        ? `selected avatar${i + 1} avatar`
                        : `avatar avatar${i + 1}`
                    }
                  />
                );
              })}
            </div>
          </Box>
        </Modal>
      </div>
      <div className="name-cont">
        <div className="user-name-cont">
          {disable ? (
            <input
              maxLength={15}
              disabled
              type="text"
              className="user-name"
              onChange={(event) => {
                ctx.setName(event.target.value);
              }}
              value={ctx.name}
            />
          ) : (
            <input
              maxLength={15}
              onChange={(e) => ctx.setName(e.target.value)}
              type="text"
              className="change-active user-name"
              value={ctx.name}
            />
          )}
          <div className={`${disable ? "" : "change-active"} change-icon`}>
            <i onClick={handleChange} className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
        {disable ? null : <em>Max. 15 characters are allowed!</em>}
        {change ? (
          <div onClick={handleSubmit} className="change-name">
            Change Name
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Profile;
