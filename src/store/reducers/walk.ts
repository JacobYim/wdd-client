import produce from 'immer';
import { handleActions } from 'redux-actions';
import * as actions from 'src/store/actions/walk';

export interface WalkState extends actions.WalkInterface {
  error?: any;
}

const initialState: WalkState = {
  status: 'READY',
  createdAt: new Date(),
  distance: 0,
  speed: 0,
  pins: [],
  seconds: 0,
  steps: 0,
};

export default handleActions<WalkState, any>(
  {
    [actions.UPDATE_SECONDS]: (state, action) =>
      produce(state, draft => {
        draft.seconds += 1;
      }),
    [actions.UPDATE_STEPS]: (state, action) =>
      produce(state, draft => {
        draft.steps = action.payload;
      }),
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
    [actions.CLEAR_WALK]: (state, action) => ({ ...initialState, pins: [] }),
  },
  initialState
);
