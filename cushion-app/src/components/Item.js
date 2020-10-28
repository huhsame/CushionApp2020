// import React from 'react';

// import { StyleSheet, View } from 'react-native';

// const GRAPH_WH = 240; // 6의 배수로 해야 쓸데없이 그 숫자때문에 고생안한다.
// const GRAPH_ROWS = 6;
// const ITEM_CONTAINER_WH = GRAPH_WH / GRAPH_ROWS;
// const ITEM_OFFSET = 0.85;
// const ITEM_WH = ITEM_CONTAINER_WH * ITEM_OFFSET;
// const ITEM_BORDER_RADIUS = ITEM_WH * 0.5;

// const colors = [
//   0xff0000,
//   0xff1100,
//   0xff2200,
//   0xff3300,
//   0xff4400,
//   0xff5500,
//   0xff6600,
//   0xff7700,
//   0xff8800,
//   0xff9900,
//   0xffaa00,
//   0xffbb00,
//   0xffcc00,
//   0xffdd00,
//   0xffee00,
//   0xffff00,
//   0xeeff00,
//   0xddff00,
//   0xccff00,
//   0xbbff00,
//   0xaaff00,
//   0x99ff00,
//   0x88ff00,
//   0x77ff00,
//   0x66ff00,
//   0x55ff00,
//   0x44ff00,
//   0x33ff00,
//   0x22ff00,
//   0x11ff00,
//   0x00ff00
// ];
// const Item = ({ id, values }) => {
//   console.log(values);
//   // 0.1~1
//   const changeColor = value => {
//     console.log(Math.floor(value * colors.length));
//     console.log(colors.length - Math.floor(value * colors.length));
//     return colors[colors.length - Math.floor(value * colors.length)];
//   };
//   return (
//     <>
//       {values.map((value, index) => {
//         return (
//           <View key={index} style={styles.itemContainer}>
//             {id === 1 ? (
//               <View
//                 style={[
//                   styles.item,
//                   {
//                     height: ITEM_WH * value,
//                     width: ITEM_WH * value,
//                     borderRadius: ITEM_BORDER_RADIUS * value,
//                     backgroundColor: 'blue'
//                   }
//                 ]}
//               ></View>
//             ) : id === 2 ? (
//               <View
//                 style={[
//                   styles.item,
//                   {
//                     height: ITEM_WH,
//                     width: ITEM_WH,
//                     borderRadius: ITEM_BORDER_RADIUS,
//                     backgroundColor: changeColor(value)
//                   }
//                 ]}
//               ></View>
//             ) : null}
//           </View>
//         );
//       })}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     width: ITEM_CONTAINER_WH,
//     height: ITEM_CONTAINER_WH,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   item: {
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });

// export default Item;
