import React from "react";
import {Link, useLocation} from "react-router-dom"; 

import "./index.scss";

function HandUp(){
    let {pathname} = useLocation();
    return (
        <div className={pathname === "/" ? "hand__up" : "hand__up hide"}>
            <div className="hand"><i className="fa fa-hand-o-down"></i></div>
            <p><Link to="/articles">了解更多</Link></p>
        </div>
    )
}

export default HandUp;