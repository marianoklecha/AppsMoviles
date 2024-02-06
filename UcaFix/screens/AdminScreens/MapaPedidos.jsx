import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';
export function MapaPedidos(props) {
  const [scale, setScale] = React.useState(1);
  const [previousPinchDistance, setPreviousPinchDistance] = React.useState(null);
  const [translateX] = useState(new Animated.Value(0)); // Para el desplazamiento en X
  const [translateY] = useState(new Animated.Value(0)); // Para el desplazamiento en Y
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const mapContainerRef = useRef(null);

  const calculateDistance = (x0, y0, x1, y1) => {
    const dx = x1 - x0;
    const dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
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
      } else if (event.nativeEvent.touches.length === 1) {
        const dx = gestureState.dx;
        const dy = gestureState.dy;
  
        // Ajusta la velocidad de arrastre disminuyendo en función de la escala actual
        const adjustedDx = dx / scale;
        const adjustedDy = dy / scale;
  
        translateX.setValue(adjustedDx + lastPosition.x);
        translateY.setValue(adjustedDy + lastPosition.y);
      }
    },
    onPanResponderRelease: () => {
      setLastPosition({ x: translateX._value, y: translateY._value });
      setPreviousPinchDistance(null);
    },
  });
  
  
  

  const resetScale = () => {
    setScale(1);
  };
  const opacity = new Animated.Value(0);
  const animationConfig = {
    toValue: 1,         
    duration: 450,     
    useNativeDriver: true,
  };
  const animations = Array.from({ length: 5 }, (_, index) => {
    return Animated.timing(opacity, {
      ...animationConfig,
    });
  });
  const loopAnimation = Animated.loop(
    Animated.sequence(animations), // Repeats the sequence animation 5 times
  );
  const sequenceAnimation = Animated.sequence(animations);
  // Define una lista de aulas con arreglos pendientes
  const aulasConArreglosPendientes = ['0-1', '2-6', '3-9','2-3']; // Ejemplo de aulas con arreglos pendientes
  const aulasConUnoODosPedidosPendientes = ['0-1'];
  const aulasConTresCuatroPedidosPendientes = ['2-6', '3-9'];
  const aulasConCincoOMasPedidosPendientes = ['2-3'];

  const squares = [];
  const xgridSize = 14;
  const YgridSize = 5; // Ajusta según tus necesidades
  const determinarColor = (key) => {
    if(aulasConUnoODosPedidosPendientes.includes(key))
      return '#FFE932'
    else if (aulasConTresCuatroPedidosPendientes.includes(key))
      return '#FF9932'
    else
      if (aulasConCincoOMasPedidosPendientes.includes(key))
      return '#FF3232'

  }

  for (let i = 0; i < YgridSize; i++) {
    for (let j = 0; j < xgridSize; j++) {
      const key = `${i}-${j}`;
      const isAulaConArreglosPendientes = aulasConArreglosPendientes.includes(key);
      const isBlueSquare = (i === 0 && (j >= 3 && j <= 10)) || (i === YgridSize - 1 && (j >= 3 && j <= 10));
      const backgroundColor = isAulaConArreglosPendientes ? determinarColor(key) : isBlueSquare ? 'blue' : 'white';
  
      if (isAulaConArreglosPendientes) {
        squares.push(
          <TouchableOpacity style={{marginTop:3.1, marginHorizontal:3.4,  width: 17,
            height: 17}}  onPress={() => props.navigation.navigate('ListaPedidos')} key={key}>
            <Animated.View
              style={{
                ...styles.littleSquares,
                backgroundColor,
                opacity: opacity,
              }}
            >
            </Animated.View>
          </TouchableOpacity>
        );
        
        // Start the sequence animation
        loopAnimation.start();
      } else {
        squares.push(
          <View
            key={key}
            style={{ ...styles.littleSquares, backgroundColor }}
          />
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetScale} style={styles.resetButton} />
      <Animated.View
        ref={mapContainerRef}
        {...panResponder.panHandlers}
        style={[
          styles.mapContainer,
          {
            transform: [{ scale: scale }, { translateX }, { translateY }],
          },
        ]}
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
  // resetButton: {
  //   position: 'absolute',
  //   backgroundColor: 'lightgray',
  //   padding: 10,
  //   borderRadius: 5,
  //   height: '100%',
  //   width: '100%',
  // },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: 20 * 17,
    height: 20 * 6 +2,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft:4,
    paddingVertical:2,
  },
  littleSquares: {
    width: 17,
    height: 17,
    margin: '1%'
  },
});
