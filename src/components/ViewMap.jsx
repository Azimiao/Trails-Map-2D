import { MapContainer, TileLayer, useMap,  useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
import "fontawesome-free/css/all.css";
import "../assets/css/LiveMap.css";

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";

import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";

import LayerDataHelper from "../assets/LayerDataHelper";
import MarkerDataHelper from "../assets/MarkerDataHelper";
import StateCache from "../assets/StateCache";

import ViewMarker from "./Markers/ViewMarker";
import MarkerEditor from "./MarkerEditor";
import Queue from "@/utils/Queue";
import ControlOverlay from "./ControlOverlay";



const queueItem = new Queue();

// const createClusterCustomIcon = function (cluster,icon) {
//     return L.divIcon({
//       html: `<span><img style="width:100%;height:100%;" src="${icon}"/>${cluster.getChildCount()}</span>`,
//       className: 'custom-marker-cluster',
//       iconSize: L.point(33, 33, true),
//     })
// }

let ViewMap = observer(function (props) {

    // LatLng(lat/纬度,lng/经度),横纬竖经
    let bounds = L.latLngBounds([L.latLng(0, 0), L.latLng(-128, 128)]);
    const hasFitBounds = useRef(false);

    // useEffect(()=>{
    //     const allLayerIds = LayerDataHelper.getAllLayerId();
    //     console.log(allLayerIds);
    //     StateCache.SetDefaultLayerValues(allLayerIds);
    // },[]);


    const PopupKeyUp = (e) => {
        queueItem.enqueue(e.key);
        if (queueItem.count() > 3) {
            queueItem.dequeue();
        }

        if (queueItem.toSinglelineString().toLowerCase() === "auv") {
            if (!StateCache.IsEditorMode) {
                let result = window.confirm("是否进入编辑模式?");
                if (result) {
                    StateCache.Set3DMode(false);
                    StateCache.SetEditorMode(true);
                }
            } else {
                if (!StateCache.IsEditing) {
                    let result = window.confirm("是否退出编辑模式?");
                    if (result) {
                        StateCache.SetEditorMode(false);
                    }
                }
            }
        } else if (!StateCache.IsEditorMode && queueItem.toSinglelineString().toLowerCase() === "njx") {
            let result = window.confirm(StateCache.is3D ? "是否退出3D模式?" : "是否进入3D模式?");
            if (result) {
                StateCache.Set3DMode(!StateCache.is3D);
            }
        }

    }

    useEffect(() => {
        document.addEventListener("keyup", PopupKeyUp, false);
        return () => {
            document.removeEventListener("keyup", PopupKeyUp, false)
        }
    });

    const FitBoundsOnce = () => {
        const map = useMap();

        useEffect(() => {
            if (!hasFitBounds.current) {
                // 设置适当的边界
                const bounds = L.latLngBounds(
                    [-40.1875, 13.4375], // 南西角坐标
                    [-89.8125, 113.9375]   // 东北角坐标
                );
                map.fitBounds(bounds);
                hasFitBounds.current = true; // 标记 fitBounds 已执行
            }
        }, [map]);

        useEffect(()=>{
            if(MarkerDataHelper.data.length <= 0){
                MarkerDataHelper.RequestMarkerList();
            }
        },[]);
        return null;
    }
    const markerRef1 = React.createRef();
    return (
        <React.Fragment>
        <div className={StateCache.is3D ? "test3d" : "test2d"} style={{
            width: "100%",
            height: "100%",
        }}>

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
                {
                    LayerDataHelper.data.map((layerData, index) => {

                        return (
                            // StateCache.ShowingLayer.includes(layerData.id) ?
                            layerData.show ?
                                // <LayersControl.Overlay key={layerData.id} name={layerData.key} checked={true}>
                                <MarkerClusterGroup
                                    // SpiderfyOnMaxZoom={true} 
                                    // disableClusteringAtZoom={3}
                                    key={`layerGroup-${layerData.id}`}
                                    // iconCreateFunction={(c)=>createClusterCustomIcon(c,IconHelper.getIcon(layerData.icon))}
                                    maxClusterRadius={50}
                                >
                                    {
                                        MarkerDataHelper.GetDataListByLayer(layerData.id)?.map((originMarkData, index) => {
                                            return (
                                                <ViewMarker
                                                    key={`marker-${originMarkData.id}`}
                                                    myRef={markerRef1}
                                                    onEditClick={OnEditClick}
                                                    onDelClick={OnDelClick}
                                                    onExportAllClick={OnExportAllClick}
                                                    markerData={originMarkData}>
                                                </ViewMarker>
                                            )
                                        })
                                    }

                                </MarkerClusterGroup> : null
                            // </LayersControl.Overlay>
                        )

                    })
                }

                <FitBoundsOnce />
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

        </div>
        
        <ControlOverlay/>
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
            if (!StateCache.IsEditorMode) {
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

const OnSaveClick = function (id, newData) {
    console.log(`save ${id}`);
    StateCache.SetIsEditing(false);
    console.log(newData);
    MarkerDataHelper.UpdateMarker(id, newData);
}

const OnEditClick = function (id) {
    console.log(`edit ${id}`);
    StateCache.SetEditingMarkerId(id);
    StateCache.SetIsEditing(true);
}

const OnExportAllClick = function () {
    let jsonString = JSON.stringify(MarkerDataHelper.data);
    const blob = new Blob([jsonString], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    var now = new Date();
    link.download = `markerList-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}

export default ViewMap;