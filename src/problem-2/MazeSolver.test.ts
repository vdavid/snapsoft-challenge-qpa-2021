import MazeSolver from './MazeSolver';

const mazeSolver = new MazeSolver();

const result = mazeSolver.solve({
    testId: 'test',
    deadline: new Date,
    input: {
        'width': 3,
        'height': 3,
        'maze': [
            1, 1, 1,
            1, 0, 1,
            0, 1, 1,
        ],
        'startCell': {
            'x': 1,
            'y': 2,
        },
        'endCell': {
            'x': 0,
            'y': 0,
        },
    },
});

if (result.solution === 'RUULL') {
    console.log('Yaay!');
} else {
    console.log('Nay!');
    console.log(result);
}