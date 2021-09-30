// noinspection JSMethodCanBeStatic

import {SolverFunction, Test} from '../SolverFunction';

interface KingPinnedTest extends Test {
    input: { room: number[][] };
}

interface Cell {
    piece: number;
    attackerCount: number;
}

export default class KingPinnedSolver implements SolverFunction {
    solve(test: KingPinnedTest): { places_to_move_to: number[][] } {
        // Read input
        const inputRoom = test.input.room;
        const room = inputRoom.map(row => row.map(piece => ({piece, attackerCount: 0})));

        // Update attacker counts
        for (let x = 0; x < room.length; x++) {
            for (let y = 0; y < room.length; y++) {
                if (![0, 6].includes(room[y][x].piece)) {
                    this.updateAttackerCountsFromCell(room, x, y);
                }
            }
        }

        // // Print room
        // console.log('Room:');
        // const pieceToLetterMap = {1: 'p', 2: 'R', 3: 'N', 4: 'B', 5: 'Q', 6: 'x', 7: 'K'};
        // console.log(inputRoom.reduce((result, row) => result + row.reduce((rowResult, piece) => rowResult + (piece !== 0 ? pieceToLetterMap[piece] : ' ') + ' ', '') + '\n', ''));
        //
        // // Print threat level map
        // console.log('Threat levels:');
        // console.log(room.reduce((result, row) => result + row.reduce((rowResult, cell) => rowResult + (cell.piece === 0 ? cell.attackerCount : ' ') + ' ', '') + '\n', ''));

        /* Calculate maximum attacker count */
        const maximumAttackerCount = room.reduce((result, row) => Math.max(result, row.reduce((rowResult, cell) => Math.max(rowResult, cell.attackerCount), 0)), 0);
        console.log(`Max attacker count: ${maximumAttackerCount}`);

        /* Generate output */
        const placesToMoveTo: number[][] = [];
        for (let attackerCount = 0; attackerCount <= maximumAttackerCount; attackerCount++) {
            for (let x = 0; x < room.length; x++) {
                for (let y = 0; y < room.length; y++) {
                    if ((room[y][x].piece === 0) && room[y][x].attackerCount === attackerCount) {
                        placesToMoveTo.push([x, y]);
                    }
                }
            }
        }
        return {places_to_move_to: placesToMoveTo};
    }

    private updateAttackerCountsFromCell(room: Cell[][], x: number, y: number) {
        const size = room.length;
        if (room[y][x].piece === 1) { /* Pawn */
            if (y < size - 1) {
                room[y + 1][x].attackerCount++;
            }
        } else if (room[y][x].piece === 2) { /* Rook */
            this.updateAttackerCountsForRook(room, x, y);
        } else if (room[y][x].piece === 3) { /* Knight */
            this.updateAttackerCountsForKnight(room, x, y);
        } else if (room[y][x].piece === 4) { /* Bishop */
            this.updateAttackerCountsForBishop(room, x, y);
        } else if (room[y][x].piece === 5) { /* Queen */
            this.updateAttackerCountsForRook(room, x, y);
            this.updateAttackerCountsForBishop(room, x, y);
        } else if (room[y][x].piece === 7) { /* Enemy king */
            this.updateAttackerCountsForBlackKing(room, x, y);
        }
    }

    updateAttackerCountsForBishop(room: Cell[][], x: number, y: number) {
        for(let i = 1; i <= Math.min(x, y); i++) { // TL
            if(room[y - i][x - i].piece === 0) { room[y - i][x - i].attackerCount++; } else { break; }
        }
        for(let i = 1; i <= Math.min(room.length - x - 1, y); i++) { // TR
            if(room[y - i][x + i].piece === 0) { room[y - i][x + i].attackerCount++; } else { break; }
        }
        for(let i = 1; i <= Math.min(room.length - x - 1, room.length - y - 1); i++) { // BR
            if(room[y + i][x + i].piece === 0) { room[y + i][x + i].attackerCount++; } else { break; }
        }
        for(let i = 1; i <= Math.min(x, room.length - y - 1); i++) { // BL
            if(room[y + i][x - i].piece === 0) { room[y + i][x - i].attackerCount++; } else { break; }
        }
    }

