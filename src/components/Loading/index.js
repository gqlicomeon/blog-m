import React from "react";
import PropTypes from "prop-types";


import "./index.scss";
//Dom加载条
function DefaultLoading({loading}){

    return (
        <div className={loading ? "loading__default loading"  : "loading__default"}>
            <div className="loading__default__inner"></div>
        </div>
    )
}
DefaultLoading.propTypes = {
    loading:PropTypes.bool
}

//请求加载条
function TopLoading({loading}){
    return (
        <div className={loading ? "loading__top loading" : "loading__top"}></div>
    )
}
TopLoading.propTypes = {
    loading:PropTypes.bool
}


export {DefaultLoading,TopLoading};