import React, {useState} from 'react';
import {View, StyleSheet, Text, PanResponder, Animated} from 'react-native';

export function MapaPedidos(props) {
    const [scale,setScale]=React.useState(1);
    const[previousPinchDistance, setPreviousPinchDistance]=React.useState(null);

    const calculateDistance =(x0,y0,x1,y1)=>{
        const dx= x1-x0;
        const dy=y1-y0;
        return Math.sqrt(dx* dx + dy * dy);

    }
    const panResponder=PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove:(event)=>{
            if(event.nativeEvent.touches.length ===2){
                const touch1 = event.nativeEvent.touches[0]
                const touch2 = event.nativeEvent.touches[1]
                const pinchDistance = calculateDistance(
                    touch1.pageX,
                    touch1.pageY,
                    touch2.pageX,
                    touch2.pageY
                );
                if(previousPinchDistance !== null){
                    const newScale= pinchDistance/previousPinchDistance;
                    setScale((prevScale)=> prevScale* newScale);
                }
                setPreviousPinchDistance(pinchDistance)

            }
        },
        onPanResponderRelease: ()=>{
            setPreviousPinchDistance(null)
        },
    })
    const squares = [];
  const gridSize = 8; // Adjust as needed
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      squares.push(
        <View
          key={`${i}-${j}`}
          style={{
            width: 30, // Adjust the square size as needed
            height: 30,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
          }}
        />
      );
    }
  }
    return (
        <View style={styles.container}>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ scale: scale }],
            backgroundColor: 'blue',
            width: 300, // Adjust the rectangle size as needed
            height: 300,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {squares}
        </Animated.View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    square: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });