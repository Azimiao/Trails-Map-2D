class Queue {
    dataStore = [];
    count = () => {
        return this.dataStore.length;
    }
    enqueue = (element)=> {
        this.dataStore.push(element)
    }
    dequeue = () => {
        this.dataStore.shift()
    }
    front = () => {
        return this.dataStore[0];
    }
    back = () => {
        return this.dataStore[this.dataStore.length - 1];
    }

    toSinglelineString = ()=>{
        var str = "",
        i = 0,
        l = this.dataStore.length;
        for (; i < l; i++) {
            str += this.dataStore[i];
        }
        return str;
    }

    toString = () => {
        var str = '',
            i = 0,
            l = this.dataStore.length;
        for (; i < l; i++) {
            str += this.dataStore[i] + "\n";
        }
        return str;
    }
    empty = () =>{
        return this.dataStore.length === 0;
    }
}



export default Queue;