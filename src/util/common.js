/**
 * 通用方法函数
 */


function getTypeOf(variable){
    return Object.prototype.toString.call(variable).match(/\[object\s+(\w+)\]/)[1].toLowerCase();
 }

 
function extend(target,source,deep){
    for(let key in source){
        let sourceType = getTypeOf(source[key]);
        let targetType = getTypeOf(target[key]);
        if(deep && (sourceType === "object" || sourceType === "array")){
            if(targetType !== sourceType){
                target[key] = sourceType === "array" ? [] : {}; 
            }
            extend(target[key],source[key],deep);
        }else{
            target[key] = source[key];
        }
    }
    return target;
}

function extendAll(target,...args){
    let deep = true;
    if(getTypeOf(args[args.length - 1]) === "boolean"){
        deep = args.pop();
    }
    args.forEach(item=>{
        extend(target,item,deep);
    })
    return target;
}


function transformJsonToQuery(data){
    if(getTypeOf(data) !== "object"){
        return "";
    }
    let queryArr = [];
    for(let key of Object.keys(data)){
        queryArr.push(`${key}=${data[key]}`);
    }
    return queryArr.join("&");
}

//函数防抖
function deBounce(fn,delay = 300){
    let timer = null;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.apply(this,args);
            timer = null;
        },delay)
    }
}

function throttle(fn,delay=300){
    let prev = new Date().getTime();
    let timer = null;
    return function(...args){
        let now = new Date().getTime();
        clearTimeout(timer);
        if(now - prev >= delay){
            fn.apply(this,args);
            prev = now;
        }else{
            setTimeout(()=>{
                fn.apply(this,args);
            },delay)
        }
    }
}

//解析url
function parseUrlQuery(url,isEncode=true){
    if(getTypeOf(url) !== "string"){
        throw new Error("url必须为字符串");
    }
    if(isEncode){
        url = decodeURI(url);
    }
    let index = url.indexOf("?");
    if(index !== -1){
        url = url.substr(index+1);
    }
    if(url.indexOf("&") !== -1){
        let arr = url.split("&");
        return arr.reduce((acc,cur)=>{
            if(cur.indexOf("=") !== -1){
                let [key,val] = cur.split("=");
                acc[key] = val;
            }
            return acc;
        },{})
    }else{
        if(url.indexOf("=") !== -1){
            let [key,val] = url.split("=");
            return {
                [key]:val
            }
        }else{
            return {};
        }
    }
}

export {
        getTypeOf,
        extend,
        extendAll,
        transformJsonToQuery,
        deBounce,
        throttle,
        parseUrlQuery
    };

