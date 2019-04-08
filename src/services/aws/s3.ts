import { Storage } from 'aws-amplify';
import moment from 'moment';
import awsmobile from 'src/aws-exports';

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
  const key = `${markDev}${table}/${label ||
    moment().format('YYYY.MM.DD')}/${name}.png`;
  const S3Response = (await Storage.put(key, data, {
    level: 'public',
    contentType: 'image/png',
  })) as S3ResponseType;
  return `https://s3.ap-northeast-2.amazonaws.com/${
    awsmobile.aws_user_files_s3_bucket
  }/public/${S3Response.key}`;
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
