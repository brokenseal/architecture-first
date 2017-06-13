import preact from 'preact'
import {Game, ScoreBoard} from './elements'
import {getApp} from '../orchestration/app'


export const bootstrap = (root)=> {
    const app = getApp();

    const boardGame = preact.render((
        <div>
            <Game squares={app.getCurrentState().squares} bus={app.buses.presentation}/>
            <ScoreBoard winner={app.getCurrentState().winner} bus={app.buses.presentation}/>
        </div>
    ), root);

    return [boardGame, app];
};
