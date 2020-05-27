import React from "react";

import "./index.scss";

function NavFoot(){
    return (
        <div className="nav__foot">
             <div className="icon__box">
                 <a href="https://github.com/gqlicomeon"><i className="fa fa-github"></i></a>
                 <a href="/wechat.JPG" ><i className="fa fa-weixin"></i></a>
             </div>
             <p><a  href="http://www.beian.miit.gov.cn/">粤ICP备20018992号-1</a></p>
        </div>
    )
}

export default NavFoot;