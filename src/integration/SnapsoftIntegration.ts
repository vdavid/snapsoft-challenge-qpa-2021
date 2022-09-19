import ApiCommunicator from './ApiCommunicator';
import util from 'util';
import {SolverFunction} from '../SolverFunction';

export default class SnapsoftIntegration {
    private apiCommunicator: ApiCommunicator;

    constructor(apiCommunicator: ApiCommunicator) {
        this.apiCommunicator = apiCommunicator;
    }

    async solveProblem(id: string, sampleIndex: number | undefined, solver: SolverFunction): Promise<boolean> {
        /* Create submission */
        try {
            const submissionResponse = await this.apiCommunicator.createSubmission(id, sampleIndex);
            console.log(`Got submission #${submissionResponse.id} with ${submissionResponse.testCount} tests, sampleIndex: ${sampleIndex}, startedAt: ${submissionResponse.startedAt}.`);

// const submissionResponse = {id: 'aab256a8-1fd2-11ec-b7a2-06c3cc14c34c', testCount: 1};
            /* Fetch all tests */
            let wereAllCorrect = true;
            for (let testIndex = 0; testIndex < submissionResponse.testCount; testIndex++) {
                const test = await this.apiCommunicator.getTestInput(submissionResponse.id);
                console.log(`Received Test #${testIndex} Input:`);
                console.log(util.inspect(test.input, false, 3, true));
                const solution = solver.solve(test);
                console.log(util.inspect(solution, false, 3, true));
                const response = await this.apiCommunicator.submitTestResult(test.testId, solution);
                console.log(response);
                if (!response) {
                    wereAllCorrect = false;
                    break;
                }
            }
            return wereAllCorrect;
        } catch (error: any) {
            console.log(error);
        }
        return false;
    }
}
