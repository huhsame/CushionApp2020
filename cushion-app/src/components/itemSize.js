import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as PressureContext } from '../context/PressureContext';

const CUSHION_ROW = 6;
const CUSHION_COL = 6;
const MATT_ROW = 29;
const MATT_COL = 15;
const CUSHION_CONTAINER = 50;
const MATT_CONTAINER = 20;
const ITEM_OFFSET = 0.85;

const RealtimeMap = ({ idCM, isCushion, title }) => {
  const { state, startGetingLatestPressure } = useContext(PressureContext);
  const [size, setSize] = useState({});
  const initMap = () => {
    let row = 0;
    let col = 0;
    let container = 0;

    if (isCushion) {
      row = CUSHION_ROW;
      col = CUSHION_COL;
      container = CUSHION_CONTAINER;
    } else {
      row = MATT_ROW;
      col = MATT_COL;
      container = MATT_CONTAINER;
    }

    let width = col * container;
    let height = row * container;
    let item = container * ITEM_OFFSET;
    let borderRadius = item * 0.5;
    console.log(width, height, container, item, borderRadius);
    setSize({ width, height, container, item, borderRadius });
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          width: size.width,
          height: size.height,
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: 'yellow',
          alignItems: 'center'
        }
      ]}
    >
      {state.pressures.map((pressure, index) => {
        return (
          <View
            key={index}
            style={[
              styles.itemContainer,
              { width: size.container, height: size.container }
            ]}
          >
            {isCushion ? (
              <View
                style={[
                  styles.item,
                  {
                    height: size.item * pressure,
                    width: size.item * pressure,
                    borderRadius: size.borderRadius * pressure,
                    backgroundColor: '#00ffff'
                  }
                ]}
              ></View>
            ) : (
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
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center', // 좌우 가운데 정렬
    justifyContent: 'center' // 위아래 가운데 정렬
  },

  // pageContainer: {
  //   height: 300,
  //   flex: 1,
  //   borderColor: 'green',
  //   borderWidth: 3,
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: 15
  // },
  // pageText: {
  //   // fontSize: 20,
  //   marginTop: 3,
  //   color: 'white',
  //   backgroundColor: 'yellow'
  // },
  // graphContainer: {
  //   // width: GRAPH_W,
  //   // height: GRAPH_H,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   backgroundColor: 'grey',
  //   alignItems: 'center'
  // },
  itemContainer: {
    backgroundColor: 'blue',

    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RealtimeMap;
