import { Storage } from 'aws-amplify';

/**
 * FILE STRUCTURE
 * PRODUCTION  : {table}/{email}/{name}/{type}.png
 * DEVELOPMENT : __DEV__/{table}/{email}/{name}/{type}.png
 */
interface UploadImage {
  table: 'dogs' | 'places' | 'feeds';
  name: string;
  type: 'thumbnail' | string;
  uri: string;
}

type S3ResponseType = { key: string };
type ToggleLoading = () => void;

export const uploadImage = ({ table, name, type, uri }: UploadImage) => async (
  toggleLoading: ToggleLoading
) => {
  await toggleLoading();
  const response = await fetch(uri);
  const file = await response.blob();
  const S3Response = (await Storage.put(
    `${__DEV__ ? '__DEV__/' : ''}${table}/${name}/${type}.png`,
    file,
    { level: 'public', contentType: 'image/png' }
  )) as S3ResponseType;
  await toggleLoading();
  return S3Response.key;
};
