import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let result:Array<Square> = [];
        let movesLaterally: Array<Square> = super.moveLaterally(board);
        let movesDiagonally: Array<Square> = super.moveDiagonally(board);
        for (let move of movesLaterally) {
            result.push(move);
        }
        for (let move of movesDiagonally) {
            result.push(move);
        }
        return result;
    }
}
