import ApiCommunicator from './ApiCommunicator';
import util from 'util';

interface SolverFunction {
    solve(input: object): object;
}

export default class SnapsoftIntegration {
    private apiCommunicator: ApiCommunicator;

    constructor(apiCommunicator: ApiCommunicator) {
        this.apiCommunicator = apiCommunicator;
    }

    /**
     * @param {string} id
     * @param {number} sampleIndex
     * @param {{solve: function(*): *}} solver
     * @param {string[]} sourceCodeFileNames
     * @returns {Promise<boolean>}
     */
    async solveProblem(id: string, sampleIndex: number, solver: SolverFunction, sourceCodeFileNames: string[]) {
        /* Create submission */
        try {
            const submissionResponse = await this.apiCommunicator.createSubmission(id, sampleIndex);
            console.log(`Got submission #${submissionResponse.id} with ${submissionResponse.testCount} tests, sampleIndex: ${sampleIndex}, startedAt: ${submissionResponse.startedAt}.`)

// const submissionResponse = {id: 'aab256a8-1fd2-11ec-b7a2-06c3cc14c34c', testCount: 1};
            /* Fetch all tests */
            const tests = [];
            for (let testIndex = 0; testIndex < submissionResponse.testCount; testIndex++) {
                tests.push(await this.apiCommunicator.getTestInput(submissionResponse.id));
            }
            console.log(`Received #${tests.length} tests. Inputs:`);
            tests.forEach(test => console.log(test.input));

            /* Solve each test */
            const testResults = tests.map(test => ({id: test.testId, output: solver.solve(test.input)}));
            console.log(`Results:`);
            console.log(util.inspect(testResults, false, 3, true));
            const responses = await Promise.all(testResults.map(testResult => this.apiCommunicator.submitTestResult(testResult.id, testResult.output)));
            console.log(`Responses:`);
            console.log(responses);

            /* Zip files if succeeded */
            if (sampleIndex === undefined && !responses.find(response => !response)) {
                console.log('All good!');
                // const zip = new JSZip();
                // await Promise.all(sourceCodeFileNames.map(async fileName => zip.file(fileName, await fs.promises.readFile(fileName))));
                // const zippedContent = zip.generateAsync({type:"blob"});
                // const result = await apiCommunicator.uploadCode(sanityCheckProblemId, `${sanityCheckProblemId}-zip`, zippedContent);
                // if (!result) {
                // all good
                // } else {
                // write error message
                return true;
            }
        } catch (error: any) {
            console.log(error);
        }
        return false;
    }
}