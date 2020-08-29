import React, { useContext, useEffect } from 'react';

import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Text } from 'react-native-elements';

const GRAPH_WH = 240; // 6의 배수로 해야 쓸데없이 그 숫자때문에 고생안한다.
const GRAPH_ROWS = 6;
const ITEM_CONTAINER_WH = GRAPH_WH / GRAPH_ROWS;
const ITEM_OFFSET = 0.75;
const ITEM_WH = ITEM_CONTAINER_WH * ITEM_OFFSET;
const ITEM_BORDER_RADIUS = ITEM_WH * 0.5;

const ITEM_RATIO = 1; // 임시값. 밑에서 함수로 처리해줘야함. // 0.1 ~ 1

// 실시간으로 받아오려면 소켓으로 해야하는건가 ?

const Page = ({ key, title, points }) => {
  const { width: windowWidth } = useWindowDimensions();
  console.log(points);
  return (
    <View
      style={[
        { width: windowWidth, height: windowWidth - 30 },
        styles.pageContainer
      ]}
      key={key}
    >
      <Text style={styles.pageText}> {title} </Text>
      <View style={styles.graphContainer}>
        {points.map((point, index) => {
          return (
            <View style={styles.itemContainer}>
              <View
                style={[
                  styles.item,
                  {
                    height: ITEM_WH * point.pressure,
                    width: ITEM_WH * point.pressure,
                    borderRadius: ITEM_BORDER_RADIUS * point.pressure
                  }
                ]}
              >
                {/* 여기 그 스타일에 round 값을 변수로 계속 변경해줘야함 */}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  pageText: {
    fontSize: 20,
    marginTop: 5
  },
  graphContainer: {
    width: GRAPH_WH,
    height: GRAPH_WH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    // marginBottom: 30,
    alignItems: 'center'
  },
  itemContainer: {
    width: ITEM_CONTAINER_WH,
    height: ITEM_CONTAINER_WH,
    // borderColor: 'red',
    // borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    // 여기서 말고 코드 내부에서 변수로 조절 (state로 )

    // width: ITEM_WH * ITEM_OFFSET * ITEM_RATIO,
    // height: ITEM_WH * ITEM_OFFSET * ITEM_RATIO,
    // borderRadius: ITEM_WH * ITEM_OFFSET * ITEM_RATIO * 0.5,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Page;
