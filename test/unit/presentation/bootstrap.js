import {test} from 'ava';
import {before, after, click} from './utils'
import {bootstrap} from '../../../src/presentation/bootstrap';
import {JSDOM} from 'jsdom';


test.before(before);
test.after(after);


test('bootstrap should accept a root element to which append the game and return the correct result', (t)=> {
    const dom = new JSDOM(`<html><body></body></html>`);
    const [boardGame, _] = bootstrap(dom.window.document.body);

    t.true(boardGame.innerHTML === "<div class=\"board-game\"><div class=\"row\"><div class=\"cell\"></div><div class=\"cell\"></div><div class=\"cell\"></div></div><div class=\"row\"><div class=\"cell\"></div><div class=\"cell\"></div><div class=\"cell\"></div></div><div class=\"row\"><div class=\"cell\"></div><div class=\"cell\"></div><div class=\"cell\"></div></div></div><div class=\"score-board\">And the winner is: </div><div class=\"state-history-manager\"><button class=\"back\">Back</button><button class=\"forward\">Forward</button><div class=\" current\">0</div></div>");
});

test('bootstrap should setup correctly the hooks for the game to happen correctly: CELL_CLICKED', (t)=> {
    const dom = new JSDOM(`<html><body></body></html>`);
    const [boardGame, app] = bootstrap(dom.window.document.body);
    const cellIndex = 0;
    const cell = boardGame.querySelectorAll('.cell')[cellIndex];

    t.plan(2);

    app.buses.presentation.once('STATE_UPDATED', (_, newState)=> {
        t.true(newState.squares[cellIndex] === 'X');
    });
    app.buses.presentation.once('CELL_CLICKED', (_, payload)=> {
        t.true(cellIndex === payload);

    });

    click(cell);
});

test.cb('bootstrap should setup correctly the hooks for the game to happen correctly: CELL_CLICKED', (t)=> {
    const dom = new JSDOM(`<html><body></body></html>`);
    const [boardGame, app] = bootstrap(dom.window.document.body);
    const indexes = [0, 4, 7, 5];
    t.plan(indexes.length * 2);
    const cells = [];

    indexes.forEach((cellIndex)=> {
        const cell = boardGame.querySelectorAll('.cell')[cellIndex];

        app.buses.presentation.once('CELL_CLICKED', (_, payload)=> {
            t.true(cellIndex === payload);

            setTimeout(()=> {
                cells.push(boardGame.querySelectorAll('.cell')[cellIndex]);

                if (cells.length === indexes.length) {
                    cells.forEach((cell, index)=> {
                        let player = 'X';

                        if (index % 2) {
                            player = 'O';
                        }

                        t.true(cell.innerHTML === player);
                    });
                    t.end();
                }
            });
        });

        click(cell);
    });
});

test.cb('bootstrap should setup correctly the hooks for the state history manager to work ' +
    'correctly: GO_BACK_IN_TIME', (t)=> {
    const dom = new JSDOM(`<html><body></body></html>`);
    const [boardGame, app] = bootstrap(dom.window.document.body);
    const back = boardGame.querySelector('.back');

    click(boardGame.querySelectorAll('.cell')[0]);
    click(boardGame.querySelectorAll('.cell')[1]);
    click(boardGame.querySelectorAll('.cell')[2]);
    click(boardGame.querySelectorAll('.cell')[3]);
    click(back);
    click(back);

    setTimeout(()=> {
        t.deepEqual(app.getCurrentState().squares, [
            'X', 'O', null,
            null, null, null,
            null, null, null
        ]);
        t.end();
    }, 0);
});

test.cb('bootstrap should setup correctly the hooks for the state history manager to work ' +
    'correctly: GO_FORWARD_IN_TIME', (t)=> {
    const dom = new JSDOM(`<html><body></body></html>`);
    const [boardGame, app] = bootstrap(dom.window.document.body);
    const back = boardGame.querySelector('.back');
    const forward = boardGame.querySelector('.forward');

    click(boardGame.querySelectorAll('.cell')[0]);
    click(boardGame.querySelectorAll('.cell')[1]);
    click(boardGame.querySelectorAll('.cell')[2]);
    click(boardGame.querySelectorAll('.cell')[3]);
    click(back);
    click(back);
    click(forward);

    setTimeout(()=> {
        t.deepEqual(app.getCurrentState().squares, [
            'X', 'O', 'X',
            null, null, null,
            null, null, null
        ]);
        t.end();
    }, 0);
});
