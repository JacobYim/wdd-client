import { handleActions } from 'redux-actions';

import * as actions from 'src/store/actions/user';

export interface UserInterface {
  readonly email: string;
  readonly name: string;
  dogs: {
    [id: string]: {
      name: string;
      thumbnail: string;
    };
  };
  // places: string[]
}

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
    [actions.USER_SUCCESS]: (state, action) => action.payload as UserInterface,
    [actions.USER_FAILURE]: (state, action) => {
      console.log(action.error);
      return state;
    },
    [actions.SIGNOUT]: (state, action) => initialState,
  },
  initialState
);
