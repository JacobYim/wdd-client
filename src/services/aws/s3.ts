import { Storage } from 'aws-amplify';

/**
 * FILE STRUCTURE
 * PRODUCTION  : {table}/{email}/{name}/{type}.png
 * DEVELOPMENT : __DEV__/{table}/{email}/{name}/{type}.png
 */
interface UploadImage {
  table: 'dogs' | 'users' | 'places';
  email: string;
  name: string;
  type: 'thumbnail' | string;
  file: any;
}

type S3ResponseType = { key: string };
type ToggleLoading = () => void;

export const uploadImage = ({
  email,
  table,
  name,
  type,
  file,
}: UploadImage) => async (toggleLoading: ToggleLoading) => {
  if (!file) return '';

  await toggleLoading();
  const markDev = __DEV__ ? '__DEV__/' : '';
  const S3Response = (await Storage.put(
    `${markDev}${table}/${email}/${name}/${type}.png`,
    file,
    { contentType: 'image/png' }
  )) as S3ResponseType;
  await toggleLoading();
  return S3Response.key;
};
