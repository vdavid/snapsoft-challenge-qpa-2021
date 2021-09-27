const baseUrl = 'https://challenge.snapsoft.hu';

export default class ApiCommunicator {
    constructor(httpsConnector, apiToken) {
        this._httpsConnector = httpsConnector;
        this._apiToken = apiToken;
    }

    /**
     * @param {string} problemId
     * @param {number} sampleIndex
     * @returns {Promise<{id: string, testCount: number, sampleIndex: number, startedAt: Date}|{errorMessage: string}>}
     */
    async createSubmission(problemId, sampleIndex) {
        try {
            const url = baseUrl + this._getCreateSubmissionUrl();
            const response = await this._httpsConnector.requestPromisified(url,
                {method: 'POST', headers: this._buildRequestHeaders()},
                JSON.stringify(this._buildCreateSubmissionRequestBody(problemId, sampleIndex)));
            return this._parseCreateSubmissionResponse(response.body);
        } catch (error) {
            return {errorMessage: error.message};
        }
    }

    /**
     * @param {string} submissionId
     * @returns {Promise<{testId: string, deadline: Date, input: *}>}
     */
    async getTestInput(submissionId) {
        const url = baseUrl + this._getStartTestUrl();
        const response = await this._httpsConnector.requestPromisified(url,
            {method: 'PUT', headers: this._buildRequestHeaders()},
            JSON.stringify(this._buildStartTestRequestBody(submissionId)));
        return this._parseStartTestResponse(response.body);
    }

    /**
     * @param {string} testId
     * @param {*} output
     * @returns {Promise<boolean>}
     */
    async submitTestResult(testId, output) {
        const url = baseUrl + this._getSubmitTestResultUrl(testId);
        const response = await this._httpsConnector.requestPromisified(url,
            {method: 'POST', headers: this._buildRequestHeaders()},
            JSON.stringify(this._buildSubmitTestResultRequestBody(output)));
        return this._parseSubmitTestResultResponseBody(response.body);
    }

    /**
     * @param {string} problemId
     * @param {string} fileName
     * @param {string} fileContent
     * @returns {Promise<void>}
     */
    async uploadCode(problemId, fileName, fileContent) {
        const url = baseUrl + this._getUploadCodeUrl(problemId, fileName);
        const response = await this._httpsConnector.requestPromisified(url,
            {method: 'POST', headers: {
                    'X-Api-Token': this._apiToken,
                    'Content-Type': 'multipart/form-data; boundary=---------------------------'
                }},
            `---------------------------
Content-Disposition: form-data; name="${fileName}"

${fileContent}`);
        return this._parseUploadCodeResponseBody(response.body);
    }

    /**
     * @returns {{"X-Api-Token": string, "Content-Type": string}}
     * @private
     */
    _buildRequestHeaders() {
        return {
            'X-Api-Token': this._apiToken,
            'Content-Type': 'application/json'
        };
    }

    /**
     * @returns {string}
     * @private
     */
    _getCreateSubmissionUrl() {
        return '/api/submissions/start-submission';
    }

    /**
     * @param {string} problemId
     * @param {number|undefined} sampleIndex
     * @returns {{problem: string, sample_index: number}|{problem: string}}
     * @private
     */
    _buildCreateSubmissionRequestBody(problemId, sampleIndex) {
        return sampleIndex !== undefined ? {problem: problemId, sample_index: sampleIndex} : {problem: problemId};
    }

    /**
     * @param {string} responseString
     * @returns {{id: string, testCount: number, sampleIndex: number, startedAt: Date}}
     * @private
     */
    _parseCreateSubmissionResponse(responseString) {
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
    _getStartTestUrl() {
        return '/api/submissions/test';
    }

    /**
     * @param {string} submissionId
     * @returns {{submission: string}}
     * @private
     */
    _buildStartTestRequestBody(submissionId) {
        return {submission: submissionId};
    }

    /**
     * @param {string} responseString
     * @returns {{testId: string, deadline: Date, input: *}}
     * @private
     */
    _parseStartTestResponse(responseString) {
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
    _getSubmitTestResultUrl(testId) {
        return `/api/submissions/test/${testId}`;
    }

    /**
     * @template T
     * @param {T} output
     * @returns {{output: T}}
     * @private
     */
    _buildSubmitTestResultRequestBody(output) {
        return {output};
    }

    /**
     * @param {string} responseString
     * @returns {boolean}
     * @private
     */
    _parseSubmitTestResultResponseBody(responseString) {
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
    _getUploadCodeUrl(problemId, fileName) {
        return `/files/api/submissions/code-upload/${problemId}/${fileName}`;
    }

    _parseUploadCodeResponseBody(responseString) {
        const responseJson = JSON.parse(responseString);
        return responseJson.error;
    }
}