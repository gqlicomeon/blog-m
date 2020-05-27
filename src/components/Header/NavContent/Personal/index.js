import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./index.scss";

function Personal({iconUrl,quote="",isNavOpen}){
    const [text,setText] = useState("");
    useEffect(()=>{
        let timer = setInterval(()=>{
            setText(text=>{
                let textLen = text.length;
                let quoteLen = quote.length;
                if(quoteLen > textLen){
                    return quote.slice(0,textLen+1);
                }else{
                    clearInterval(timer);
                    return quote;
                }
            });
        },300)
        return ()=>{
            //清除副作用
            clearInterval(timer);
            setText("");
        }
      
    },[quote,isNavOpen])

    return (
        <div className="personal">
            <div className={isNavOpen ? "icon animated" : "icon"}>
                <img src={iconUrl || "/logo192.png"} alt="头像"/>
            </div>
            <p>{text}<span className="cursor"></span></p>
        </div>
    )
}


Personal.propTypes = {
    iconUrl: PropTypes.string,
    quote: PropTypes.string,
    isNavOpen:PropTypes.bool
}

export default Personal;