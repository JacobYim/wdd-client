import { Linking, Platform } from 'react-native';

const createError = (msg = '') => Promise.reject(new Error(msg));

const openLink = (url: string) => {
  return Linking.canOpenURL(url).then(canOpen => {
    if (!canOpen) {
      return createError(`invalid URL provided: ${url}`);
    } else {
      return Linking.openURL(url).catch(err => Promise.reject(err));
    }
  });
};

const call = (args: { number: string; prompt?: boolean }) => {
  const settings = Object.assign({ prompt: true }, args);
  if (!settings.number) {
    return createError('no number provided');
  }
  if (typeof settings.number !== 'string') {
    return createError('number should be string');
  }
  if (typeof settings.prompt !== 'boolean') {
    return createError('prompt should be bool');
  }

  const url = `${
    Platform.OS === 'ios' && settings.prompt ? 'telprompt:' : 'tel:'
  }${settings.number.replace(/-/g, '')}`;

  return openLink(url);
};

export default call;
