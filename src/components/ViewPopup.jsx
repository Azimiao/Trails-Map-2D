import React from "react";
import { Popup } from "react-leaflet";
import L from "leaflet";
import Parser from 'html-react-parser';

import "../assets/css/Popup/ViewPopup.css";
import StateCache from "../assets/StateCache";
/**
 * 预览模式下的 Popup
 */
class ViewPopup extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { id, title, content, ...originProps } = this.props;
        return (
            <Popup
                id={this.props.id}
                className="ViewPopup"
                // 原始 Popup 参数
                {...originProps}
            >
                <div className="ViewPopupContainer">
                    <div className="PopupTitle">
                        {Parser(title)}
                        {/* {title} */}
                    </div>
                    <div className="PopupContent">
                        {Parser(content)}
                        {/* {content} */}
                    </div>
                    {
                        StateCache.IsEditingMode ?
                            <React.Fragment>
                                <button
                                    onClick={(e) => {
                                        this.props.onDelClick(this.props.markerId);
                                        // 阻止事件向上冒泡
                                        e.stopPropagation();
                                    }}
                                    className={"del"}
                                >
                                    Del
                                </button>
                                <span className="popUpSpace"></span>
                                <button
                                    onClick={() => this.props.onEditClick(this.props.markerId)}
                                    className={"edit"}
                                >
                                    Edit
                                </button>
                            </React.Fragment>
                            : null
                    }

                </div>
            </Popup>
        );
    }
}

export default ViewPopup;