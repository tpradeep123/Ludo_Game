import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Colors} from '../constants/Colors';
import LottieView from 'lottie-react-native';
import firework from '../assets/animation/firework.json';
import {Polygon, Svg} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {selectFireWork} from '../redux/reducers/gameSelector';
import {updateFireWork} from '../redux/reducers/gameSlice';
const FourTriangle = ({player1, player2, player3, player4}) => {
  const size = 300;
  const [blast, setBlast] = useState(false);
  const isFirework = useSelector(selectFireWork);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirework) {
      setBlast(true);
      const timer = setTimeout(() => {
        setBlast(false);
        dispatch(updateFireWork(false));
      }, 5000);
      return clearTimeout(timer);
    }
  }, [isFirework, dispatch]);

  const playerData = useMemo(
    () => [
      {
        player: player1,
        top: 55,
        left: 15,
        pieceColor: Colors.red,
        translate: 'translateX',
      },
      {
        player: player3,
        top: 52,
        left: 15,
        pieceColor: Colors.yellow,
        translate: 'translateX',
      },
      {
        player: player2,
        top: 20,
        left: -2,
        pieceColor: Colors.green,
        translate: 'translateY',
      },
      {
        player: player4,
        top: 20,
        right: -2,
        pieceColor: Colors.blue,
        translate: 'translateX',
      },
    ],
    [player1, player2, player3, player4],
  );


  const renderPlayerPieces = useCallback((data,index)=>(
    <PlayerPiece/>
  ))
  return (
    <View style={styles.mainContainer}>
      {blast && (
        <LottieView
          source={firework}
          autoPlay
          loop
          hardwareAccelerationAndroid
          speed={1}
          style={styles.LottieView}
        />
      )}

      <Svg width={size - 5} height={size}>
        <Polygon
          fill={Colors.yellow}
          points={`0 , 0 ${size / 2} , ${size / 2} ${size} , 0`}
        />
        <Polygon
          fill={Colors.blue}
          points={`${size} , 0 ${size}, ${size}  ${size / 2} , ${size / 2}`}
        />
        <Polygon
          fill={Colors.red}
          points={`0 , ${size}  ${size / 2} , ${size / 2} ${size}  , ${size}`}
        />
        <Polygon
          fill={Colors.green}
          points={`0 , 0  ${size / 2} , ${size / 2} 0  , ${size}`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '20%',
    height: '100%',
    borderWidth: 0.8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: Colors.borderColor,
  },
  LottieView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
});
export default React.memo(FourTriangle);
