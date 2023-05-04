import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Details.css";

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    showName: "",
    showId: "",
  });

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${id}?embed=cast`
        );
        setShow(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShow();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingBookingData =
      JSON.parse(localStorage.getItem("bookingData")) || [];
    const newBookingData = {
      name: formData.name,
      email: formData.email,
      showName: formData.showName,
      showId: formData.showId,
      timestamp: Date.now(), // Add a timestamp to track when the booking was made
    };
    const updatedBookingData = [...existingBookingData, newBookingData];
    // Save the form data to local storage
    localStorage.setItem("bookingData", JSON.stringify(updatedBookingData));
    // Navigate to the booking page
    navigate(`/`);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      {show.image && show.image.medium ? (
        <img src={show.image.medium} alt={show.name} />
      ) : (
        <div className="no-image">No image available</div>
      )}
      <p>{show.summary}</p>
      <h3>Status : {show.status}</h3>
      <h3>Rating: {show.rating.average}</h3>
      <hr/>
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Book a Movie Ticket</h2>
        <div className="form-group">
          <input
            placeholder="Name"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        

        <div className="form-group">
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="showName"
            placeholder="Show Name"
            name="showName"
            value={show.name}
            disabled
          />
        </div>

        <button type="submit" className="btn-submit">
          Book Ticket
        </button>
      </form>
    </div>
  );
};

export default ShowDetails;
