import React, { useState, useEffect } from "react";
import * as Styled from "./style";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function ImageCarousel({ images }) {
  //const [Page, setPage] = useState(0);
  const [Xpos, setXpos] = useState(0);

  const BtnHandler = (pos) => {
    setXpos(Xpos + pos);
  };

  return (
    <Styled.CarouselWrapper Xpos={Xpos}>
      {images.length > 1 && (
        <Styled.CarouselBtns>
          {Xpos !== 0 && (
            <LeftOutlined
              className="left btn"
              onClick={() => BtnHandler(100)}
            />
          )}
          <div></div>
          {Xpos !== (images.length - 1) * -100 && (
            <RightOutlined
              className="right btn"
              onClick={() => BtnHandler(-100)}
            />
          )}
        </Styled.CarouselBtns>
      )}
      {images.map((data, idx) => (
        <div className="innerDiv" key={idx}>
          <img alt="" src={data} />
        </div>
      ))}
    </Styled.CarouselWrapper>
  );
}

export default ImageCarousel;
