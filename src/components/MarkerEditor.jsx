import React from 'react'
import ContentEditable from "react-contenteditable";
import { Editor } from "react-draft-wysiwyg";
import {ContentState,EditorState} from 'draft-js';
import Parser from 'html-react-parser';
import StateCache from '../assets/StateCache';
import MarkerList from '../assets/MarkerList';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Component } from 'react';
import { observer } from 'mobx-react';
import { convertFromHTML } from 'draft-js';
import ReactDropdown from 'react-dropdown';
import "react-dropdown/style.css";
import LayerList from '@/assets/LayerConfig';
const prefix = 'leaflet-popup-button';




const MarkerEditor = observer(class MarkerEditorC extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        var oldMarkerData;
        if(StateCache.EditingMarkerId >= 0)
        {
            oldMarkerData = MarkerList.GetMarkerById(StateCache.EditingMarkerId);
        }

        if(oldMarkerData != null){
            this.setState({
                inputTitle:oldMarkerData.title,
                inputTitleValue: oldMarkerData.title,
                inputContent:oldMarkerData.content,
                inputContentValue:oldMarkerData.content,
                editorState:EditorState.createWithContent(ContentState.createFromBlockArray(
                    convertFromHTML(oldMarkerData.content)
                ))
            });
        }
    }

    state = {
		editorState: EditorState.createEmpty(),
		editScreenOpen: false,

		inputTitleValue:"",
        inputTitle: "",
        
        inputContentValue: "",
		inputContent: "",
	};


	onEditorContentStateChange = (newEditorState)=>{
		this.setState({
			editorState : newEditorState
		});
		console.log(newEditorState);
	}

    render(){
        const layerOptions = LayerList.getOptionsList();
        const oldMarkerData = MarkerList.GetMarkerById(StateCache.EditingMarkerId);
        const defaultOption = layerOptions.filter((item)=>{return item.value == oldMarkerData.layerId})[0];
        console.log(defaultOption);
        return (
            <div className='marker-editor'>
                <h1>编辑 Marker 点 {StateCache ? StateCache.EditingMarkerId : "null"}</h1>
                <ContentEditable
                    className="marker-editor-title"
                    html={this.state.inputTitleValue}
                />
                <h3>图层类型</h3>
                <ReactDropdown options={layerOptions} value={defaultOption}></ReactDropdown>
                <h3>外部ICON</h3>
                <input className='marker-editor-input'/>
                <Editor
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorContentStateChange}
                    wrapperClassName="marker-editor-content-warapper"
                    editorClassName="marker-editor-content-editor"
                    toolbar={{
                        options: [
                            // 'inline', 
                            'blockType', 
                            'fontSize', 
                            'fontFamily',
                            'list', 
                            'textAlign',
                            'colorPicker', 
                            'link', 
                            // 'emoji', 
                            'image', 
                            'history'],
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
                <div
                    className="marker-editor-buttons"
                >
                    {/* <button
                        className={"cancel"}
                        onClick={()=>props.onCancelClick(props.markerId)}
                    >
                        Cancel
                    </button> */}
                    <button
                        className={"del"}
                        onClick={(e)=>{
                            this.props.onDelClick(StateCache.EditingMarkerId);
                            e.preventDefault();
                            // StateCache.EditingMarkerId = -1;
                        }}
                    >
                        Del
                    </button>
                    <button
                        className={"save"}
                        onClick={(e)=>{
                            this.props.onSaveClick(StateCache.EditingMarkerId);
                            // StateCache.EditingMarkerId = -1;
                            e.preventDefault();
                        }}
                    >
                        Save
                    </button>
                </div>
                <button
                        className="marker-editor-button-close"
                        onClick={(e)=>{
                            this.props.onCloseClick(StateCache.EditingMarkerId);
                            e.preventDefault();
                        }}
                >
                        X
                </button>
            </div>
        )
    }
    
});

export default MarkerEditor
