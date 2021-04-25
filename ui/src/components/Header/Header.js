import React, { useEffect, useState } from "react";
import Icon, { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAvatar,
  isValidToken,
  logout,
  uploadAvatar,
} from "../../features/user/userSlice";
import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  ModalHeader,
  DropdownItem,
  ModalBody,
  FormGroup,
  CustomInput,
} from "reactstrap";

const Header = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);

  const onSave = async () => {
    // create form data to submit a file
    const formData = new FormData();
    formData.append("file", file);
    // dispatch upload avatar action to send file to backend
    await dispatch(uploadAvatar(formData));
    // fetch user data again to refresh image
    dispatch(isValidToken());
    // close the modal
    setModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (userData.avatar)
      dispatch(fetchAvatar({ type: "user", avatarId: userData.avatar }));
  }, [userData.avatar]);

  return (
    <Navbar color="light" light expand="md" className="main-navbar" ref={ref}>
      <Container fluid={true} className="px-4">
        <NavbarBrand tag="div">
          <Link to="/">fakebook</Link>
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ml-auto">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <div className="d-flex align-items-center justify-content-center">
                  {userData.avatarSrc ? (
                    <img className="user-icon" src={userData.avatarSrc} />
                  ) : (
                    <UserOutlined className="user-icon" />
                  )}
                  <span className="username">{userData.name}</span>
                </div>
              </DropdownToggle>
              <DropdownMenu right style={{ top: 42 }}>
                <DropdownItem onClick={(e) => setModal(!modal)}>
                  Set your avatar
                </DropdownItem>
                {/* modal of the set your avatar */}
                <Modal isOpen={modal} toggle={(e) => setModal(!modal)}>
                  <ModalHeader toggle={(e) => setModal(!modal)}>
                    Upload image
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <CustomInput
                        id="file"
                        type="file"
                        label="Upload your avatar here!"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                    </FormGroup>
                    <button
                      className="btn s rounded d-block w-100 mt-4"
                      onClick={onSave}
                    >
                      Submit
                    </button>
                  </ModalBody>
                </Modal>
                {/* end modal */}
                <DropdownItem>
                  <Link to={`/profile/${userData.id}`}>Your profile</Link>
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
});

export default Header;
