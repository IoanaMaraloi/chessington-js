import Piece from './piece';
import Player from '../player';
import player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";
import gameSettings from "../gameSettings";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }
    public checkIfFIrstMove( row:number) {
        if (this.player == Player.WHITE && row == 1){
            return true;
        }
        return this.player == Player.BLACK && row == gameSettings.BOARD_SIZE - 2;


}
    public getAvailableMoves(board: Board) {
       let position : Square = board.findPiece(this);
       let row = position.row;
       let col = position.col;
       let result:Array<Square> = [];
       let directionRow = 1;
       if (this.player == player.BLACK) {
           directionRow = -1;
       }
        if (super.checkInBoard(row + directionRow, col) ){
            if (directionRow == -1 && row + directionRow == 0) {
                    return result;
            }
            if (directionRow == 1 && row + directionRow == GameSettings.BOARD_SIZE) {
                return result;
            }
            // check forward is still in board
            if (this.checkInBoard(row + directionRow, col) ){
                let nextPiece = board.getPiece(new Square(row + directionRow, col));
                // if there is no piece on the next square
                if ( super.emptyPiece(nextPiece)) {
                    result.push(new Square(row + directionRow, col));
                    // if this is the first time, check two positions forward as well
                    if(this.checkIfFIrstMove(row) && this.checkInBoard(row + directionRow * 2, col)){
                        let nextPiece2 = board.getPiece(new Square(row + 2 * directionRow, col));
                        if (super.emptyPiece(nextPiece2)) {
                            result.push(new Square(row + 2 * directionRow, col));
                        }

                    }
                }
            }
            if (this.checkInBoard(row + directionRow, col + 1) ){
                let diagonalPiece = board.getPiece(new Square(row + directionRow, col + 1));
                if (this.player!= diagonalPiece?.player && !super.emptyPiece(diagonalPiece) ) {
                    if (diagonalPiece?.canBeTaken){
                        result.push(new Square(row + directionRow, col + 1));
                    }
                }
            }
            if (this.checkInBoard(row + directionRow, col - 1) ){
                let diagonalPiece = board.getPiece(new Square(row + directionRow, col - 1));
                if (this.player!= diagonalPiece?.player && !super.emptyPiece(diagonalPiece) ) {
                    if (diagonalPiece?.canBeTaken){
                        result.push(new Square(row + directionRow, col - 1));
                    }
                }
            }
        }
      return result;


    }
}
