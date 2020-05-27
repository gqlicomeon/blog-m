import React, { useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

import "./index.scss";

class NavList extends React.PureComponent{
    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }
    handler(e){
        let href = e.target.getAttribute("href");
        if(href){
            setTimeout(()=>{
                this.props.setNavOpen(false);
            },300);
        }
    }
    render(){
        return (
            <nav>
                <ul onClick={this.handler}>
                    <li><Link to="/articles">随记</Link></li>
                    <li><Link to="/tags">标签</Link></li>
                    <li><Link to="/archives">归档</Link></li>
                    <li><Link to="/about">关于</Link></li>
                </ul>
            </nav>
        )
    }
}

NavList.propTypes = {
    setNavOpen:PropTypes.func
}

export default NavList;