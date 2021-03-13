import ReactDOM from "react-dom";
import React, { useEffect, useState, useRef } from "react";
import "./Map.css";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWFzaHUwMTQ4IiwiYSI6ImNrbTYzOWNzejA4ZHcydm16aHYwdWxrOHYifQ.Q4Ui69WguWaLIxsLtzP7vw";

function Map(props) {
  const mapContainer = useRef();
  const [lng, setLng] = useState(props.long);
  const [lat, setLat] = useState(props.lat);
  const [zoom, setZoom] = useState(15);
  useEffect(() => {
    if (!(props.long && props.lat)) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    return () => map.remove();
  }, []);

  const content = (
    <div
      className={
        props.show
          ? "modal_map-backdrop modal_map-backdrop-active"
          : "modal_map-backdrop"
      }
      onClick={props.hide}
    >
      <div className="modal_map" onClick={(e) => e.stopPropagation()}>
        <div className="modal_map_head">Map</div>
        {props.long && props.lat ? (
          <div ref={mapContainer} className="modal_map_body"></div>
        ) : (
          <h2>No coordinates found :(</h2>
        )}

        <div className="modal_map-close" onClick={props.hide}>
          Close
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal_map"));
}

export default Map;
