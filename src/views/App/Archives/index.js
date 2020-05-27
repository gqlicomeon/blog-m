import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";

import {TopLoading} from "@/components/Loading";

import Ajax from "@/util/ajax";

import "./index.scss";

export default function Archives(){
    const [listMap,setListMap] = useState({});
    const [total,setTotal] = useState(0);
    const [isLoaded,setIsLoaded] = useState(true);

    const getArticleList = ()=>{
        Ajax.post("/api/article/list").then(res=>{
            if(res.result === 1){
                setTotal(res.list.length);
                let obj = res.list.reduce((acc,cur) => {
                    let {timestamp,title} = cur;
                    let time = new Date(timestamp);
                    let year = String(time.getFullYear());
                    let month = String(time.getMonth() + 1).padStart(2,0);
                    let date = String(time.getDate()).padStart(2,0);
                    if(acc[year]){
                        acc[year].push({timestamp,title,date:`${month}-${date}`});
                    }else{
                        acc[year] = [{timestamp,title,date:`${month}-${date}`}];
                    }
                    return acc;
                },{});
                setListMap(obj);
            }
            setIsLoaded(false);
        })
    }

    useEffect(()=>{
        getArticleList();
    },[])


   const archivesList = Object.keys(listMap).map(year=>{
        let list  = listMap[year];
        let listEle = list.sort((a,b)=> b.timestamp - a.timestamp).map(val=>{
            let {timestamp,title,date} = val;
            return (
                <li key={timestamp}>
                    <span><Link to={`/detail?timestamp=${timestamp}`}>{date}</Link></span>
                    <p><Link to={`/detail?timestamp=${timestamp}`}>{title}</Link></p>
                </li>
            )
        });
        return (
                <div className="archives__box" key={year}>
                    <h2>{year}</h2>
                    <ul>
                        {listEle}
                    </ul>
                </div>
        )
   })

    return (
        <>
            <TopLoading loading={isLoaded}/>
            <div className="archives__list">
                <h1>归档：{total}篇</h1>
                {archivesList}
            </div>
        </>
    )
}