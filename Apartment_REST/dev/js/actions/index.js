import shortid from 'shortid';
import * as types from '../constants/actionTypes';


// export const selectApt = (apt) => {
//   console.log("You clicked on apt: ", apt.apt_id);
//   return {
//     type: "APT_SELECTED",
//     payload: apt
//   }
//   // returns the Action
//
// };



export function getInitialData(data) {
    return {
        type: types.RETRIEVE_INIT_DATA,
        data,
    };
}

const fetchSuccessed = (data) => ({ type: types.FETCH_SUCCESSED, data });
const fetchFailed = () => ({ type: types.FETCH_FAILED });


export function getAll() {
  return {
    types: [fetchSuccessed, fetchFailed],
      fetchAPI: {
          path: '/api/apartments',
          method: 'GET',
      },
  };
}


// function is the Action creator which returns the Action
