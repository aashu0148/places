import React from "react";

import "./Carousel.css";

function Carousel() {
  return (
    <div className="carousel_outer">
      <div className="carousel">
        <div className="carousel_item">
          <img src="https://cdn.pixabay.com/photo/2019/12/10/10/53/architecture-4685608__340.jpg" />
        </div>
        <div className="carousel_item">
          <img src="https://cdn.pixabay.com/photo/2018/01/21/01/46/architecture-3095716__340.jpg" />
        </div>
        <div className="carousel_item">
          <img src="https://cdn.pixabay.com/photo/2013/04/07/21/29/monument-101632__340.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
