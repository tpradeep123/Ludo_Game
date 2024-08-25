import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';
import Pile from './Pile';
import {useDispatch} from 'react-redux';
import {
  unFrezzeDice,
  updatePlayerPieceValue,
} from '../redux/reducers/gameSlice';
import {StartingPoints} from '../helpers/PlotData';

const Pocket = React.memo(({color, player, data}) => {
  const dispatch = useDispatch();

  const handlePress = async value => {
    let playerNo = value?.id[0];

    switch (playerNo) {
      case 'A':
        playerNo = 'player1';
        break;
      case 'B':
        playerNo = 'player2';
        break;
      case 'C':
        playerNo = 'player3';
        break;
      case 'D':
        playerNo = 'player4';
        break;
    }

    dispatch(
      updatePlayerPieceValue({
        playerNo: playerNo,
        pieceId: value.id,
        pos: StartingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
        travelCount: 1,
      }),
    );

    dispatch(unFrezzeDice());
  };
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.childFrame}>
        <View style={styles.flexRow}>
          <Plot
            color={color}
            onPress={handlePress}
            player={player}
            pieaceNo={0}
            data={data}
          />
          <Plot
            color={color}
            onPress={handlePress}
            player={player}
            pieaceNo={1}
            data={data}
          />
        </View>
        <View style={[styles.flexRow, {marginTop: 20}]}>
          <Plot
            color={color}
            onPress={handlePress}
            player={player}
            pieaceNo={2}
            data={data}
          />
          <Plot
            color={color}
            onPress={handlePress}
            player={player}
            pieaceNo={3}
            data={data}
          />
        </View>
      </View>
    </View>
  );
});

const Plot = ({color, player, pieaceNo, data, onPress}) => {
  return (
    <View style={[styles.plot, {backgroundColor: color}]}>
      {data && data[pieaceNo]?.pos === 0 && (
        <Pile
          color={color}
          player={player}
          pieaceNo={pieaceNo}
          onPress={() => onPress(data[pieaceNo])}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  childFrame: {
    width: '70%',
    height: '70%',
    backgroundColor: '#fff',
    borderWidth: 0.4,
    padding: 15,
    borderColor: Colors.borderColor,
  },
  flexRow: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  plot: {
    width: '36%',
    height: '80%',
    borderRadius: 120,
  },
});
export default Pocket;
