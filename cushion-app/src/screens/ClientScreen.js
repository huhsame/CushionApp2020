import React, { useContext, useRef, useEffect, useState } from 'react';

import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
  Text,
  Input,
  Button,
  Card,
  ListItem,
  Icon
} from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Feather } from '@expo/vector-icons';

// import { Context as AuthContext } from '../context/AuthContext';
import { Context as ClientContext } from '../context/ClientContext';

// import net from 'net';
// const SOCKET_IP = '178.128.79.153';
// const SOCKET_PORT = 11356;
// <Image s source={{ uri: result.thumb }} />

const ClientScreen = ({ navigation }) => {
  // { _id, cushion, matt, name, avatarUrl, age, sex }

  const _id = navigation.getParam('_id'); // client id
  const name = navigation.getParam('name');
  let cushion = navigation.getParam('cushion');
  let matt = navigation.getParam('matt');
  const age = navigation.getParam('age');
  const sex = navigation.getParam('sex');
  const avatarUrl = navigation.getParam('avatarUrl');
  cushion = 2;
  matt = 1001;

  return (
    <View>
      <Card>
        <Card.Title>{name}</Card.Title>

        <Card.Image source={{ uri: avatarUrl }} />
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design. 환자 연락처, 보호자 이름 보호자 연락처 또..
          질환정보? 복용약 정보
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title='VIEW NOW'
        />
      </Card>

      {cushion === -1 || cushion === undefined ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Cushion', { idCM: cushion })}
        >
          <Text h1> Cushion: {cushion}</Text>
        </TouchableOpacity>
      )}
      {matt === -1 || matt === undefined ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Matt', { idCM: matt })}
        >
          <Text h1> Matt: {matt}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('Log', { _id: _id })}
      >
        <Text h1> Log </Text>
      </TouchableOpacity>
    </View>
  );
};

ClientScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('editClient')}>
        <Feather name='plus' size={30} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({});

export default ClientScreen;
