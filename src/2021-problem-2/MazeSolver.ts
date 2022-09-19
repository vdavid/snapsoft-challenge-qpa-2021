import {SolverFunction, Test} from '../SolverFunction';

interface Location {
    x: number,
    y: number,
}

interface MazeTestInput {
    width: number,
    height: number,
    maze: number[],
    startCell: Location,
    endCell: Location
}

interface MazeTest extends Test {
    input: MazeTestInput;
}

export default class MazeSolver implements SolverFunction {
    solve(test: MazeTest): { solution: string } {
        return {solution: this.solveMaze(test.input, test.input.startCell, [], '') || 'Path not found!'};
    }

    /**
     * @returns {string} The move string, or undefined if no path was found.
     */
    solveMaze(input: MazeTestInput, currentPosition: Location, alreadySeenLocations: Location[], movesHere: string): string | undefined {
        const validMoves = this.getValidMoves(input, currentPosition);
        /* Filter for new moves only */
        const newMoves = validMoves.filter(move => !this.containsLocation(alreadySeenLocations, move.targetLocation));

        for (const move of newMoves) {
            if (this.equals(move.targetLocation, input.endCell)) {
                return movesHere + move.moveString;
            }
            const solution = this.solveMaze(input, move.targetLocation, [...alreadySeenLocations, currentPosition], movesHere + move.moveString);
            if (solution) {
                return solution;
            }
        }

        return undefined;
    }

    getValidMoves(input: MazeTestInput, position: Location): { moveString: string, targetLocation: Location }[] {
        const validMoves = [];
        /* Left */
        if (position.x % input.width !== 0 && input.maze[this.getLocationIndex(input.width, position) - 1] !== 0) {
            validMoves.push({moveString: 'L', targetLocation: {x: position.x - 1, y: position.y}});
        }
        /* Right */
        if (position.x % input.width !== (input.width - 1) && input.maze[this.getLocationIndex(input.width, position) + 1] !== 0) {
            validMoves.push({moveString: 'R', targetLocation: {x: position.x + 1, y: position.y}});
        }
        /* Up */
        if (position.y > 0 && input.maze[this.getLocationIndex(input.width, position) - input.width] !== 0) {
            validMoves.push({moveString: 'U', targetLocation: {x: position.x, y: position.y - 1}});
        }
        /* Down */
        if (position.y < input.height - 1 && input.maze[this.getLocationIndex(input.width, position) + input.width] !== 0) {
            validMoves.push({moveString: 'D', targetLocation: {x: position.x, y: position.y + 1}});
        }

        return validMoves;
    }

    getLocationIndex(mazeWidth: number, position: Location): number {
        return position.y * mazeWidth + position.x;
    }

    containsLocation(locations: Location[], testedLocation: Location) {
        return !!locations.find(location => this.equals(location, testedLocation));
    }

    equals(location1: Location, location2: Location) {
        return location1.x === location2.x && location1.y === location2.y;
    }
}