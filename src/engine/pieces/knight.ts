import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let result : Array<Square> = [];
        let position = board.findPiece(this);
        let move : Array<number> = [-2, -1, 1, 2];
        let potentialRow = position.row;
        let potentialCol = position.col;
        for (let i = 0; i < move.length; i++) {
            for (let j = 0; j < move.length; j++) {
                if (Math.abs(move[i]) == Math.abs(move[j])){
                    continue;
                }
                 potentialRow = position.row + move[i];
                 potentialCol = position.col + move[j];
                 console.log(potentialRow, potentialCol);
                 if(this.checkInBoard(potentialRow, potentialCol)){
                     let piece = board.getPiece(new Square(potentialRow, potentialCol));
                     if (super.emptyPiece(piece)) {
                         result.push(new Square(potentialRow, potentialCol));
                     }else{
                         if (piece?.player !== this.player) {
                             if (piece?.canBeTaken){
                                 result.push(new Square(potentialRow, potentialCol));
                             }
                         }
                     }
                 }
            }
        }
        return result;
    }
}
