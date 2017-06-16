import test from 'ava';
import {getAppBus} from '../../../src/orchestration/app'
import {getBus} from '../../../src/orchestration/bus'


test('getAppBus should return the list of buses used in the app', (t)=>{
    const appBus = getAppBus();
    const bus = getBus();

    t.deepEqual(Object.keys(bus), Object.keys(appBus));
});
