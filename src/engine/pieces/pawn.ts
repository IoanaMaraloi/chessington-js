import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
       let position : Square = board.findPiece(this);
       let row = position.row;
       let col = position.col;
       let result:Array<Square> = [];
       if (this.player == player.WHITE ) {
           if (super.checkInBoard(row + 1, col) && board.getPiece(new Square(row + 1, col)) === undefined && row + 1 < 8 ) {
               result.push(new Square(position.row + 1, position.col));
               if (row == 1 &&super.checkInBoard(row + 2, col) && board.getPiece(new Square(position.row + 2, position.col)) === undefined && row + 2 < 8 ) {
                   result.push(new Square(position.row + 2, position.col));
               }
           }
       }else{
           if (super.checkInBoard(row - 1, col) && board.getPiece(new Square(row - 1, col)) === undefined && row > 1) {
               result.push(new Square(position.row - 1, position.col));
               if (row == 6 &&super.checkInBoard(row - 2, col) && board.getPiece(new Square(position.row - 2, position.col)) === undefined && row > 2) {
                   result.push(new Square(position.row - 2, position.col));
               }
           }
       }
      return result;


    }
}
