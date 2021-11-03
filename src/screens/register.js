import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../context/context";

function Register(){
    let history = useHistory();
    let {state , dispatch} = useContext(GlobalContext)

    return(
        <>
       <button onClick={()=>{
           history.push('/res-owner')
       }}>ResTaurant Owner Registration</button>
       <button onClick={()=>{
           history.push('/customr')
       }}>Customer Registration</button>
        </>
    )
}

export default Register;