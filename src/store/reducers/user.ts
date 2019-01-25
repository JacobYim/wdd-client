import produce from 'immer';
import { handleActions } from 'redux-actions';

import { UserInterface } from 'src/store/actions/user';
import { DogInterface } from 'src/store/actions/dog';
import * as actions from 'src/store/actions/user';
import * as dogActions from 'src/store/actions/dog';

interface UserState extends UserInterface {
  error?: Response;
  dogError?: Response;
}

const initialState: UserState = {
  email: '',
  lastLogin: '',
  name: '',
  birth: '',
  gender: '',
  status: '',
  dogs: {},
  places: {},
};

export default handleActions<UserState, any>(
  {
    // *** HANDLE USER ACTIONS
    [actions.SET_USER_REQUEST]: (state, action) =>
      produce(state, draft => {
        delete draft.error;
      }),
    [actions.SET_USER_SUCCESS]: (state, action) => action.payload,
    [actions.SET_USER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.error = action.payload;
      }),
    [actions.REMOVE_USER]: (state, action) => initialState,
    // *** HANDLE DOG ACTIONS
    [dogActions.SET_DOG_REQUEST]: (state, action) =>
      produce(state, draft => {
        delete draft.dogError;
      }),
    [dogActions.SET_DOG_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const dog = action.payload as DogInterface;
        draft.dogs[dog.id] = dog;
      }),
    [dogActions.SET_DOG_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.dogError = action.payload;
      }),
  },
  initialState
);
