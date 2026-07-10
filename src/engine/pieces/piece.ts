import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
    public moveDiagonally(board : Board) {
        let position = board.findPiece(this);
        let row = position.row + 1;
        let col = position.col + 1;
        let result: Array<Square> = [];
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

    public moveLaterally(board: Board) {
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
