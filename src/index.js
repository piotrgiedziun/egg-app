import React from "react";
import { render } from "react-dom";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";
// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

const App = () => (
  <div className="container">
    <h3>Egg picker</h3>
    <div className="imagesContainer">
      <div className="image">
        <img
          className="bgImage"
          src="https://vignette.wikia.nocookie.net/disney/images/6/6b/Donald_Duck_transparent.png/revision/latest"
        />
      </div>
      <div className="image">
        <Carousel
          className="center"
          showThumbs
          infiniteLoop
          emulateTouch
          showArrows
          showStatus={false}
        >
          <div>
            <img src="http://www.clker.com/cliparts/a/5/8/e/1298546227709322759png-transparency-md.png" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img
              className="bgImage"
              src="https://vignette.wikia.nocookie.net/disney/images/6/6b/Donald_Duck_transparent.png/revision/latest"
            />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="https://picsum.photos/150/150?random2" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById("root"));
