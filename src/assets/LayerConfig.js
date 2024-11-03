import { observable } from "mobx";

//fixed
let LayerList = observable({
    "data": [
        {
            "id": 0,
            "key": "country",
            "icon": "country.png",
            "size": "XXXL",
            "showTitle": true,
            "zIndexOffset":999999,
            "autoGroup": false,
        },
        {
            "id": 1,
            "key": "region",
            "icon": "",
            "size":"XXL",
            "showTitle": false,
            "zIndexOffset":55555,
            "autoGroup": false
        },
        {
            "id": 2,
            "key": "city",
            "icon": "city.png",
            "size": "XL",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": false
        },
        {
            "id": 3,
            "key": "gate",
            "icon": "gate.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 4,
            "key": "road",
            "icon": "cave.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 5,
            "key": "mountain",
            "icon": "mountain.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 6,
            "key": "river",
            "icon": "river-2.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 7,
            "key": "nature",
            "icon": "nature.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 8,
            "key": "special",
            "icon": "cave.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 1000,
            "key":"village",
            "icon": "village.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 2000,
            "key":"airport",
            "icon": "airport.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 3000,
            "key":"cave",
            "icon": "cave.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        },
        {
            "id": 4000,
            "key":"port",
            "icon": "port.png",
            "size": "L",
            "showTitle": false,
            "zIndexOffset":0,
            "autoGroup": true
        }
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