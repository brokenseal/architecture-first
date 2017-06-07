import {getBus} from './bus'


export const getApp = ()=>{
    return {
        buses: getAppBuses()
    }
};

export const getAppBuses = ()=> {
    return {
        presentation: getBus(['STATE_UPDATED', 'USER_CLICKED']),
        networking: getBus(),
        data: getBus()
    }
};
