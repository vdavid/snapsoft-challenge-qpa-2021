import SanityCheckSolver from "./SanityCheckSolver.mjs";

const sanityCheckSolver = new SanityCheckSolver();

const result = sanityCheckSolver.solve({
    "meta": {
        "set_length": 4
    },
    "set": [
        "1",
        "233",
        "100",
        "64",
    ]
});

if (result.insane_numbers.length === 1 && result.insane_numbers[0] === '233') {
    console.log('Yaay!');
} else {
    console.log('Nay!');
    console.log(result);
}