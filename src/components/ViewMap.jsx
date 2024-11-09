import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, LayerGroup, useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
import "fontawesome-free/css/all.css";
import "../assets/css/LiveMap.css";
//TODO: use colorful marker image
import marker from "leaflet/dist/images/marker-icon.png";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";

import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";

import LayerList from "../assets/LayerConfig";
import MarkerDataHelper from "../assets/MarkerDataHelper";
import StateCache from "../assets/StateCache";

// import { useV2Sidebar } from "react-leaflet-v2-sidebar";
import ViewMarker from "./Markers/ViewMarker";
import MarkerEditor from "./MarkerEditor";

let ViewMap = observer(function (props) {


    // LatLng(lat/纬度,lng/经度),横纬竖经
    let bounds = L.latLngBounds([L.latLng(0, 0), L.latLng(-128, 128)]);
    const hasFitBounds = useRef(false);
    
    const FitBoundsOnce = ()=> {
        const map = useMap();

        useEffect(()=>{
            if (!hasFitBounds.current) {
            // 设置适当的边界
            const bounds = L.latLngBounds(
                [-40.1875,13.4375], // 南西角坐标
                [-89.8125, 113.9375]   // 东北角坐标
            );
            map.fitBounds(bounds);
            hasFitBounds.current = true; // 标记 fitBounds 已执行
        }},[map]);

        return null;
    }

    let markerRef1 = React.createRef();

    // pre load images
    useEffect(()=>{
        //FitBoundsMap();
    },[]);
    return (
        <React.Fragment>
            <MapContainer
                id="LiveMap"
                center={L.latLng([-64, 64])}
                maxBounds={bounds}
                maxBoundsViscosity={1}
                attributionControl={false}
                crs={L.CRS.Simple}
                doubleClickZoom={false}
                zoom={3}>
                <TileLayer
                    url="./maps/kai-map/{z}/{x}_{y}.png"
                    minZoom={3}
                    maxZoom={7}
                    noWrap={true}
                    bounds={bounds}
                >

                </TileLayer>
                <MapEvents />
                <LayersControl>
                    {
                        LayerList.data.map((layerData, index) => {

                            return (
                                <LayersControl.Overlay key={layerData.id} name={layerData.key} checked={true}>
                                    <MarkerClusterGroup 
                                    // SpiderfyOnMaxZoom={true} 
                                    // disableClusteringAtZoom={3}
                                    maxClusterRadius={50}
                                    >

                                        {
                                            MarkerDataHelper.GetDataListByLayer(layerData.id)?.map((originMarkData, index) => {
                                                return (
                                                    <ViewMarker
                                                        myRef={markerRef1}
                                                        onEditClick={OnEditClick}
                                                        onDelClick={OnDelClick}
                                                        onExportAllClick={OnExportAllClick}
                                                        markerData={originMarkData}>
                                                    </ViewMarker>
                                                )
                                            })
                                        }

                                    </MarkerClusterGroup>
                                </LayersControl.Overlay>
                            )

                        })
                    }
                </LayersControl>

                <FitBoundsOnce></FitBoundsOnce>
                {/* <Sidebar /> */}
            </MapContainer>
            {StateCache.IsEditorMode && StateCache.IsEditing ?
                <div id={"MapEditor"}>
                    <MarkerEditor
                        onCloseClick={OnCloseClick}
                        onSaveClick={OnSaveClick}
                        onDelClick={OnDelClick}
                        onExportAllClick={OnExportAllClick}
                    />
                </div>
                : null}

        </React.Fragment>
    )
});
let lastClickTime = -1;
let lastClickPos = {
    lat: -999999,
    lng: -999999,
}
const MapEvents = () => {
    useMapEvent({
        async click(e) {
            if(!StateCache.IsEditorMode){
                return;
            }
            console.log(e.latlng);
            let nowTime = Date.now();
            let nowPos = e.latlng;
            if (Math.abs(nowTime - lastClickTime) < 300
                && Math.abs(lastClickPos.lat - nowPos.lat) < 0.1
                && Math.abs(lastClickPos.lng - nowPos.lng) < 0.1
            ) {
                // 添加一个新 Marker
                let a = await MarkerDataHelper.AddMarker(8, nowPos.lat, nowPos.lng);
                console.log(`Create and Editing ${a}`);
                StateCache.SetEditingMarkerId(a);
                StateCache.SetIsEditing(true);
            }
            lastClickPos.lat = nowPos.lat;
            lastClickPos.lng = nowPos.lng;
            lastClickTime = nowTime;

        }
    });
    return false;
}

const OnCloseClick = function (id) {
    console.log(`close ${id}`);
    StateCache.SetIsEditing(false);
}

const OnDelClick = async function (id) {
    console.log(`del ${id}`);
    StateCache.SetIsEditing(false);
    await MarkerDataHelper.RemoveMarker(id);
}

const OnSaveClick = function (id,newData) {
    console.log(`save ${id}`);
    StateCache.SetIsEditing(false);
    console.log(newData);
    MarkerDataHelper.UpdateMarker(id,newData);
}

const OnEditClick = function (id) {
    console.log(`edit ${id}`);
    StateCache.SetEditingMarkerId(id);
    StateCache.SetIsEditing(true);
}

const OnExportAllClick = function(){
    let jsonString = JSON.stringify(MarkerDataHelper.data);
    const blob = new Blob([jsonString],{type:"application/json"});

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    var now = new Date();
    link.download = `markerList-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}

// function Sidebar() {
//     const map = useMap();
//     const panels = [
//       {
//         id: "userInfo",
//         tab: '<i style="font-size: large" class="fa fa-user"></i>',
//         pane: "User Info Tab Content",
//         title: "Your Profile",
//         position: "top",
//       },
//       {
//         id: "settings",
//         tab: '<i style="font-size: large" class="fa fa-cogs"></i>',
//         pane: "Settings Tab Content",
//         title: "Settings Tab",
//         position: "top",
//       },
//       {
//         id: "github",
//         tab: '<i style="font-size: large" class="fa fa-archive"></i>',
//         pane: "Github Tab Content",
//         title: "Github Info",
//         position: "bottom",
//       },
//     ];
//     useV2Sidebar(map, panels);

//     return <React.Fragment></React.Fragment>;
//   }

export default ViewMap;