import React from 'react'
import styled from 'styled-components';
import ReactStars from "react-rating-stars-component";

const Container = styled.div`
border: 3px solid lightgray;
  border-radius: 5px;
  padding: 10px;
`

const ProfilePic = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  border: 3px solid yellow;
  cursor: pointer;
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
`;

const AllReviews = ({review}) => {
  return (
    <Container>
         <div style={{ display: "flex", gap: "10px", margin: "10px 0px" }}>
          <ProfilePic
            src={review?.userPic}
            alt=""
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <div style={{fontSize:"16px"}}>{review?.name}</div>
            <div style={{display:"flex",alignItems:"center"}}> <ReactStars
                count={5}
                isHalf={true}
                value={review?.rating}
                size={16}
                activeColor="#ffd700"
              />
              <span style={{ fontSize: "14px", marginTop: "7px", marginLeft:"5px" }}>
                {review?.rating}
              </span></div>
            <div style={{fontSize:"14px"}}>{review?.comment}</div>
          </div>
        </div>
    </Container>
  )
}

export default AllReviews