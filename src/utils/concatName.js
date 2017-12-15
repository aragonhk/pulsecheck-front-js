import { isEmpty } from 'lodash';

export default function concatName (firstname, middlename, lastname, lowercase) {
    let name ="";

    if ( !isEmpty(firstname))
        name = firstname;
    if ( !isEmpty(middlename))
        name = name + " " + middlename;
    if ( !isEmpty(lastname))
        name = name + " " + lastname;
    if(lowercase)
        return name.toLowerCase();
    else 
        return name;
}