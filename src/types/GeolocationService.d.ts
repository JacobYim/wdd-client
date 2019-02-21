interface CurrentPositionOptions {
  timeout?: number; // ms
  maximumAge?: number; // ms
  enableHighAccuracy?: boolean;
  distanceFilter?: number; // m
  showLocationDialog?: boolean;
}

interface WatchOptions {
  enableHighAccuracy?: boolean;
  distanceFilter?: number; // m
  interval?: number; // ms
  fastestInterval?: number; // ms
  showLocationDialog?: boolean;
}

declare module 'react-native-geolocation-service' {
  import { GeolocationReturnType, GeolocationError } from 'react-native';

  const _default: {
    getCurrentPosition: (
      success: (callback: GeolocationReturnType) => void,
      error?: (callback: GeolocationError) => void,
      options?: CurrentPositionOptions
    ) => void;
    watchPosition: (
      success: (callback: GeolocationReturnType) => void,
      error?: (callback: GeolocationError) => void,
      options?: WatchOptions
    ) => number;
    clearWatch: (id: number) => void;
  };
  export default _default;
}
