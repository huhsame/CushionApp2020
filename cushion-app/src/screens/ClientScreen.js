import React, { useContext, useRef, useEffect, useState } from 'react';

import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Feather } from '@expo/vector-icons';

import { Context as AuthContext } from '../context/AuthContext';

// import net from 'net';
// const SOCKET_IP = '178.128.79.153';
// const SOCKET_PORT = 11356;
// <Image s source={{ uri: result.thumb }} />

const ClientScreen = ({ navigation }) => {
  return (
    <View>
      <Text h3> client </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('cushionFlow', { id: null })}
      >
        <Text h1> Cushion </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('mattFlow', { id: null })}
      >
        <Text h1> Matt </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Log', { id: null })}
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