    updateAttackerCountsForRook(room: Cell[][], x: number, y: number) {
        for(let i = 1; i <= y; i++) { // T
            if(room[y - i][x].piece === 0) { room[y - i][x].attackerCount++; } else { break; }
        }
        for(let i = 1; i <= room.length - y - 1; i++) { // B
            if(room[y + i][x].piece === 0) { room[y + i][x].attackerCount++; } else { break; }
        }
        for(let i = 1; i <= x; i++) { // L
            if(room[y][x - i].piece === 0) { room[y][x - i].attackerCount++; } else { break; }
        }
        for(let i = 1; i <= room.length - x - 1; i++) { // R
            if(room[y][x + i].piece === 0) { room[y][x + i].attackerCount++; } else { break; }
        }
    }

    updateAttackerCountsForKnight(room: Cell[][], x: number, y: number) {
        if(this.isInRoom(room, x + 1, y - 2)) { room[y - 2][x + 1].attackerCount++ } /* T */
        if(this.isInRoom(room, x + 2, y - 1)) { room[y - 1][x + 2].attackerCount++ } /* TR */
        if(this.isInRoom(room, x + 2, y + 1)) { room[y + 1][x + 2].attackerCount++ } /* R */
        if(this.isInRoom(room, x + 1, y + 2)) { room[y + 2][x + 1].attackerCount++ } /* BR */
        if(this.isInRoom(room, x - 1, y + 2)) { room[y + 2][x - 1].attackerCount++ } /* B */
        if(this.isInRoom(room, x - 2, y + 1)) { room[y + 1][x - 2].attackerCount++ } /* BL */
        if(this.isInRoom(room, x - 2, y - 1)) { room[y - 1][x - 2].attackerCount++ } /* L */
        if(this.isInRoom(room, x - 1, y - 2)) { room[y - 2][x - 1].attackerCount++ } /* TL */
    }

    updateAttackerCountsForBlackKing(room: Cell[][], x: number, y: number) {
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x, y - 1)) { room[y - 1][x].attackerCount++; } /* T */
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x + 1, y - 1)) { room[y - 1][x + 1].attackerCount++; } /* TR */
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x + 1, y)) { room[y][x + 1].attackerCount++; } /* R */
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x + 1, y + 1)) { room[y + 1][x + 1].attackerCount++; } /* BR */
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x, y + 1)) { room[y + 1][x].attackerCount++; } /* B */
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x - 1, y + 1)) { room[y + 1][x - 1].attackerCount++; } /* BL */
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x - 1, y)) { room[y][x - 1].attackerCount++; } /* L */
        if(this.isInRoomAndTheWhiteKingIsNotAround(room, x - 1, y - 1)) { room[y - 1][x - 1].attackerCount++; } /* TL */
    }

    isInRoomAndTheWhiteKingIsNotAround(room: Cell[][], x: number, y: number) {
        return this.isInRoom(room, x, y) && !this.isTheWhiteKingAround(room, x, y);
    }

    isInRoom(room: Cell[][], x: number, y: number) {
        return (x >= 0 && x < room.length && y >= 0 && y < room.length);
    }

    isTheWhiteKingAround(room: Cell[][], x: number, y: number) {
        return [
            this.isInRoom(room, x, y - 1) ? room[y - 1][x].piece : 0,
            this.isInRoom(room, x + 1, y - 1) ? room[y - 1][x + 1].piece : 0,
            this.isInRoom(room, x + 1, y) ? room[y][x + 1].piece : 0,
            this.isInRoom(room, x + 1, y + 1) ? room[y + 1][x + 1].piece : 0,
            this.isInRoom(room, x, y + 1) ? room[y + 1][x].piece : 0,
            this.isInRoom(room, x - 1, y + 1) ? room[y + 1][x - 1].piece : 0,
            this.isInRoom(room, x - 1, y) ? room[y][x - 1].piece : 0,
            this.isInRoom(room, x - 1, y - 1) ? room[y - 1][x - 1].piece : 0,
        ].includes(6);
    }
}
