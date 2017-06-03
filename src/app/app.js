import {getAppBuses} from '../orchestration/index'


export const getApp = ()=>{
    return {
        comms: getAppBuses()
    }
};
