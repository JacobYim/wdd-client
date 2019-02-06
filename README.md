# 우리동네댕댕이

### 개발환경

- React Native + Typescript

### 준비사항

> ios는 MacOS와 Xcode가 설치되어 있는 환경에서만 실행 가능

1. `npm` 혹은 `yarn` 설치
2. `cocoapod` 설치

### 실행하기

1. `~$ git clone https://github.com/JWWon/wdd-client.git`
2. `~$ cd wdd-client`
3. `~/wdd-client$ npm install`
4. `~/wdd-client$ cd ios && pod install && cd ..`
5. `~/wdd-client& npm run dev`
6. 컴퓨터에 아이폰 혹은 안드로이드 연결
7. `~/wdd-client$ react-native run-android` or `react-native run-ios`

### 사용 방법

- 디버깅 모드
  - iOS : `CMD` + `D` 혹은 `핸드폰 흔들기` -> Debug JS Remotely
  - Android : `CMD` + `M` 혹은 `핸드폰 흔들기` -> Debug JS Remotely
