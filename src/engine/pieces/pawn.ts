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
       let result:Array<Square> = [];
       if (this.player == player.WHITE ) {
           result.push(new Square(position.row + 1, position.col));
           // result.push(new Square(position.row + 2, position.col));
       }else{
           result.push(new Square(position.row - 1, position.col));
           // result.push(new Square(position.row + 2, position.col));
       }
        return result;
    }
}
