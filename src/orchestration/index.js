import {getBus} from './bus'


export const getAppBuses = ()=> {
    return {
        presentation: getBus(['STATE_UPDATED']),
        networking: getBus(),
        data: getBus()
    }
};
