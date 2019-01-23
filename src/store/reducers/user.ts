import produce from 'immer';
import { handleActions } from 'redux-actions';

import { UserInterface } from 'src/store/actions/user';
import * as actions from 'src/store/actions/user';

interface UserState extends UserInterface {
  error?: Response;
}

const initialState: UserState = {
  email: '',
  name: '',
  dogs: {},
};

export default handleActions<UserState, any>(
  {
    // [actions.LOAD_USER]: (state, action) => {
    //   console.log('REDUCER -> start load user');
    //   return state;
    // },
    // [actions.SIGNIN]: (state, action) => {
    //   console.log('REDUCER -> start sign in');
    //   console.log(action.payload);
    //   return state;
    // },
    // [actions.SIGNUP]: (state, action) => {
    //   console.log('REDUCER -> start sign up');
    //   console.log(action.payload);
    //   return state;
    // },
    // [actions.SIGNOUT]: (state, action) => {
    //   console.log('REDUCER -> start sign out');
    //   return state;
    // },
    [actions.SET_USER_REQUEST]: (state, action) =>
      produce(state, draft => {
        delete draft.error;
      }),
    [actions.SET_USER_SUCCESS]: (state, action) => action.payload,
    [actions.SET_USER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.error = action.payload;
      }),
    [actions.REMOVE_USER_SUCCESS]: (state, action) => initialState,
    [actions.REMOVE_USER_FAILURE]: (state, action) => {
      return state;
    },
  },
  initialState
);
