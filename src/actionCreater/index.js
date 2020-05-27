/**
 * redux actionCreater模块
 */

import {actionTypes as types} from "@/constant"


//同步action
export function openNav(){
    return {
        type:types.NAV_OPEN
    }
}

export function closeNav(){
    return {
        type:types.NAV_CLOSE
    }
}

export function toggleNav(){
    return {
        type:types.NAV_TOGGLE
    }
}