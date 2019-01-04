import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

import { loadUserAPI, signInAPI, signUpAPI } from 'src/lib/api/user';

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

/* ACTIONS */
const LOAD_USER = 'wdd-client/user/LOAD_USER';
const SIGNIN = 'wdd-client/user/SIGNIN';
const SIGNUP = 'wdd-client/user/SIGNUP';
const SIGNOUT = 'wdd-client/user/SIGNOUT';

/* ACTION CREATORS */
export const loadUser = createAction(LOAD_USER, loadUserAPI);
export const signIn = createAction(SIGNIN, signInAPI);
export const signUp = createAction(SIGNUP, signUpAPI);
export const signOut = createAction(SIGNOUT);

/* REDUCER */

interface DefaultAction {
  payload: UserInterface;
}

const initialState: UserInterface = {
  email: '',
  name: '',
  dogs: {},
};

export default handleActions<UserInterface>(
  {
    ...pender({
      type: LOAD_USER,
      onSuccess: (state, action: DefaultAction) => ({
        ...state,
        ...action.payload,
      }),
    }),
    ...pender({
      type: SIGNIN,
      onSuccess: (state, action: DefaultAction) => ({
        ...state,
        ...action.payload,
      }),
    }),
    ...pender({
      type: SIGNUP,
      onSuccess: (state, action: DefaultAction) => ({
        ...state,
        ...action.payload,
      }),
    }),
    [SIGNOUT]: (state, action) => ({ ...state, ...initialState }),
  },
  initialState
);
