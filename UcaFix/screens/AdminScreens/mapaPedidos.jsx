import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';

export function MapaPedidos(props) {
  const [scale, setScale] = React.useState(1);
  const [previousPinchDistance, setPreviousPinchDistance] = React.useState(null);
  const mapContainerRef = useRef(null);

  const calculateDistance = (x0, y0, x1, y1) => {
    const dx = x1 - x0;
    const dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event) => {
      if (event.nativeEvent.touches.length === 2) {
        const touch1 = event.nativeEvent.touches[0];
        const touch2 = event.nativeEvent.touches[1];
        const pinchDistance = calculateDistance(
          touch1.pageX,
          touch1.pageY,
          touch2.pageX,
          touch2.pageY
        );
        if (previousPinchDistance !== null) {
          const newScale = pinchDistance / previousPinchDistance;
          setScale((prevScale) => prevScale * newScale);
        }
        setPreviousPinchDistance(pinchDistance);
      }
    },
    onPanResponderRelease: () => {
      setPreviousPinchDistance(null);
    },
  });

  const resetScale = () => {
    setScale(1);
  };

  // Define una lista de aulas con arreglos pendientes
  const aulasConArreglosPendientes = ['0-1', '1-7']; // Ejemplo de aulas con arreglos pendientes

  const squares = [];
  const xgridSize = 14;
  const YgridSize = 5; // Ajusta según tus necesidades

  for (let i = 0; i < YgridSize; i++) {
    for (let j = 0; j < xgridSize; j++) {
      const key = `${i}-${j}`;
      const isAulaConArreglosPendientes = aulasConArreglosPendientes.includes(key);
      const isBlueSquare = (i === 0 && (j >= 3 && j <= 10)) || (i === YgridSize - 1 && (j >= 3 && j <= 10));
      const backgroundColor = isAulaConArreglosPendientes ? 'orange' : isBlueSquare ? 'blue' : 'white';
  
      squares.push(
        <View
          key={key}
          style={{ ...styles.littleSquares, backgroundColor }}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetScale} style={styles.resetButton} />
      <View
        ref={mapContainerRef}
        {...panResponder.panHandlers}
        style={{ transform: [{ scale: scale }], ...styles.mapContainer }}
      >
        {squares}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    height: '100%',
    width: '100%',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: 20 * 17,
    height: 20 * 6,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  littleSquares: {
    width: 17,
    height: 17,
    margin: '1%',
  },
});
