import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

import RealtimeMap from '../components/RealtimeMap';

const CushionRealtimeScreen = ({ id }) => {
  return (
    <View>
      <RealtimeMap id={id} isCushion={true} title='Cushion Realtime' />
    </View>
  );
};

export default CushionRealtimeScreen;
