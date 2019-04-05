import React from 'react';
import { Image, Modal, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import TopNavbar from 'src/components/module/TopNavbar';

interface Props {
  hideModal: () => void;
  data?: {
    title: string;
    link: string;
  };
}

const Detail: React.FC<Props> = ({ hideModal, data }) => (
  <Modal visible={data !== undefined} transparent={false} animationType="slide">
    {data && (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavbar
          left={{
            handlePress: hideModal,
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
          center={data.title}
          showBorder={true}
        />
        <WebView source={{ uri: data.link }} style={{ flex: 1 }} />
      </SafeAreaView>
    )}
  </Modal>
);

export default Detail;
