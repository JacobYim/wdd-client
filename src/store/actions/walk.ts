import { LatLng } from 'react-native-maps';

// *** INTERFACES
type Status = 'READY' | 'WALKING' | 'PAUSE' | 'FINISH';
type PinType = 'none' | 'pee' | 'poo';

interface PinInterface extends LatLng {
  type: PinType;
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
}

interface WalkSuccessInterface {
  status?: Status;
  distance?: number;
  speed?: number;
  pins?: PinInterface[];
  seconds?: number;
  steps?: number;
}

// *** CONSTS
export const UPDATE_STATUS = 'walk/UPDATE_STATUS';
export const UPDATE_SECONDS = 'walk/UPDATE_SECONDS';
export const UPDATE_STEPS = 'walk/UPDATE_STEPS';
export const PUSH_PIN = 'walk/PUSH_PIN';

export const SET_WALK_REQUEST = 'walk/SET_WALK_REQUEST';
export const SET_WALK_SUCCESS = 'walk/SET_WALK_SUCCESS';
export const SET_WALK_FAILURE = 'walk/SET_WALK_FAILURE';

// *** FUNCTIONS
export const updateStatus = (payload: Status) => ({
  type: UPDATE_STATUS,
  payload,
});
export const updateSeconds = () => ({ type: UPDATE_SECONDS });
export const updateSteps = (payload: number) => ({
  type: UPDATE_STEPS,
  payload,
});
export const pushPin = (payload: UpdateWalkInterface) => ({
  type: PUSH_PIN,
  payload,
});

export const setWalkRequest = () => ({ type: SET_WALK_REQUEST });
export const setWalkSuccess = (payload: WalkSuccessInterface) => ({
  type: SET_WALK_SUCCESS,
  payload,
});
export const setWalkFailure = (payload: Error) => ({
  type: SET_WALK_FAILURE,
  payload,
});
