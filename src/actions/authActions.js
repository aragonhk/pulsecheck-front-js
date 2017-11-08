import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
import { API_GET_TOKEN } from '../api/apiSource';
//const api ='/api/api';

export function loginAxios(data) {
  return dispatch => {
    return axios.post(API_GET_TOKEN, data).then( res => { 
        if (res.data.statuscode == '200'){
            const token = res.data.response["token"];
            localStorage.setItem('jwtToken',token);
            setAuthToken(token);
            dispatch(setCurrentUser(jwtDecode(token)));
        }
      });
  };
}

export function logout(){
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };  
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
/*
export function loginGetjson(){
  return dispatch => {
    let dataload = {
      email: "rgunari@gmail.com",
      password: "Test123"
    };

    $.getJSON({
      url: api,
      data: dataload,
      dataType: "json",
      type: "POST",
      callback: "test",
      //async: false,
      contentType: "application/json; charset=utf-8",
      //headers: { "Api-User-Agent": "Example/1.0" },
      success: function(data) {
        console.log("data available!");
        if (data) {
         console.log(data);
        } else 
        console.log("error getting data");
      }
    });


  };  
}

export function loginAjax(data) {
  return dispatch => {
    //console.log(data);
    let url = api;
    let method = 'POST';
    let params = 'email=rgunari@gmail.com&password=Test123';
    
    let xhr = createCORSRequest(method, url);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onload = function() {
      let responseText = xhr.responseText;
      console.log(responseText);
    };
    
    xhr.onerror = function() {
      // Error code goes here.
      
       console.log("error");
    };
    
    //xhr.withCredentials = true;
    xhr.send(params);
    


  };
}

let createCORSRequest = function(method, url) {
  let xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    /// Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
};

*/