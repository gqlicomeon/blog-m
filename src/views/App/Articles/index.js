import React, { useEffect, useState } from "react";

import Ajax from "@/util/ajax";

import ArticleList from "./ArticleList";
import {TopLoading} from "@/components/Loading";
function Articles(){

    const [articleList,setArticleList] = useState([])
    const [isLoaded,setIsLoaded] = useState(true);
    const getArticleList = ()=>{
        Ajax.post("/api/article/list").then(res=>{
            if(res.result === 1){
                setArticleList(res.list);
            }
            setIsLoaded(false);
        })
    }
    useEffect(()=>{
        getArticleList();
    },[])
    return (
        <>
            <TopLoading loading={isLoaded}/>
            <div className="articles">
                <ArticleList list={articleList}/>
            </div>
        </>
 
    )
}


export default Articles;