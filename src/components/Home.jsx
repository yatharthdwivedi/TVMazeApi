import axios from "axios";
import React, { useEffect, useState } from "react";
import "../components/Home.css"
import { Link } from "react-router-dom";

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await response.json();
        // console.log(data);
        const shows = data.map((item) => item.show);
        // console.log(shows);
        setShows(shows);
        // console.log(shows);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchShows();
    // console.log(shows);
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Shows</h1>
      
      <ul className="card-list">
      {shows.map((show) => (
          <Link key={show.id} to={`/shows/${show.id}`} style={{ textDecoration: 'none' }} className="card-link">
            <li key={show.id} className="card">
              {show.image && show.image.medium ? (
                <img src={show.image.medium} alt={show.name} />
              ) : (
                <div className="no-image">No image available</div>
              )}
              <div className="card-body">
                <h3 >{show.name}</h3>
                <p>Genre : {show.genres[0]}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};


export default Home;
