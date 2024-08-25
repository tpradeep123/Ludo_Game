import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {BackgroundImage} from '../helpers/GetIcons';
import {Colors} from '../constants/Colors';
import {Svg, Circle} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {
  selectCellSeclection,
  selectDiceNo,
  selectPocketPileSeclection,
} from '../redux/reducers/gameSelector';
const Pile = React.memo(({color, cell, player, onPress, pieceId}) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pileImage = BackgroundImage.GetImage(color);
  const currentPlayerPileSelection = useSelector(selectPocketPileSeclection);
  const currentPlayerCellSelection = useSelector(selectCellSeclection);
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector(state => state.game[`player${player}`]);

  const isPileEnabled = useMemo(
    () => player == currentPlayerPileSelection,
    [player, currentPlayerPileSelection],
  );

  const isCellEnabled = useMemo(
    () => player === currentPlayerCellSelection,
    [player, currentPlayerCellSelection],
  );

  const isForwadable = useCallback(() => {
    const piece = playerPieces?.find(item => item.id === pieceId);
    return piece && piece.travelCount + diceNo <= 57;
  }, [playerPieces, pieceId, diceNo]);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    rotateAnimation.start();
    return () => rotateAnimation.stop();
  }, [rotation]);

  const rotateInterpolate = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [rotation],
  );
  // console.log(cell ? isCellEnabled && isForwadable() : isPileEnabled)
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      disabled={!(cell ? isCellEnabled && isForwadable() : isPileEnabled)}
      onPress={onPress}>
      <View style={styles.hollowCircle}>
        {cell
          ? isCellEnabled && isForwadable()
          : isPileEnabled && (
              <View style={styles.dashedCircleContainer}>
                <Animated.View
                  style={[
                    styles.dashedCircle,
                    {transform: [{rotate: rotateInterpolate}]},
                  ]}>
                  <Svg width={18} height={18}>
                    <Circle
                      cx="9"
                      cy="9"
                      r="8"
                      stroke={'#fff'}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeDashoffset="0"
                      fill="transparent"
                    />
                  </Svg>
                </Animated.View>
              </View>
            )}
      </View>
      <Image
        source={pileImage}
        style={{width: 32, height: 32, position: 'absolute', top: -15}}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  hollowCircle: {
    width: 15,
    height: 15,
    position: 'absolute',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Pile;
