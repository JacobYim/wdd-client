import axios, { AxiosResponse } from 'axios';
import { sortBy } from 'lodash';
import { LatLng } from 'react-native-maps';

export interface Params {
  keyword?: string;
  label?: '카페' | '용품' | '병원' | '기타';
  location?: LatLng;
  range?: number; // km
}

export interface Place
  extends Pick<Response, Exclude<keyof Response, 'location'>> {
  location: LatLng;
}

interface GeoJSON {
  type: string;
  coordinates: [number, number];
}

interface Response {
  _id: string;
  name: string;
  location: GeoJSON;
  address: string;
  label: '카페' | '용품' | '병원' | '기타';
  rating: number;
  contact: string;
  thumbnail: string;
  images?: string[];
  officeHour?: {
    default: string;
    weekend?: string;
    dayoff?: string;
  };
  likes?: string[];
  distance: number; // km
}

const geoToLatLng = ({ coordinates }: GeoJSON) =>
  ({
    latitude: coordinates[1],
    longitude: coordinates[0],
  } as LatLng);

export const searchPlace = async (params?: Params) => {
  const response: AxiosResponse<Response[]> = await axios.get('/places', {
    params,
  });
  const places: Place[] = response.data.map(place => ({
    ...place,
    location: geoToLatLng(place.location),
  }));
  return sortBy(
    places,
    (place: Place) => -(place.rating / 5 + Math.pow(0.5, place.distance))
  );
};
