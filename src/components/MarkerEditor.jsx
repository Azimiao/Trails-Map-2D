import React, { useEffect } from 'react'
import ContentEditable from "react-contenteditable";
import { Editor } from "react-draft-wysiwyg";
import { Editor as ByteMDEditor,Viewer as ByteMDViewer } from '@bytemd/react';
import 'bytemd/dist/index.css';
import { ContentState, convertFromRaw, convertFromHTML, convertToRaw, EditorState,RichUtils } from 'draft-js';
import Parser from 'html-react-parser';
import StateCache from '../assets/StateCache';
import MarkerList from '../assets/MarkerList';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Component } from 'react';
import { observer } from 'mobx-react';
import ReactDropdown from 'react-dropdown';
import "react-dropdown/style.css";
import LayerList from '@/assets/LayerConfig';
import { stateToHTML } from 'draft-js-export-html';
import MarkerSize from '@/assets/MarkerSizeConfig';
const prefix = 'leaflet-popup-button';




class MediaComponent extends React.Component {
    render() {
        const { block, contentState } = this.props;
        const { foo } = this.props.blockProps;
        const data = contentState.getEntity(block.getEntityAt(0)).getData();


        const emptyHtml = ' ';
        return (
            <div>
                {emptyHtml}
                <img
                    src={data.src}
                    alt={data.alt || ''}
                    style={{ height: data.height || 'auto', width: data.width || 'auto' }}
                />
            </div>
        );
    }
}

const MarkerEditor = observer(class MarkerEditorC extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var oldMarkerData;
        if (StateCache.EditingMarkerId >= 0) {
            oldMarkerData = MarkerList.GetMarkerById(StateCache.EditingMarkerId);
        }

        if (oldMarkerData != null) {
            this.setState({
                inputTitleValue: oldMarkerData.title,
                layerId: oldMarkerData.layerId,
                icon: oldMarkerData.icon ?? "",
                iconSize: oldMarkerData.iconSize ?? LayerList.getLayerById(oldMarkerData.layerId).size,
                inputContentRaw: oldMarkerData.contentRaw ?? null,
                inputContentValue: oldMarkerData.content,
                editorState: EditorState.createWithContent(
                    oldMarkerData.inputContentRaw != null ?
                        convertFromRaw(JSON.parse(oldMarkerData.inputContentRaw))
                        : ContentState.createFromBlockArray(convertFromHTML(oldMarkerData.content))
                )
            });
        }
    }

    state = {
        editorState: EditorState.createEmpty(),
        editScreenOpen: false,
        inputTitleValue: "",
        layerId: 0,
        icon: "",
        iconSize:null,
        inputContentValue: "",
        inputContentRaw: null,
    };


    onEditorContentStateChange = (newEditorState) => {
        this.setState({
            editorState: newEditorState
        });
    }

    OnTitleChanged = (evt) => {
        this.setState({
            inputTitleValue: evt.target.value
        });
    }

    OnLayerChanged = (evt) => {
        this.setState({ layerId: evt.value });
    }

    OnIconSizeChanged = (evt) =>{
        this.setState({iconSize:evt.value});
    }

    OnIconChanged = (evt) => {
        this.setState({ icon: evt.target.value });
    }

    myBlockRendererFix = (contentBlock) => {
        
        const type = contentBlock.getType();
        // Convert image type to mediaComponent
        if (type === 'atomic') {
            return {
                component: MediaComponent,
                editable: false,
                props: {
                    foo: 'bar',
                },
            }
        }
    }

    render() {
        const layerOptions = LayerList.getOptionsList();
        const MarkerSizeOptions = MarkerSize.getOptionsList();

        return (
            <div className='marker-editor'>
                <h1>编辑兴趣点 {StateCache ? StateCache.EditingMarkerId : "null"}</h1>
                <input // 标题栏编辑
                    className="marker-editor-input"
                    defaultValue={this.state.inputTitleValue}
                    onChange={this.OnTitleChanged}
                />

                <h3>分类</h3>
                <ReactDropdown // 分类编辑器
                    options={layerOptions}
                    value={layerOptions.filter((item) => { return item.value == this.state.layerId })[0]}
                    onChange={this.OnLayerChanged}
                ></ReactDropdown>

                <h3>图标大小</h3>
                <ReactDropdown // 分类编辑器
                    options={MarkerSizeOptions}
                    value={this.state.iconSize}
                    onChange={this.OnIconSizeChanged}
                ></ReactDropdown>

                <h3>外部ICON</h3>
                <input
                    className='marker-editor-input'
                    onChange={this.OnIconChanged}
                    defaultValue={this.state.icon}
                />
                <ByteMDEditor
                    value={this.state.inputContentValue}
                    onChange={(v)=>{
                        this.setState({
                            inputContentValue:v
                        })
                    }}
                />
                {/* <ByteMDViewer 
                    value={this.state.inputContentValue}
                /> */}
                {/* <Editor
                    customBlockRenderFunc={this.myBlockRendererFix}
                    editorState={this.state.editorState}
                    handleKeyCommand={(command) => {
                        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
                
                        if (newState) {
                        this.onEditorContentStateChange(newState)
                          return "handled"
                        }
                
                        return "not-handled"
                      }}
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
                /> */}
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
                        onClick={(e) => {
                            this.props.onDelClick(StateCache.EditingMarkerId);
                            e.preventDefault();
                            // StateCache.EditingMarkerId = -1;
                        }}
                    >
                        Del
                    </button>
                    <button
                        className={"save"}
                        onClick={(e) => {
                            this.props.onSaveClick(StateCache.EditingMarkerId, {
                                "id": StateCache.EditingMarkerId,
                                "layerId": this.state.layerId,
                                "icon": this.state.icon,
                                "iconSize":this.state.iconSize,
                                "title": this.state.inputTitleValue,
                                "content": stateToHTML(this.state.editorState.getCurrentContent()),
                                "contentRaw": JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
                            });
                            // StateCache.EditingMarkerId = -1;
                            e.preventDefault();
                        }}
                    >
                        Save
                    </button>
                </div>
                <button
                    className="marker-editor-button-close"
                    onClick={(e) => {
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
