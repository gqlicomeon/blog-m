
import React, { useState, useMemo, useEffect } from "react";

import {TopLoading} from "@/components/Loading";
import {Link} from "react-router-dom";

import ajax from "@/util/ajax";


import "./index.scss";

export default function Tags(){
    const [tagList,setTagList] = useState([]);
    const eleList = useMemo(()=>{
        return tagList.map(val=>{
            let randomColor = Math.round(Math.random()*14+1);
            let randomFont = Math.round(Math.random()*9+1);
            return (
                <li key={val} className={`color${randomColor} font${randomFont}`}><Link to={`/tagsContent?tag=${val}`}>{val}</Link></li>
            )
        })
    },[tagList])

    const [loaded,setLoaded] = useState(false);

    const getTagList = ()=>{
        ajax.post("/api/tags/list").then(res=>{
            if(res.result === 1){
                setTagList(res.list);
            }
            setLoaded(true);
        })
    }

    useEffect(()=>{
        getTagList();
    },[])

    return (
        <>
            <TopLoading loading={!loaded}/>
            <div className="tag__box">
                <ul>
                    {eleList}
                </ul>
            </div>
        </>
    )
}