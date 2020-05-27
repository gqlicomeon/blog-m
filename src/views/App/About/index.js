import React from "react";

import "./index.scss";

function About(){
    return (
        <div className="about">
            <div className="about__box">
                <h1>哈喽~终于等到你了</h1>
                <div className="sec">
                    <h1>关于我</h1>
                    <p>我是一个怀揣着梦想的少年，爱好游戏、音乐、吉他</p>
                    <p><i className="fa fa-location-arrow" aria-hidden="true"></i>广东广州</p>
                    <p><a href="/wechat.JPG" ><i className="fa fa-weixin"></i>戳此加我微信~</a></p>
                </div>
                <div className="sec">
                    <h1>关于个人站</h1>
                    <p>一个用于记录学习和工作点滴的空间</p>
                    <p>前端react+后端NodeJs</p>
                </div>
            </div>
          
            
        </div>
    )
}

export default About;