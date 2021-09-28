import ApiCommunicator from './ApiCommunicator';
import util from 'util';
import {SolverFunction} from './SolverFunction';

export default class SnapsoftIntegration {
    private apiCommunicator: ApiCommunicator;

    constructor(apiCommunicator: ApiCommunicator) {
        this.apiCommunicator = apiCommunicator;
    }

    async solveProblem(id: string, sampleIndex: number|undefined, solver: SolverFunction, sourceCodeFileNames: string[]) {
        /* Create submission */
        try {
            const submissionResponse = await this.apiCommunicator.createSubmission(id, sampleIndex);
            console.log(`Got submission #${submissionResponse.id} with ${submissionResponse.testCount} tests, sampleIndex: ${sampleIndex}, startedAt: ${submissionResponse.startedAt}.`)

// const submissionResponse = {id: 'aab256a8-1fd2-11ec-b7a2-06c3cc14c34c', testCount: 1};
            /* Fetch all tests */
            let allCorrect = true;
            for (let testIndex = 0; testIndex < submissionResponse.testCount; testIndex++) {
                const test = await this.apiCommunicator.getTestInput(submissionResponse.id);
                console.log(`Received Test #${testIndex} Input:`);
                util.inspect(test.input, false, 3, true)
                const solution = solver.solve(test);
                util.inspect(solution, false, 3, true)
                const response = await this.apiCommunicator.submitTestResult(test.testId, solution)
                console.log(response);
                if (!response) {
                    allCorrect = false;
                    break;
                }
            }

            /* Zip files if succeeded */
            if (allCorrect) {
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