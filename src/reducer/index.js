/**
 * redux reducer模块
 */
import {actionTypes as types} from "@/constant";

//导航栏状态
function changeNavStatus(state = false,action){
    switch(action.type){
        case types.NAV_OPEN:
            return true;
        case types.NAV_CLOSE:
            return false;
        case types.NAV_TOGGLE:
            return !state;
        default:
            return state;        
    }
}

export {changeNavStatus};

