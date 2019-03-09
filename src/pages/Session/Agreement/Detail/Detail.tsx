import React from 'react';
import { Image, Modal, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import TopNavbar from 'src/components/module/TopNavbar';

interface Props {
  hideDetail: () => void;
  detail?: {
    title: string;
    link: string;
  };
}

const Detail: React.FC<Props> = ({ hideDetail, detail }) => (
  <Modal
    visible={detail !== undefined}
    transparent={false}
    animationType="slide">
    {detail && (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavbar
          left={{
            handlePress: hideDetail,
            view: (
              <Image
                source={require('src/assets/icons/ic_back.png')}
                style={{
                  width: 18,
                  height: 16,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
          center={detail.title}
          showBorder={true}
        />
        <WebView source={{ uri: detail.link }} style={{ flex: 1 }} />
      </SafeAreaView>
    )}
  </Modal>
);

export default Detail;
