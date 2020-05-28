import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import "./index.scss";

class ArticleList extends React.PureComponent{
    constructor(){
        super();
        this.everyPageNum = 5;
        this.state = {curPage:1};
        this.loadMore = this.loadMore.bind(this);
    }
    loadMore(){
        this.setState(state=>{
            return {
                curPage:state.curPage + 1
            }
        })
    }
    render() {
        const listEle = this.props.list.sort((a,b)=> b.timestamp - a.timestamp).reduce((prev,ele) => {
            let {title,desc,timestamp,coverImg,isTop} = ele;
            let html = (
                <li key={timestamp}>
                    <div className="cover__img"><Link to={`/detail?timestamp=${timestamp}`}><img src={coverImg} alt="封面图"/></Link></div>
                    <h1><Link to={`/detail?timestamp=${timestamp}`}>{title}</Link></h1>
                    <p><Link to={`/detail?timestamp=${timestamp}`}>{desc}</Link></p>
                </li>
            )
            if(isTop){
                prev.unshift(html);
            }else{
                prev.push(html);
            }
            return prev;
        },[]);
        const {curPage} = this.state;
        const pageNum =  Math.ceil(listEle.length/this.everyPageNum);

        return (
            <>
                <ul className="article__list">
                    {listEle.slice(0,curPage*this.everyPageNum)}
                </ul>
                <div className={listEle.length > 0 ? "more" : "more hide"}>
                    {curPage < pageNum ? <button onTouchEnd={this.loadMore}>加载更多</button> : "没有更多文章了"}
                </div>
            </>
        )
    }
}


ArticleList.propTypes = {
    list: PropTypes.array
}

export default ArticleList;