import React from "react";
import { Popup } from "react-leaflet";
import L from "leaflet";
import Parser from 'html-react-parser';

import "../../assets/css/Popup/CommonPopup.css";
import "../../assets/css/Popup/ViewPopup.css";

/**
 * 预览模式下的 Popup
 */
class ViewPopup extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        const {id,title,content,...originProps} = this.props;
        return(
            <Popup
                id = {this.props.id}
                className="ViewPopup"
                // 原始 Popup 参数
                {...originProps}
            >
                <div className="ViewPopupContainer">
                    <div className="PopupTitle">
                        {Parser(title)}
                    </div>
                    <div className="PopupContent">
                        {Parser(content)}
                    </div>
                </div>
            </Popup>
        );
    }
}

export default ViewPopup;