import React, { useState, useRef } from "react";
import "./Profile.css";
import { Box, Modal } from "@mui/material";
import Avatar1 from "../../assets/avatars/1.png";
import Avatar2 from "../../assets/avatars/2.png";
import Avatar3 from "../../assets/avatars/3.png";
import Avatar4 from "../../assets/avatars/4.png";
import Avatar5 from "../../assets/avatars/5.png";
import Avatar6 from "../../assets/avatars/6.png";
import Avatar7 from "../../assets/avatars/7.png";
import Avatar8 from "../../assets/avatars/8.png";
import Avatar9 from "../../assets/avatars/9.png";
import Avatar10 from "../../assets/avatars/10.png";
import Avatar11 from "../../assets/avatars/11.png";
import Avatar12 from "../../assets/avatars/12.png";
import Avatar13 from "../../assets/avatars/13.png";
import Avatar14 from "../../assets/avatars/14.png";
import Avatar15 from "../../assets/avatars/15.png";
import Avatar16 from "../../assets/avatars/16.png";
import Avatar17 from "../../assets/avatars/17.png";
import Avatar18 from "../../assets/avatars/18.png";
import Avatar19 from "../../assets/avatars/19.png";
import Avatar20 from "../../assets/avatars/20.png";
import Avatar21 from "../../assets/avatars/21.png";
import Avatar22 from "../../assets/avatars/22.png";
import Avatar23 from "../../assets/avatars/23.png";
import Avatar24 from "../../assets/avatars/24.png";

