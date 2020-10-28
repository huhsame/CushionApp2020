import React from 'react';

import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Text } from 'react-native-elements';

const GRAPH_WH = 210; // 6의 배수로 해야 쓸데없이 그 숫자때문에 고생안한다.
const GRAPH_ROWS = 6;
const ITEM_CONTAINER_WH = GRAPH_WH / GRAPH_ROWS;
const ITEM_OFFSET = 0.85;
const ITEM_WH = ITEM_CONTAINER_WH * ITEM_OFFSET;
const ITEM_BORDER_RADIUS = ITEM_WH * 0.5;

const colors = [
  '#ff0000',
  '#ff1100',
  '#ff2200',
  '#ff3300',
  '#ff4400',
  '#ff5500',
  '#ff6600',
  '#ff7700',
  '#ff8800',
  '#ff9900',
  '#ffaa00',
  '#ffbb00',
  '#ffcc00',
  '#ffdd00',
  '#ffee00',
  '#ffff00',
  '#eeff00',
  '#ddff00',
  '#ccff00',
  '#bbff00',
  '#aaff00',
  '#99ff00',
  '#88ff00',
  '#77ff00',
  '#66ff00',
  '#55ff00',
  '#44ff00',
  '#33ff00',
  '#22ff00',
  '#11ff00',
  '#00ff00'
];

// const PAGES = [
//   { key: 0, title: 'REAL TIME' },
//   { key: 1, title: 'AN HOUR' },
//   { key: 2, title: 'A DAY' },
//   { key: 3, title: 'UP & DOWN' }
// ];

const Page = ({ id, title, pressures, start, end, hourIntegrals }) => {
  const { width: windowWidth } = useWindowDimensions();

  const changeColor = value => {
    return colors[Math.floor(value * colors.length)];
  };

  return (
    <View
      style={[
        { width: windowWidth, height: windowWidth - 30 },
        styles.pageContainer
      ]}
      id={id}
    >
      <Text h4 style={styles.pageText}>
        {' '}
        {title}{' '}
      </Text>
      <View style={styles.graphContainer}>
        {id === 0
          ? pressures.map((pressure, index) => {
              return (
                <View key={index} style={styles.itemContainer}>
                  <View
                    style={[
                      styles.item,
                      {
                        height: ITEM_WH * pressure,
                        width: ITEM_WH * pressure,
                        borderRadius: ITEM_BORDER_RADIUS * pressure,
                        backgroundColor: '#00ffff'
                      }
                    ]}
                  ></View>
                </View>
              );
            })
          : id === 1
          ? hourIntegrals.map((hourIntegral, index) => {
              return (
                <View key={index} style={styles.itemContainer}>
                  <View
                    style={[
                      styles.item,
                      {
                        backgroundColor: changeColor(hourIntegral),
                        height: ITEM_WH * 0.8,
                        width: ITEM_WH * 0.8,
                        borderRadius: ITEM_BORDER_RADIUS * 0.8
                      }
                    ]}
                  ></View>
                </View>
              );
            })
          : null}

        {/*         
        {id === 1 ? (
          <Item id={id} values={pressures} />
        ) : id === 2 ? (
          <Item id={id} values={integralsHour} />
        ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: 300,
    flex: 1,
    // borderColor: 'green',
    // borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  pageText: {
    // fontSize: 20,
    marginTop: 3,
    color: 'white'
    // backgroundColor: 'yellow'
  },
  graphContainer: {
    width: GRAPH_WH,
    height: GRAPH_WH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'grey',
    alignItems: 'center'
  },
  itemContainer: {
    width: ITEM_CONTAINER_WH,
    height: ITEM_CONTAINER_WH,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Page;
