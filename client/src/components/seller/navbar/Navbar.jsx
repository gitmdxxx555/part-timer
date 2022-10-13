import React from "react";
import styled from "styled-components";
import logo from "../../../images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../../redux/constants/userConstans";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 50px;
  position: relative;
  /* -webkit-box-shadow: 0 5px 5px -5px #000000;
  -moz-box-shadow: 0 5px 5px -5px #000000;
  box-shadow: 0 5px 5px -5px #000000; */
`;

const Left = styled.div`
  flex: 1;
`;
const Logo = styled.img`
  height: 70px;
  width: 70px;
  object-fit: cover;
  cursor: pointer;
  border: 3px solid yellow;
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;
const Center = styled.div`
  flex: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Links = styled.span`
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const ProfilePic = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border: 3px solid yellow;
  cursor: pointer;
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const Navbar = () => {
  const {user}  = useSelector((state) => state.user);
  const PF = "http://localhost:4000/images/";
  console.log(user);
  console.log(user.profilePic);
  const dispatch = useDispatch();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "center",
          
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            
          }}
        >
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width:"400px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(238, 236, 238, 1)",
              borderRadius: "10px",
              padding: "5px 0px",
              width:"100%"
            }}
          >
            <span>
              {" "}
              <SearchOutlinedIcon
                style={{
                  background: "transparent",
                  fontSize: "20px",
                  marginLeft: "5px",
                }}
              />
            </span>
            <input
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px",
                width:"90%",
                marginLeft:"5px"
              }}
              type="text"
              placeholder="Search by Job, Name, Title, skills..."
            />
          </div>
        </div>
      </div>
      <Container>
        <Left>
          <Logo src={logo} alt="logo" />
        </Left>

        <Center>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <HomeIcon />
            <Links>Home</Links>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <PeopleIcon />
            <Links>All Profiles</Links>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <WorkIcon />
            <Links>All Job Posts</Links>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <ChatIcon />
            <Links>Chats</Links>
          </div>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <LocationSearchingIcon style={{ color: "red" }} />
            <Links>PartTimer Status</Links>
          </div> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <SettingsApplicationsIcon />
            <Links>Settings</Links>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <AccountCircleIcon />
            <Links>Account</Links>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            {!user ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                <Link to="/signuplogin">
                  <LoginOutlinedIcon />
                  <Links>Signup/Login</Links>
                </Link>
              </div>
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
                onClick={()=>dispatch({ type: LOGOUT })}
              >
                <LogoutIcon />
                <Links>Logout</Links>
              </div>
            )}
          </div>
        </Center>
        <Right>
          <Link to={`/profile/${user?._id}`}>
            <ProfilePic
              src={
                PF + user?.profilePic ||
                `https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=`
              }
              alt="profile"
            />
          </Link>
        </Right>
      </Container>
    </div>
  );
};

export default Navbar;
