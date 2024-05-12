import { observable, runInAction } from "mobx";

let MarkerList = observable(
    {
        "data": [
            {
                "id": 0,
                "layerId": 0,
                "position": [
                    -64,
                    32
                ],
                "icon": "cave.png",
                "title": "帝国国家",
                "content": "<p>帝国帝国帝国帝国帝国帝国帝国帝国帝国帝国帝国帝国</p>",
            },
            {
                "id": 1,
                "layerId": 0,
                "position": [
                    -64,
                    64
                ],
                "icon": "airport.png",
                "title": "帝国",
                "content": "<p>一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家一个一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏小国家捏一个小国家捏一个小国家捏一个小国家捏捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏</p><p>一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家一个一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏小国家捏一个小国家捏一个小国家捏一个小国家捏捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏一个小国家捏</p>",
            },
            {
                "id": 2,
                "layerId": 0,
                "position": [
                    -60,
                    100
                ],
                "icon": "gate.png",
                "title": "共和国",
                "content": "<p>洛连特啊啊啊</p>",
            },
            {
                "id": 3,
                "layerId": 0,
                "position": [
                    -51.355,
                    54.953125
                ],
                "icon": "mountain.png",
                "title": "谢达尔大丘陵",
                "content": "<p>谢达尔大丘陵</p>",
            },
            {
                "id": 4,
                "layerId": 0,
                "position": [
                    -66.58625954371301,
                    75.35474159408102
                ],
                "icon": "village.png",
                "title": "龙来",
                "content": "<p>龙来</p>",
            },
            {
                "id": 5,
                "layerId": 0,
                "position": [
                    -68.0546875,
                    75.1796875
                ],
                "icon": "nature.png",
                "title": "龙来瀑布",
                "content": "<p>龙来瀑布</p>",
            }
        ],
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
                    "icon": "nature.png",
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
                        this.data[i].position = newLayerObj.position;
                        this.data[i].icon = newLayerObj.icon;
                        this.data[i].title = newLayerObj.title;
                        this.data[i].content = newLayerObj.content;
                        result = true;
                        break;
                    }
                }
            });
            return result;
        }
    });

export default MarkerList;