import {test} from 'ava'
import {JSDOM} from 'jsdom'
import preact from 'preact';
import {Game} from '../../../src/presentation/elements'
import {getApp} from '../../../src/orchestration/app'
import {getBus} from '../../../src/orchestration/bus'
import {before, after, click} from './utils'


const x = 'X';
const o = 'O';
let dom;

test.before(before);
test.after(after);

test.beforeEach(()=>{
    dom = new JSDOM(`<html><body></body></html>`);
});

test('Game element should render the correct shallow structure', (t)=> {
    const result = preact.render((
        <div>
            <Game squares={[]} bus={getBus()}/>
        </div>
    ), dom.window.document.body);
    const container = result.querySelector('#container');

    t.true(container.children.length === 2);
    t.true(container.children[0].id === "board-game");
    t.true(container.children[1].id === "history-management");
});

test('Game element should, given some squares, render the correct board game structure', (t)=> {
    const check = (squares, expect)=>{
        const result = preact.render((
            <div>
                <Game squares={squares} bus={getBus()}/>
            </div>
        ), dom.window.document.body);

        const boardGame = result.querySelector('#board-game');
        t.true(boardGame.querySelectorAll('.cell').length === 9);

        const res = [...boardGame.querySelectorAll('.cell').values()].map((cell)=>{
            // FIXME: why doesn't innerText work??
            return cell.innerHTML;
        });

        t.deepEqual(res, expect);
    };

    check(new Array(9).fill(null), new Array(9).fill(''));
    check([
        x, x, o,
        o, o, x,
        null, o, null
    ], [
        x, x, o,
        o, o, x,
        '', o, ''
    ]);
    check([
        x, null, null,
        o, null, x,
        null, o, null
    ], [
        x, '', '',
        o, '', x,
        '', o, ''
    ]);
});

test('Game element should render rows correctly', (t)=>{
    const squares = new Array(9).fill(null);

    const gameBoard = preact.render((
        <div>
            <Game squares={squares} bus={getBus()}/>
        </div>
    ), dom.window.document.body);

    const rows = [...gameBoard.querySelectorAll('.row').values()];
    t.is(rows.length, 3);
});


test('Game should notify the given presentation bus when a user clicks on a cell', (t)=>{
    const app = getApp();
    const squares = new Array(9).fill(null);

    const result = preact.render((
        <div>
            <Game squares={squares} bus={app.buses.presentation}/>
        </div>
    ), dom.window.document.body);

    let cell = [...result.querySelectorAll('.cell')][0];
    let subscriptionToken = app.buses.presentation.addListener('CELL_CLICKED', (_, payload)=>{
        subscriptionToken.unsubscribe();
        t.true(payload === 0);
    });

    click(cell);

    subscriptionToken = app.buses.presentation.addListener('CELL_CLICKED', (_, payload)=>{
        subscriptionToken.unsubscribe();
        t.true(payload === 4);
    });
    cell = [...result.querySelectorAll('.cell')][4];
    click(cell);
});

test.cb('Game should update its state when the app state updates, using the bus as the communication input', (t)=>{
    const app = getApp();
    const squares = new Array(9).fill(null);

    const result = preact.render((
        <div>
            <Game squares={squares} bus={app.buses.presentation}/>
        </div>
    ), dom.window.document.body);

    let cells = [...result.querySelectorAll('.cell').values()];
    t.true(cells[0].innerHTML === "");
    t.true(cells[4].innerHTML === "");
    t.true(cells[8].innerHTML === "");

    const state = {squares: [
        o, o, null,
        x, null, x,
        null, null, o
    ]};
    app.buses.presentation.sendMessage('STATE_UPDATED', state);

    setTimeout(()=>{
        cells = [...result.querySelectorAll('.cell').values()];

        t.true(cells[0].innerHTML === o);
        t.true(cells[4].innerHTML === "");
        t.true(cells[8].innerHTML === o);
        t.end();
    }, 0);
});

test.skip('Game should unmount', (t)=>{
    // TODO
});
