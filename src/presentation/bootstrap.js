import preact from 'preact'
import {Game} from './elements'
import {getApp} from '../orchestration/app'


export const bootstrap = (root)=> {
    const app = getApp();
    const squares = new Array(9).fill(null);

    const boardGame = preact.render((
        <div>
            <Game squares={squares} bus={app.buses.presentation}/>
        </div>
    ), root);

    return [boardGame, app];
};
