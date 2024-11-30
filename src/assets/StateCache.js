import { observable, runInAction } from "mobx";

let StateCache = observable(
    {
        IsEditorMode: false,
        SetEditorMode(value) {
            runInAction(() => {
                this.IsEditorMode = value;
            })
        },
        IsEditing: false,
        SetIsEditing(value) {
            runInAction(() => {
                this.IsEditing = value;
            })
        },
        is3D: false,
        Set3DMode(value) {
            runInAction(() => {
                this.is3D = value;
            })
        },
        EditingMarkerId: -1,
        SetEditingMarkerId(value) {
            runInAction(() => {
                this.EditingMarkerId = value;
            })
        },
        ShowingLayer: [],
        SetLayerStatus(layerId, status) {
            let index = this.ShowingLayer.findIndex(layerId);
            if (status) {
                if (index >= 0) {
                    return;
                }
                runInAction(() => {
                    this.ShowingLayer.push(layerId);
                });
            } else {
                if (index >= 0) {
                    runInAction(() => {
                        this.ShowingLayer.splice(index, 1);
                    })
                }
            }
        },
        SetDefaultLayerValues(layers) {
            runInAction(() => {
                this.ShowingLayer = layers;
                console.log("setItem:" + layers);
            })
        },
        guideShowd: true,
        SetGuideLayerValues(state) {
            runInAction(() => {
                this.guideShowd = state;
            });
        },
        musicPlayerShowd:true,
        SetMusicStatus(status){
            runInAction(()=>{
                this.musicPlayerShowd = status;
            })
        }
    },


)

export default StateCache;