import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, PanResponder, Animated, TouchableOpacity, Alert } from 'react-native';

const API_URL = "http://localhost:3000";

export function MapaPedidos({ piso, edificioId, ...props }) {
  const [localEdificioId, setLocalEdificioId] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [scale, setScale] = useState(1);
  const [previousPinchDistance, setPreviousPinchDistance] = useState(null);
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  const [lastPosition, setLastPosition] = useState({ x: 0, y: -2 });

  const touchStartTimeRef = useRef(null); 
  const blinkAnimation = useRef(new Animated.Value(0)).current;
  const mapContainerRef = useRef(null);
  const propsUserData = props.route.params.userData;

  useEffect(() => {
    setLocalEdificioId(edificioId);
    startBlinkAnimation();
  }, [edificioId]);

  useEffect(() => {
    if (localEdificioId !== null && localEdificioId !== 0) {
      fetchPedidos();
    }
  }, [localEdificioId]);

  useEffect(() => {
    if (pedidos.length > 0) {
      generateSquares();
      startBlinkAnimation();
    }
  }, [pedidos]);

  useEffect(() => {
    startBlinkAnimation();
  }, [edificioId,piso,props]);
  
  const startBlinkAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  const fetchPedidos = async () => {
    try {
      const response = await fetch(API_URL + `/pedidos/getPedidosPendientes`);
      if (response.ok) {
        const data = await response.json();
        setPedidos(data.filter(pedido => pedido.edificioId === localEdificioId)); // Filter pedidos based on localEdificioId
      } else {
        Alert.alert("Error", "Failed to fetch pedidos");
      }

    } catch (error) {
      console.error("Error fetching pedidos: ", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const generateSquares = () => {
    const floors = {
      '1': {},
      '2': {},
      '3': {},
      '4': {},
    };
  
    for (let floor in floors) {
      for (let i = parseInt(floor) * 100; i <= parseInt(floor) * 100 + 66; i++) { 
        floors[floor][i.toString()] = 0;
      }
    }
  
    pedidos.forEach(pedido => {
      const floor = pedido.piso.startsWith('1') ? '1' : pedido.piso.startsWith('2') ? '2' : pedido.piso.startsWith('3') ? '3' : '4';
      if (!floors[floor][pedido.aula]) {
        floors[floor][pedido.aula] = 1;
      } else {
        floors[floor][pedido.aula]++;
      }
    });
  
    for (let floor in floors) {
      if (!floors[floor]['Baño']) {
        floors[floor]['Baño'] = 0;
      }
    }
  
    let squares = [];
    if (edificioId === 3) {
      for (let floor in floors) {
        if (!floors[floor]['Biblioteca']) {
          floors[floor]['Biblioteca'] = 0;
        }
      }
      squares = Object.entries(floors[piso]).map(([aula, count]) => {
        const backgroundColor = getBackgroundColor(count);
        if (aula === 'Baño' || aula === 'Biblioteca') {
          return (
            <Animated.View key={aula} style={[styles.square, { backgroundColor, opacity: count > 0 ? blinkAnimation : 1 }]} onTouchStart={() => { touchStartTimeRef.current = Date.now() }} onTouchEnd={(event) => handleTouchEnd(event, aula, edificioId)}>
              <Text style={styles.squareText}>{aula}</Text>
            </Animated.View>
          );
        }
      });
    } else {
      squares = Object.entries(floors[piso]).map(([aula, count]) => {
        const backgroundColor = getBackgroundColor(count);
        return (
          <Animated.View key={aula} style={[styles.square, { backgroundColor, opacity: count > 0 ? blinkAnimation : 1 }]} onTouchStart={() => { touchStartTimeRef.current = Date.now() }} onTouchEnd={(event) => handleTouchEnd(event, aula, edificioId)}>
            <Text style={styles.squareText}>{aula}</Text>
          </Animated.View>
        );
      });
    }
    setSquares(squares);
  };
  
  const handleTouchEnd = (event, aula, edificioId) => {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTimeRef.current;
    console.log(touchDuration);
    if (touchDuration < 150) {
      console.log('Short tap: ', aula, edificioId);
      props.navigation.navigate('PedidosPorAula', { aulaInfo: { aula, edificioId, piso } });
    } else {
      console.log('Long press ignored: ', aula, edificioId);
    }
  };

  const getBackgroundColor = (count) => {
    if (count === 1) {
      return 'yellow';
    } else if (count === 2) {
      return 'orange';
    } else if (count >= 3) {
      return 'red';
    } else {
      return '#D2D3D5';
    }
  };

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
          setScale(prevScale => prevScale * newScale);
        }
        setPreviousPinchDistance(pinchDistance);
      } else if (event.nativeEvent.touches.length === 1) {
        const dx = gestureState.dx;
        const dy = gestureState.dy;

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

  const [squares, setSquares] = useState([]);

  if (edificioId === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetScale} style={styles.resetButton} />
      {squares.length > 0 && (
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
      )}
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
    alignItems: 'center',
    backgroundColor: "red",
    margin: 4, 
    width: "auto", 
    height: "auto",
    paddingVertical: 4,
    paddingHorizontal: 4
  },
  mapContainer: {
    backgroundColor: '#375189',
    flexDirection: "row",
    flexWrap: "wrap",
    width: "auto",
    padding: 5, 
    height:  "auto",
    margin: 17.5,
    borderRadius:8,
    elevation: 10,
  },
  squareText: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: '500',
    color:"#4F4F4F"
  },
});
