import { observable } from "mobx";

//fixed
let LayerList = observable({
    "data": [
        {
            "id": 0,
            "key": "country",
            "icon": "",
            "size": [
                32,
                45
            ],
            "showTitle": true
        },
        {
            "id": 1,
            "key": "region",
            "size": [
                32,
                45
            ],
            "showTitle": true
        },
        {
            "id": 2,
            "key": "town",
            "size": [
                32,
                45
            ],
            "showTitle": false
        },
        {
            "id": 3,
            "key": "gate",
            "size": [
                32,
                45
            ],
            "showTitle": false
        },
        {
            "id": 4,
            "key": "road",
            "size": [
                32,
                45
            ],
            "showTitle": false
        },
        {
            "id": 5,
            "key": "mountain",
            "size": [
                32,
                45
            ],
            "showTitle": false
        },
        {
            "id": 6,
            "key": "river",
            "size": [
                32,
                45
            ],
            "showTitle": false
        },
        {
            "id": 7,
            "key": "special",
            "size": [
                32,
                45
            ],
            "showTitle": false
        },
    ],
    getAllLayerKey() {
        let allLayerKey = [];
        this.data.forEach(element => {
            allLayerKey.push(element.key);
        });
        return allLayerKey;
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
            a.label = element.key;
            optionList.push(a);
        }
        return optionList;
    }
});

export default LayerList;