import { handleActions } from 'redux-actions';

import { UserInterface } from 'src/store/actions/user';
import * as actions from 'src/store/actions/user';

const initialState: UserInterface = {
  email: '',
  name: '',
  dogs: {},
};

export default handleActions<UserInterface>(
  {
    [actions.LOAD_USER]: (state, action) => {
      console.log('REDUCER -> start load user');
      return state;
    },
    [actions.SIGNIN]: (state, action) => {
      console.log('REDUCER -> start sign in');
      console.log(action.payload);
      return state;
    },
    [actions.SIGNUP]: (state, action) => {
      console.log('REDUCER -> start sign up');
      console.log(action.payload);
      return state;
    },
    [actions.SIGNOUT]: (state, action) => {
      console.log('REDUCER -> start sign out');
      return state;
    },
    [actions.SET_USER_SUCCESS]: (state, action) =>
      action.payload as UserInterface,
    [actions.SET_USER_FAILURE]: (state, action) => {
      console.log(action.error);
      return state;
    },
    [actions.REMOVE_USER_SUCCESS]: (state, action) => initialState,
    [actions.REMOVE_USER_FAILURE]: (state, action) => {
      console.log(action.error);
      return state;
    },
  },
  initialState
);
