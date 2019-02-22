import produce from 'immer';
import { handleActions } from 'redux-actions';
import { WalkInterface } from 'src/store/actions/walk';

import * as actions from 'src/store/actions/walk';

export interface WalkState extends WalkInterface {
  error?: any;
}

const initialState: WalkState = {
  status: 'READY',
  pins: [],
  distance: 0,
  speed: 0,
};

export default handleActions<WalkState, any>(
  {
    [actions.SET_WALK_REQUEST]: (state, action) =>
      produce(state, draft => {
        delete draft.error;
      }),
    [actions.SET_WALK_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [actions.SET_WALK_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.error = action.payload;
      }),
  },
  initialState
);
