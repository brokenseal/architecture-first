import test from 'ava';
import {goBackInTime, goForwardInTime} from '../../../../src/application/use_cases/time_traveling'


test('goBackInTime should accept a history as its first argument, a current position in time as second argument and ' +
    'return the previous item', (t)=>{
    const history = [100, 200, 300, 400];
    let currentPosition = 2;
    let result = goBackInTime(history, currentPosition);

    t.is(result, history[currentPosition-1]);

    currentPosition = 3;
    result = goBackInTime(history, currentPosition);

    t.is(result, history[currentPosition-1]);
});

test('goForwardInTime should accept a history as its first argument, a current position in time as second argument and ' +
    'return the next item', (t)=>{
    const history = [100, 200, 300, 400];
    let currentPosition = 2;

    let result = goForwardInTime(history, currentPosition);

    t.is(result, history[currentPosition+1]);

    currentPosition = 0;
    result = goForwardInTime(history, currentPosition);

    t.is(result, history[currentPosition+1]);
});
