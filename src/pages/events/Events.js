import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Events.css";
import EventCard from "../../components/eventCard/EventCard";
import EventData from "../../assets/data/eventsData";
import { previousYear, baseUrl } from "../../constants";
import frank from "../../assets/images/frakenstein.png";
import Footer from "../../components/footer/Footer";
import NavbarTeam from "../../components/navbarTeam/NavbarTeam";
import IntroAudio from "../../components/introAudio/IntroAudio";
import axios from "axios";
import downArrow from "../../assets/images/downArrow.svg";

const Events = () => {
  const url = baseUrl + "events/" + previousYear;
  const [state, setState] = useState({
    data: [],
    loading: true,
  });
  console.log(url);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(url);
      setState({
        data: data.data.data,
        loading: false,
      });
    };
    fetchData();
  }, []);

  console.log(state.data);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeRef = useRef(null);

  const carousalStyle = {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "1.2rem",
  };

  const slidesOverflow = {
    overflow: "hidden",
    height: "100%",
  };

  const getSlidesStyle = () => {
    if (window.innerWidth > 1300)
      return {
        display: "flex",
        height: "auto",
        transition: "transform ease-out 0.3s",
        width: `${(100 * Events.length) / 3}%`,
        transform: `translateX(${-(currentIndex * (100 / Events.length))}%)`,
      };

    if (window.innerWidth > 1025)
      return {
        display: "flex",
        height: "100%",
        transition: "transform ease-out 0.3s",
        width: `${(100 * Events.length) / 2}%`,
        transform: `translateX(${-(currentIndex * (100 / Events.length))}%)`,
      };

    if (window.innerWidth > 450)
      return {
        display: "flex",
        height: "100%",
        transition: "transform ease-out 0.3s",
        width: `${100 * Events.length}%`,
        transform: `translateX(${-(currentIndex * (100 / Events.length))}%)`,
      };

    return {
      display: "flex",
      height: "100%",
      transition: "transform ease-out 0.3s",
      width: `${100 * Events.length}%`,
      transform: `translateX(${-(currentIndex * (100 / Events.length))}%)`,
    };
  };

  const goToPrevious = () => {
    if (window.innerWidth > 1300) {
      const isFirst = currentIndex === 0;
      const newIndex = isFirst ? Events.length - 3 : currentIndex - 1;
      setCurrentIndex(newIndex);
    } else if (window.innerWidth > 1025) {
      const isFirst = currentIndex === 0;
      const newIndex = isFirst ? Events.length - 2 : currentIndex - 1;
      setCurrentIndex(newIndex);
    } else {
      const isFirst = currentIndex === 0;
      const newIndex = isFirst ? Events.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const goToNext = () => {
    if (window.innerWidth > 1300) {
      const isLast = currentIndex === Events.length - 3;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    } else if (window.innerWidth > 1025) {
      const isLast = currentIndex === Events.length - 2;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    } else {
      const isLast = currentIndex === Events.length - 1;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  const leftArrowStyle = {
    position: "absolute",
    top: "45%",
    opacity: "0.8",
    cursor: "pointer",
    zIndex: 1,
    left: "32px",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "45%",
    opacity: "0.8",
    cursor: "pointer",
    zIndex: 1,
    right: "32px",
  };

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      goToNext();
    }, 4000);
  });

  return (
    <div className="bg-image">
      <div className="codeutsava__navbar-container">
        <NavbarTeam />
      </div>
      <div className="container mx-auto main-container">
        <div className="codeutsava__section3" id="events">
          <div className="codeutsava__section3-title">
            <img src={frank}></img>
            Events
          </div>
          <div className="codeutsava__section3-events-container">
            <div style={carousalStyle} className="slider">
              <div style={slidesOverflow}>
                <div style={getSlidesStyle()}>
                  {EventData.map((event, index) => (
                    <EventCard
                      key={index}
                      img={event.img}
                      title={event.title}
                      date={event.date}
                      link={event.link}
                    />
                  ))}
                </div>
              </div>
              <div style={leftArrowStyle} onClick={() => goToPrevious()}>
                <img
                  src={downArrow}
                  style={{
                    height: "30px",
                    transform: "rotate(90deg)",
                    transform: "translateX(-30px) rotate(90deg)",
                    filter: "invert(80%)",
                  }}
                />
              </div>
              <div style={rightArrowStyles} onClick={() => goToNext()}>
                <img
                  src={downArrow}
                  style={{
                    height: "30px",
                    transform: "rotate(90deg)",
                    transform: "translateX(30px) rotate(-90deg)",
                    filter: "invert(80%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro_audio_new_design">
        <IntroAudio />
      </div>
      <div className="codeutsava__footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Events;