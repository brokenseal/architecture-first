import test from 'ava';
import {getApp, getAppBuses} from '../../../src/orchestration/app'


test('getApp should return an instance of our app with communication buses', (t)=>{
    const app = getApp();
    const buses = getAppBuses();

    t.true('buses' in app);
    t.deepEqual(Object.keys(app.buses.presentation), Object.keys(buses.presentation));
    t.deepEqual(Object.keys(app.buses.data), Object.keys(buses.data));
    t.deepEqual(Object.keys(app.buses.networking), Object.keys(buses.networking));
});

test('presentation bus should only accept presentation messages', (t)=>{
    const app = getApp();
    const acceptedMessages = app.buses.presentation.getAcceptedMessages();

    t.deepEqual(acceptedMessages, ['STATE_UPDATED', 'CELL_CLICKED', 'GO_BACK_IN_TIME', 'GO_FORWARD_IN_TIME']);
    t.throws(()=>{
        app.buses.presentation.sendMessage('NOT_ACCEPTED');
    });
});
