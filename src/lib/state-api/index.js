class dataAPI {
    constructor(rawData){
        this.rawData = rawData;
    }

    mapIntoObjects(arr){
        return arr.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        },{} );
    }
    getEmployees(){
        this.mapIntoObjects(this.rawData.oig);
    }
}

export default dataAPI;