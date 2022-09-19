import KingPinnedSolver from './KingPinnedSolver';

const kingPinnedSolver = new KingPinnedSolver();

const result = kingPinnedSolver.solve({
    testId: 'test',
    deadline: new Date,
    input: {
        "room": [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0]
        ]
    },
});

if (result.places_to_move_to.length === 13 && result.places_to_move_to[0][0] === 0 && result.places_to_move_to[0][1] === 0) {
    console.log('Yaay!');
    console.log(result);
} else {
    console.log('Nay!');
    console.log(result);
}