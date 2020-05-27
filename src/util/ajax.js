/**
 * ajax请求通用方法
 */
import {getTypeOf,transformJsonToQuery} from "./common";

function ajax(...args){
    return new Promise((resolve,reject)=>{
        let url,//请求url
            method,//请求方法
            data,//请求数据
            dataType,//响应数据类型
            timeout;//请求超时时间
        if(getTypeOf(args[0]) === "string"){
            url = args[0];
            method = "GET";
            data = getTypeOf(args[1]) === "object" ? args[1] : {};
            dataType = "json";
            timeout = 30000;
        }else if(getTypeOf(args[0]) === "object"){
            url = args[0].url;
            method = args[0].method.toUpperCase() || "GET";
            data = args[0].data;
            dataType = args[0].dataType || "json";
            timeout = args[0].timeout || 30000; 
        }
        let xhr = new XMLHttpRequest();
        if(method === "GET"){
            let query = transformJsonToQuery(data);
            if(query){
                url = url.indexOf("?") !== -1 ? `${url}&${query}` : `${url}?${query}`;
            }
        }
        xhr.open(method,url);
        //设置超时
        xhr.timeout = timeout;
        //设置响应类型
        xhr.responseType = dataType;

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    resolve(xhr.response);
                }else{
                    reject({status:xhr.status,msg:xhr.statusText})
                }
            }
        }
        xhr.ontimeout = function(){
            reject("request timeout")
        }

        if(method === "GET"){
            xhr.send(null);
        }else{
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }

    }) 
}

["get","post"].forEach(val=>{
    ajax[val] = function(url,data = {}){
        return new Promise((resolve,reject)=>{
            if(getTypeOf(url) !== "string"){
                reject("url must be String");
                return;
            }
            let pData;
            if(val === "get"){
                let params = data.params || {};
                if(getTypeOf(params) === "string"){//如果是key1=value1&key2=value2这种类型就直接拼接
                    url = url.indexOf("?") !== -1 ? `${url}&${params}` : `${url}?${params}`;
                    pData = {};
                }else if(getTypeOf(params) === "object"){
                    pData = params;
                }
            }else{
                pData = data;
            }
            ajax({
                url,
                method:val,
                data:pData
            }).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        })
    }
})

export default ajax;