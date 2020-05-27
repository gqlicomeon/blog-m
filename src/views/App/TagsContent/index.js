import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ArticleList from "../Articles/ArticleList";

import {parseUrlQuery} from "@/util/common";
import ajax from "@/util/ajax";


function TagsContent(){
    const {search} = useLocation();
    const [list,setList] = useState([]);

    const {tag} = parseUrlQuery(search);
    const getListByTag = ()=>{
        ajax.post("/api/article/tag",{
            tag
        }).then(res=>{
           if(res.result === 1 && res.list.lenght !== 0){
               setList(res.list);
           }
        })
    }
    useEffect(()=>{
        getListByTag();
    },[])
    return (
        <div className="tagsContent">
            <ArticleList list={list}/>
        </div>
    )
}

export default TagsContent;