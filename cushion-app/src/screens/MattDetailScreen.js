import React, { useContext, useRef, useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions
} from 'react-native';

import io from 'socket.io-client';

import { NavigationEvents } from 'react-navigation';

import { GiftedChat } from 'react-native-gifted-chat';

import { Context as PressureContext } from '../context/PressureContext';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as LogContext } from '../context/LogContext';

import Page from '../components/Page';

const INDICATOR_SIZE = 10;

// 애니메이션이고 뭐고 그냥 하는게 낫겠네
// 머리 깨지겠다.
// 한 화면에서 애니메이션으로 여러페이지 보여주는거는 컴포넌트 분리하는게 모르겠어

const PAGES = [
  { key: 0, title: 'REAL TIME' },
  { key: 1, title: 'AN HOUR' },
  { key: 2, title: 'A DAY' },
  { key: 3, title: 'UP & DOWN' }
];

const CushionDetailScreen = ({ navigation }) => {
  const cushionId = navigation.getParam('cushionId');
  const username = navigation.getParam('username');

  const AuthState = useContext(AuthContext).state;
  const { state, startGetingLatestPressure, getIntegral } = useContext(
    PressureContext
  );
  const { getLogs } = useContext(LogContext);
  const LogState = useContext(LogContext).state;

  const [recvMessages, setRecvMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null); // 뭐야 갑자기

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions(); // 이 훅은 꼭 함수 내부에서 사용해야한다. 바깥에서 사용할 수 없음.

  const setHistory = async () => {
    await getLogs(cushionId);

    console.log(LogState.logs);
    // logs.foreach(function(log) {
    //   setRecvMessages(prevState => GiftedChat.append(prevState, log));
    // });
  };

  useEffect(() => {
    socket.current = io(`http://178.128.79.153:11333`); // 소켓 연결
    console.log(AuthState);
    socket.current.emit('enter', { cushionId, userId: AuthState.id });

    setHistory();
    socket.current.on('message', data => {
      console.log('받', data);

      if (data.cushionId !== cushionId) return;
      setRecvMessages(prevState => GiftedChat.append(prevState, data.data));
    });

    return () => socket.current.close();
  }, []); // 처음 한번만 호출할거니까. []

  const onIntroduce = () => {};
  const onSend = messages => {
    console.log('on send', messages);
    const data = messages[0];

    socket.current.emit('message', { cushionId, data });
    // giftedchat이 보내는 모델을 보고 거기서 메세지에 해당하는 부분이 messages[0]. text

    setRecvMessages(prevState => GiftedChat.append(prevState, messages));
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents
        onDidFocus={() => {
          startGetingLatestPressure(cushionId);
          getIntegral(cushionId);
          // getLogs(cushionId);
        }}
      />
      {/* <Button
        onPress={() => getCurrentPressure(cushionId)}
        title="getCurrentData"
      /> */}
      <View style={styles.visualizationContainer}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX
                    }
                  }
                }
              ],
              { useNativeDriver: false } // 이거 추가해줘야해
            )}
            scrollEventThrottle={1}
          >
            {PAGES.map(page => (
              <Page
                key={page.key}
                id={page.key}
                title={page.title}
                pressures={state.pressures}
                start={state.start}
                end={state.end}
                hourIntegrals={state.hourIntegrals}
              />
            ))}
          </ScrollView>
        </View>
        <View style={[styles.indicatorContainer, { width: windowWidth }]}>
          {PAGES.map(({ key }) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (key - 1),
                windowWidth * key,
                windowWidth * (key + 1)
              ],
              outputRange: [INDICATOR_SIZE, INDICATOR_SIZE * 2, INDICATOR_SIZE],
              extrapolate: 'clamp'
            });
            return (
              <Animated.View key={key} style={[styles.indicator, { width }]} />
            );
          })}
        </View>
      </View>

      {/* <View style={[styles.logContainer, { width: windowWidth }]}>
        <Text>log</Text>
      </View> */}

      <View style={{ flex: 1, alignSelf: 'stretch', paddingTop: 15 }}>
        <GiftedChat
          renderUsernameOnMessage
          messages={recvMessages}
          onSend={onSend}
          user={{
            _id: AuthState.id,
            name: username,
            avatar: AuthState.avatar
          }}
        />

        {/* {Platform.OS === 'android' && (
          <KeyboardAvoidingView behavior="padding" />
        )} */}
      </View>
      {/* {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // 좌우 가운데 정렬
    justifyContent: 'center' // 위아래 가운데 정렬
  },

  visualizationContainer: {
    // flex: 0.8,
    height: 300,
    backgroundColor: '#000080',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContainer: {
    height: 300,
    backgroundColor: '#000080',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  indicatorContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#000080'
  },
  indicator: {
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE * 0.5,
    backgroundColor: 'white',
    marginHorizontal: 5
  },

  logContainer: {
    flex: 1,
    marginTop: 30
    // backgroundColor: 'pink'
  }
});

export default CushionDetailScreen;
