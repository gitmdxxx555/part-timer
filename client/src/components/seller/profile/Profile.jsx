import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MessageIcon from "@mui/icons-material/Message";
import ProfileFeed from "../profileFeed/ProfileFeed";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./profile.css";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import EditProfiles from "../editProfile/EditProfiles";
import RatingBox from "../ratingBox/RatingBox";
import CloseIcon from "@mui/icons-material/Close";
import EditCoverPic from "./editCoverPic/EditCoverPic";
import { follow, followUser, getUser } from "../../../redux/actions/userAction";

const Container = styled.div`
  padding: 0px 150px;
  background-color: #ffffff;
  position: relative;
`;

const ImgWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  border: 3px solid yellow;
  position: relative;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const PImgContainer = styled.div`
  position: relative;
`;

const ProfileImg = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid yellow;
  position: absolute;
  top: 330px;
  left: 50px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const Span = styled.div`
  position: absolute;
  height: 20px;
  width: 30px;
  background-color: #fbfb70;
  left: 20px;
  cursor: pointer;
  top: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;
const Cam = styled.div`
  height: 25px;
  width: 25px;
  padding: 3px;
  background-color: rgba(251, 236, 69, 0.937);
  border: 3px solid white;
  border-radius: 50%;
  position: absolute;
  top: 440px;
  cursor: pointer;
  left: 160px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const EditCover = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
  width: 150px;
  border: 3px solid yellow;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  top: 310px;
  right: 10px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const PInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 260px;
  padding: 20px 0px;
`;

const PName = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Hr = styled.hr`
  border: 1px solid rgba(201, 178, 4, 0.916);
  font-size: 0.5px;
  margin: 20px 0px;
`;

const FollowImg = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  border: 2px solid yellow;
  border-radius: 50%;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const EditProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 8px;
  border: 3px solid yellow;
  border-radius: 10px;
  margin: 20px 0px;
  cursor: pointer;
  color: black;
  background-color: white;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 1635px;
  background: rgba(0, 0, 0, 0.475);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 2;
`;

const LinksContainer = styled.div`
  padding: 10px 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Links = styled.span`
  font-size: 14px;
