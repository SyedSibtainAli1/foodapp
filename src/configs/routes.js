import React, { useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AddProduct from "../components/add-product";
import Customer from "../components/customr";
import Navbar from "../components/navbar";
import ResDash from "../components/res-dash";
import ResOwner from "../components/res-owner";
import { GlobalContext } from "../context/context";
import Dashboard from "../screens/dashboard";
import HomeCus from "../screens/home-cus";
import Login from "../screens/login";
import OrderPage from "../screens/order-page";
import ProductUser from "../screens/product-user";
import Register from "../screens/register";
import { auth ,onAuthStateChanged ,getDoc ,doc,db} from "./firebase";

function Routes(){
    let {state , dispatch} = useContext(GlobalContext)
   useEffect(function(){
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            let Ref1 = doc(db,'ResUsers',user.uid);
            let ResUser = await getDoc(Ref1);
            let Ref2 = doc(db,'CusUsers',user.uid);
            let CusUser = await getDoc(Ref2);
              dispatch({type : 'CURRENT_USER' , payload : user})
              dispatch({type : 'RES_USER' , payload : ResUser.data()})
              dispatch({type : 'CUS_USER' , payload : CusUser.data()})
              if(ResUser.data() == undefined){
                dispatch({type : 'AUTH_USER_DETAILS' , payload : CusUser.data()})
              }
              else if(CusUser.data() == undefined){
                dispatch({type : 'AUTH_USER_DETAILS' , payload : ResUser.data()})
              }
            
            //   console.log(ResUser.data(),CusUser.data())
        } else {
            console.log('USER NOT FOUUND')
            dispatch({type : 'AUTH_USER_DETAILS' , payload : undefined})
        }
      });
   },[])
      
    return(
        <>
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/res-owner'>
                    <ResOwner />
                </Route>
                <Route path='/customr'>
                    <Customer />
                </Route>
                <Route path='/dashboard'>
                    <Dashboard />
                </Route>
                <Route path='/add-product'>
                    <AddProduct />
                </Route>
                <Route path='/res-dash'>
                    <ResDash />
                </Route>
                <Route path='/home-cus'>
                    <HomeCus />
                </Route>
                <Route path='/product-user'>
                    <ProductUser />
                </Route>
                <Route path='/order-page'>
                    <OrderPage />
                </Route>
            </Switch>
        </Router>
        </>
    )
}

export default Routes;