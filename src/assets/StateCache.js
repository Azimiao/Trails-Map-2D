import { observable, runInAction } from "mobx";

let StateCache = observable(
    {
        IsEditorMode:false,
        SetIsEditingMode(value){
            runInAction(()=>{
                this.IsEditorMode = value;
            })
        },
        IsEditing:false,
        SetIsEditing(value){
            runInAction(()=>{
                this.IsEditing = value;
            })
        },
        EditingMarkerId:-1,
        SetEditingMarkerId(value){
            runInAction(()=>{
                this.EditingMarkerId = value;
            })
        }
    }
)

export default StateCache;