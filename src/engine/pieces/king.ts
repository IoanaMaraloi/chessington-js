import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
export default class King extends Piece {
    public canBeTaken = false;
    public constructor(player: Player) {
        super(player);
    }
    public getAvailableMoves(board: Board) {
        let result : Array<Square> = [];
        let positions = board.findPiece(this);

        let row = positions.row;
        let col = positions.col;
        let moves: Array<number> = [-1, 0, 1];
        for (let moveRows of moves){
            for (let moveCols of moves){
                if (moveCols == 0 && moveRows == 0){
                    continue;
                }
                if (super.checkInBoard(row + moveRows, col + moveCols)){
                    result.push(new Square(moveRows + row, col + moveCols));
                }
            }
        }
        return result;
    }
}
