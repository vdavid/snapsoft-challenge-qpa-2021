export interface SolverFunction {
    solve(test: Test): object;
}

export interface Test {
    testId: string;
    deadline: Date;
    input: object;
}
