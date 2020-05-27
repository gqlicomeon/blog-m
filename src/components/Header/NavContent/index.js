import React, { useState } from "react";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

import NavList from "./NavList";
import Personal from "./Personal";
import NavFoot from "./NavFoot";

import "./index.scss";

function NavContent({photo,introduce,quote}){
    const [isNavOpen,setNavOpen] = useState(false);
    let {pathname} = useLocation();
    return (
        <>      
            <h1 className={pathname === "/" ? "nav__title" : "nav__title hide"}><span className={isNavOpen ? "" : "white"}>{introduce}</span></h1>
            <button className={pathname === "/" ? "nav__bar" : "nav__bar hide"} onTouchEnd={()=>setNavOpen(state=>!state)}>
                <i className={isNavOpen ? "fa fa-close" : "fa fa-bars"}></i>
            </button>
            <div className={isNavOpen ? "nav__content down" : "nav__content"}>
               <NavList setNavOpen={setNavOpen}/>
               <Personal iconUrl={photo[0]} quote={quote} isNavOpen={isNavOpen}/>
               <NavFoot />
            </div>
        </>
    )
}

NavContent.propTypes = {
    photo:PropTypes.array,
    introduce:PropTypes.string,
    quote:PropTypes.string
}

export default NavContent;