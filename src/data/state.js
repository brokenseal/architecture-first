import {cloneDeep} from 'lodash';
import {createStore} from 'redux'
import {calculateWinner, move} from "../application/use_cases/move";


export const getStateManager = (defaultState)=> {
    const store = createStore(getMainReducer(cloneDeep(defaultState)));

    return {
        getDefaultState: ()=> {
            return cloneDeep(defaultState);
        },
        getCurrentState: ()=> {
            return store.getState();
        },
        dispatch: (actionName, payload)=>{
            return store.dispatch({
                type: actionName,
                payload
            });
        },
        onStateUpdate: (listener)=>{
            return {
                unsubscribe: store.subscribe(listener)
            }
        }
    };
};

const getMainReducer = defaultState => (state = defaultState, action)=> {
    switch (action.type) {
        case 'MOVE':
            if(state.winner !== null){
                return state;
            }

            const newSquares = move(state.currentPlayer, state.squares, action.payload);
            if(newSquares === state.squares){
                return state;
            }

            return Object.assign({}, state, {
                currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
                winner: calculateWinner(newSquares) || null,
                squares: newSquares
            });
        case 'GO_BACK_IN_TIME': return action.payload;
        case 'GO_FORWARD_IN_TIME': return action.payload;
        default:
            return state;
    }
};
