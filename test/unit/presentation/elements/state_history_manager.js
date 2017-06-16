import {test} from 'ava'
import preact from 'preact';
import {JSDOM} from 'jsdom'
import {StateHistoryManager} from '../../../../src/presentation/elements'
import {getApp} from '../../../../src/orchestration/app'
import {before, after, click} from '../utils'


test.before(before);
test.after(after);

let dom;

test.beforeEach(()=> {
    dom = new JSDOM(`<html><body></body></html>`);
});


test.cb('StateHistoryManager should render two buttons that will deliver two messages ' +
    'to go back and forward in time', (t)=> {
    // setup
    const app = getApp();
    const stateHistoryManager = preact.render(
        <StateHistoryManager initialState={app.getCurrentState()} bus={app.bus}/>,
        dom.window.document.body
    );

    const state1 = Object.assign({}, app.getCurrentState(), {
        squares: [null, null, null, null, null, null, null, null, 'X']
    });
    app.bus.sendMessage('STATE_UPDATED', state1);
    const state2 = Object.assign({}, app.getCurrentState(), {
        squares: [null, null, null, null, null, null, 'O', null, 'X']
    });
    app.bus.sendMessage('STATE_UPDATED', state2);
    const state3 = Object.assign({}, app.getCurrentState(), {
        squares: [null, null, null, 'X', null, null, 'O', null, 'X']
    });
    app.bus.sendMessage('STATE_UPDATED', state3);

    // tests
    t.plan(3);

    const back = stateHistoryManager.querySelector('.back');
    app.bus.once('GO_BACK_IN_TIME', (_, state)=> {
        t.true(state === state2);
    });
    click(back);

    app.bus.once('GO_BACK_IN_TIME', (_, state)=> {
        t.true(state === state1);
    });
    click(back);

    app.bus.once('GO_FORWARD_IN_TIME', (_, state)=> {
        t.true(state === state2);

        setTimeout(()=> {
            t.end();
        }, 0);
    });

    const forward = stateHistoryManager.querySelector('.forward');
    click(forward);
});

test.cb('StateHistoryManager should not add to its history if the given state is already present', (t)=> {
    // setup
    const app = getApp();
    const initialState = app.getCurrentState();
    const stateHistoryManager = preact.render(
        <StateHistoryManager initialState={initialState} bus={app.bus}/>,
        dom.window.document.body
    );

    const back = stateHistoryManager.querySelector('.back');
    const forward = stateHistoryManager.querySelector('.forward');

    const state1 = Object.assign({}, app.getCurrentState(), {
        squares: [null, null, null, null, null, null, null, null, 'X']
    });
    app.bus.sendMessage('STATE_UPDATED', state1);
    const state2 = Object.assign({}, app.getCurrentState(), {
        squares: [null, null, null, null, null, null, 'O', null, 'X']
    });
    app.bus.sendMessage('STATE_UPDATED', state2);
    const state3 = Object.assign({}, app.getCurrentState(), {
        squares: [null, null, null, 'X', null, null, 'O', null, 'X']
    });
    app.bus.sendMessage('STATE_UPDATED', state3);
    const state4 = Object.assign({}, app.getCurrentState(), {
        squares: [null, null, null, 'X', null, null, 'O', 'X', 'X']
    });
    app.bus.sendMessage('STATE_UPDATED', state4);
    app.bus.sendMessage('STATE_UPDATED', state4);
    app.bus.sendMessage('STATE_UPDATED', state4);
    app.bus.sendMessage('STATE_UPDATED', state4);

    // tests
    app.bus.once('GO_BACK_IN_TIME', (_, state)=> {
        t.true(state === state3);
    });
    click(back);

    app.bus.once('GO_BACK_IN_TIME', (_, state)=> {
        t.true(state === state2);
    });
    click(back);

    app.bus.once('GO_BACK_IN_TIME', (_, state)=> {
        t.true(state === state1);

        setTimeout(()=>{
            t.end();
        }, 0);
    });
    click(back);
});
