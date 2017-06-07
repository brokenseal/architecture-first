import test from 'ava';
import {move, calculateWinner} from '../../../../src/application/use_cases/move'


const x = 'X';
const o = 'O';

test('move use case should accept the current player, current list of squares and the position where the player moved' +
    'and return a new list of squares with the updated value', (t)=>{
    const squares = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    const newSquares = move(x, squares, 3);
    t.not(newSquares === squares);

    t.deepEqual(newSquares, [
        null, null, null,
        x, null, null,
        null, null, null
    ]);
});

test('move use case should not make a move happen if the specified position already has a value, the returned squares' +
    'must be the same array passed in as a parameter', (t)=>{
    const squares = [
        null, null, x,
        null, x, o,
        null, null, null
    ];

    let newSquares = move(o, squares, 5);
    t.deepEqual(newSquares, squares);

    newSquares = move(o, squares, 2);
    t.deepEqual(newSquares, squares);
});

test('if a move did not happen, it should return the same list of squares passed in', (t)=>{
    const squares = [
        null, null, x,
        null, x, o,
        null, null, null
    ];

    let newSquares = move(o, squares, 5);
    t.is(newSquares, squares);
});

test('if a move happened, calculate the winner and return it (test all possible victory scenarios)', (t)=>{
    let winner = calculateWinner([
        x,      x,      x,
        o,      x,      o,
        null,   o,      null
    ]);

    t.is(winner, x);

    winner = calculateWinner([
        x,      null,   o,
        o,      o,      x,
        o,      x,      null
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      null,   null,
        o,      o,      o,
        o,      x,      x
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      null,   null,
        null,   o,      o,
        x,      x,      x
    ]);

    t.is(winner, x);

    winner = calculateWinner([
        x,      null,   null,
        x,      o,      o,
        x,      null,   o
    ]);

    t.is(winner, x);

    winner = calculateWinner([
        x,      o,   null,
        o,      o,      x,
        x,      o,   x
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      o,   null,
        o,      o,      x,
        x,      o,   x
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      o,   null,
        o,      o,      x,
        x,      o,   x
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      o,   null,
        o,      o,      x,
        x,      o,   x
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      o,   null,
        o,      o,      x,
        x,      o,   x
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      null,   o,
        o,      x,      o,
        x,      x,      o
    ]);

    t.is(winner, o);

    winner = calculateWinner([
        x,      null,   null,
        o,      x,      null,
        o,      x,      x
    ]);

    t.is(winner, x);
});


test('if a move happened, calculate if there is a draw scenario', (t)=>{
    let winner = calculateWinner([
        x,      o,      x,
        o,      x,      o,
        o,      x,      o
    ]);

    t.is(winner, 'Draw');
});
