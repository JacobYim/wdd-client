import { LatLng } from 'react-native-maps';

export function calcDistance(pos_x: LatLng, pos_y: LatLng) {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((pos_y.latitude - pos_x.latitude) * p) / 2 +
    (c(pos_x.latitude * p) *
      c(pos_y.latitude * p) *
      (1 - c((pos_y.longitude - pos_x.longitude) * p))) /
      2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
