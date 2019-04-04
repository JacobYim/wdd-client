import axios, { AxiosResponse } from 'axios';
import { sortBy } from 'lodash';
import { LatLng } from 'react-native-maps';
import { GeoJSON, Place, PlaceResponse } from 'src/store/actions/place';

export interface Params {
  keyword?: string;
  label?: '카페' | '용품' | '병원' | '기타';
  location?: LatLng;
  range?: number; // km
}

const geoToLatLng = ({ coordinates }: GeoJSON) =>
  ({
    latitude: coordinates[1],
    longitude: coordinates[0],
  } as LatLng);

export const searchPlace = async (params?: Params) => {
  const response: AxiosResponse<PlaceResponse[]> = await axios.get('/places', {
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

interface Query {
  id: string;
}

export const scrap = async ({ id }: Query) => {
  const response: AxiosResponse<PlaceResponse> = await axios.patch(
    `/places/${id}/scrap`
  );
  return response.data;
};

export const unScrap = async ({ id }: Query) => {
  const response: AxiosResponse<PlaceResponse> = await axios.delete(
    `/places/${id}/scrap`
  );
  return response.data;
};
