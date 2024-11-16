import React from "react";
import { Popup } from "react-leaflet";
import Parser from 'html-react-parser';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import StateCache from "@/assets/StateCache";

import { Viewer as ByteMDViewer } from "@bytemd/react";
import { makeStyles } from "@material-ui/styles";
import ImageLoadingPlugin from "../ImageLoadingPlugin";

const plugins = [ImageLoadingPlugin()];

const useStyles = makeStyles((theme)=>({
    ViewPopup:{
        minWidth:'200px',
        maxWidth:'350px'
    },
    ViewPopupContainer:{
        width:'100%',
        height:'100%'
    },
    PopupTitle:{
        fontSize:'larger',
        width:'100%',
        padding: '12px 0 0 0',
        textAlign:'left',
        fontWeight:'bold',
        "& a":{
            marginLeft:'0.5em',
            padding:'0.5em 0.5em',
            background:'#f1f1f1',
            borderRadius:'5px',
            fontSize:'0.8em'
        }
    },

    PopupContent:{
        width:'100%',
        margin:'12px 0px 24px 0px',
        overflowY:'scroll',
        maxHeight:'300px',
        scrollbarWidth:'thin',
        scrollbarColor:"rgb(255, 211, 68) rgb(218, 218, 218)",
        paddingRight:'12px',
        "& img":{
            maxWidth:'100%',
            height:'auto',
            borderRadius:'5px',
            minHeight:'50px',
            background:"#f1f1f1ff",
            // "&:after":{
            //     position:"absolute",
            //     width:"100%",
            //     height:"50px",
            //     left:0,
            //     top:0,
            //     background:url(),
            // }
        },
        "& p":{
        marginTop:0,
        marginBottom:'0.5em'
        }
    },

    PopUpSpace:{
        display:'inline-block',
        minWidth:'0.5em'
    },
    Icon:{
        verticalAlign:'middle',
        width:'0.8em !important',
        height:'0.8em important'
    }
}));

const ViewPopup = (props)=>{

    const { id, title, content, url,...originProps } = props;
    const classes = useStyles();
  return (
    <Popup
    id={props.id}
    className={classes.ViewPopup}
    // 原始 Popup 参数
    {...originProps}
>
    <div className={classes.ViewPopupContainer}>
        <div className={classes.PopupTitle}>
            {Parser(title)}
            {
                url && url.value ?
                <React.Fragment>
                    <a
                        href={url.value}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <OpenInNewIcon className={classes.Icon} />
                        {url.title}
                    </a>
                    </React.Fragment>
                    : null
            }
        </div>
        <div className={classes.PopupContent}>
            <ByteMDViewer
                value={content}
                plugins={plugins}
            />
        </div>
        {
            StateCache.IsEditorMode ?
                <React.Fragment>
                    <button
                        onClick={(e) => {
                            props.onDelClick(props.markerId);
                            // 阻止事件向上冒泡
                            e.stopPropagation();
                        }}
                        className={"del"}
                    >
                        Del
                    </button>
                    <span className={classes.PopUpSpace}></span>
                    <button
                        onClick={() => props.onEditClick(props.markerId)}
                        className={"edit"}
                    >
                        Edit
                    </button>
                    <span className={classes.PopUpSpace}></span>
                    <button
                        onClick={() => props.onExportAllClick()}
                        className={"edit"}
                    >
                        ExportAllMarker
                    </button>
                </React.Fragment>
                : null
        }

    </div>
</Popup>
  )
};

export default ViewPopup;