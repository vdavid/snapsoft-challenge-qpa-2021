import ApiCommunicator from "./ApiCommunicator.mjs";
import HttpsConnector from './HttpsConnector.mjs';

const sanityCheckProblemId = 'sanity-check';

const apiToken = 'fmIM2RgAW7ueHMHB';
const httpsConnector = new HttpsConnector();
const apiCommunicator = new ApiCommunicator(httpsConnector, apiToken);


const submissionResponse = await apiCommunicator.createSubmission(sanityCheckProblemId, 0);
console.log(submissionResponse);

// const submissionResponse = {id: 'aab256a8-1fd2-11ec-b7a2-06c3cc14c34c', testCount: 1};
if (!submissionResponse.errorMessage) {
    const tests = []
    for (let testIndex = 0; testIndex < submissionResponse.testCount; testIndex++) {
        tests.push(await apiCommunicator.getTestInput(submissionResponse.id));
    }
    console.log(tests);

    const testResults = tests.map(test => ({id: test.testId, output: solve(test.input)}));
    console.log(testResults);
    const responses = await Promise.all(testResults.map(testResult => apiCommunicator.submitTestResult(testResult.id, testResult.output)));
    console.log(responses);

    if(!responses.find(response => !response)) {
        // zippedContent = zip(all files);
        // apiCommunicator.uploadCode(sanityCheckProblemId, `${sanityCheckProblemId}-file`, zippedContent);
    }
}
