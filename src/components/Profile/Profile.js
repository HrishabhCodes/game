import React, { useState, useRef } from "react";
import "./Profile.css";
import UserImage from "../../assets/user-img.jpeg";

const Profile = ({ name, setName }) => {
  //const [name, setName] = useState("Blue");
  const [disable, setDisable] = useState(true);
  const [change, setChange] = useState(false);
  const inputRef = useRef();

  const handleChange = () => {
    // inputRef.current.focus();
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
        <img src={UserImage} className="avatar-img" alt="Avatar" />
        <div className="change-avatar">
          <i className="fa-solid fa-arrows-rotate"></i>
        </div>
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
