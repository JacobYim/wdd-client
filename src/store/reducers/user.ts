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
  },
  initialState
);
