import { Storage } from 'aws-amplify';
import moment from 'moment';

interface Base {
  table: 'dogs' | 'places' | 'feeds';
  label?: string;
  name: string;
}

interface UploadImage extends Base {
  uri: string;
}

interface UploadImages extends Base {
  uris: string[];
}

type S3ResponseType = { key: string };
type ToggleLoading = () => void;

const uploadToS3 = async ({ table, label, name, uri }: UploadImage) => {
  const markDev = __DEV__ ? '__DEV__/' : '';
  const response = await fetch(uri);
  const data = await response.blob();
  const S3Response = (await Storage.put(
    `${markDev}${table}/${label || moment().format('YYYY.MM.DD')}/${name}.png`,
    data,
    { level: 'public', contentType: 'image/png' }
  )) as S3ResponseType;
  return `https://s3.ap-northeast-2.amazonaws.com/wdd-client-file/public/${
    S3Response.key
  }`;
};

export const uploadImage = (data: UploadImage) => async (
  toggleLoading: ToggleLoading
) => {
  await toggleLoading();
  const url = await uploadToS3(data);
  await toggleLoading();
  return url;
};

export const uploadImages = ({
  table,
  label,
  name,
  uris,
}: UploadImages) => async (toggleLoading: ToggleLoading) => {
  await toggleLoading();
  const uriList: string[] = await Promise.all(
    uris.map(async (uri, index) =>
      uploadToS3({ uri, table, label, name: `${name}_${index}` })
    )
  );
  await toggleLoading();
  return uriList;
};
