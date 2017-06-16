import preact from 'preact'
import {Game, ScoreBoard, StateHistoryManager} from './elements'
import {getApp} from '../orchestration/app'


export const bootstrap = (root)=> {
    const app = getApp();

    const boardGame = preact.render((
        <div>
            <Game squares={app.getCurrentState().squares} bus={app.bus}/>
            <ScoreBoard winner={app.getCurrentState().winner} bus={app.bus}/>
            <StateHistoryManager initialState={app.getCurrentState()} bus={app.bus}/>
        </div>
    ), root);

    return [boardGame, app];
};
