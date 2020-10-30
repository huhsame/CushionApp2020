import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import RealtimeMap from '../components/RealtimeMap';

const MattRealtimeScreen = ({ id }) => {
  return (
    <View>
      <RealtimeMap id={id} isCushion={false} title='Matt Realtime' />
    </View>
  );
};

export default MattRealtimeScreen;
