import React, { memo } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 200px;
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue",
    Ubuntu, sans-serif;
  height: 44px;
  margin: 12px 0 0;
  outline: none;
  overflow: hidden;
  padding: 0 25px;
  text-align: center;
  text-transform: none;
  transition: all 0.2s, box-shadow 0.08s ease-in;
  touch-action: manipulation;
  font-weight: 700;
`;

const CaptureButton = memo(({ onCaptureImage }) => {
  return <Button onClick={onCaptureImage}>Capture Image</Button>;
});

export default CaptureButton;
