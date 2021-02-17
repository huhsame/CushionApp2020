import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Context as PressureContext } from '../context/PressureContext';

const CUSHION_ROW = 6;
const CUSHION_COL = 6;
const MATT_ROW = 29;
const MATT_COL = 15;
const CUSHION_CONTAINER = 50;
const MATT_CONTAINER = 20;
const ITEM_OFFSET = 0.85;

const GraphRealtime = ({ idCM, isCushion, title, isRealtime }) => {
  const { state, startGetingLatestPressure } = useContext(PressureContext);
  const [size, setSize] = useState({});

  const changeColor = value => {
    return colors[Math.floor(value * colors.length)];
  };

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
    console.log(state.pressures);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.graphContainer,
          {
            width: size.width,
            height: size.height,
            flexDirection: 'row',
            flexWrap: 'wrap',
            // backgroundColor: 'yellow',
            alignItems: 'center'
          }
        ]}
      >
        {state.pressures.map((pressure, index) => {
          let r = Math.sqrt(pressure);
          return (
            <View
              key={index}
              style={[
                styles.itemContainer,
                { width: size.container, height: size.container }
              ]}
            >
              <View
                style={[
                  styles.item,
                  {
                    height: size.item * pressure,
                    width: size.item * pressure,
                    borderRadius: size.borderRadius * pressure,
                    backgroundColor: '#66EFEF'
                  }
                ]}
              ></View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    alignItems: 'center', // 좌우 가운데 정렬
    justifyContent: 'center' // 위아래 가운데 정렬
  },

  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GraphRealtime;
