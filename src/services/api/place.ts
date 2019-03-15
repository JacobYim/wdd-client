import axios from 'axios';

interface Place {
  name: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  address: string;
  rating: number;
  images: string[];
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

interface Search {
  coordinates?: [number, number];
  name?: string;
  range?: string; // km
}

export const searchPlace = async (params?: Search) => {
  const response = await axios.get('/places', { params });
  return response.data as Place[];
};
