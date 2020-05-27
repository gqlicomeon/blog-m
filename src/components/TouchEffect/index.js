import React, { useState, useEffect } from "react";

import "./index.scss";

function TouchEffect(){

    const [touchesArr,setTouchesArr] = useState([]);

    const touchesEle = touchesArr.map(val=>{
        let {timestamp,className,style} = val;
        return (<span key={timestamp} className={className} onClick={()=>{console.log("chufa")}} style={style}></span>)
    });

    const handler = (e)=>{
        let tagName = e.target.tagName.toLowerCase();
        let parentTagName = e.target.parentNode.tagName.toLowerCase();
        if(tagName === "a" || parentTagName === "a"){//防止点击穿透导致a链接无法点击
            return;
        }
        let timestamp = new Date().getTime();
        let {clientX,clientY} = e.touches[0];
        let randomColor = `color${Math.round(Math.random()*14+1)}`;
        let randomFont = `font${Math.round(Math.random()*9+1)}`;
        let animationName = `float_top_${Math.round(Math.random()*9+1)}`;
        let effectMap = ["fa-star-o","fa-snowflake-o","fa-sun-o","fa-smile-o","fa-paper-plane-o","fa-heart-o","fa-hand-peace-o","fa-gift","fa-sign-language","fa-thumbs-o-up"];
        let randomEffect = effectMap[Math.round(Math.random()*9)];
        setTimeout(()=>{
            setTouchesArr(state=>{
                let style = {
                     position:"fixed",
                     left:`${clientX}px`,
                     top:`${clientY}px`,
                     marginLeft:"-0.5em",
                     marginTop:"-0.5em",
                     transform:"translateZ(0)",
                     animation: `${animationName} ease-in-out 800ms both`
                }
                state.push({
                    timestamp,
                    style,
                    className:`fa ${randomEffect} ${randomColor} ${randomFont}`
                });
                return state.slice();
            })
        },400)
    }

   
    useEffect(()=>{
        document.body.addEventListener("touchstart",handler);
        const timer = setInterval(()=>{
            setTouchesArr(state=>{
                if(state.length > 10){
                    //超过10个清空元素
                    return [];
                }else{
                    return state;
                }
            });
        },8000)
        return ()=>{
            document.body.removeEventListener("touchstart",handler);
            clearInterval(timer);
        }
    },[])

    return (
        <div className="touch__list">
            {touchesEle}
        </div>
    )
}

export default TouchEffect;