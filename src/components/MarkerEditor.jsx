import React, { useEffect } from 'react'
import { Editor as ByteMDEditor,Viewer as ByteMDViewer } from '@bytemd/react';
import 'bytemd/dist/index.css';
import StateCache from '../assets/StateCache';
import MarkerDataHelper from '../assets/MarkerDataHelper';
import { Component } from 'react';
import { observer } from 'mobx-react';
import ReactDropdown from 'react-dropdown';
import "react-dropdown/style.css";
import LayerDataHelper from '@/assets/LayerDataHelper';
import MarkerSize from '@/assets/MarkerSizeConfig';
const prefix = 'leaflet-popup-button';





const MarkerEditor = observer(class MarkerEditorC extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var oldMarkerData;
        if (StateCache.EditingMarkerId >= 0) {
            oldMarkerData = MarkerDataHelper.GetMarkerById(StateCache.EditingMarkerId);
        }

        if (oldMarkerData != null) {
            this.setState({
                inputTitleValue: oldMarkerData.title,
                layerId: oldMarkerData.layerId,
                icon: oldMarkerData.icon ?? "",
                iconSize: oldMarkerData.iconSize ?? LayerDataHelper.getLayerById(oldMarkerData.layerId).size,
                inputUrlTitle: oldMarkerData.url?.title ?? "",
                inputUrlValue : oldMarkerData.url?.value ??  "",
                inputContentValue: oldMarkerData.content
            });
        }
    }

    state = {
        editScreenOpen: false,
        inputTitleValue: "",
        layerId: 0,
        icon: "",
        iconSize:null,
        inputUrlTitle:"", 
        inputUrlValue:"",
        inputContentValue: ""
    };


    OnTitleChanged = (evt) => {
        this.setState({
            inputTitleValue: evt.target.value
        });
    }

    OnInputUrlTitleChanged = (evt)=>{
        this.setState({
            inputUrlTitle:evt.target.value
        });
    }

    OnInputUrlValueChanged = (evt)=>{
        this.setState({
            inputUrlValue : evt.target.value
        });
    }

    OnLayerChanged = (evt) => {
        this.setState({ layerId: evt.value });
    }

    OnIconSizeChanged = (evt) =>{
        this.setState({iconSize:evt.value});
    }

    OnIconChanged = (evt) => {
        console.log(evt.target.value);
        this.setState({ icon: evt.target.value });
    }

    render() {
        const layerOptions = LayerDataHelper.getOptionsList();
        const MarkerSizeOptions = MarkerSize.getOptionsList();

        return (
            <div className='marker-editor'>
                <h1>编辑兴趣点 {StateCache ? StateCache.EditingMarkerId : "null"}</h1>
                <h3>标题</h3>
                <input // 标题栏编辑
                    className="marker-editor-input"
                    value={this.state.inputTitleValue}
                    onChange={this.OnTitleChanged}
                />
                <h3>外部链接配置</h3>
                <details>
                    <summary>外部链接</summary>
                    <h5>文本</h5>
                    <input
                        className='marker-editor-input'
                        onChange={this.OnInputUrlTitleChanged}
                        value={this.state.inputUrlTitle}
                    />
                    <h5>链接</h5>
                    <input
                        className='marker-editor-input'
                        onChange={this.OnInputUrlValueChanged}
                        value={this.state.inputUrlValue}
                    />
                </details>
                <div className={"dropdown-container"}> 
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
                </div>
                <h3>外部ICON</h3>
                <input
                    className='marker-editor-input'
                    onChange={this.OnIconChanged}
                    value={this.state.icon}
                />
                <p></p>
                <ByteMDEditor
                    value={this.state.inputContentValue}
                    onChange={(v)=>{
                        this.setState({
                            inputContentValue:v
                        })
                    }}
                />
                
                <div
                    className="marker-editor-buttons"
                >
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
                                "content": this.state.inputContentValue,
                                "url":{
                                    "title": this.state.inputUrlTitle,
                                    "value": this.state.inputUrlValue
                                }
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
