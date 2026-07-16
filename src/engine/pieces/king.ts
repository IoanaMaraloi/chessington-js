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
                    let piece = board.getPiece(new Square(row + moveRows, col + moveCols));
                    if (super.emptyPiece(piece)){
                        result.push(new Square(row + moveRows, col + moveCols));
                    }else {
                        if (piece?.player != this.player) {
                            if (!piece?.canBeTaken) {
                                return result;
                            }
                            result.push(new Square(row + moveRows, col + moveCols));
                        }
                    }
                }
            }
        }
        return result;
    }
}
