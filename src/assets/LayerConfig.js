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
    ]
});

export default LayerList;