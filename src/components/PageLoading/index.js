import React from "react";

import {DefaultLoading} from "../Loading";


class PageLoading extends React.Component{
    constructor(){
        super();
        this.state = {isLoaded:true};
    }
    componentDidMount(){
        window.addEventListener("load",()=>{
            this.setState({isLoaded:false});
        })
    }
    render(){
        return (
            <DefaultLoading loading={this.state.isLoaded}/>
        )
    }
}

export default PageLoading;