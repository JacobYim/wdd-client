import { handleActions } from 'redux-actions';
import { WalkInterface } from 'src/store/actions/walk';

import * as actions from 'src/store/actions/walk';

export interface WalkState extends WalkInterface {}

const initialState: WalkState = {
  status: 'READY',
  pins: [],
};

export default handleActions<WalkState, any>(
  {
    [actions.SET_WALK_REQUEST]: (state, action) => state,
    [actions.SET_WALK_SUCCESS]: (state, action) => action.payload,
    [actions.SET_WALK_FAILURE]: (state, action) => state,
  },
  initialState
);
