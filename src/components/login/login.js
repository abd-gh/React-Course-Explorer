import React, { useEffect, useState } from "react";
import jwr_decode from 'jwt-decode';
import './login.css';

const Login=(props)=>{
    const google = window.google;


    function callbackResponseHandler(response){
        console.log("Encoded JWT ID token: "+response.credential);
        var userObject=jwr_decode(response.credential);
       console.log(userObject.name);
        
  
        props.onSaveList(userObject);
    }

    useEffect(()=>{
        //global google using google script
        google.accounts.id.initialize({
            client_id:"513598679368-os3fhgtjp2sg0t4j9eg9252fjgrnv2rm.apps.googleusercontent.com",
            callback:callbackResponseHandler    
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme:"outline",size:"large"}
        );
    },[]);
    return(
        <div className="login-box" id="signInDiv">

        </div>
    );
}

export default Login;