const Profile = ({ name, setName }) => {
  //const [name, setName] = useState("Blue");
  const [open, setOpen] = useState(false);
  const [selAvatar, setSelAvatar] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disable, setDisable] = useState(true);
  const [change, setChange] = useState(false);
  const inputRef = useRef();

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
  };

  const handleChange = () => {
    inputRef.current.focus();
    console.log(inputRef.current);
    setDisable(false);
    setChange(true);
  };

  const handleSubmit = () => {
    setDisable(true);
    setChange(false);
    localStorage.setItem("name", name);
  };

  return (
    <div className="profile-page-cont">
      <div className="avatar-cont">
        <img src={Avatar1} className="avatar-img" alt="Avatar" />
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
              <img
                className="display"
                src={
                  selAvatar === 2
                    ? Avatar2
                    : selAvatar === y
                    ? Avatar3
                    : selAvatar === 4
                    ? Avatar4
                    : selAvatar === 5
                    ? Avatar5
                    : selAvatar === 6
                    ? Avatar6
                    : selAvatar === 7
                    ? Avatar7
                    : selAvatar === 8
                    ? Avatar8
                    : selAvatar === 9
                    ? Avatar9
                    : selAvatar === 10
                    ? Avatar10
                    : selAvatar === 11
                    ? Avatar11
                    : selAvatar === 12
                    ? Avatar12
                    : selAvatar === 13
                    ? Avatar13
                    : selAvatar === 14
                    ? Avatar14
                    : selAvatar === 15
                    ? Avatar15
                    : selAvatar === 16
                    ? Avatar16
                    : selAvatar === 17
                    ? Avatar17
                    : selAvatar === 18
                    ? Avatar18
                    : selAvatar === 19
                    ? Avatar19
                    : selAvatar === 20
                    ? Avatar20
                    : selAvatar === 21
                    ? Avatar21
                    : selAvatar === 22
                    ? Avatar22
                    : selAvatar === 23
                    ? Avatar23
                    : selAvatar === 24
                    ? Avatar24
                    : Avatar1
                }
                onClick={() => handleAvatar()}
                alt=""
              />
            </div>
            <div className="img-options">
              <img
                src={Avatar1}
                onClick={() => handleAvatar(1)}
                alt=""
                className={selAvatar === 1 ? `selected avatar1` : `avatar1`}
              />
              <img
                src={Avatar2}
                onClick={() => handleAvatar(2)}
                alt=""
                className={selAvatar === 2 ? `selected avatar2` : `avatar2`}
              />
              <img
                src={Avatar3}
                onClick={() => handleAvatar(3)}
                alt=""
                className={selAvatar === 3 ? `selected avatar3` : `avatar3`}
              />
              <img
                src={Avatar4}
                onClick={() => handleAvatar(4)}
                alt=""
                className={selAvatar === 4 ? `selected avatar4` : `avatar4`}
              />
              <img
                src={Avatar5}
                onClick={() => handleAvatar(5)}
                alt=""
                className={selAvatar === 5 ? `selected avatar5` : `avatar5`}
              />
              <img
                src={Avatar6}
                onClick={() => handleAvatar(6)}
                alt=""
                className={selAvatar === 6 ? `selected avatar6` : `avatar6`}
              />
              <img
                src={Avatar7}
                onClick={() => handleAvatar(7)}
                alt=""
                className={selAvatar === 7 ? `selected avatar7` : `avatar7`}
              />
              <img
                src={Avatar8}
                onClick={() => handleAvatar(8)}
                alt=""
                className={selAvatar === 8 ? `selected avatar8` : `avatar8`}
              />
              <img
                src={Avatar9}
                onClick={() => handleAvatar(9)}
                alt=""
                className={selAvatar === 9 ? `selected avatar9` : `avatar9`}
              />
              <img
                src={Avatar10}
                onClick={() => handleAvatar(10)}
                alt=""
                className={selAvatar === 10 ? `selected avatar10` : `avatar10`}
              />
              <img
                src={Avatar11}
                onClick={() => handleAvatar(11)}
                alt=""
                className={selAvatar === 11 ? `selected avatar11` : `avatar11`}
              />
              <img
                src={Avatar12}
                onClick={() => handleAvatar(12)}
                alt=""
                className={selAvatar === 12 ? `selected avatar12` : `avatar12`}
              />
              <img
                src={Avatar13}
                onClick={() => handleAvatar(13)}
                alt=""
                className={selAvatar === 13 ? `selected avatar13` : `avatar13`}
              />
              <img
                src={Avatar14}
                onClick={() => handleAvatar(14)}
                alt=""
                className={selAvatar === 14 ? `selected avatar14` : `avatar14`}
              />
              <img
                src={Avatar15}
                onClick={() => handleAvatar(15)}
                alt=""
                className={selAvatar === 15 ? `selected avatar15` : `avatar15`}
              />
              <img
                src={Avatar16}
                onClick={() => handleAvatar(16)}
                alt=""
                className={selAvatar === 16 ? `selected avatar16` : `avatar16`}
              />
              <img
                src={Avatar17}
                onClick={() => handleAvatar(17)}
                alt=""
                className={selAvatar === 17 ? `selected avatar17` : `avatar17`}
              />
              <img
                src={Avatar18}
                onClick={() => handleAvatar(18)}
                alt=""
                className={selAvatar === 18 ? `selected avatar18` : `avatar18`}
              />
              <img
                src={Avatar19}
                onClick={() => handleAvatar(19)}
                alt=""
                className={selAvatar === 19 ? `selected avatar19` : `avatar19`}
              />
              <img
                src={Avatar20}
                onClick={() => handleAvatar(20)}
                alt=""
                className={selAvatar === 20 ? `selected avatar20` : `avatar20`}
              />
              <img
                src={Avatar21}
                onClick={() => handleAvatar(21)}
                alt=""
                className={selAvatar === 21 ? `selected avatar21` : `avatar21`}
              />
              <img
                src={Avatar22}
                onClick={() => handleAvatar(22)}
                alt=""
                className={selAvatar === 22 ? `selected avatar22` : `avatar22`}
              />
              <img
                src={Avatar23}
                onClick={() => handleAvatar(23)}
                alt=""
                className={selAvatar === 23 ? `selected avatar23` : `avatar23`}
              />
              <img
                src={Avatar24}
                onClick={() => handleAvatar(24)}
                alt=""
                className={selAvatar === 24 ? `selected avatar24` : `avatar24`}
              />
            </div>
          </Box>
        </Modal>
      </div>
      <div className="name-cont">
        <div className="user-name-cont">
          {disable ? (
            <input
              ref={inputRef}
              disabled
              type="text"
              className="user-name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
            />
          ) : (
            <input
              ref={inputRef}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="change-active user-name"
              value={name}
            />
          )}

          <div className={`${disable ? "" : "change-active"} change-icon`}>
            <i onClick={handleChange} className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
        {change ? (
          <div onClick={handleSubmit} className="change-name">
            Change Name
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
