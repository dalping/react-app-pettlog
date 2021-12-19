import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Styled from "./style";
import { LeftOutlined, RightOutlined, CloseOutlined } from "@ant-design/icons";

function ImageViewer() {
  const option = useSelector((state) => state.viewer_reducer);
  const dispatch = useDispatch();
  const [ImageIdx, setImageIdx] = useState(0);

  const store = {
    type: "OPEN_IMAGE_VIEWER",
    payload: { open: false, images: [] },
  };

  const closeViewerHandler = () => {
    setImageIdx(0);
    dispatch(store);
  };

  const setBtnHandler = (idx) => {
    if (ImageIdx + idx < 0 || ImageIdx + idx >= option.images.length) return;

    setImageIdx(ImageIdx + idx);
  };

  return (
    <>
      {option.open && (
        <Styled.ViewerWrapper>
          <CloseOutlined className="closeBtn" onClick={closeViewerHandler} />
          {option.images.length > 1 && (
            <Styled.CarouselBtns>
              {ImageIdx > 0 && (
                <LeftOutlined
                  className="left btn"
                  onClick={() => {
                    setBtnHandler(-1);
                  }}
                />
              )}
              <div />
              {ImageIdx < option.images.length - 1 && (
                <RightOutlined
                  className="right btn"
                  onClick={() => {
                    setBtnHandler(1);
                  }}
                />
              )}
            </Styled.CarouselBtns>
          )}
          <Styled.Viewer>
            {option.images.length > 0 && (
              <img alt="" src={option.images[ImageIdx]} />
            )}
          </Styled.Viewer>
        </Styled.ViewerWrapper>
      )}
    </>
  );
}

export default ImageViewer;
