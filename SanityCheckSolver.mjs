export default class SanityCheckSolver {
    /**
     * @param {{meta: {set_length: number}, set: number[]}} input
     * @returns {{insane_numbers: number[]}}
     */
    solve(input) {
        // TODO: convert: https://stackoverflow.com/questions/39334494/converting-large-numbers-from-binary-to-decimal-and-back-in-javascript
        const itemsWithBinary = input.set.map(item => ({original: item, binary: (item >>> 0).toString(2)})); /* Source: https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript */
        const itemsWithOneCount = itemsWithBinary.map(item => ({original: item.original, oneCount: (item.binary.match(/1/g)||[]).length}));
        const maximumOneCount = itemsWithOneCount.reduce((maximumOneCount, item) => Math.max(item.oneCount, maximumOneCount), 0);
        const itemsWithMaximumOneCount = itemsWithOneCount.filter(item => item.oneCount === maximumOneCount);
        return {insane_numbers: itemsWithMaximumOneCount.map(item => item.original)};
    }
}