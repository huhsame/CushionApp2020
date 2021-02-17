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

const ClientLogScreen = ({ navigation }) => {
  //간호사랑 환자정보랑 여러간호사

  // 환자 정보
  const username = navigation.getParam('username');
  const _id = navigation.getParam('_id');

  // 간호사 정보
  const AuthState = useContext(AuthContext).state;
  const { state, setRecentLogs, getEalierLogs } = useContext(LogContext);

  const [chatMessages, setchatMessages] = useState([]);
  // 여기서 []가 아니라 디비에서 불러와줘야겠지.... 음.. 그러면 어떻게해야하나.
  // 처음에 20개정도 불러오고
  // 20개씩 앞에다가 추가해줘야하나 ?
  // 앞에다가 추가하는거는 어떻게 하는거지?

  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null); // 뭐야 갑자기

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 맨처음 최근 로그 20개 보여주는 화면으로 초기화
    setRecentLogs({ client: _id });
    setchatMessages(prevChatMessages =>
      GiftedChat.append(prevChatMessages, state.logs)
    );

    // 소켓 연결
    socket.current = io(`http://178.128.79.153:11333`); // 소켓 연결
    socket.current.emit('enter', { client: _id, userId: AuthState.id });

    // 메세지 받았을때 이벤트 핸들러
    socket.current.on('message', message => {
      if (message.client !== _id) return;

      // 챗 리스트 마지막에 메세지 추가
      setchatMessages(prevChatMessages =>
        GiftedChat.append(prevChatMessages, message.data)
      );
    });

    return () => socket.current.close();
  }, []);

  const onSend = messages => {
    console.log('on send', messages);
    const data = messages[0];

    socket.current.emit('message', { client: _id, data });
    // giftedchat이 보내는 모델을 보고 거기서 메세지에 해당하는 부분이 messages[0]. text

    setchatMessages(prevChatMessages =>
      GiftedChat.append(prevChatMessages, messages)
    );
  };

  const onLoadEarlier = () => {
    const current =
      state.earlierLogs === null ? state.logs[0]._id : state.earlierLogs[0]._id;
    getEalierLogs({ idCM: _id, current });
    // 여기 콜백으로 처리해야하나?
    setchatMessages(prevChatMessages =>
      GiftedChat.append(state.earlierLogs, prevChatMessages)
    );
  };

  return (
    <GiftedChat
      infiniteScroll
      loadEarlier
      // isLoadingEarlier={false}
      onLoadEarlier={onLoadEarlier}
      renderUsernameOnMessage
      messages={chatMessages}
      onSend={onSend}
      user={{
        _id: AuthState.id,
        name: AuthState.name,
        avatar: AuthState.avatar
      }}
    />
  );
};

// onLoadEarlier (Function) - Callback when loading earlier messages
// isLoadingEarlier (Bool) - Display an ActivityIndicator when loading earlier messages

// renderLoadEarlier (Function) - Custom "Load earlier messages" button

export default ClientLogScreen;
