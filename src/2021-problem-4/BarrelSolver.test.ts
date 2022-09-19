import BarrelSolver from './BarrelSolver';

const barrelSolver = new BarrelSolver();

const result = barrelSolver.solve({
    testId: 'test',
    deadline: new Date,
    input: {
        barrelEthanolPairs: [
            [  117, 47 ],
            [  242, 120 ],
            [  493, 75  ],
            [  492, 379 ],
            [  157, 106 ],
            [  470, 186 ],
            [  286, 245 ],
            [  109, 95  ]
        ],
    },
});

if (result.barrelSequence[0] === 7 && result.barrelSequence[1] === 6 && result.barrelSequence[2] === 3) {
    console.log('Yaay!');
    console.log(result);
} else {
    console.log('Nay!');
    console.log(result);
}