import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SchoolIcon from "@mui/icons-material/School";
import HouseIcon from "@mui/icons-material/House";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import ShareForProfile from "../shareforProfile/ShareForProfile";
import ProfileFeedPosts from "../profileFeedPosts/ProfileFeedPosts";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";


const Container = styled.div`
  padding: 20px 150px;
  background-color: rgba(231, 230, 230, 1);
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const LeftPInfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 5px;
  height: calc(100vh - 60px);
  overflow-y: scroll;
  position: sticky;
  top: 10px;
  /* -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75); */
`;

const Intro = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 10px;
`;

const IntroH1 = styled.h1`
  font-size: 18px;
  background: transparent;
`;

const IntroDesc = styled.p`
  font-size: 14px;
`;

const PhotoContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`;
const PhotoH1 = styled.h1`
  font-size: 20px;
  background: transparent;
`;

const SeeAll = styled.span`
  font-size: 14px;
`;

const ImgP = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

const RightInfoContainer = styled.div`
  flex: 3;
  border-radius: 5px;
  /* -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75); */
`;


const ProfileFeed = ({ id, user,allFollowingUsers }) => {
  const { user: logedInUser } = useSelector((state) => state.user);
  const PF = "http://localhost:4000/images/";
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/api/user/${id}`);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUser();
  // }, [id]);

  const [profilePosts, setProfilePosts] = useState([]);
  console.log(logedInUser?._id);
  useEffect(() => {
    const fetchProfilePosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/profileposts/${user?._id}`
        );
        setProfilePosts(res.data.reverse());
        // res.data.reverse()
      } catch (err) {}
    };
    fetchProfilePosts();
  }, [user?._id]);

  console.log(allFollowingUsers);
  return (
    <Container>
      <Wrapper>
        <LeftPInfoContainer>
          <Intro>
            <IntroH1>Intro</IntroH1>
            {user?.studiedAt !== "" && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SchoolIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  Studied at: {user?.studiedAt}
                </div>
              </IntroDesc>
            )}
            {user?.livesIn !== "" && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <HouseIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  Lives in: {user?.livesIn}
                </div>
              </IntroDesc>
            )}
            {user?.email !== "" && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MailIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  Email: {user?.email}
                </div>
              </IntroDesc>
            )}
            {user?.MobileNum !== null && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PhoneAndroidIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  Mobile: {user?.MobileNum}
                </div>
              </IntroDesc>
            )}
            {user?.facebook !== "" && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FacebookOutlinedIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  Facebook: {user?.facebook}
                </div>
              </IntroDesc>
            )}
            {user?.whatsApp !== "" && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WhatsAppIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  WhatsApp: {user?.whatsApp}
                </div>
              </IntroDesc>
            )}
            {user?.twitter !== "" && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TwitterIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  Twitter: {user?.twitter}
                </div>
              </IntroDesc>
            )}
            {user?.instagram !== "" && (
              <IntroDesc>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InstagramIcon
                    style={{ background: "transparent", marginRight: "5px" }}
                  />
                  Instagram: {user?.instagram}
                </div>
              </IntroDesc>
            )}
          </Intro>
          <PhotoContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "10px 0px",
              }}
            >
              <PhotoH1>Photos</PhotoH1>
              <SeeAll>See all Photos</SeeAll>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              <ImgP
                src="https://images.squarespace-cdn.com/content/v1/5e3a2166b359364624466675/1599698181720-V80PYZVI3XC7BB7WP0AU/Tony+Sentamat.jpg"
                alt=""
              />
              <ImgP
                src="https://www.greatestphysiques.com/wp-content/uploads/2017/12/Tony-Sentmanat.09.jpg"
                alt=""
              />
              <ImgP
                src="https://besttoppers.com/wp-content/uploads/2021/11/tony-sentmanat.jpg"
                alt=""
              />
              <ImgP
                src="https://i.pinimg.com/originals/32/e1/60/32e160c38ddb9e848bb33159f67a3746.jpg"
                alt=""
              />
              <ImgP
                src="https://img.mensxp.com/media/content/2017/Aug/this-man-is-one-of-the-internet-s-most-brutal-lifters-740-1-1502189774.jpg"
                alt=""
              />
            </div>
          </PhotoContainer>
          <PhotoContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "10px 0px",
              }}
            >
              <PhotoH1>Follows</PhotoH1>
              <SeeAll>See all Follows</SeeAll>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {allFollowingUsers?.map((follow) => (
              <Link to={`/profile/${follow?._id}`} className="link">
                <ImgP key={ follow?._id} src={PF + follow?.profilePic} alt="" />
              </Link>
              ))}
            </div>
          </PhotoContainer>
        </LeftPInfoContainer>
        <RightInfoContainer>
          {logedInUser?._id === user?._id && <ShareForProfile />}
          {/* {user && <ShareForProfile/>} */}
          {profilePosts?.map((post) => (
            <ProfileFeedPosts post={post} />
          ))}
        </RightInfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ProfileFeed;
