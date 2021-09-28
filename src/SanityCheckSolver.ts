import {SolverFunction, Test} from './SolverFunction';

interface SanityCheckTest extends Test {
    input: {meta: {set_length: number}, set: number[]};
}

export default class SanityCheckSolver implements SolverFunction {
    solve(test: SanityCheckTest): {insane_numbers: number[]} {
        const itemsWithBinary = test.input.set.map(item => ({original: item, binary: BigInt(item).toString(2)}));
        const itemsWithOneCount = itemsWithBinary.map(item => ({original: item.original, binary: item.binary, oneCount: (item.binary.match(/1/g)||[]).length}));
        const maximumOneCount = itemsWithOneCount.reduce((maximumOneCount, item) => Math.max(item.oneCount, maximumOneCount), 0);
        const itemsWithMaximumOneCount = itemsWithOneCount.filter(item => item.oneCount === maximumOneCount);
        //return {insane_numbers: itemsWithMaximumOneCount};
        return {insane_numbers: itemsWithMaximumOneCount.map(item => item.original)};
    }
}