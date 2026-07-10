import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let result : Array<Square> = [];
        let positions = board.findPiece(this);
        let maxLeft = Math.max(positions.col - 1, 0);
        let maxRight = Math.min(positions.col + 1, GameSettings.BOARD_SIZE);

        let maxBottom = Math.max(positions.row - 1, 0);
        let maxTop = Math.min(positions.row + 1, GameSettings.BOARD_SIZE);

        for (let row = maxBottom; row <= maxTop; row++) {
            for (let col = maxLeft; col <= maxRight; col++) {
                if(row == positions.row && col == positions.col) {
                    continue;
                }
                result.push(new Square(row, col));
            }
        }
        return result;
    }
}
