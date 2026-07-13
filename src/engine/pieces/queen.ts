import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }
    public getAvailableMoves(board: Board) {
        let movesLaterally: Array<Square> = super.moveLaterally(board);
        let movesDiagonally: Array<Square> = super.moveDiagonally(board);
        return [...movesLaterally, ...movesDiagonally];
    }
}
