import {getBus} from './bus'
import {getStateManager} from "../data/state";


export const getApp = ()=> {
    const defaultState = {
        winner: null,
        currentPlayer: 'X',
        squares: new Array(9).fill(null)
    };
    const stateManager = getStateManager(defaultState);
    const app = {
        bus: getAppBus(),
        getCurrentState: ()=> {
            return stateManager.getCurrentState();
        }
    };
    setupWiring(app, stateManager);

    return app;
};

export const getAppBus = ()=> {
    return getBus(['STATE_UPDATED', 'CELL_CLICKED', 'GO_BACK_IN_TIME', 'GO_FORWARD_IN_TIME', 'MOVE'])
};

const setupWiring = (app, stateManager)=> {
    app.bus.addListener('CELL_CLICKED', (_, index)=> {
        stateManager.dispatch('MOVE', index);
    });
    stateManager.onStateUpdate(()=> {
        app.bus.sendMessage('STATE_UPDATED', stateManager.getCurrentState());
    });
    app.bus.addListener('GO_BACK_IN_TIME', (_, pastState)=>{
        stateManager.dispatch('GO_BACK_IN_TIME', pastState);
    });
    app.bus.addListener('GO_FORWARD_IN_TIME', (_, pastState)=>{
        stateManager.dispatch('GO_FORWARD_IN_TIME', pastState);
    });
};
