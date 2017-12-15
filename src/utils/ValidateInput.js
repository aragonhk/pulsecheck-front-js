import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
    let isValid = true;

   // console.log("dob: "+ data.inputSelectedDOB);

    if ( Validator.isEmpty(data.inputFirstName) ) {
        isValid = false;
        errors.inputFirstName = 'This field is required';
    }

    if ( Validator.isEmpty(data.inputLastName) ) {
        isValid = false;
        errors.inputLastName = 'This field is required';
    }

    if ( data.inputSelectedDOB === "" ) {
        isValid = false;
        errors.dobMessage = 'This field is required';
    }


   //    !Moment(data.inputSelectedDOB).isValid() 

    
    return {
        errors,
        isValid
    };
}
