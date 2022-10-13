import React, { useRef, useState } from "react";
import styled from "styled-components";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import axios from "axios";
import './share.css'

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 475px;
  gap: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 22px;
  /* -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75); */
`;
const Img = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid yellow;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;
const Input = styled.input`
  border: none;
  outline: none;
  width: 70%;
  background: transparent;
  font-size: 12px;
`;

const Share = () => {
  const {user:logedinUser} = useSelector((state) => state.user);
  const PF = "http://localhost:4000/images/";
  const [file, setFile] = useState(null);
  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: logedinUser._id,
      ownerPic:logedinUser.profilePic,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.img = filename;

      try {
        await axios.post("http://localhost:4000/api/upload", data);
        window.location.reload();
      } catch (err) {}
    }

    try {
      await axios.post("http://localhost:4000/api/createpost", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "transparent",
        }}
      >
        <Img src={PF + logedinUser?.profilePic} alt="" />
        <Input
          type="text"
          ref={desc}
          placeholder="Share Your Skills videos images ..."
        />
      </div>
      <hr style={{ margin: "10px 0px 0px 0px", color: "lightgray" }} />
      {file && (
          <div className="ImgContainer">
            <img className="shareImgage" src={URL.createObjectURL(file)} alt="" />
            <CloseIcon className="shareCancelImgage" onClick={() => setFile(null)} />
          </div>
        )}
      <form onSubmit={submitHandler}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "transparent",
          }}
        >
          <div
            style={{
              background: "transparent",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "3px",
            }}
          >
            <label htmlFor="file" style={{ background: "transparent" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  cursor: "pointer",
                }}
              >
                <PhotoLibraryOutlinedIcon
                  style={{
                    background: "transparent",
                    color: "blue",
                  }}
                />
                <span>Photo</span>
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <div
            style={{
              background: "transparent",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "3px",
            }}
          >
            <SentimentVerySatisfiedIcon
              style={{ background: "transparent", color: "red" }}
            />
            Feeling/Activity
          </div>
          <button
            style={{
              background: "green",
              color: "white",
              padding: "5px",
              cursor: "pointer",
              border: "3px solid yellow",
              borderRadius: "5px",
            }}
            type="submit"
          >
            Share
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Share;
