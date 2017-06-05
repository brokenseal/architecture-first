import {getBus} from './bus'


export const getApp = ()=>{
    return {
        comms: getAppBuses()
    }
};

export const getAppBuses = ()=> {
    return {
        presentation: getBus(['STATE_UPDATED']),
        networking: getBus(),
        data: getBus()
    }
};
