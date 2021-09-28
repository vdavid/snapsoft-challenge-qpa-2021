export default class SanityCheckSolver {
    solve(input: {meta: {set_length: number}, set: string[]}): {insane_numbers: string[]} {
        const itemsWithBinary = input.set.map(item => ({original: item, binary: BigInt(item).toString(2)}));
        const itemsWithOneCount = itemsWithBinary.map(item => ({original: item.original, binary: item.binary, oneCount: (item.binary.match(/1/g)||[]).length}));
        const maximumOneCount = itemsWithOneCount.reduce((maximumOneCount, item) => Math.max(item.oneCount, maximumOneCount), 0);
        const itemsWithMaximumOneCount = itemsWithOneCount.filter(item => item.oneCount === maximumOneCount);
        //return {insane_numbers: itemsWithMaximumOneCount};
        return {insane_numbers: itemsWithMaximumOneCount.map(item => item.original)};
    }
}