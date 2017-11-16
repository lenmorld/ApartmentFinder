import * as types from '../constants/actionTypes';

const initialState = [];

export default function reducers(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case types.RETRIEVE_INIT_DATA:
            return action.data;

        case types.FETCH_SUCCESSED:
            return action.data;

        default:
            return state;
    }
}