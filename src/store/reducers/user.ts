import produce from 'immer';
import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';

import { removeHeader } from 'src/services/api/axios';
import { removeUserStorage } from 'src/services/storage/user';
import { UserInterface } from 'src/store/actions/user';
import { DogInterface } from 'src/store/actions/dog';
import * as actions from 'src/store/actions/user';
import * as dogActions from 'src/store/actions/dog';

export interface UserState extends UserInterface {
  error?: AxiosResponse;
  dogError?: AxiosResponse;
}

const initialState: UserState = {
  email: '',
  lastLogin: '',
  name: '',
  birth: '',
  gender: '',
  status: 'TERMINATED',
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
    [actions.SET_USER_FAILURE]: (state, action) => {
      if (action.payload && action.payload.data.name === 'JsonWebTokenError') {
        removeHeader();
        removeUserStorage();
      }
      return produce(state, draft => {
        draft.error = action.payload;
      });
    },
    [actions.REMOVE_USER]: (state, action) => initialState,
    // *** HANDLE DOG ACTIONS
    [dogActions.SET_DOG_REQUEST]: (state, action) =>
      produce(state, draft => {
        delete draft.dogError;
      }),
    [dogActions.SET_DOG_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const dog = action.payload as DogInterface;
        const dogID = dog.id;
        // *** SERIALIZE
        delete dog.id;
        delete dog.user;
        draft.dogs[dogID] = dog;
      }),
    [dogActions.SET_DOG_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.dogError = action.payload;
      }),
  },
  initialState
);
