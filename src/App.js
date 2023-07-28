import React, { useState, useRef, useEffect } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import * as BABYLON from "babylonjs";
import { useBeforeRender } from "react-babylonjs";
import styled from "styled-components";

import MapContainer from "./components/MapContainer";
import CanvasContainer from "./components/CanvasContainer";
import CaptureButton from "./components/CaptureButton";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

function MyApp({ google }) {
  const mapRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [mapVisible, setMapVisible] = useState(true);

  const sceneRef = useRef(null);
  const cuboidRef = useRef(null);

  const handleCaptureImage = () => {
    if (!mapRef.current || !mapRef.current.map) {
      console.log("Map reference not available");
      return;
    }

    const map = mapRef.current.map;
    const center = map.getCenter();
    const mapTypeId = map.getMapTypeId();
    const zoom = map.getZoom();

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const mapImageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat()},${center.lng()}&zoom=${zoom}&size=500x400&maptype=${mapTypeId}&key=${apiKey}`;

    const mapImage = new Image();
    mapImage.crossOrigin = "anonymous";

    mapImage.onload = () => {
      setCapturedImage(mapImage);
      setMapVisible(false);
    };
    
    mapImage.src = mapImageURL;
    const texture = new BABYLON.Texture(mapImage.src, sceneRef.current);
    const material = new BABYLON.StandardMaterial("material", sceneRef.current);
    material.diffuseTexture = texture;
    material.diffuseTexture.hasAlpha = true;
    cuboidRef.current.material = material;
  };

  useEffect(() => {
    create3DScene();

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  const create3DScene = (mapImage) => {
    const canvas = document.getElementById("renderCanvas");

    if (!canvas) {
      console.log("Canvas not available");
      return;
    }

    const engine = new BABYLON.Engine(canvas, true);

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        3,
        1,
        2,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.attachControl(canvas, true);
      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(4, 1, 5),
        scene
      );

      const cuboid = BABYLON.MeshBuilder.CreateBox("cuboid", {}, scene);
      cuboidRef.current = cuboid;
      if (mapImage) {
        const texture = new BABYLON.Texture(mapImage.src, scene);
        const material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseTexture = texture;
        material.diffuseTexture.hasAlpha = true;
        cuboid.material = material;
      }
      return scene;
    };

    const scene = createScene();
    sceneRef.current = scene;

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });
  };

  useBeforeRender(() => {
    if (mapVisible && mapRef.current) {
      const map = mapRef.current.map;
      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      console.log("Visible Region:", ne.lat(), ne.lng(), sw.lat(), sw.lng());
    }
  });

  return (
    <Container>
      <MapContainer
        google={google}
        zoom={10}
        initialCenter={{ lat: 17.385044, lng: 78.486671 }}
        mapRef={mapRef}
        onCaptureImage={handleCaptureImage}
      />
      <CaptureButton onCaptureImage={handleCaptureImage} />
      <CanvasContainer capturedImage={capturedImage} />
    </Container>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MyApp);
