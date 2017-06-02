import test from 'ava';
import {getBus} from '../../../src/orchestration/bus'


test('getBus without any configuration returns a new bus instance', t => {
    const bus = getBus();
    const expectedProperties = ['sendMessage', 'addListener'];

    expectedProperties.forEach((prop)=> {
        t.true(prop in bus);
    });
});

test('bus.addListener accepts a function as first parameter and adds it to the list of internal listeners', t => {
    const bus = getBus();
    const listener = ()=> {};

    bus.addListener(listener);
    t.true(bus.getListeners().indexOf(listener) >= 0);
});

test('getBus should always return a new instance and never a globally stored instance', t => {
    t.false(getBus() === getBus());
});

test('bus.addListener returns an unsubscription token which will allow listeners to be removed', t => {
    const bus = getBus();
    const listener = ()=> {};

    const token = bus.addListener(listener);
    t.true(bus.getListeners().indexOf(listener) >= 0);
    token.unsubscribe();
    t.false(bus.getListeners().indexOf(listener) >= 0);
});

test('bus.addListener returns an unsubscription token which will allow listeners to be removed: second scenario ' +
    'with multiple listeners', t => {
    const bus = getBus();
    const listener1 = ()=> {};
    const listener2 = ()=> {};
    const listener3 = ()=> {};

    const token1 = bus.addListener(listener1);
    const token2 = bus.addListener(listener2);
    const token3 = bus.addListener(listener3);

    t.true(bus.getListeners().indexOf(listener1) === 0);
    t.true(bus.getListeners().indexOf(listener2) === 1);
    t.true(bus.getListeners().indexOf(listener3) === 2);

    token2.unsubscribe();
    t.true(bus.getListeners().indexOf(listener2) === -1);
    t.true(bus.getListeners().indexOf(listener1) === 0);
    t.true(bus.getListeners().indexOf(listener3) === 1);

    token3.unsubscribe();
    t.true(bus.getListeners().indexOf(listener2) === -1);
    t.true(bus.getListeners().indexOf(listener1) === 0);
    t.true(bus.getListeners().indexOf(listener3) === -1);

    bus.addListener(listener3);
    bus.addListener(listener2);

    t.true(bus.getListeners().indexOf(listener1) === 0);
    t.true(bus.getListeners().indexOf(listener3) === 1);
    t.true(bus.getListeners().indexOf(listener2) === 2);
});

test('bus.addListener returns an unsubscription token which will allow listeners to be removed: third scenario ' +
    'showing that invoking unsubscription multiple times will not cause an error but that it will be ' +
    'silently ignored', t => {
    const bus = getBus();
    const listener = ()=> {};

    const token = bus.addListener(listener);
    token.unsubscribe();
    token.unsubscribe();
    token.unsubscribe();
    t.pass();
});

test('bus.addListener should not allow the same listener to be added multiple times, it should throw an error', t => {
    const bus = getBus();
    const listener = ()=> {};

    bus.addListener(listener);

    t.throws(()=>{
        bus.addListener(listener);
    }, Error);
});

test('bus.sendMessage will propagate the message to all listeners', (t)=>{
    t.plan(3);

    const bus = getBus();
    const message = 'K was here';
    const listener1 = (m)=> {
        t.is(message, m);
    };
    const listener2 = (m)=> {
        t.is(message, m);
    };
    const listener3 = (m)=> {
        t.is(message, m);
    };

    bus.addListener(listener1);
    bus.addListener(listener2);
    bus.addListener(listener3);

    bus.sendMessage(message);
});

test('bus.sendMessage will propagate the message to all listeners and additionally pass the payload (second ' +
    'argument)', (t)=>{
    t.plan(1);

    const bus = getBus();
    const message = 'K was here';
    const payload = [{}, {}];
    const listener1 = (m, p)=> {
        t.is(payload, p);
    };

    bus.addListener(listener1);
    bus.sendMessage(message, payload);
});

test('bus.getListeners should return a copy of the listeners array every time it is invoked, so as to avoid messing' +
    'around with the internal state of the bus', (t)=>{
    const bus = getBus();

    bus.addListener(()=>{});

    t.not(bus.getListeners(), bus.getListeners());
});

test('by design, if a listener throws an error, the whole process fails', (t)=>{
    t.plan(2);

    const bus = getBus();

    bus.addListener(()=>{
        t.pass();
    });

    bus.addListener(()=>{
        throw new Error('nope!');
    });

    bus.addListener(()=>{
        t.pass();
    });

    t.throws(()=>{
        bus.sendMessage();
    });
});
