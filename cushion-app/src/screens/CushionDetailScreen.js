import React, { useContext, useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as PointContext } from '../context/PointContext';

import Page from '../components/Page';

const INDICATOR_SIZE = 10;

const PAGES = [
  { key: 0, title: 'REAL TIME' },
  { key: 1, title: 'AN HOUR' },
  { key: 2, title: 'A DAY' },
  { key: 3, title: 'UP & DOWN' }
];

const CushionDetailScreen = () => {
  const { state, getCurrentPoints, postPoints } = useContext(PointContext);

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();
  // 이 훅은 꼭 함수 내부에서 사용해야한다. 바깥에서 사용할 수 없음.

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={postPoints} title="createData" />
      <Button onPress={getCurrentPoints} title="getCurrentData" />
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
              <Page key={page.key} title={page.title} points={state.points} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.indicatorContainer}>
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

      <View style={[styles.logContainer, { width: windowWidth }]}>
        <Text>log</Text>
      </View>
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
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContainer: {
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  indicatorContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE * 0.5,
    backgroundColor: 'silver',
    marginHorizontal: 5
  },

  logContainer: {
    flex: 1,
    backgroundColor: 'pink'
  }
});

export default CushionDetailScreen;
