
export default function convertToCSV(fields, objArray) {
    //const fields = ["firstname","middlename","lastname","dateofbirth","type"];
    
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for ( let i=0 ; i < fields.length-1 ; i++ )
        str += fields[i] + ',';
    str += fields[fields.length-1] + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (array[i].hasOwnProperty(index)) {  // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety
                if (fields.includes(index))
                    line += array[i][index] + ",";
            }
        }
        str += line.replace(/,\s*$/, "") + '\r\n';
    }
    return str;
}


function convertToCSV2(objArray) {
    const fields = ["firstname","middlename","lastname","dateofbirth","type"];
    
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for ( let i=0 ; i < fields.length-1 ; i++ )
        str += fields[i] + ',';
    str += fields[fields.length-1] + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (array[i].hasOwnProperty(index)) {  // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety
                if (fields.includes(index)) {
                    line += array[i][index];
                    if (line != '') 
                        line += ',';
                }
            }
        }
        str += line.replace(/,\s*$/, "") + '\r\n';
    }
    return str;
}
