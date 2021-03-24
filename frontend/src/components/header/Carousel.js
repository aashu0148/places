import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Avatar } from "@material-ui/core";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

import "./Carousel.css";

function Crsl() {
  const [carouselInner, setCarouselInner] = useState();

  useEffect(() => {
    fetch("/places/top").then(async (res) => {
      const data = await res.json();

      const result = data.map((e, i) => (
        <div key={i} className="carousel_item">
          <img src={e.image} />
          <div className="carousel_info">
            <Avatar src={e.authorPhoto} />

            <div className="carousel_info_content">
              <p>{e.title}</p>
              <div className="carousel_desc">{e.desc}</div>
            </div>
          </div>
        </div>
      ));
      setCarouselInner(result);
    });
  }, []);

  return (
    <Carousel
      showArrows
      autoPlay
      infiniteLoop
      showStatus={false}
      useKeyboardArrows
      emulateTouch
      stopOnHover
    >
      {carouselInner}
    </Carousel>
  );
}

export default Crsl;
