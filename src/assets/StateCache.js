import { observable, runInAction } from "mobx";

let StateCache = observable(
    {
        IsEditingMode:true,
        SetIsEditingMode(value){
            runInAction(()=>{
                this.IsEditingMode = value;
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