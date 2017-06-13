import {test} from 'ava';
import {getStateManager} from '../../../src/data/state'


test('getStateManager should return a state manager', (t)=>{
    const defaultState = {
        currentPlayer: 'X',
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

        t.true(newState.currentPlayer === 'O');
        t.deepEqual(newState.squares, [
            null,null, 'X',
            null,null,null,
            null,null,null
        ]);
    });

    stateManager.dispatch('MOVE', 2);
});

test('after a move is dispatched, winner property on the state should be updated accordingly (first scenario where ' +
    'X is the winner)', (t)=>{
    const defaultState = {
        currentPlayer: 'X',
        winner: null,
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);
    let moveCounter = 5;

    const subscription = stateManager.onStateUpdate(()=>{
        moveCounter -= 1;

        if(moveCounter === 0){
            subscription.unsubscribe();
            const newState = stateManager.getCurrentState();
            t.true(newState.winner === 'X');
        }
    });

    // simulate a game where X is the winner
    stateManager.dispatch('MOVE', 0);
    stateManager.dispatch('MOVE', 8);
    stateManager.dispatch('MOVE', 1);
    stateManager.dispatch('MOVE', 7);
    stateManager.dispatch('MOVE', 2);
});

test('after a move is dispatched, winner property on the state should be updated accordingly (second scenario where ' +
    'O is the winner)', (t)=>{
    const defaultState = {
        currentPlayer: 'X',
        winner: null,
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);
    let moveCounter = 6;

    const subscription = stateManager.onStateUpdate(()=>{
        moveCounter -= 1;

        if(moveCounter === 0){
            subscription.unsubscribe();
            const newState = stateManager.getCurrentState();
            t.true(newState.winner === 'O');
        }
    });

    // simulate a game where O is the winner
    stateManager.dispatch('MOVE', 3);
    stateManager.dispatch('MOVE', 2);
    stateManager.dispatch('MOVE', 5);
    stateManager.dispatch('MOVE', 4);
    stateManager.dispatch('MOVE', 8);
    stateManager.dispatch('MOVE', 6);
});

test('after a move is dispatched, winner property on the state should be updated accordingly (third scenario where ' +
    'a draw happens)', (t)=>{
    const defaultState = {
        currentPlayer: 'X',
        winner: null,
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);
    let moveCounter = 9;

    const subscription = stateManager.onStateUpdate(()=>{
        moveCounter -= 1;

        if(moveCounter === 0){
            subscription.unsubscribe();
            const newState = stateManager.getCurrentState();
            t.true(newState.winner === 'Draw');
        }
    });

    /*
    * x, o, o
    * o, x, x
    * x, x, o
    * */
    stateManager.dispatch('MOVE', 0);
    stateManager.dispatch('MOVE', 1);
    stateManager.dispatch('MOVE', 4);

    stateManager.dispatch('MOVE', 2);
    stateManager.dispatch('MOVE', 5);
    stateManager.dispatch('MOVE', 3);

    stateManager.dispatch('MOVE', 6);
    stateManager.dispatch('MOVE', 8);
    stateManager.dispatch('MOVE', 7);
});

test('after a move is dispatched, winner property on the state should be updated accordingly (' +
    'fourth scenario where O is the winner and additional moves will not change the state)', (t)=>{
    const defaultState = {
        currentPlayer: 'X',
        winner: null,
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);
    let moveCounter = 6;
    let lastState;

    const subscription = stateManager.onStateUpdate(()=>{
        moveCounter -= 1;

        if(moveCounter === 0){
            lastState = stateManager.getCurrentState();
            t.true(lastState.winner === 'O');
        }

        if(moveCounter === -1){
            t.true(lastState === stateManager.getCurrentState());
        }

        if(moveCounter === -2){
            subscription.unsubscribe();
            t.true(lastState === stateManager.getCurrentState());
        }
    });

    // simulate a game where O is the winner
    stateManager.dispatch('MOVE', 3);
    stateManager.dispatch('MOVE', 2);
    stateManager.dispatch('MOVE', 5);
    stateManager.dispatch('MOVE', 4);
    stateManager.dispatch('MOVE', 8);
    stateManager.dispatch('MOVE', 6);

    stateManager.dispatch('MOVE', 7);
    stateManager.dispatch('MOVE', 0);
});

test('after a move is dispatched, winner property on the state should be updated accordingly (' +
    'fifth scenario where additional clicks on the same cell will not affect the state)', (t)=>{
    const defaultState = {
        currentPlayer: 'X',
        winner: null,
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);
    let moveCounter = 2;
    let lastState;

    const subscription = stateManager.onStateUpdate(()=>{
        moveCounter -= 1;

        if(moveCounter === 0){
            lastState = stateManager.getCurrentState();
        }

        if(moveCounter === -1){
            t.true(lastState === stateManager.getCurrentState());
        }

        if(moveCounter === -2){
            subscription.unsubscribe();
            t.true(lastState === stateManager.getCurrentState());
        }
    });

    // simulate a game where O is the winner
    stateManager.dispatch('MOVE', 3);
    stateManager.dispatch('MOVE', 2);
    stateManager.dispatch('MOVE', 2);
    stateManager.dispatch('MOVE', 2);
});
