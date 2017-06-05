import test from 'ava';
import {move} from '../../../../src/application/use_cases/move'


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
    t.is(newSquares, squares);

    newSquares = move(o, squares, 2);
    t.deepEqual(newSquares, squares);
    t.is(newSquares, squares);
});
