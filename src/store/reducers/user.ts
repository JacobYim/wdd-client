import { AxiosResponse } from 'axios';
import produce from 'immer';
import { pick } from 'lodash';
import { handleActions } from 'redux-actions';
import { removeHeader } from 'src/services/api/axios';
import { removeUserStorage } from 'src/services/storage/user';
import * as dogActions from 'src/store/actions/dog';
import * as actions from 'src/store/actions/user';

export interface UserState
  extends Pick<
    actions.UserInterface,
    Exclude<keyof actions.UserInterface, '_id'>
  > {
  error?: AxiosResponse;
  dogError?: AxiosResponse;
}

const initialState: UserState = {
  email: '',
  lastLogin: new Date(),
  name: '',
  birth: '',
  gender: '',
  status: 'TERMINATED',
  dogs: {},
};

export default handleActions<UserState, any>(
  {
    // *** HANDLE USER ACTIONS
    [actions.SET_USER_REQUEST]: (state, action) =>
      produce(state, draft => {
        delete draft.error;
      }),
    [actions.SET_USER_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
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
        const dog = action.payload as dogActions.DogInterface;
        draft.repDog = dog;
        draft.dogs[dog._id] = dog.name;
      }),
    [dogActions.SET_DOG_FAILURE]: (state, action) =>
      produce(state, draft => {
        /**
         * 400: BadRequest, 잘못된 파라미터 전송
         * 401: NotAuthenticated, 로그인되어 있지 않음
         * 403: Forbidden, 잘못된 토근 / 이미 존재하는 계정
         * 404: NotFound, 잘못된 이메일(계정)
         * 406: NotAcceptable, 비활성 계정
         */
        draft.dogError = action.payload;
      }),
  },
  initialState
);
