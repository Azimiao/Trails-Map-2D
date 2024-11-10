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
        }
    }
)

export default StateCache;