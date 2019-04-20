import { LatLng } from 'react-native-maps';

// *** INTERFACES
type Status = 'READY' | 'WALKING' | 'PAUSE' | 'FINISH';
type PinType = 'pee' | 'poo';

interface PinInterface extends LatLng {
  type?: PinType;
}

export interface UpdateWalkInterface extends PinInterface {
  addDistance: number;
  speed: number | null;
}

export interface WalkInterface {
  status: Status;
  createdAt: Date;
  distance: number;
  speed: number;
  pins: PinInterface[];
  seconds: number;
  steps: number;
  poos: number;
  pees: number;
}

interface WalkSuccessInterface {
  status?: Status;
  distance?: number;
  speed?: number;
  pins?: PinInterface[];
  seconds?: number;
  steps?: number;
  poos?: number;
  pees?: number;
}

// *** CONSTS
export const UPDATE_STATUS = 'walk/UPDATE_STATUS';
export const UPDATE_SECONDS = 'walk/UPDATE_SECONDS';
export const UPDATE_STEPS = 'walk/UPDATE_STEPS';
export const UPDATE_COUNT = 'walk/UPDATE_COUNT';
export const PUSH_PIN = 'walk/PUSH_PIN';
export const UPDATE_LATEST_PIN = 'walk/UPDATE_LATEST_PIN';

export const SET_WALK_REQUEST = 'walk/SET_WALK_REQUEST';
export const SET_WALK_SUCCESS = 'walk/SET_WALK_SUCCESS';
export const SET_WALK_FAILURE = 'walk/SET_WALK_FAILURE';

export const CLEAR_WALK = 'walk/CLEAR_WALK';

// *** FUNCTIONS
export const updateStatus = (payload: Status) => ({
  payload,
  type: UPDATE_STATUS,
});
export const updateSeconds = (payload: { seconds: number }) => ({
  payload,
  type: UPDATE_SECONDS,
});
export const updateSteps = (payload: number) => ({
  payload,
  type: UPDATE_STEPS,
});
export const updateCount = (payload: { poos: number; pees: number }) => ({
  payload,
  type: UPDATE_COUNT,
});
export const pushPin = (payload: UpdateWalkInterface) => ({
  payload,
  type: PUSH_PIN,
});
export const updateLatestPin = (payload: PinType) => ({
  payload,
  type: UPDATE_LATEST_PIN,
});

export const setWalkRequest = () => ({ type: SET_WALK_REQUEST });
export const setWalkSuccess = (payload: WalkSuccessInterface) => ({
  payload,
  type: SET_WALK_SUCCESS,
});
export const setWalkFailure = (payload: Error) => ({
  payload,
  type: SET_WALK_FAILURE,
});

export const clearWalk = () => ({ type: CLEAR_WALK });
