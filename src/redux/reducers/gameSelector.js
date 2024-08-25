export const selectCurrentPosition = state => state.game.currentPositions;
export const selectCurrentPlayerChance = state => state.game.chancePlayer;
export const selectDiceRolled = state => state.game.isDiceRolled;
export const selectDiceNo = state => state.game.diceNo;

export const selectPlayer1 = state => state.game.player1;
export const selectPlayer2 = state => state.game.player2;
export const selectPlayer3 = state => state.game.player3;
export const selectPlayer4 = state => state.game.player4;

export const selectPocketPileSeclection = state => state.game.pileSelectionPlayer;
export const selectCellSeclection = state => state.game.selectCellSeclection;
export const selectFireWork = state => state.game.fireWorks;
export const selectDiceTouch = state => state.game.touchDiceBlock;
