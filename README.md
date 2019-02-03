# 우리동네댕댕이

### 개발환경

- React Native + Typescript

### 실행하기

1. `~$ git clone https://github.com/JWWon/wdd-client.git`
2. `~$ cd wdd-client`
3. `~/wdd-client$ npm install`
4. `~/wdd-client$ react-native link`
5. `~/wdd-client$ react-native run-android` or `react-native run-ios`

   > run-android는 에뮬레이터 / 실제 디바이스가 연결된 이후에 실행

   > run-ios는 macOS에서 XCode 설치 후 실행 가능

### 참고

1. iOS에서 DaumMap SDK를 정상적으로 불러오지 못하는 현상때문에, iOS용 SDK를 `node_modules/react-native-daummap/ios` 에 추가해주어야 한다. [관련 논의 내용](https://github.com/asata/react-native-daummap/issues/1)
2. Android는 에뮬레이터에서 돌아가지 않는다. [관련 논의 내용](https://github.com/asata/react-native-daummap/issues/5)
