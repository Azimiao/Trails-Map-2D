import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/LiveMap.css";
//TODO: use colorful marker image
import marker from "leaflet/dist/images/marker-icon.png";
import EditablePopup from "./EditablePopup";
import React from "react";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";

let EditableMap = function (props) {
    let bounds = L.latLngBounds([L.latLng(0, 0), L.latLng(-128, 128)]);
    let markerIcon = new L.Icon({
        iconUrl: marker,
        iconRetinaUrl: marker,
        popupAnchor: [0, 0],
        iconSize: [32, 45]
    });

    let markerRef1 = React.createRef();

    return <MapContainer
        id="EditableMap"
        center={L.latLng([-64, 64])}
        maxBounds={bounds}
        maxBoundsViscosity={1}
        attributionControl={false}
        crs={L.CRS.Simple}
        doubleClickZoom={false}
        zoom={3}>
        <TileLayer
            url="./maps/{z}/{x}_{y}.png"
            minZoom={3}
            maxZoom={7}
            noWrap={true}
            bounds={bounds}
        >

        </TileLayer>

        <LayersControl>
            <LayersControl.Overlay name="Country">
                <MarkerClusterGroup>
                    <Marker
                        icon={markerIcon}
                        position={L.latLng([-62, 64])}
                        eventHandlers={{
                            add: (e) => {
                                console.log("Added Layer:", e.target);
                            },
                            remove: (e) => {
                                console.log("Removed layer:", e.target);
                            }
                        }}
                    >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            <button>test</button>
                        </Popup>
                    </Marker>

                    <Marker position={[-64, 64]} icon={markerIcon} ref={markerRef1}>
                        <EditablePopup 
                            removable 
                            editable 
                            source={markerRef1}
                            title={"<h1>洛连特</h1>"}
                            content={"<p>HelloWorld</p>"}
                        />
                    </Marker>
                    </MarkerClusterGroup>
            </LayersControl.Overlay>
        </LayersControl>

    </MapContainer>
}

export default EditableMap;