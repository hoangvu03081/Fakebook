import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import {
  fetchAvatar,
  isValidToken,
  logout,
  uploadAvatar,
} from "../../features/user/userSlice";
import { history } from "../..";

export default function Header() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const modalId = "modalMainNav";

  const [file, setFile] = useState(null);

  const onSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await dispatch(uploadAvatar(formData));
    dispatch(isValidToken());
  };

  useEffect(() => {
    dispatch(fetchAvatar(userData.avatar));
  }, [userData.avatar]);

  return (
    <nav className="main-navbar navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid px-4">
        <a className="navbar-brand" href="#">
          fakebook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="me-auto"></ul>
          <div className="dropdown">
            <div
              className="d-flex align-items-center cursor-pointer"
              id="userConfig"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userData.avatarSrc ? (
                <img className="user-icon" src={userData.avatarSrc} />
              ) : (
                <AiOutlineUser className="bg-dark text-white user-icon" />
              )}
              <span className="ms-2">{userData.name}</span>
            </div>
            <ul className="dropdown-menu" aria-labelledby="userConfig">
              <li>
                <span
                  className="dropdown-item cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                >
                  Set avatar
                </span>
                <Link to="/" className="dropdown-item">
                  Your profile
                </Link>
                <span
                  onClick={() => {
                    dispatch(logout());
                    history.go();
                  }}
                  className="dropdown-item cursor-pointer"
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal title="Upload your avatar here" id={modalId} onSave={onSave}>
        <input
          className="form-control"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </Modal>
    </nav>
  );
}
