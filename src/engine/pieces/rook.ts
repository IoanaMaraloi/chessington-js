import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        // return new Array(0);
        let result : Square[] = [];
        let position : Square = board.findPiece(this);
        let row: number = position.row;
        let col: number = position.col;
        for(let i = 0; i < gameSettings.BOARD_SIZE; i++) {
            if(i == row){
                continue;
            }
            result.push(new Square(i, position.col));
        }
        for(let i = 0; i < gameSettings.BOARD_SIZE; i++) {
            if(i == col){
                continue;
            }
            result.push(new Square(position.row, i));
        }

        return result;
    }
}
