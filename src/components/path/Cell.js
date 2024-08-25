import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Colors} from '../../constants/Colors';
import {ArrowSpot, SafeSpots, StarSpots} from '../../helpers/PlotData';
import {ArrowRightIcon, StarIcon} from 'react-native-heroicons/outline';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentPosition} from '../../redux/reducers/gameSelector';
import Pile from '../Pile';
import { handleForwardThunk } from '../../redux/reducers/gameAction';

const Cell = ({cell, color, index, id}) => {
  const dispatch = useDispatch();
  const plottedPieces = useSelector(selectCurrentPosition);
  
  const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
  const isStarSpot = useMemo(() => StarSpots.includes(id), [id]); 
  const isArrowSpot = useMemo(() => ArrowSpot.includes(id), [id]);

  const piecesAtPosition = useMemo(() => 
  plottedPieces.filter(item => item.pos == id)
  , [plottedPieces, id]);

  const handlePress = useCallback((playerNo, pieceId) => {
    // Implement your logic here
    dispatch(handleForwardThunk(playerNo,pieceId,id))
  }, [dispatch, id]);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isSafeSpot ? color : 'white'},
      ]}>
      {isStarSpot && <StarIcon color="grey" size={20} />}
      {isArrowSpot && (
        <ArrowRightIcon
          size={RFValue(12)}
          color="grey"
          style={{
            transform: [
              {
                rotate:
                  id === 38
                    ? '180deg'
                    : id === 25
                    ? '90deg'
                    : id === 51
                    ? '-90deg'
                    : '0deg',
              },
            ],
          }}
        />
      )}
      {piecesAtPosition?.map((piece, index) => {
        const playerNo =
          piece.id[0] === 'A'
            ? 1
            : piece.id[0] === 'B'
            ? 2
            : piece.id[0] === 'C'
            ? 3
            : 4;

        const pieceColor =
          playerNo === 1
            ? Colors.red
            : playerNo === 2
            ? Colors.green
            : playerNo === 3
            ? Colors.yellow
            : Colors.blue;

        return (
          <View
            key={piece.id}
            style={[
              styles.pieceContainer,
              {
                transform: [
                  {
                    scale: piecesAtPosition.length === 1 ? 1 : 0.7,
                  },
                  {
                    translateX: piecesAtPosition.length === 1 ? 0 : index % 2 === 0 ? -6 : 6,
                  },
                  {
                    translateY: piecesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6,
                  },
                ],
              },
            ]}
          >
            <Pile
              
              player={playerNo}
              onPress={() => handlePress(playerNo, piece.id)}
              pieceId={piece.id}
              color={pieceColor}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    borderColor: Colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  pieceContainer: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    bottom: 0,
  },
});

export default React.memo(Cell);