`;

const FollowBtn = styled.div`
  padding: 3px 8px;
  background-color: rgba(12, 130, 226, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
`;
const RatingsContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
`;

const ReviewBtn = styled.div`
  padding: 3px 8px;
  background-color: rgba(3, 195, 169, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
  margin-top: 5px;
`;
const UpdateBtn = styled.div`
  padding: 3px 8px;
  background-color: rgba(89, 3, 195, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
  margin-top: 5px;
  position: absolute;
  top: 331px;
  left: 31px;
`;

const Profile = () => {
  const { user: logedInUser } = useSelector((state) => state.user);
  const PF = "http://localhost:4000/images/";
  const id = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();

  const [rating, setRating] = useState(4.5);
  const [file, setFile] = useState(null);
  const [openCoverEdit, setOpenCoverEdit] = useState(false);
  // const [follow, setFollow] = useState(false);
  const [allFollowingUsers, setAllFollowingUsers] = useState();



  useEffect(() => {
    dispatch(getUser(logedInUser?._id));
  }, [id]);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const [user, setUser] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/${id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id]);

  const updateHandler = async () => {
    const updates = {
      profilePic: null,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updates.profilePic = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
        window.location.reload();
      } catch (err) {}
      try {
        await axios.put(
          `http://localhost:4000/api/updateprofilepic/${id}`,
          updates
        );
      } catch (err) {
        console.log("failed updating image");
      }
    }
  };
  const userId = logedInUser?._id;
  const followHandler = () => {
    dispatch(follow(userId,id))
  };

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getfollowingusers/${id}`
        );
        setAllFollowingUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFollowingUsers();
  }, [userId]);

  console.log(allFollowingUsers);

  return (
    <>
      <Container>
        {editProfile && (
          <EditProfiles
            editProfile={editProfile}
            setEditProfile={setEditProfile}
          />
        )}
        <ImgWrapper>
          <CoverImg src={PF + user?.coverPic} alt="" />

          {logedInUser?._id === id && (
            <EditCover onClick={() => setOpenCoverEdit(!openCoverEdit)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <CameraAltOutlinedIcon
                  style={{
                    background: "transparent",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                />
                <span>Edit Cover Photo</span>
              </div>
            </EditCover>
          )}
          {openCoverEdit && (
            <EditCoverPic
              openCoverEdit={openCoverEdit}
              setOpenCoverEdit={setOpenCoverEdit}
              id={id}
            />
          )}
          <ProfileImg alt="" src={PF + user?.profilePic} />

          {file && (
            <>
              <div className="profileImgContainer">
                <img
                  className="shareImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                <CloseIcon
                  className="shareCancelImgIcon"
                  onClick={() => setFile(null)}
                />
              </div>
              <UpdateBtn onClick={updateHandler}>Update</UpdateBtn>
            </>
          )}

          {logedInUser?._id === id && (
            <Cam>
              <label htmlFor="file" style={{ background: "transparent" }}>
                <CameraAltOutlinedIcon
                  style={{ background: "transparent", cursor: "pointer" }}
                />
                <input
                  style={{ display: "none", cursor: "pointer" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </Cam>
          )}
        </ImgWrapper>
        <Link to="/" className="link">
          <Span>
            <KeyboardBackspaceIcon style={{ background: "transparent" }} />
          </Span>
        </Link>
        <PInfoContainer>
          <div>
            <PName>{user?.name}</PName>
            <p style={{ marginBottom: "20px" }}>1K Follows</p>
            {allFollowingUsers?.map((follow) => (
              <Link to={`/profile/${follow?._id}`} className="link">
                <FollowImg
                  key={follow?._id}
                  src={PF + follow?.profilePic}
                  alt=""
                />
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {logedInUser?._id !== id && (
              <FollowBtn onClick={followHandler}>
                {logedInUser?.followings.includes(id) ? "unFollow" : "Follow"}
              </FollowBtn>
            )}
            <RatingsContainer>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                isHalf={true}
                value={rating}
                size={24}
                activeColor="#ffd700"
              />
              <span style={{ fontSize: "18px", marginTop: "7px" }}>
                {rating}
              </span>
            </RatingsContainer>
            <div>
              11 <span style={{ color: "gray" }}>Reviews</span>
            </div>
            <ReviewBtn onClick={() => setRatingOpen(!ratingOpen)}>
              View All Reviews
            </ReviewBtn>
          </div>
          {ratingOpen && (
            <RatingBox
              ratingOpen={ratingOpen}
              setRatingOpen={setRatingOpen}
              id={id}
            />
          )}
          <div>
            {logedInUser?._id === id && (
              <EditProfile onClick={() => setEditProfile(!editProfile)}>
                <ModeEditOutlineOutlinedIcon
                  style={{
                    background: "transparent",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                />
                Edit Profile
              </EditProfile>
            )}

            <EditProfile>
              <LocationSearchingIcon
                style={{ background: "transparent", marginRight: "5px" }}
              />
              Track Location
            </EditProfile>
            <EditProfile>
              <MessageIcon
                style={{ background: "transparent", marginRight: "5px" }}
              />
              Message
            </EditProfile>
          </div>
        </PInfoContainer>
        {/* <Hr /> */}
      </Container>
      <LinksContainer>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <Links>Posts</Links>
          <Links>About</Links>
          <Links>Friends</Links>
          <Links>Photos</Links>
          <Links>Videos</Links>
          <div style={{ display: "flex", alignItems: "center" }}>
            More
            <ArrowDropDownOutlinedIcon />
          </div>
        </div>
        <div
          style={{
            background: "#6f6d6dcf",
            padding: "3px 5px",
            borderRadius: "3px",
            color: "white",
          }}
        >
          <MoreHorizOutlinedIcon style={{ background: "transparent" }} />
        </div>
      </LinksContainer>
      <ProfileFeed user={user} allFollowingUsers={allFollowingUsers} />
    </>
  );
};

export default Profile;
