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
  distance: number;
  speed: number;
  pins: PinInterface[];
}

// *** CONSTS
export const UPDATE_STATUS = 'walk/UPDATE_STATUS';
export const UPDATE_WALK = 'walk/UPDATE_WALK';

export const SET_WALK_REQUEST = 'walk/SET_WALK_REQUEST';
export const SET_WALK_SUCCESS = 'walk/SET_WALK_SUCCESS';
export const SET_WALK_FAILURE = 'walk/SET_WALK_FAILURE';

// *** FUNCTIONS
export const updateStatus = (payload: Status) => ({
  type: UPDATE_STATUS,
  payload,
});
export const updateWalk = (payload: UpdateWalkInterface) => ({
  type: UPDATE_WALK,
  payload,
});

export const setWalkRequest = () => ({ type: SET_WALK_REQUEST });
export const setWalkSuccess = (payload: WalkInterface) => ({
  type: SET_WALK_SUCCESS,
  payload,
});
export const setWalkFailure = (payload: Error) => ({
  type: SET_WALK_FAILURE,
  payload,
});
