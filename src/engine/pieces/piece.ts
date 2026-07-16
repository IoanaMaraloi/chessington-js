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
    public checkLineDirection(board: Board, direction:Square) {
        let partialResult : Square[] = [];
        let position : Square = board.findPiece(this);
        position.row =  position.row + direction.row;
        position.col = position.col + direction.col;
            while (this.checkInBoard(position.row, position.col)) {
                let piece = board.getPiece(new Square(position.row, position.col));
                if (this.emptyPiece(piece)) {
                    partialResult.push(new Square(position.row, position.col));
                }else{
                    if (piece?.player != this.player) {
                        if (!piece?.canBeTaken){
                            return partialResult;
                        }
                        partialResult.push(new Square(position.row, position.col));
                    }
                    return partialResult;
                }
                position.row =  position.row + direction.row;
                position.col = position.col + direction.col;
            }
        return partialResult;
    }

    public moveDiagonally(board : Board) {
        return [...this.checkLineDirection(board, new Square(1, 1)),
            ...this.checkLineDirection(board, new Square(1, -1) ),
            ...this.checkLineDirection(board, new Square(-1, 1)),
            ...this.checkLineDirection(board, new Square(-1, -1) )];
    }
    public moveLaterally(board: Board) {
        return [...this.checkLineDirection(board, new Square(0, 1)),
            ...this.checkLineDirection(board, new Square(0, -1) ),
            ...this.checkLineDirection(board, new Square(1, 0)),
            ...this.checkLineDirection(board, new Square(-1, 0) )];

    }
}
