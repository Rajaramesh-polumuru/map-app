import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const CanvasContainer = memo(() => {
  return <Container>{<Canvas id="renderCanvas" />}</Container>;
});

export default CanvasContainer;
