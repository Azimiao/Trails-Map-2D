import { Component,Fragment } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Popup } from "react-leaflet";
import ContentEditable from "react-contenteditable";
import ReactDOMServer from "react-dom/server";
import Parser from 'html-react-parser';
import L from 'leaflet';
import "../assets/css/EditablePopup.css";

const prefix = 'leaflet-popup-button';

class EditablePopup extends Component{
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

    componentDidMount() {
		if (this.props.open) {
			setTimeout(() => {
				if (this.props.v2) {
					this.thePopup.leafletElement._source.openPopup();
				} else {
					this.thePopup._source.openPopup();
				}
			}, 1);
		}

		if (this.props.v2) {
			this.setState({
				nametag:
					this.props.nametag ||
					this.thePopup.leafletElement._source.nametag,
			});
		} else {
			this.setState({
				nametag: this.props.nametag || this.thePopup._source.nametag,
			});
		}

	}

	state = {
		editorState: EditorState.createEmpty(),
		editScreenOpen: false,
		inputTitleValue:this.props.title,
		inputContentValue: this.props.content,
		inputTitle: this.props.title,
		inputContent: this.props.content,
		nametag: this.props.nametag,
	};

	openEditScreen = () => {
		this.setState({ editScreenOpen: true });
	};

	closeEditScreen = () => {
		this.setState({ editScreenOpen: false });
	};

	handleTitleEdits = (e)=>{
		this.setState({ inputTitleValue: e.target.value });
	}
	handleContentEdits = (e) => {
		this.setState({ inputContentValue: e.target.value });
	};

	saveEdits = (e) => {
		e.preventDefault();
		if (this.props.saveContentCallback) {
			this.props.saveContentCallback(this.state.inputContentValue);
		}
		this.setState({
			inputTitle: this.state.inputTitleValue,
			inputContent: this.state.inputContentValue,
			
		});
		this.closeEditScreen();
	};

	cancelEdits = (e) => {
		e.preventDefault();
		this.setState({
			inputTitleValue:this.state.inputTitle,
			inputContentValue: this.state.inputContent
		});
		this.closeEditScreen();
	};

	removeSource = () => {
		if (this.props.removalCallback) {
			this.props.removalCallback();
		} else {
			if (this.props.v2) {
				this.thePopup.leafletElement._source.remove();
			} else {
				this.thePopup._source.remove();
			}
		}
	};
	onEditorContentStateChange = (newEditorState)=>{
		this.setState({
			editorState : newEditorState
		});
		console.log(newEditorState);
		this.thePopup._contentNode.style = "";
	}
	render() {
		let Buttons;

		if (this.props.removable && !this.props.editable) {
			Buttons = (
				<div className="leaflet-popup-useraction-buttons">
					<button
						className={`${prefix} remove`}
						onClick={this.removeSource}
					>
						Remove this {this.state.nametag}
					</button>
				</div>
			);
		} else if (!this.props.removable && this.props.editable) {
			Buttons = (
				<div className="leaflet-popup-useraction-buttons">
					<button
						className={`${prefix} edit`}
						onClick={this.openEditScreen}
					>
						Edit
					</button>
				</div>
			);
		} else if (this.props.removable && this.props.editable) {
			Buttons = (
				<div className="leaflet-popup-useraction-buttons">
					<button
						className={`${prefix} remove`}
						onClick={this.removeSource}
					>
						Remove this {this.state.nametag}
					</button>
					<button
						onClick={this.openEditScreen}
						className={`${prefix} edit`}
					>
						Edit
					</button>
				</div>
			);
		}

		const contentScreen = (
			<Fragment>
				{Parser(this.state.inputTitle)}
				{Parser(this.state.inputContent)}
				{Buttons}
			</Fragment>
		);
		
		const {editorState} = this.state;

		const editScreen = (
			<Fragment>
					<ContentEditable
						className="leaflet-popup-input"
						html={this.state.inputTitleValue}
						ref={this.props.ref}
						onChange={this.handleTitleEdits}
					/>
				<div 
				//className="editPopupContent"
				>
					{/* <ContentEditable
						className="leaflet-popup-input"
						html={this.state.inputContentValue}
						ref={this.props.ref}
						onChange={this.handleContentEdits}
					/> */} 
					<Editor
						editorState={editorState}
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
						onEditorStateChange={this.onEditorContentStateChange}
						toolbar={{
							image: {
								urlEnabled: true,
								uploadEnabled: false,
								alignmentEnabled: true,
								uploadCallback: undefined,
								previewImage: false,
								inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
								alt: { present: false, mandatory: false },
								defaultSize: {
								  height: 'auto',
								  width: 'auto',
								}
							}
						}}
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
		console.log("editScreenOpen:" + this.state.editScreenOpen);
		const {title,content,...otherProps} = this.props;
		return (
			<Popup
				{...otherProps}
				maxWidth={this.state.editScreenOpen? 1000 : 260}
				minWidth={this.state.editScreenOpen? 400 : 200}
				ref={(thePopup) => (this.thePopup = thePopup)}
				//className="defaultPopup"
				//minWidth={"auto"} //没有用,但会使 leaf 计算出错,不再添加 width
				eventHandlers={{
					open:(e)=>{
						console.log("OpenGo===========================");
					},
					close:(e)=>{
						console.log("CloseGo");
					}
				}}>	
				{this.state.editScreenOpen ? editScreen : contentScreen}
			</Popup>
		);
	}
}

export default EditablePopup;