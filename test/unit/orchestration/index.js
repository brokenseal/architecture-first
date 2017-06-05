import test from 'ava';
import {getAppBuses} from '../../../src/orchestration/app'
import {getBus} from '../../../src/orchestration/bus'


test('getAppBuses should return the list of buses used in the app', (t)=>{
    const buses = getAppBuses();
    const bus = getBus();

    t.true('presentation' in buses);
    t.true('networking' in buses);
    t.true('data' in buses);

    t.deepEqual(Object.keys(bus), Object.keys(buses.presentation));
});
