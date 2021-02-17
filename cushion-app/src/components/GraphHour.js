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

const GraphHour = ({ idCM, isCushion, title, isRealtime }) => {
  const { state } = useContext(PressureContext);
  const [size, setSize] = useState({});

  const changeColor = value => {
    const total = colors.length;
    let index = Math.floor(total - total * value);
    index === 31 ? (index = 30) : index;
    console.log('color index: ' + index);
    return colors[index];
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
    console.log(state.hourIntegrals);
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
          // backgroundColor: 'yellow',
          alignItems: 'center'
        }
      ]}
    >
      {state.hourIntegrals.map((hourIntegral, index) => {
        console.log(hourIntegral);
        let color = changeColor(hourIntegral);
        console.log(color);
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
                  backgroundColor: color,
                  height: size.item * 0.8,
                  width: size.item * 0.8,
                  borderRadius: size.borderRadius * 0.8
                }
              ]}
            ></View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'yellow',
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
    // backgroundColor: 'blue',

    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GraphHour;
