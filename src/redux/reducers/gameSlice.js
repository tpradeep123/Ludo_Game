import {createSlice} from '@reduxjs/toolkit';
import {initialState} from './InitialState';

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    resetGame: () => initialState,
    updatedDiceNo: (state, action) => {
      state.diceNo = action.payload.diceNo;
      state.isDiceRolled = true;
    },
    enablePileSelection: (state, action) => {
      state.touchDiceBlock = true;
      state.pileSelectionPlayer = action.payload.playerNo;
    },
    enableCellSelection: (state, action) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = action.payload.playerNo;
    },
    disableTouch: (state, action) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = -1;
      state.pileSelectionPlayer = -1;
    },
    unFrezzeDice: (state, action) => {
      state.touchDiceBlock = false;
      state.isDiceRolled = false;
    },
    updateFireWork: (state, action) => {
      state.fireWorks = action.payload;
    },
    announceWinner: (state, action) => {
      state.winner = action.payload;
    },
    updatePlayerChance: (state, action) => {
      state.chancePlayer = action.payload.chancePlayer;
      state.touchDiceBlock = false;
      state.isDiceRolled = false;
    },
    updatePlayerPieceValue: (state, action) => {
      const { playerNo, pieceId, pos, travelCont } = action.payload;
      const playerPiece = state[playerNo];
      const piece = playerPiece.find(p => p.id === pieceId);
      state.pileSelectionPlayer = -1;
    
      if (piece) {
        piece.pos = pos;
        piece.travelCont = travelCont;
    
        const currentPositionIndex = state.currentPositions.findIndex(
          p => p.id === pieceId
        );
    
        if (pos === 0) {
          if (currentPositionIndex !== -1) {
            state.currentPositions.splice(currentPositionIndex, 1);
          }
        } else {
          if (currentPositionIndex !== -1) {
            state.currentPositions[currentPositionIndex] = {
              id: pieceId,
              pos
            };
          } else {
            state.currentPositions.push({ id: pieceId, pos });
          }
        }
      }
    }
    
  },
});

export const {
  resetGame,
  updatedDiceNo,
  enablePileSelection,
  enableCellSelection,
  updatePlayerChance,
  announceWinner,
  updateFireWork,
  unFrezzeDice,
  disableTouch,
  updatePlayerPieceValue,
} = gameSlice.actions;

export default gameSlice.reducer;
