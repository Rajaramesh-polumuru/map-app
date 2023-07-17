import React from "react";
import { Map } from "google-maps-react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  position: relative;
`;


const MapContainer = ({
  google,
  zoom,
  initialCenter,
  mapRef,
}) => {
  return (
    <Container>
      <Map
        google={google}
        zoom={zoom}
        initialCenter={initialCenter}
        ref={mapRef}
      />
    </Container>
  );
};

export default MapContainer;
