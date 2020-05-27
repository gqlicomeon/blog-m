import React from "react";
import { useLocation,Link } from "react-router-dom";

import {parseUrlQuery} from "@/util/common";

import "./index.scss";


function RouterContent({children}){
    let {pathname,search} = useLocation();
    let titleMap = {
        "articles":"随记",
        "tags":"标签",
        "archives":"归档",
        "detail":"文章内容",
        "about":"关于我"
    }
    if(pathname === "/tagsContent"){
        let {tag} = parseUrlQuery(search);
        titleMap.tagsContent = tag || "The Tag";
    }
    return (
        <main className={pathname !== "/" ? "active" : ""}>
            <div className="top__nav">
                <Link to="/"><i className="fa fa-home"></i></Link>
                <h2>{titleMap[pathname.slice(1)]}</h2>
            </div>
            {children}
        </main>
    )
}

export default RouterContent;