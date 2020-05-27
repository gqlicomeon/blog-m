import React, { useState, useEffect  } from "react";

import ajax from "@/util/ajax";

import PageBg from "./PageBg";
import NavContent from "./NavContent";
import HandUp from "./HandUp";
import {TopLoading} from "@/components/Loading";

import "./index.scss";



function Header(){

    let [response,setResponse] = useState({
        isRequest:true,
        banner: [],
        introduce: "",
        photo: [],
        quote: ""
    });
    
    const getPersonal = ()=>{
        ajax.post("/api/personal/find").then(res=>{
            if(res.result === 1){
                let {list:[{_id,findKey,...obj}]} = res;
                setResponse({isRequest:false,...obj});
            }else{
                setResponse(state=>Object.assign({},state,{isRequest:false}));
            }
        })
    }

    useEffect(()=>{
        getPersonal();
    },[])

    let {
        isRequest,
        banner,
        introduce,
        photo,
        quote
    } = response;

    return (
        <header>

            <TopLoading loading={isRequest}/>
            <PageBg url={banner[1]}/>
            <NavContent photo={photo} introduce={introduce} quote={quote}/>
            <HandUp />

        </header>
    )
}


export default Header;