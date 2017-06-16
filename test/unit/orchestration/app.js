import test from 'ava';
import {getApp, getAppBus} from '../../../src/orchestration/app'


test('getApp should return an instance of our app with communication buses', (t)=>{
    const app = getApp();
    const bus = getAppBus();

    t.deepEqual(Object.keys(app.bus), Object.keys(bus));
});

test('presentation bus should only accept presentation messages', (t)=>{
    const app = getApp();
    const acceptedMessages = app.bus.getAcceptedMessages();

    t.deepEqual(acceptedMessages, ['STATE_UPDATED', 'CELL_CLICKED', 'GO_BACK_IN_TIME', 'GO_FORWARD_IN_TIME', 'MOVE']);
    t.throws(()=>{
        app.bus.sendMessage('NOT_ACCEPTED');
    });
});
