// noinspection JSMethodCanBeStatic

import HttpsConnector from './HttpsConnector';
import {Test} from '../SolverFunction';

const baseUrl = 'https://challenge.snapsoft.hu';

export default class ApiCommunicator {
    private httpsConnector: HttpsConnector;
    private apiToken: string;

    constructor(httpsConnector: HttpsConnector, apiToken: string) {
        this.httpsConnector = httpsConnector;
        this.apiToken = apiToken;
    }

    async createSubmission(problemId: string, sampleIndex: number|undefined): Promise<{id: string, testCount: number, sampleIndex: number, startedAt: Date}> {
        const url = baseUrl + this.getCreateSubmissionUrl();
        const response = await this.httpsConnector.requestPromisified(url,
            {method: 'POST', headers: this.buildRequestHeaders()},
            JSON.stringify(this.buildCreateSubmissionRequestBody(problemId, sampleIndex)));
        return this.parseCreateSubmissionResponse(response.body);
    }

    async getTestInput(submissionId: string): Promise<Test> {
        const url = baseUrl + this.getStartTestUrl();
        const response = await this.httpsConnector.requestPromisified(url,
            {method: 'PUT', headers: this.buildRequestHeaders()},
            JSON.stringify(this.buildStartTestRequestBody(submissionId)));
        return this.parseStartTestResponse(response.body);
    }

    async submitTestResult(testId: string, output: any): Promise<boolean> {
        const url = baseUrl + this.getSubmitTestResultUrl(testId);
        const response = await this.httpsConnector.requestPromisified(url,
            {method: 'POST', headers: this.buildRequestHeaders()},
            JSON.stringify(this.buildSubmitTestResultRequestBody(output)));
        return this.parseSubmitTestResultResponseBody(response.body);
    }

    async uploadCode(problemId: string, fileName: string, fileContent: string): Promise<void> {
        const url = baseUrl + this.getUploadCodeUrl(problemId, fileName);
        const response = await this.httpsConnector.requestPromisified(url,
            {method: 'POST', headers: {
                    'X-Api-Token': this.apiToken,
                    'Content-Type': 'multipart/form-data; boundary=---------------------------'
                }},
            `---------------------------
Content-Disposition: form-data; name="${fileName}"

${fileContent}`);
        return this.parseUploadCodeResponseBody(response.body);
    }

    private buildRequestHeaders(): { 'X-Api-Token': string; 'Content-Type': string } {
        return {
            'X-Api-Token': this.apiToken,
            'Content-Type': 'application/json'
        };
    }

    /**
     * @returns {string}
     * @private
     */
    private getCreateSubmissionUrl() {
        return '/api/submissions/start-submission';
    }

    private buildCreateSubmissionRequestBody(problemId: string, sampleIndex: number|undefined): {problem: string, sample_index?: number} {
        return sampleIndex !== undefined ? {problem: problemId, sample_index: sampleIndex} : {problem: problemId};
    }

    private parseCreateSubmissionResponse(responseString: string): {id: string, testCount: number, sampleIndex: number, startedAt: Date} {
        const responseJson = JSON.parse(responseString);

        if (!responseJson.error) {
            return {
                id: responseJson.submission.id,
                testCount: responseJson.submission.test_count,
                sampleIndex: responseJson.submission.sample_index,
                startedAt: new Date(responseJson.submission.started_at),
            }
        } else {
            throw new Error(`Could not create submission. Error message: "${responseJson.error}"`);
        }
    }

    /*********************************************/

    /**
     * @returns {string}
     * @private
     */
    private getStartTestUrl() {
        return '/api/submissions/test';
    }

    /**
     * @param {string} submissionId
     * @returns {{submission: string}}
     * @private
     */
    private buildStartTestRequestBody(submissionId: string) {
        return {submission: submissionId};
    }

    private parseStartTestResponse(responseString: string): Test {
        const responseJson = JSON.parse(responseString);
        return {
            testId: responseJson.test_id,
            deadline: new Date(responseJson.deadline),
            input: responseJson.input,
        };
    }

    /*********************************************/

    /**
     * @param {string} testId
     * @returns {string}
     * @private
     */
    private getSubmitTestResultUrl(testId: string) {
        return `/api/submissions/test/${testId}`;
    }

    private buildSubmitTestResultRequestBody<T>(output: T): {output: T} {
        return {output};
    }

    /**
     * @param {string} responseString
     * @returns {boolean}
     * @private
     */
    private parseSubmitTestResultResponseBody(responseString: string) {
        const responseJson = JSON.parse(responseString);
        return responseJson.correct;
    }

    /*********************************************/

    /**
     * @param {string} problemId
     * @param {string} fileName
     * @returns {string}
     * @private
     */
    private getUploadCodeUrl(problemId: string, fileName: string) {
        return `/files/api/submissions/code-upload/${problemId}/${fileName}`;
    }

    /**
     * @param {string} responseString
     * @returns {string}
     * @private
     */
    private parseUploadCodeResponseBody(responseString: string) {
        const responseJson = JSON.parse(responseString);
        return responseJson.error;
    }
}