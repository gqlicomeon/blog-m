import React from "react";
import PropTypes from "prop-types";

import "./index.scss";
function PageBg({url}){
    let bgStyle = {
        "backgroundImage":`url(${url || "/bg.JPG"})`
    }
    return <div className="page__bg" style={bgStyle}></div>
}

PageBg.propTypes = {
    url:PropTypes.string
}

export default PageBg;