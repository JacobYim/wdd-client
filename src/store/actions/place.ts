import { LatLng } from 'react-native-maps';

export interface GeoJSON {
  type: string;
  coordinates: [number, number];
}

// *** INTERFACES
export interface Place
  extends Pick<PlaceResponse, Exclude<keyof PlaceResponse, 'location'>> {
  location: LatLng;
}
export interface PlaceResponse {
  _id: string;
  name: string;
  location: GeoJSON;
  address: string;
  label: '카페' | '식당' | '술집' | '용품' | '병원' | '기타';
  rating: number;
  thumbnail?: string;
  contact?: string;
  icon?: string;
  description?: string;
  images?: string[];
  officeHour?: {
    default: string;
    weekend?: string;
    dayoff?: string;
  };
  likes?: string[];
  distance: number; // km
  scraps: { user: string; createdAt: Date }[];
}

// *** CONSTS
export const SCRAP = 'place/SCRAP';
export const UN_SCRAP = 'place/UN_SCRAP';

export const SET_PLACE_REQUEST = 'place/SET_PLACE_REQUEST';
export const SET_PLACE_SUCCESS = 'place/SET_PLACE_SUCCESS';
export const SET_PLACE_FAILURE = 'place/SET_PLACE_FAILURE';

// *** FUNCTIONS
export const scrap = (payload: { id: string }) => ({ payload, type: SCRAP });
export const unScrap = (payload: { id: string }) => ({
  payload,
  type: UN_SCRAP,
});

export const setPlaceRequest = () => ({ type: SET_PLACE_REQUEST });
export const setPlaceSuccess = (payload: string[]) => ({
  payload,
  type: SET_PLACE_SUCCESS,
});
export const setPlaceFailure = (payload: Response) => ({
  payload,
  type: SET_PLACE_FAILURE,
});
