import axios from 'axios';
import { Alert } from 'react-native';
import { LatLng } from 'react-native-maps';

export interface GeoJSON {
  type: string;
  coordinates: [number, number];
}

export interface Params {
  keyword?: string;
  location?: LatLng;
  range?: number; // km
}

interface Response {
  name: string;
  location: GeoJSON;
  address: string;
  rating: number;
  images: string[];
  distance: number; // km
  officeHour?: {
    default: string;
    weekend?: string;
    dayoff?: string;
  };
  contact?: string;
  tags?: string[];
  likes?: string[];
  reviews?: string[];
}

export interface Place
  extends Pick<Response, Exclude<keyof Response, 'location'>> {
  location: LatLng;
}

export const searchPlace = async (params?: Params) => {
  const response = await axios.get('/places', { params });
  if (response.status === 404) Alert.alert('주변 가게를 찾을 수 없습니다.');
  return response.data as Response[];
};
