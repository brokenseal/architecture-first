import test from 'ava';
import {getApp} from '../../../src/app/app'
import {getAppBuses} from '../../../src/orchestration/index'


test('getApp should return an instance of our app with communication buses', (t)=>{
    const app = getApp();
    const buses = getAppBuses();

    t.true('comms' in app);
    t.deepEqual(Object.keys(app.comms.presentation), Object.keys(buses.presentation));
    t.deepEqual(Object.keys(app.comms.data), Object.keys(buses.data));
    t.deepEqual(Object.keys(app.comms.networking), Object.keys(buses.networking));
});

test('presentation bus should only accept presentation messages', (t)=>{
    const app = getApp();
    const acceptedMessages = app.comms.presentation.getAcceptedMessages();

    t.deepEqual(acceptedMessages, ['STATE_UPDATED']);
});
