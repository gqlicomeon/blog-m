import React,{useState, useEffect, useRef} from "react";
import { useLocation } from "react-router-dom";

import {TopLoading} from "@/components/Loading";

import {parseUrlQuery} from "@/util/common";

import ajax from "@/util/ajax";

import "highlight.js/styles/github.css";
import "./index.scss";


const marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code) {
      return require('highlight.js').highlightAuto(code).value;
    },
    headerIds:false,
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

function Detail(){
    const {search} = useLocation();
    const [isLoaded,setIsLoaded] = useState(true);
    const [content,setContent] = useState({});
    const contentRef = useRef(null);

    const {timestamp} = parseUrlQuery(search);
    const {cTime="",tags=[],text="",title=""} = content;


    const getArticleDetail = ()=>{
        ajax.post("/api/article/detail",{
            timestamp:+timestamp
        }).then(res=>{
            if(res.result === 1 && res.list.length !== 0){
                setContent(res.list[0])
            }
            console.log(res);
            setIsLoaded(false);
        })
    }

    useEffect(()=>{
        getArticleDetail();
    },[])

    useEffect(()=>{
        contentRef.current.innerHTML = marked(text);
    },[text])

    return (
        <>
            <TopLoading loading={isLoaded}/>
            <div className="detail">
                <div className="detail__title">
                    <h1>{title}</h1>
                    <p>{cTime ? `Publish on ${cTime}` : ""}</p>
                    <div className="detail__tags">
                        {
                            tags.map(val=><span key={val}>{val}</span>)
                        }
                    </div>
                </div>
                <div className="detail__content" ref={contentRef}></div>
            </div>
        </>
    )
}

export default Detail;