//import { createStore, combineReducers, applyMiddleware } from 'redux';
//import logger from 'redux-logger';

// function likeReducer (state={}, action) {
//     if (type === 'increase') likeCount+=1;
//     if (type === 'decrease') likeCount-=1;
//     return state;
// }

// const store = createStore(
//     combineReducers({
//         like: likeReducer,
//     }),
//     applyMiddleware(logger,)
//     );

// store.subscribe(() => {
//     console.log('state changed!', store.getState());
// })

// store.dispatch({ type: 'increseLike'});
// store.dispatch({ type: 'decreaselike'});

// export default store;