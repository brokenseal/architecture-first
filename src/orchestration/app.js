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
        buses: getAppBuses(),
        getCurrentState: ()=> {
            return stateManager.getCurrentState();
        }
    };
    setupWiring(app, stateManager);

    return app;
};

export const getAppBuses = ()=> {
    return {
        presentation: getBus(['STATE_UPDATED', 'CELL_CLICKED', 'GO_BACK_IN_TIME', 'GO_FORWARD_IN_TIME']),
        networking: getBus(),
        data: getBus(['MOVE', 'STATE_UPDATED'])
    }
};

const setupWiring = (app, stateManager)=> {
    app.buses.presentation.addListener('CELL_CLICKED', (_, index)=> {
        app.buses.data.sendMessage('MOVE', index);
    });

    // FIXME: does it make sense to have all of these layers? Could they be adding unnecessary complexity?
    // I'm not sure...
    app.buses.data.addListener('STATE_UPDATED', (_, newState)=> {
        app.buses.presentation.sendMessage('STATE_UPDATED', newState);
    });
    stateManager.onStateUpdate(()=> {
        app.buses.data.sendMessage('STATE_UPDATED', stateManager.getCurrentState());
    });
    app.buses.data.addListener('MOVE', (_, payload)=> {
        stateManager.dispatch('MOVE', payload);
    });
    app.buses.presentation.addListener('GO_BACK_IN_TIME', (_, pastState)=>{
        stateManager.dispatch('GO_BACK_IN_TIME', pastState);
    });
    app.buses.presentation.addListener('GO_FORWARD_IN_TIME', (_, pastState)=>{
        stateManager.dispatch('GO_FORWARD_IN_TIME', pastState);
    });
};
