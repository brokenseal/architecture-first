import preact from 'preact'
import {Game} from './elements'
import {getApp} from '../orchestration/app'


export const bootstrap = (root)=> {
    const app = getApp();

    const boardGame = preact.render((
        <div>
            <Game squares={app.getCurrentState().squares} bus={app.buses.presentation}/>
        </div>
    ), root);

    return [boardGame, app];
};
