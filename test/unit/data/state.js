import {test} from 'ava';
import {getStateManager} from '../../../src/data/state'


test('getStateManager should return a state manager', (t)=>{
    const defaultState = {
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);

    t.plan(4);

    t.deepEqual(stateManager.getDefaultState(), defaultState);
    t.not(stateManager.getDefaultState(), defaultState);
    t.deepEqual(stateManager.getCurrentState(), defaultState);

    const subscription = stateManager.onStateUpdate(()=>{
        subscription.unsubscribe();
        t.pass();
    });
    stateManager.dispatch('anything');
});

test('stateManager should dispatch a move and update the state with the correct squares', (t)=>{
    const defaultState = {
        currentPlayer: 'X',
        winner: null,
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);

    const subscription = stateManager.onStateUpdate(()=>{
        const newState = stateManager.getCurrentState();
        subscription.unsubscribe();
        t.deepEqual(newState.squares, [
            null,null, 'X',
            null,null,null,
            null,null,null
        ]);
    });

    stateManager.dispatch('MOVE', 2);
});
