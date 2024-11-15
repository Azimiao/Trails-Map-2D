import React from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import L from "leaflet";
import ViewPopup from "./ViewPopup"
import LayerDataHelper from '@/assets/LayerDataHelper';
import MarkerSize from '@/assets/MarkerSizeConfig';
import IconHelper from '@/assets/IconHelper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    tooltip_title:{
        paddingTop:0,
        background:"none",
        border:"none",
        borderRadius:0,
        boxShadow:"none",
        color:"#ffffff",
        marginTop:"3px",
        textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        fontSize:"1.2em",
        "&:before":{
            marginTop:0,
            marginBottom:0,
            border:"none"
        }
    }
}));


/**
 * 标注点
 * @param {*} props 
 * @returns 
 */
const ViewMarker = (props) => {
    const classes = useStyles();

    const getIcon = (layerData, markerData) => {
        const str = markerData.icon && markerData.icon.length > 0 ? markerData.icon
            : layerData && layerData.icon.length > 0 ? layerData.icon
                : null;

        if (str == null) {
            return IconHelper.getIcon();
        }
        if (str.startsWith("//") || str.startsWith("http") || str.startsWith("data:image")) {
            return str;
        }
        return IconHelper.getIcon(str);

    }

    const layer = LayerDataHelper.getLayerById(props.markerData.layerId);
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
                <Tooltip
                    direction="bottom"
                    offset={[0, size[1] * 0.5]}
                    opacity={1}
                    permanent={layer.showTitle}
                    interactive={true}
                    className={layer.showTitle ? classes.tooltip_title : null}
                    >
                    <span>{props.markerData.title}</span>
                </Tooltip>
            }

        </Marker>
    )
}

export default ViewMarker
