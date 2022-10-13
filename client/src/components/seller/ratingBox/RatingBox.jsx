import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import axios from "axios";
import AllReviews from "../allReviews/AllReviews";

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
  width: 400px;
  margin: 12% 35%;
  gap: 10px;
  background-color: white;
  border-radius: 5px;
`;

const RatingsContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
`;

const CancelBtn = styled.div`
  padding: 3px 8px;
  background-color: rgba(226, 12, 12, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
`;

const SubmitBtn = styled.div`
  padding: 3px 8px;
  background-color: rgba(22, 206, 6, 1);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
`;



const RatingBox = ({ ratingOpen, setRatingOpen, id }) => {
  const { user: logedInUser } = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const submitHandler = async () => {
    const credentials = {
      userId: logedInUser?._id,
      name: logedInUser?.name,
      userPic: logedInUser?.profilePic,
      rating,
      comment,
    };

    try {
      await axios.put(`http://localhost:4000/api/review/${id}`, credentials);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getreviews/${id}`
        );
        setReviews(response.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, [id]);
console.log(reviews)
  console.log(id);

  return (
    <Container onClick={() => setRatingOpen(!ratingOpen)}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
       {logedInUser?._id !== id && <> <RatingsContainer>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            isHalf={true}
            value={rating}
            size={24}
            activeColor="#ffd700"
          />
          <span style={{ fontSize: "18px", marginTop: "7px" }}>{rating}</span>
        </RatingsContainer>
        <textarea
          cols={30}
          rows={6}
          style={{ border: "none", outline: "none" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <CancelBtn onClick={() => setRatingOpen(!ratingOpen)}>
            Cancel
          </CancelBtn>
          <SubmitBtn onClick={submitHandler}>Submit</SubmitBtn>
        </div>
        <hr
          style={{
            border: "0.5px solid gray",
            outline: "none",
            margin: "20px 0px",
          }}
        />
        </>
        }
        {reviews?.map(rev=>(
          
       <AllReviews review={rev} key={rev._id} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default RatingBox;
