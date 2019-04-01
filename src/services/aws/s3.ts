import { Storage } from 'aws-amplify';

interface UploadImage {
  table: 'dogs' | 'places' | 'feeds';
  email?: string;
  name: string;
  uri: string;
}

interface UploadImages {
  table: 'places' | 'feeds';
  email?: string;
  name: string;
  uris: string[];
}

type S3ResponseType = { key: string };
type ToggleLoading = () => void;

export const uploadImage = ({ table, email, name, uri }: UploadImage) => async (
  toggleLoading: ToggleLoading
) => {
  await toggleLoading();
  const response = await fetch(uri);
  const file = await response.blob();
  const S3Response = (await Storage.put(
    `${__DEV__ ? '__DEV__/' : ''}${table}/${
      email ? `${email}/` : ''
    }${name}.png`,
    file,
    { level: 'public', contentType: 'image/png' }
  )) as S3ResponseType;
  await toggleLoading();
  return S3Response.key;
};

export const uploadImages = ({
  table,
  email,
  name,
  uris,
}: UploadImages) => async (toggleLoading: ToggleLoading) => {
  await toggleLoading();
  const uriList: string[] = [];
  uris.forEach(async (uri, index) => {
    const response = await fetch(uri);
    const file = await response.blob();
    const S3Response = (await Storage.put(
      `${__DEV__ ? '__DEV__/' : ''}${table}/${
        email ? `${email}/` : ''
      }${name}_${index}.png`,
      file,
      { level: 'public', contentType: 'image/png' }
    )) as S3ResponseType;
    uriList.push(S3Response.key);
  });
  await toggleLoading();
  return uriList;
};
