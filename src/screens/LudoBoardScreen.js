import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Wrapper from '../components/Wrapper';
import MenuBtn from '../assets/images/menu.png';
import {DeviceHeight, DeviceWidth} from '../constants/Scaling';
import Dice from '../components/Dice';
import {Colors} from '../constants/Colors';
import Pocket from '../components/Pocket';
import VerticlePath from '../components/path/VerticlePath';
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data} from '../helpers/PlotData';
import HorizontalPath from '../components/path/HorizontalPath';
import FourTriangle from '../components/FourTriangle';
import {useSelector} from 'react-redux';
import {
  selectDiceTouch,
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
} from '../redux/reducers/gameSelector';
import {useIsFocused} from '@react-navigation/native';
import StartGame from '../assets/images/start.png';
const LudoBoardScreen = () => {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouched = useSelector(selectDiceTouch);
  const winner = useSelector(state => state.game.winner);

  const isFocused = useIsFocused();

  const [showStartImage, setShowStartImage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const opacity = useRef(new Animated.Value(1)).current;

  // useEffect(() => {
  //   if (isFocused) {
  //     setShowStartImage(true);
  //     const blinkAnimation = Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(opacity, {
  //           toValue: 0,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(opacity, {
  //           toValue: 1,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //       ]),
  //     );

  //     blinkAnimation.start();

  //     const timeout = setTimeout(() => {
  //       blinkAnimation.stop();
  //       setShowStartImage(false);
  //     }, 2500);

  //     return () => {
  //       blinkAnimation.stop();
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [isFocused]);
  return (
    <Wrapper>
      <TouchableOpacity style={{position: 'absolute', top: 60, left: 20}}>
        <Image source={MenuBtn} style={{width: 30, height: 30}} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.flexRow} pointerEvents={isDiceTouched ? 'none' :'auto'}>
          <Dice color={Colors.green} player={2} data={player2}/>
          <Dice color={Colors.yellow} rotate player={3} data={player3} />
        </View>

        <View style={styles.LudoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2}/>
            <VerticlePath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3}  data={player3}/>
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} color={Colors.green} />
            <FourTriangle
            player1={player1}
            player2={player2}
            player3={player3}
            player4={player4}
            />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>

          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1}/>
            <VerticlePath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} data={player4}/>
          </View>
        </View>

        <View style={styles.flexRow} pointerEvents={isDiceTouched ? 'none' :'auto'}>
          <Dice color={Colors.red} player={1} data={player1} />
          <Dice color={Colors.blue} rotate player={4} data={player4}/>
        </View>
      </View>

      {showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{
            width: DeviceWidth * 0.5,
            height: DeviceWidth * 0.2,
            position: 'absolute',
            opacity,
          }}
        />
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: DeviceWidth,
    height: DeviceHeight * 0.5,
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  pathContainer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E5162',
  },
  LudoBoard: {
    width: '100%',
    height: '100%',
    padding: 10,
    alignSelf: 'center',
  },
  plotContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
});
export default LudoBoardScreen;
