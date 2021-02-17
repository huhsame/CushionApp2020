import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import GraphHour from '../components/GraphHour';
import { Context as PressureContext } from '../context/PressureContext';

const CushionHourScreen = ({ navigation }) => {
  const idCM = navigation.getParam('idCM');
  console.log(idCM);

  const { getIntegral } = useContext(PressureContext);

  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <NavigationEvents
          onDidFocus={() => {
            getIntegral(idCM);
          }}
        />
        <GraphHour
          idCM={idCM}
          isCushion
          isRealtime={false}
          title='Matt Realtime'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  graphContainer: {
    flex: 1,
    alignItems: 'center', // 좌우 가운데 정렬
    justifyContent: 'center', // 위아래 가운데 정렬
    backgroundColor: '#01194f'
  },
  title: {
    marginBottom: 2
  }
});

CushionHourScreen.navigationOptions = ({ navigation }) => {
  return {
    titie: 'Cushion Hour'
  };
};

export default CushionHourScreen;
