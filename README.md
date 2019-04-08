# 우리동네댕댕이

### 개발환경

- React Native + Typescript

### 준비사항

> iOS는 MacOS와 Xcode가 설치되어 있는 환경에서만 실행 가능

1. `npm` 혹은 `yarn` 설치
2. `cocoapod` 설치
3. `aws configure` 실행

### 실행하기

1. `~$ git clone https://github.com/JWWon/wdd-client.git`
2. `~$ cd wdd-client`
3. `~/wdd-client$ npm install`
4. `~/wdd-client$ cd ios && pod install && cd ..`
5. `android/Gradle Scripts(android-react-native-maps)` 에 다음 추가

```
{
  dependencies {
    ...,
    implementation "com.android.support:support-media-compat:${rootProject.ext.supportLibVersion}"
    implementation "com.android.support:support-v4:${rootProject.ext.supportLibVersion}"
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
  }
}
```

6. `~/wdd-client$ amplify push` (AWS Amplify 세팅)
7. `~/wdd-client$ npm run dev`
8. 서비스 실행

- Android
  1. 에뮬레이터 혹은 안드로이드 디바이스 연결
  2. `~/wdd-client$ react-native run-android`
- iOS
  - 시뮬레이터
    1. `~/wdd-client$ react-native run-ios`
  - 아이폰 디바이스
    1. 디바이스 연결
    2. `~/wdd-client$ open ios/WddClient.xcworkspace`
    3. Xcode에서 디바이스 선택 및 실행

### 사용 방법

- 디버깅 모드
  - iOS : `CMD` + `D` 혹은 `핸드폰 흔들기` -> Debug JS Remotely
  - Android : `CMD` + `M` 혹은 `핸드폰 흔들기` -> Debug JS Remotely
