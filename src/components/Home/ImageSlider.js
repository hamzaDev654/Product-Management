import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Coffee from "../../slide-img/Coffee.jpg";
import Coffee3 from "../../slide-img/Coffee-3.jpg";
import Coffee4 from "../../slide-img/Coffee-4.jpg";
import Coffee5 from "../../slide-img/Coffee-5.jpg";
import Coffee6 from "../../slide-img/Coffee-6.jpg";
import Coffee7 from "../../slide-img/Coffee-7.jpg";
import Coffee9 from "../../slide-img/Coffee-9.jpg";
import Coffee10 from "../../slide-img/Coffee-10.jpg";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
const ImageSlider = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imges = [
    Coffee,
    Coffee3,
    Coffee4,
    Coffee5,
    Coffee6,
    Coffee7,
    Coffee9,
    Coffee10,
  ];

  return (
    <Slider {...settings}>
      {imges.map((img, i) => {
        return (
          <Card className={classes["slider-container"]} key={i}>
            <img
              src={img}
              alt={`Coffee${i + 1}`}
              style={{ height: "auto", width: "100%" }}
            />
          </Card>
        );
      })}
    </Slider>
  );
};

export default ImageSlider;
