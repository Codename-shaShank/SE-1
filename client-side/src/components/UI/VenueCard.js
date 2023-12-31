import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getOneVenue } from "../../actions/venue.actions";
import { getPublicURL } from "../../urlConfig";
import { ImgsCard } from "./ImgsCard";
import { useDispatch, useSelector } from "react-redux";
import BookingModel from "./BookingModel";
import { deleteVenue } from "../../actions/venue.actions";

const VenueCard = (props) => {
  const [bookingModalShow, setBookingModalShow] = useState(false);
  const {
    img1,
    category,
    venueName,
    ownerId,
    _id,
    price,
    location,
    address,
    style,
    isDelete,
  } = props;

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const getVenueInfo = () => {
    dispatch(getOneVenue(_id));
  };
  console.log(getPublicURL(img1));
  return (
    <div className="card mb-4 box-shadow">
      <Card style={{ width: "18rem",alignContent:'center', border:'white' }}>
        <Card.Img variant="top" src={img1} />
      </Card>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{venueName}</h5>
          <h5 className="card-title">₹ {price}</h5>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          {location}, {address}
        </h6>

        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/venue/${_id}`} className="btn-group">
            <Button variant="primary" size="sm" onClick={getVenueInfo}>
              Details
            </Button>
          </Link>
          {isDelete === true ? (
            <Button variant="danger" size="sm">
              Delete
            </Button>
          ) : auth.user.role === "dealer" ? (
            <></>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setBookingModalShow(true)}
            >
              Book
            </Button>
          )}
          <BookingModel
            _id={_id}
            venueName={venueName}
            price={price}
            category={category}
            address={address}
            location={location}
            show={bookingModalShow}
            ownerId={ownerId}
            onHide={() => setBookingModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
