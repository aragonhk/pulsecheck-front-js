import Validator from 'validator';

export default function validateInput(data){
    let errors = {};
    let isValid = true;

    if(Validator.isEmpty(data.email)){ //check isEmail as well. 
        errors.email = 'Email is required';
        isValid = false;
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password is required';
        isValid = false;
    }

    return {
        errors, isValid 
    };
}