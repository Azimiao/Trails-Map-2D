import React, { Fragment } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/LiveMap.css";
import ContentEditable from "react-contenteditable";

class TopLevelMarker extends React.Component{

    constructor(props){
        super(props);

        const sourceTypes = [
			'Layer',
			'Circle',
			'CircleMarker',
			'Marker',
			'Polyline',
			'Polygon',
			'ImageOverlay',
			'VideoOverlay',
			'SVGOverlay',
			'Rectangle',
			'LayerGroup',
			'FeatureGroup',
			'GeoJSON',
		];

		sourceTypes.forEach((type) => {
			L[type].include({
				nametag: type.toLowerCase(),
			});
		});

    }

    componentDidMount(){
        if(this.props.open){
            this.thePopup._source.openPopUp();
        }
    }

    

    state = {
        LayerId:-1,
        Icon: "",
        InputIconValue:"",
        Title:"",
        InputTitleValue:"",
        Content:"",
        EditableContent:"",
        InputEditableContentValue:"",
    }


    render(){

        const editScreen = (
            <Fragment>
                <div className="editPopupTitle">
                    <ContentEditable
                        className="leaflet-popup-input"
                        html={this.state.inputTitleValue}
                        ref={this.props.ref}
                        onChange={this.handleTitleEdits}
                    />
                </div>
                <div className="editPopupContent">
                    <ContentEditable
                        className="leaflet-popup-input"
                        html={this.state.inputContentValue}
                        ref={this.props.ref}
                        onChange={this.handleContentEdits}
                    />
                </div>
    
                <div className="leaflet-popup-useraction-buttons">
                    <button
                        className={`${prefix} cancel`}
                        onClick={this.cancelEdits}
                    >
                        Cancel
                    </button>
                    <button className={`${prefix} save`} onClick={this.saveEdits}>
                        Save
                    </button>
                </div>
            </Fragment>
        );

        return <Fragment></Fragment>;


    }
}

export default TopLevelMarker;