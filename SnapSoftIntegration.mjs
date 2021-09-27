export default class SnapSoftIntegration {
    /**
     * @param {ApiCommunicator} apiCommunicator
     */
    constructor(apiCommunicator) {
        this._apiCommunicator = apiCommunicator;
    }

    /**
     * @param {string} id
     * @param {number} sampleIndex
     * @param {{solve: function(*): *}} solver
     * @param {string[]} sourceCodeFileNames
     * @returns {Promise<boolean>}
     */
    async solveProblem(id, sampleIndex, solver, sourceCodeFileNames) {
        /* Create submission */
        const submissionResponse = await this._apiCommunicator.createSubmission(id, sampleIndex);
        console.log(submissionResponse);

// const submissionResponse = {id: 'aab256a8-1fd2-11ec-b7a2-06c3cc14c34c', testCount: 1};
        if (!submissionResponse.errorMessage) {
            /* Fetch all tests */
            const tests = []
            for (let testIndex = 0; testIndex < submissionResponse.testCount; testIndex++) {
                tests.push(await this._apiCommunicator.getTestInput(submissionResponse.id));
            }
            console.log(tests);

            /* Solve each test */
            const testResults = tests.map(test => ({id: test.testId, output: solver.solve(test.input)}));
            console.log(testResults);
            const responses = await Promise.all(testResults.map(testResult => this._apiCommunicator.submitTestResult(testResult.id, testResult.output)));
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
        }
        return false;
    }
}