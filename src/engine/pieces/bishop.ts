import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let position : Square = board.findPiece(this);
        let result:Array<Square> = [];
        let row = position.row + 1;
        let col = position.col + 1;
        while(row < gameSettings.BOARD_SIZE && col < gameSettings.BOARD_SIZE) {
            result.push(new Square(row, col));
            row++;
            col++
        }
        row = position.row + 1;
        col = position.col - 1;
        while(row < gameSettings.BOARD_SIZE && col >= 0) {
            result.push(new Square(row, col));
            row++;
            col--
        }
        row = position.row - 1;
        col = position.col + 1;
        while(row >= 0 && col < gameSettings.BOARD_SIZE) {
            result.push(new Square(row, col));
            row--;
            col++
        }
        row = position.row - 1;
        col = position.col - 1;
        while(row >= 0 && col >= 0) {
            result.push(new Square(row, col));
            row--;
            col--
        }
        return result;
    }
}
