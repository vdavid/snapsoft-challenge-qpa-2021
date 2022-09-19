import SanityCheckSolver from './SanityCheckSolver';

const sanityCheckSolver = new SanityCheckSolver();

const result = sanityCheckSolver.solve({
    testId: 'test',
    deadline: new Date,
    input: {
        'meta': {
            'set_length': 4,
        },
        'set': [
            1,
            233,
            100,
            64,
        ],
    },
});

if (result.insane_numbers.length === 1 && result.insane_numbers[0] === 233) {
    console.log('Yaay!');
} else {
    console.log('Nay!');
    console.log(result);
}