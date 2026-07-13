import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";
export default class Piece {
    public player: Player;
    public constructor(player: Player) {
        this.player = player;
    }
    public canBeTaken = true;
    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }
    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
    public checkInBoard(row:number, col:number) {
        return row >= 0 && col >= 0 && row < gameSettings.BOARD_SIZE && col < gameSettings.BOARD_SIZE;
    }
    public emptyPiece(piece : Piece | undefined): boolean {
        return piece === undefined;
    }

    public moveDiagonally(board : Board) {
        let position = board.findPiece(this);
        let row = position.row + 1;
        let col = position.col + 1;
        let result: Array<Square> = [];
        while(row < gameSettings.BOARD_SIZE && col < gameSettings.BOARD_SIZE) {
            if (board.getPiece(new Square(row, col)) !== undefined) {
                break;
            }
            result.push(new Square(row, col));
            row++;
            col++
        }
        row = position.row + 1;
        col = position.col - 1;
        while(row < gameSettings.BOARD_SIZE && col >= 0) {
            if (board.getPiece(new Square(row, col)) !== undefined) {
                break;
            }
            result.push(new Square(row, col));
            row++;
            col--
        }
        row = position.row - 1;
        col = position.col + 1;
        while(row >= 0 && col < gameSettings.BOARD_SIZE) {
            if (board.getPiece(new Square(row, col)) !== undefined) {
                break;
            }
            result.push(new Square(row, col));
            row--;
            col++
        }
        row = position.row - 1;
        col = position.col - 1;
        while(row >= 0 && col >= 0) {
            if (board.getPiece(new Square(row, col)) !== undefined) {
                break;
            }
            result.push(new Square(row, col));
            row--;
            col--
        }
        return result;
    }
    public moveLaterally(board: Board) {
        let result : Square[] = [];
        let position : Square = board.findPiece(this);
        // move up
        for(let i = position.row + 1; i < gameSettings.BOARD_SIZE; i++) {
            let piece = board.getPiece(new Square(i, position.col));
            if (this.emptyPiece(piece)) {
                result.push(new Square(i, position.col));
            }else{
                if (piece?.player != this.player) {
                    result.push(new Square(i, position.col));
                }
                break;
            }
        }
        // move down
        for(let i = position.row - 1; i >= 0; i--) {
            let piece = board.getPiece(new Square(i, position.col));
            if (this.emptyPiece(piece)) {
                result.push(new Square(i, position.col));
            }else{
                if (piece?.player != this.player) {
                    if (!piece?.canBeTaken){
                        break;
                    }
                    result.push(new Square(i, position.col));
                }
                break;
            }
        }
        // move right
        for(let i = position.col + 1; i < gameSettings.BOARD_SIZE; i++) {
            let piece = board.getPiece(new Square(position.row, i));
            if (this.emptyPiece(piece)) {
                result.push(new Square(position.row, i));
            }else{
                if (piece?.player != this.player) {
                    if (!piece?.canBeTaken){
                        break;
                    }
                    result.push(new Square(position.row, i));
                }
                break;
            }
        }
        // move left
        for(let i = position.col - 1; i >= 0; i--) {
            let piece = board.getPiece(new Square(position.row, i));
            if (this.emptyPiece(piece)) {
                result.push(new Square(position.row, i));
            }else{
                if (piece?.player != this.player) {
                    result.push(new Square(position.row, i));
                }
                break;
            }
        }
        return result;
    }
}
