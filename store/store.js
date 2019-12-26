import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

// const initialState = {
//     count: 0
// }

// const ADD = 'ADD'

const userInitialState = {
    // username: 'jocky'
}

const LOGOUT = 'LOGOUT'

// function counterReducer(state = initialState, action) {
//     switch (action.type) {
//         case ADD:
//             return { count: state.count + (action.num || 1) }
//         default:
//             return state
//     }
// }

// const UPDATE_USERNAME = 'UPDATE_USERNAME'

function userReducer(state = userInitialState, action) {
    switch (action.type) {
        // case UPDATE_USERNAME:
        //     return {
        //         ...state,
        //         username: action.name
        //     }
        case LOGOUT: {
            return { }
        }
        default:
            return state;
    }
}

const allReducers = combineReducers({
    // counter: counterReducer,
    user: userReducer
})

// action creators
export function logout() {
    return dispatch => {
        axios.post('/logout')
            .then(resp => {
                if (resp.status === 200) {
                    dispatch({
                        type: LOGOUT
                    })
                } else {
                    console.log('logout failed', resp)
                }
            }).catch(err => console.error(err))
    }
}

// console.log(store.getState())
// store.dispatch({ type: ADD })
// console.log(store.getState())

//action creatore
// export function add(num) {
//     return {
//         type: ADD,
//         num
//     }
// }

// function addAsync(num) {
//     return (dispatch, getState) => {
//         setTimeout(() => {
//             dispatch(add(num))
//         }, 1000)
//     }
// }



// store.subscribe(() => {
//     console.log('changed', store.getState())
// })
// store.dispatch(add(3))
// store.dispatch(addAsync(5))
// store.dispatch({ type: UPDATE_USERNAME, name: 'LILEI' })

export default function initializeStore(state) {
    const store = createStore(
        allReducers,
        Object.assign({}, {
            // counter:initialState,
            user: userInitialState
        }, state),
        composeWithDevTools(applyMiddleware(ReduxThunk))
    )

    return store
}