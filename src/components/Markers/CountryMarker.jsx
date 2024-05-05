import React from 'react'
import { Marker } from 'react-leaflet'
import L from "leaflet";
import marker from "leaflet/dist/images/marker-icon.png";
import ViewPopup from '../ViewPopup';
/**
 * 国家标注点
 * @param {*} props 
 * @returns 
 */
const CountryMarker = (props) => {

  // console.log(props.markerData.icon);
  //TODO: 把加载图片提前到公共容器，减少重复 load
  const markerIcon = new L.Icon({
    iconUrl: props.markerData.icon ? require("@images/markers/" + props.markerData.icon) : marker,
    iconRetinaUrl: props.markerData.icon ? require("@images/markers/" + props.markerData.icon) : marker,
    popupAnchor: [0, 0],
    iconSize: [35, 35]
  });
  return (
    <Marker
      key={props.markerData.id}
      position={props.markerData.position}
      ref={props.myRef}
      icon={markerIcon}
    >
      <ViewPopup
        source={props.myRef}
        markerId={props.markerData.id}
        title={props.markerData.title}
        content={props.markerData.content}
        onEditClick={props.onEditClick}
        onDelClick={props.onDelClick}
      />
    </Marker>
  )
}

export default CountryMarker
