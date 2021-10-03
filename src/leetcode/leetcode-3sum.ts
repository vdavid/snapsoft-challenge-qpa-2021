testOddNumberOfArguments();
testEvenNumberOfArguments();

function testOddNumberOfArguments() {
    const nums = [0, 10, 100, 500, 1000];
    const testValues = [
        {input: -5, expected: 0},
        {input: 0, expected: 0},
        {input: 5, expected: 1},
        {input: 10, expected: 1},
        {input: 50, expected: 2},
        {input: 100, expected: 2},
        {input: 150, expected: 3},
        {input: 500, expected: 3},
        {input: 750, expected: 4},
        {input: 1000, expected: 4},
        {input: 1100, expected: undefined},
    ];
    for (const testValue of testValues) {
        const result = searchFirstHigherOrEqual(nums, testValue.input);
        if (testValue.expected !== result) {
            console.log(`Fail – value: ${testValue.input}, expected: ${testValue.expected}, result: ${result}`);
        }
    }
}

function testEvenNumberOfArguments() {
    const nums = [0, 10, 80, 100, 500, 1000];
    const testValues = [
        {input: -5, expected: 0},
        {input: 0, expected: 0},
        {input: 5, expected: 1},
        {input: 10, expected: 1},
        {input: 50, expected: 2},
        {input: 80, expected: 2},
        {input: 90, expected: 3},
        {input: 100, expected: 3},
        {input: 150, expected: 4},
        {input: 500, expected: 4},
        {input: 750, expected: 5},
        {input: 1000, expected: 5},
        {input: 1100, expected: undefined},
    ];
    for (const testValue of testValues) {
        const result = searchFirstHigherOrEqual(nums, testValue.input);
        if (testValue.expected !== result) {
            console.log(`Fail – value: ${testValue.input}, expected: ${testValue.expected}, result: ${result}`);
        }
    }
}

function searchFirstHigherOrEqual(nums: number[], value: number): number | undefined {
    let index = Math.floor(nums.length / 2);

    if (nums.length > 1) {
        if (nums[index] < value) {
            const result = searchFirstHigherOrEqual(nums.slice(index + 1), value);
            return result !== undefined ? result + (index + 1) : undefined;
        } else if (nums[index - 1] >= value) {
            return searchFirstHigherOrEqual(nums.slice(0, index), value);
        } else {
            return index;
        }
    } else {
        return nums.length === 1 ? 0 : undefined;
    }
}