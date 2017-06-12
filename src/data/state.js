import {cloneDeep} from 'lodash';
import {createStore} from 'redux'


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
            return {
                ...state,
                squares: state.squares.map((value, index)=>{
                    if(index === action.payload){
                        return 'X';
                    }
                    return value;
                })
            };
        default:
            return state;
    }
};
