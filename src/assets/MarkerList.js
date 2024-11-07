import { observable, runInAction } from "mobx";
import markerListData from "./MarkerList.json";
let MarkerList = observable(
    {
        "data":markerListData,
        GetDataListByLayer(layerId) {
            let item = this.data.filter(data => (data.layerId === layerId && data != null));
            if (item == null || item.length <= 0) {
                return null;
            }
            return item;
        },

        GetMarkerById(markerId) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].id == markerId) {
                    return this.data[i];
                }
            }
            return null;
        },
        async RemoveMarker(markerId) {
            let result = false;
            await runInAction(() => {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].id == markerId) {
                        this.data.splice(i, 1);
                        result = true;
                        break;
                    }
                }
            });
            return result;
        },
        async AddMarker(layerId, positionLat, positionLng) {
            let lastId = this.data[this.data.length - 1].id + 1;
            await runInAction(() => {
                this.data.push({
                    "id": lastId,
                    "layerId": layerId,
                    "position": [
                        positionLat,
                        positionLng
                    ],
                    "icon": "",
                    "title": "请输入标记点标题",
                    "content": `<ol>
                    <li>这是一个新创建的标记点，请编辑标记点并点击保存</li>
                    <li>若想删除标记点，请点击左下角红色删除按钮</li>
                    <li>更多内容请参考:<a href="https://www.azimiao.com" target="_blank">梓喵出没博客</a></li>
                    </ol>`,
                })
            });
            return lastId;
        },
        async UpdateMarker(markerId, newLayerObj) {
            let result = false;
            await runInAction(() => {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].id == markerId) {
                        this.data[i].layerId = newLayerObj.layerId;
                        this.data[i].position = newLayerObj.position ?? this.data[i].position;
                        this.data[i].icon = newLayerObj.icon;
                        this.data[i].title = newLayerObj.title;
                        this.data[i].content = newLayerObj.content;
                        this.data[i].contentRaw = newLayerObj.contentRaw ?? null;
                        this.data[i].iconSize = newLayerObj.iconSize ?? null;
                        result = true;
                        break;
                    }
                }
            });
            return result;
        }
    });

export default MarkerList;