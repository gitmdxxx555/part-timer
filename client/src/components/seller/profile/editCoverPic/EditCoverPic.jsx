import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import styled from "styled-components";
import "./editCoverPic.css";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.505);
  height: 100vh;
  width: 100%;
  z-index: 2;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 1050px;
  margin: 10% 10%;
  gap: 10px;
  background-color: white;
  border-radius: 5px;
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

const UpdateCoverBtn = styled.div`
  padding: 3px 8px;
  background-color: rgba(89, 3, 195, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
  margin-top: 5px;
  position: absolute;
  top: 190px;
  right: 170px;
  z-index: 2;
`;

const EditCoverPic = ({ openCoverEdit, setOpenCoverEdit, id }) => {
  const [file, setFile] = useState(null);
  const updateCoverHandler = async () => {
    const updates = {
      coverPic: null,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updates.coverPic = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
        window.location.reload();
      } catch (err) {}
      try {
        await axios.put(
          `http://localhost:4000/api/updatecoverpic/${id}`,
          updates
        );
      } catch (err) {
        console.log("failed updating image");
      }
    }
  };
  return (
    <Container onClick={() => setOpenCoverEdit(!openCoverEdit)}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        {file && (
          <>
            <div className="coverImg">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <CloseIcon
                className="shareCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
            <UpdateCoverBtn onClick={updateCoverHandler}>Update</UpdateCoverBtn>
          </>
        )}
        <ImgWrapper>
          <CoverImg
            src="https://img.freepik.com/premium-vector/landscape-beautiful-holiday-cottage-vector-illustration-natural-rustic-background-poster-banner-card-brochure-cover_645919-85.jpg?w=2000"
            alt=""
          />
        </ImgWrapper>
        <label
          htmlFor="file"
          style={{ background: "transparent", color: "blue",cursor:"pointer" }}
        >
          <input
            style={{ display: "none", cursor: "pointer" }}
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
          Click here to choose Cover Pic
        </label>
      </Wrapper>
    </Container>
  );
};

export default EditCoverPic;
