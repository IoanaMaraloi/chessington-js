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
           if (position.row == 1) {
               result.push(new Square(position.row + 2, position.col));
           }
       }else{
           result.push(new Square(position.row - 1, position.col));
           if (position.row == 6) {
               result.push(new Square(position.row - 2, position.col));
           }
       }
       if (result.length == 1){
           if (board.getPiece(result[0]) === undefined){
               return result;
           }
       }else{
           let finalResult:Array<Square> = [];
           if (board.getPiece(result[0]) === undefined){
               finalResult.push(result[0]);
           }else{
               return [];
           }
           if (board.getPiece(result[1]) === undefined){
               finalResult.push(result[1]);
               return finalResult;
           }
       }
       return [];


    }
}
