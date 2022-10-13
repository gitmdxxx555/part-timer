import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { editProfile } from "../../../redux/actions/userAction";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.513);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Form = styled.form`
  padding: 20px;
  border: 3px solid yellow;
  border-radius: 10px;
  background-color: white;
  margin: 6%;
  z-index: 3;
  position: absolute;
  top: 5%;
  left: 2%;
`;

const Tilte = styled.h1`
  font-size: 22px;
  margin: 10px 0px;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
`;

const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  width: 100%;
  padding: 3px 7px;
  margin: 10px 0px;
  border-radius: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  margin: 10px 0px;
  padding: 3px;
  border-radius: 10px;
`;
const Button = styled.button`
  padding: 3px 8px;
  background-color: yellow;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 30px;
  width: 150px;
  margin: 10px 0px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const EditProfiles = () => {
  const {user:loginedUser} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [MobileNum, setMobileNum] = useState(null);
  const [facebook, setFacebook] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [studiedAt, setStudiedAt] = useState("");
  const [livesIn, setLivesIn] = useState("");

  console.log(loginedUser?._id,name,gender)

  const submitHandler = (e) => {
    e.preventDefault();

    const userDetail = {
      name: name,
      gender: gender,
      MobileNum: MobileNum,
      facebook: facebook,
      whatsApp: whatsApp,
      twitter: twitter,
      instagram: instagram,
      studiedAt: studiedAt,
      livesIn: livesIn,
    };

    try {
      dispatch(editProfile(userDetail, loginedUser?._id));
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
      <div onClick={(e)=>(e.stopPropagation())}>
        <Form onSubmit={submitHandler} >
          <Tilte>Update Profile</Tilte>
          <div style={{ display: "flex", gap: "50px" }}>
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />

              <Label>Gender</Label>
              <Input
                type="text"
                name="gender"
                placeholder="Gender"
                required
                onChange={(e) => setGender(e.target.value)}
              />
              <Label>Mobile Number</Label>
              <Input
                type="number"
                name="MobileNum"
                placeholder="Mobile Number"
                required
                onChange={(e) => setMobileNum(e.target.value)}
              />
              <Label>Facebook Link</Label>
              <Input
                type="text"
                name="facebook"
                placeholder="Facebook"
                required
                onChange={(e) => setFacebook(e.target.value)}
              />

              <Label>WhatsApp Link</Label>
              <Input
                type="text"
                name="whatsApp"
                placeholder="WhatsApp"
                required
                onChange={(e) => setWhatsApp(e.target.value)}
              />
            </div>
            <div>
              <Label>Twitter Link</Label>
              <Input
                type="text"
                name="twitter"
                placeholder="Twitter"
                required
                onChange={(e) => setTwitter(e.target.value)}
              />
              <Label>Instagram Link</Label>
              <Input
                type="text"
                name="instagram"
                placeholder="Instagram"
                required
                onChange={(e) => setInstagram(e.target.value)}
              />
              <Label>StudiedAt</Label>
              <Input
                type="text"
                name="studiedAt"
                placeholder="StudiedAt"
                required
                onChange={(e) => setStudiedAt(e.target.value)}
              />
              <Label>Lives In</Label>
              <Input
                type="text"
                name="livesIn"
                placeholder="Lives In"
                required
                onChange={(e) => setLivesIn(e.target.value)}
              />
              <Button type="submit">Update</Button>
            </div>
          </div>
        </Form>
        </div>
      </Container>
    </>
  );
};

export default EditProfiles;
