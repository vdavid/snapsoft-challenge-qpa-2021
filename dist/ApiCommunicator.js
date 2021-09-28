"use strict";
// noinspection JSMethodCanBeStatic
Object.defineProperty(exports, "__esModule", { value: true });
const baseUrl = 'https://challenge.snapsoft.hu';
class ApiCommunicator {
    constructor(httpsConnector, apiToken) {
        this.httpsConnector = httpsConnector;
        this.apiToken = apiToken;
    }
    async createSubmission(problemId, sampleIndex) {
        const url = baseUrl + this.getCreateSubmissionUrl();
        const response = await this.httpsConnector.requestPromisified(url, { method: 'POST', headers: this.buildRequestHeaders() }, JSON.stringify(this.buildCreateSubmissionRequestBody(problemId, sampleIndex)));
        return this.parseCreateSubmissionResponse(response.body);
    }
    async getTestInput(submissionId) {
        const url = baseUrl + this.getStartTestUrl();
        const response = await this.httpsConnector.requestPromisified(url, { method: 'PUT', headers: this.buildRequestHeaders() }, JSON.stringify(this.buildStartTestRequestBody(submissionId)));
        return this.parseStartTestResponse(response.body);
    }
    async submitTestResult(testId, output) {
        const url = baseUrl + this.getSubmitTestResultUrl(testId);
        const response = await this.httpsConnector.requestPromisified(url, { method: 'POST', headers: this.buildRequestHeaders() }, JSON.stringify(this.buildSubmitTestResultRequestBody(output)));
        return this.parseSubmitTestResultResponseBody(response.body);
    }
    async uploadCode(problemId, fileName, fileContent) {
        const url = baseUrl + this.getUploadCodeUrl(problemId, fileName);
        const response = await this.httpsConnector.requestPromisified(url, { method: 'POST', headers: {
                'X-Api-Token': this.apiToken,
                'Content-Type': 'multipart/form-data; boundary=---------------------------'
            } }, `---------------------------
Content-Disposition: form-data; name="${fileName}"

${fileContent}`);
        return this.parseUploadCodeResponseBody(response.body);
    }
    buildRequestHeaders() {
        return {
            'X-Api-Token': this.apiToken,
            'Content-Type': 'application/json'
        };
    }
    /**
     * @returns {string}
     * @private
     */
    getCreateSubmissionUrl() {
        return '/api/submissions/start-submission';
    }
    buildCreateSubmissionRequestBody(problemId, sampleIndex) {
        return sampleIndex !== undefined ? { problem: problemId, sample_index: sampleIndex } : { problem: problemId };
    }
    parseCreateSubmissionResponse(responseString) {
        const responseJson = JSON.parse(responseString);
        if (!responseJson.error) {
            return {
                id: responseJson.submission.id,
                testCount: responseJson.submission.test_count,
                sampleIndex: responseJson.submission.sample_index,
                startedAt: new Date(responseJson.submission.started_at),
            };
        }
        else {
            throw new Error(`Could not create submission. Error message: "${responseJson.error}"`);
        }
    }
    /*********************************************/
    /**
     * @returns {string}
     * @private
     */
    getStartTestUrl() {
        return '/api/submissions/test';
    }
    /**
     * @param {string} submissionId
     * @returns {{submission: string}}
     * @private
     */
    buildStartTestRequestBody(submissionId) {
        return { submission: submissionId };
    }
    /**
     * @param {string} responseString
     * @returns {{testId: string, deadline: Date, input: *}}
     * @private
     */
    parseStartTestResponse(responseString) {
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
    getSubmitTestResultUrl(testId) {
        return `/api/submissions/test/${testId}`;
    }
    buildSubmitTestResultRequestBody(output) {
        return { output };
    }
    /**
     * @param {string} responseString
     * @returns {boolean}
     * @private
     */
    parseSubmitTestResultResponseBody(responseString) {
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
    getUploadCodeUrl(problemId, fileName) {
        return `/files/api/submissions/code-upload/${problemId}/${fileName}`;
    }
    /**
     * @param {string} responseString
     * @returns {string}
     * @private
     */
    parseUploadCodeResponseBody(responseString) {
        const responseJson = JSON.parse(responseString);
        return responseJson.error;
    }
}
exports.default = ApiCommunicator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpQ29tbXVuaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwaUNvbW11bmljYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbUNBQW1DOztBQUluQyxNQUFNLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztBQUVoRCxNQUFxQixlQUFlO0lBSWhDLFlBQVksY0FBOEIsRUFBRSxRQUFnQjtRQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQWlCLEVBQUUsV0FBbUI7UUFDekQsTUFBTSxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQzdELEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsRUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBb0I7UUFDbkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUM3RCxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLEVB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LFVBQVUsRUFBRSxZQUFZLEVBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLHNCQUFzQixDQUFDLGNBQXNCO1FBQ2pELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsT0FBTztZQUNILE1BQU0sRUFBRSxZQUFZLENBQUMsT0FBTztZQUM1QixRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUN6QyxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7U0FDNUIsQ0FBQztJQUNOLENBQUM7SUFFRCwrQ0FBK0M7SUFFL0M7Ozs7T0FJRztJQUNLLHNCQUFzQixDQUFDLE1BQWM7UUFDekMsT0FBTyx5QkFBeUIsTUFBTSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVPLGdDQUFnQyxDQUFJLE1BQVM7UUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssaUNBQWlDLENBQUMsY0FBc0I7UUFDNUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQUVELCtDQUErQztJQUUvQzs7Ozs7T0FLRztJQUNLLGdCQUFnQixDQUFDLFNBQWlCLEVBQUUsUUFBZ0I7UUFDeEQsT0FBTyxzQ0FBc0MsU0FBUyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQ3pFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssMkJBQTJCLENBQUMsY0FBc0I7UUFDdEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBaEtELGtDQWdLQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXHJcblxyXG5pbXBvcnQgSHR0cHNDb25uZWN0b3IgZnJvbSAnLi9IdHRwc0Nvbm5lY3Rvcic7XHJcblxyXG5jb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vY2hhbGxlbmdlLnNuYXBzb2Z0Lmh1JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaUNvbW11bmljYXRvciB7XHJcbiAgICBwcml2YXRlIGh0dHBzQ29ubmVjdG9yOiBIdHRwc0Nvbm5lY3RvcjtcclxuICAgIHByaXZhdGUgYXBpVG9rZW46IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihodHRwc0Nvbm5lY3RvcjogSHR0cHNDb25uZWN0b3IsIGFwaVRva2VuOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmh0dHBzQ29ubmVjdG9yID0gaHR0cHNDb25uZWN0b3I7XHJcbiAgICAgICAgdGhpcy5hcGlUb2tlbiA9IGFwaVRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNyZWF0ZVN1Ym1pc3Npb24ocHJvYmxlbUlkOiBzdHJpbmcsIHNhbXBsZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPHtpZDogc3RyaW5nLCB0ZXN0Q291bnQ6IG51bWJlciwgc2FtcGxlSW5kZXg6IG51bWJlciwgc3RhcnRlZEF0OiBEYXRlfT4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgKyB0aGlzLmdldENyZWF0ZVN1Ym1pc3Npb25VcmwoKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cHNDb25uZWN0b3IucmVxdWVzdFByb21pc2lmaWVkKHVybCxcclxuICAgICAgICAgICAge21ldGhvZDogJ1BPU1QnLCBoZWFkZXJzOiB0aGlzLmJ1aWxkUmVxdWVzdEhlYWRlcnMoKX0sXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVpbGRDcmVhdGVTdWJtaXNzaW9uUmVxdWVzdEJvZHkocHJvYmxlbUlkLCBzYW1wbGVJbmRleCkpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUNyZWF0ZVN1Ym1pc3Npb25SZXNwb25zZShyZXNwb25zZS5ib2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRUZXN0SW5wdXQoc3VibWlzc2lvbklkOiBzdHJpbmcpOiBQcm9taXNlPHt0ZXN0SWQ6IHN0cmluZywgZGVhZGxpbmU6IERhdGUsIGlucHV0OiBhbnl9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYmFzZVVybCArIHRoaXMuZ2V0U3RhcnRUZXN0VXJsKCk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHBzQ29ubmVjdG9yLnJlcXVlc3RQcm9taXNpZmllZCh1cmwsXHJcbiAgICAgICAgICAgIHttZXRob2Q6ICdQVVQnLCBoZWFkZXJzOiB0aGlzLmJ1aWxkUmVxdWVzdEhlYWRlcnMoKX0sXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVpbGRTdGFydFRlc3RSZXF1ZXN0Qm9keShzdWJtaXNzaW9uSWQpKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VTdGFydFRlc3RSZXNwb25zZShyZXNwb25zZS5ib2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzdWJtaXRUZXN0UmVzdWx0KHRlc3RJZDogc3RyaW5nLCBvdXRwdXQ6IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgKyB0aGlzLmdldFN1Ym1pdFRlc3RSZXN1bHRVcmwodGVzdElkKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cHNDb25uZWN0b3IucmVxdWVzdFByb21pc2lmaWVkKHVybCxcclxuICAgICAgICAgICAge21ldGhvZDogJ1BPU1QnLCBoZWFkZXJzOiB0aGlzLmJ1aWxkUmVxdWVzdEhlYWRlcnMoKX0sXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVpbGRTdWJtaXRUZXN0UmVzdWx0UmVxdWVzdEJvZHkob3V0cHV0KSkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlU3VibWl0VGVzdFJlc3VsdFJlc3BvbnNlQm9keShyZXNwb25zZS5ib2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cGxvYWRDb2RlKHByb2JsZW1JZDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCBmaWxlQ29udGVudDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYmFzZVVybCArIHRoaXMuZ2V0VXBsb2FkQ29kZVVybChwcm9ibGVtSWQsIGZpbGVOYW1lKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cHNDb25uZWN0b3IucmVxdWVzdFByb21pc2lmaWVkKHVybCxcclxuICAgICAgICAgICAge21ldGhvZDogJ1BPU1QnLCBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ1gtQXBpLVRva2VuJzogdGhpcy5hcGlUb2tlbixcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSdcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cIiR7ZmlsZU5hbWV9XCJcclxuXHJcbiR7ZmlsZUNvbnRlbnR9YCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VVcGxvYWRDb2RlUmVzcG9uc2VCb2R5KHJlc3BvbnNlLmJvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRSZXF1ZXN0SGVhZGVycygpOiB7ICdYLUFwaS1Ub2tlbic6IHN0cmluZzsgJ0NvbnRlbnQtVHlwZSc6IHN0cmluZyB9IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnWC1BcGktVG9rZW4nOiB0aGlzLmFwaVRva2VuLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENyZWF0ZVN1Ym1pc3Npb25VcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpL3N1Ym1pc3Npb25zL3N0YXJ0LXN1Ym1pc3Npb24nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRDcmVhdGVTdWJtaXNzaW9uUmVxdWVzdEJvZHkocHJvYmxlbUlkOiBzdHJpbmcsIHNhbXBsZUluZGV4PzogbnVtYmVyKToge3Byb2JsZW06IHN0cmluZywgc2FtcGxlX2luZGV4PzogbnVtYmVyfSB7XHJcbiAgICAgICAgcmV0dXJuIHNhbXBsZUluZGV4ICE9PSB1bmRlZmluZWQgPyB7cHJvYmxlbTogcHJvYmxlbUlkLCBzYW1wbGVfaW5kZXg6IHNhbXBsZUluZGV4fSA6IHtwcm9ibGVtOiBwcm9ibGVtSWR9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VDcmVhdGVTdWJtaXNzaW9uUmVzcG9uc2UocmVzcG9uc2VTdHJpbmc6IHN0cmluZyk6IHtpZDogc3RyaW5nLCB0ZXN0Q291bnQ6IG51bWJlciwgc2FtcGxlSW5kZXg6IG51bWJlciwgc3RhcnRlZEF0OiBEYXRlfSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VKc29uID0gSlNPTi5wYXJzZShyZXNwb25zZVN0cmluZyk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2VKc29uLmVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpZDogcmVzcG9uc2VKc29uLnN1Ym1pc3Npb24uaWQsXHJcbiAgICAgICAgICAgICAgICB0ZXN0Q291bnQ6IHJlc3BvbnNlSnNvbi5zdWJtaXNzaW9uLnRlc3RfY291bnQsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVJbmRleDogcmVzcG9uc2VKc29uLnN1Ym1pc3Npb24uc2FtcGxlX2luZGV4LFxyXG4gICAgICAgICAgICAgICAgc3RhcnRlZEF0OiBuZXcgRGF0ZShyZXNwb25zZUpzb24uc3VibWlzc2lvbi5zdGFydGVkX2F0KSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGNyZWF0ZSBzdWJtaXNzaW9uLiBFcnJvciBtZXNzYWdlOiBcIiR7cmVzcG9uc2VKc29uLmVycm9yfVwiYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTdGFydFRlc3RVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuICcvYXBpL3N1Ym1pc3Npb25zL3Rlc3QnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN1Ym1pc3Npb25JZFxyXG4gICAgICogQHJldHVybnMge3tzdWJtaXNzaW9uOiBzdHJpbmd9fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBidWlsZFN0YXJ0VGVzdFJlcXVlc3RCb2R5KHN1Ym1pc3Npb25JZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtzdWJtaXNzaW9uOiBzdWJtaXNzaW9uSWR9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc3BvbnNlU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB7e3Rlc3RJZDogc3RyaW5nLCBkZWFkbGluZTogRGF0ZSwgaW5wdXQ6ICp9fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVN0YXJ0VGVzdFJlc3BvbnNlKHJlc3BvbnNlU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZUpzb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlU3RyaW5nKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0ZXN0SWQ6IHJlc3BvbnNlSnNvbi50ZXN0X2lkLFxyXG4gICAgICAgICAgICBkZWFkbGluZTogbmV3IERhdGUocmVzcG9uc2VKc29uLmRlYWRsaW5lKSxcclxuICAgICAgICAgICAgaW5wdXQ6IHJlc3BvbnNlSnNvbi5pbnB1dCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGVzdElkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTdWJtaXRUZXN0UmVzdWx0VXJsKHRlc3RJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGAvYXBpL3N1Ym1pc3Npb25zL3Rlc3QvJHt0ZXN0SWR9YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkU3VibWl0VGVzdFJlc3VsdFJlcXVlc3RCb2R5PFQ+KG91dHB1dDogVCk6IHtvdXRwdXQ6IFR9IHtcclxuICAgICAgICByZXR1cm4ge291dHB1dH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2VTdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVN1Ym1pdFRlc3RSZXN1bHRSZXNwb25zZUJvZHkocmVzcG9uc2VTdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlSnNvbiA9IEpTT04ucGFyc2UocmVzcG9uc2VTdHJpbmcpO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZUpzb24uY29ycmVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2JsZW1JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRVcGxvYWRDb2RlVXJsKHByb2JsZW1JZDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGAvZmlsZXMvYXBpL3N1Ym1pc3Npb25zL2NvZGUtdXBsb2FkLyR7cHJvYmxlbUlkfS8ke2ZpbGVOYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2VTdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlVXBsb2FkQ29kZVJlc3BvbnNlQm9keShyZXNwb25zZVN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VKc29uID0gSlNPTi5wYXJzZShyZXNwb25zZVN0cmluZyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlSnNvbi5lcnJvcjtcclxuICAgIH1cclxufSJdfQ==