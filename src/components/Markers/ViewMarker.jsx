import React from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import L from "leaflet";
import ViewPopup from "./ViewPopup"
import LayerList from '@/assets/LayerConfig';
import MarkerSize from '@/assets/MarkerSizeConfig';
/**
 * 标注点
 * @param {*} props 
 * @returns 
 */
const ViewMarker = (props) => {
    const getIcon = (layerData, markerData) => {
        const str = markerData.icon && markerData.icon.length > 0 ? markerData.icon
            : layerData && layerData.icon.length > 0 ? layerData.icon
                : null;

        if (str == null) {
            return require("@images/markers/default.png");;
        }
        if (str.startsWith("http") || str.startsWith("data:image")) {
            return str;
        }
        return require("@images/markers/" + str);

    }

    const layer = LayerList.getLayerById(props.markerData.layerId);
    const size = MarkerSize.GetSize(props.markerData.iconSize ?? layer.size);
    const iconUrl = getIcon(layer, props.markerData);

    const markerIcon = new L.Icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconUrl,
        popupAnchor: [0, 0],
        iconSize: size
    });
    return (
        <Marker
            key={props.markerData.id}
            position={props.markerData.position}
            ref={props.myRef}
            icon={markerIcon}
            zIndexOffset={layer.zIndexOffset}
        >
            <ViewPopup
                source={props.myRef}
                markerId={props.markerData.id}
                title={props.markerData.title}
                content={props.markerData.content}
                url={props.markerData.url ?? null}
                onEditClick={props.onEditClick}
                onDelClick={props.onDelClick}
                onExportAllClick={props.onExportAllClick}
            />
            {
                    <Tooltip direction="bottom" offset={[0, size[1] * 0.5]} opacity={1} permanent={layer.showTitle} interactive={true}>
                        <span>{props.markerData.title}</span>
                    </Tooltip>
            }

        </Marker>
    )
}

export default ViewMarker
