const MarkerSize = {
    "data":{
        "XXXL": [84, 84],
        "XXL": [56, 56],
        "XL": [40, 40],
        "L": [32, 32],
        "M": [32, 32],
        "S": [32, 32]
    },
    GetDefaultSize(){
        return "L";
    },
    GetSize(sizeStr){
        if(this.data.hasOwnProperty(sizeStr))
        {
            return this.data[sizeStr];
        }
        return this.data["S"];
    },
    getOptionsList(){
        let optionList = [];
        let dataKeys = Object.getOwnPropertyNames(this.data);
        for (let i = 0; i < dataKeys.length; i++) {
            const element = dataKeys[i];
            let a = {};
            a.value = element;
            a.label = element;
            optionList.push(a);
        }
        return optionList;
    }
}

export default MarkerSize;