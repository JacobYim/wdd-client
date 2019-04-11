import axios, { AxiosResponse } from 'axios';
import { sortBy } from 'lodash';
import { LatLng } from 'react-native-maps';
import { Place, PlaceResponse } from 'src/store/actions/place';

export interface SearchParams {
  keyword?: string;
  label?: '카페' | '식당' | '술집' | '용품' | '병원' | '기타';
  location?: LatLng;
  range?: number; // km
}

const clientToAPI = ({ location, ...params }: SearchParams) => {
  const payload: any = { ...params };
  if (location !== undefined) {
    payload.coordinates = JSON.stringify([
      location.longitude,
      location.latitude,
    ]);
  }
  return payload;
};

const apiToClient = (place: PlaceResponse) =>
  ({
    ...place,
    location: {
      latitude: place.location.coordinates[1],
      longitude: place.location.coordinates[0],
    },
  } as Place);

export const searchPlace = async (p: SearchParams) => {
  const response: AxiosResponse<PlaceResponse[]> = await axios.get('/places', {
    params: clientToAPI(p),
  });
  const places = response.data.map(apiToClient);
  return sortBy(
    places,
    (place: Place) => -(place.rating / 5 + Math.pow(0.5, place.distance))
  );
};

export const getScraps = async (params: { places: string[] }) => {
  const response: AxiosResponse<PlaceResponse[]> = await axios.get('/places', {
    params: { places: JSON.stringify(params.places) },
  });
  const places = response.data.map(apiToClient);
  return places;
};

interface Query {
  id: string;
}

export const scrap = async ({ id }: Query) => {
  const response: AxiosResponse<PlaceResponse> = await axios.patch(
    `/places/${id}/scrap`
  );
  return apiToClient(response.data);
};

export const unScrap = async ({ id }: Query) => {
  const response: AxiosResponse<PlaceResponse> = await axios.delete(
    `/places/${id}/scrap`
  );
  return apiToClient(response.data);
};
