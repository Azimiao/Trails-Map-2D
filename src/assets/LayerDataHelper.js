import I18nHelper from "@/utils/I18nHelper";
import { observable, runInAction } from "mobx";

//fixed
let LayerDataHelper = observable({
    "data": [
        {
            "id": 0,
            "key": "country",
            "icon": "unknown.png",
            "size": "XXXL",
            "showTitle": true,
            "zIndexOffset":999999,
            "autoGroup": false,
            "show": true,
        },
        {
            "id": 1,
            "key": "region",
            "icon": "",
            "size":"XXL",
            "showTitle": false,
            "zIndexOffset":55555,
            "autoGroup": false,
            "show": true
        },
        {
            "id": 2,
            "key": "city",
            "icon": "city.png",
            "size": "XL",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": false,
            "show": true
        },
        {
            "id": 1000,
            "key":"village",
            "icon": "village.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 7,
            "key": "nature",
            "icon": "nature.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 5,
            "key": "mountain",
            "icon": "mountain.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 6,
            "key": "river",
            "icon": "river.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 4,
            "key": "road",
            "icon": "cave.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 3,
            "key": "gate",
            "icon": "gate.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },

        {
            "id": 2000,
            "key":"airport",
            "icon": "airport.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 3000,
            "key":"cave",
            "icon": "cave.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 4000,
            "key":"port",
            "icon": "port.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 5000,
            "key":"bridge",
            "icon": "bridge.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },           
        {
            "id": 8000,
            "key":"school",
            "icon": "school.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },          
        {
            "id": 8500,
            "key":"tower",
            "icon": "tower.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        },
        {
            "id": 8,
            "key": "special",
            "icon": "special.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true,
            "show": true
        }
    ],

    setShowStatus(id,status){
        let index = this.data.findIndex(item=>item.id == id);
        runInAction(()=>{
            if(index >=0){
                this.data[index].show = status;
            }
        });
    },

    getAllLayerId(){
        return this.data.map(item=>item.id);
    },
    getAllLayerKey() {
        return this.data.map(item=>item.key);
    },
    getLayerById(id) {
        for (const key in this.data) {
            if (Object.hasOwnProperty.call(this.data, key)) {
                const element = this.data[key];
                if (element.id == id) {
                    return element;
                }
            }
        }
        return null;
    },
    getLayerByKey(key){
        for (let i = 0; i < this.data.length; i++) {
            const element = this.data[i];
            if(element.key == key){
                return element;
            }
        }
        return null;
    },
    getOptionsList(){
        let optionList = [];
        for (let i = 0; i < this.data.length; i++) {
            const element = this.data[i];
            let a = {};
            a.value = element.id;
            a.label = I18nHelper.GetTranslateString(element.key);
            optionList.push(a);
        }
        return optionList;
    }
});

export default LayerDataHelper;