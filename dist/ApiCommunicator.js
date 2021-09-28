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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpQ29tbXVuaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwaUNvbW11bmljYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbUNBQW1DOztBQUtuQyxNQUFNLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztBQUVoRCxNQUFxQixlQUFlO0lBSWhDLFlBQVksY0FBOEIsRUFBRSxRQUFnQjtRQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQWlCLEVBQUUsV0FBNkI7UUFDbkUsTUFBTSxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQzdELEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsRUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBb0I7UUFDbkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUM3RCxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLEVB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LFVBQVUsRUFBRSxZQUFZLEVBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sc0JBQXNCLENBQUMsY0FBc0I7UUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxPQUFPO1lBQ0gsTUFBTSxFQUFFLFlBQVksQ0FBQyxPQUFPO1lBQzVCLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3pDLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztTQUM1QixDQUFDO0lBQ04sQ0FBQztJQUVELCtDQUErQztJQUUvQzs7OztPQUlHO0lBQ0ssc0JBQXNCLENBQUMsTUFBYztRQUN6QyxPQUFPLHlCQUF5QixNQUFNLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU8sZ0NBQWdDLENBQUksTUFBUztRQUNqRCxPQUFPLEVBQUMsTUFBTSxFQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxpQ0FBaUMsQ0FBQyxjQUFzQjtRQUM1RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0NBQStDO0lBRS9DOzs7OztPQUtHO0lBQ0ssZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxRQUFnQjtRQUN4RCxPQUFPLHNDQUFzQyxTQUFTLElBQUksUUFBUSxFQUFFLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSywyQkFBMkIsQ0FBQyxjQUFzQjtRQUN0RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUEzSkQsa0NBMkpDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcclxuXHJcbmltcG9ydCBIdHRwc0Nvbm5lY3RvciBmcm9tICcuL0h0dHBzQ29ubmVjdG9yJztcclxuaW1wb3J0IHtUZXN0fSBmcm9tICcuL1NvbHZlckZ1bmN0aW9uJztcclxuXHJcbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9jaGFsbGVuZ2Uuc25hcHNvZnQuaHUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpQ29tbXVuaWNhdG9yIHtcclxuICAgIHByaXZhdGUgaHR0cHNDb25uZWN0b3I6IEh0dHBzQ29ubmVjdG9yO1xyXG4gICAgcHJpdmF0ZSBhcGlUb2tlbjogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGh0dHBzQ29ubmVjdG9yOiBIdHRwc0Nvbm5lY3RvciwgYXBpVG9rZW46IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaHR0cHNDb25uZWN0b3IgPSBodHRwc0Nvbm5lY3RvcjtcclxuICAgICAgICB0aGlzLmFwaVRva2VuID0gYXBpVG9rZW47XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY3JlYXRlU3VibWlzc2lvbihwcm9ibGVtSWQ6IHN0cmluZywgc2FtcGxlSW5kZXg6IG51bWJlcnx1bmRlZmluZWQpOiBQcm9taXNlPHtpZDogc3RyaW5nLCB0ZXN0Q291bnQ6IG51bWJlciwgc2FtcGxlSW5kZXg6IG51bWJlciwgc3RhcnRlZEF0OiBEYXRlfT4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgKyB0aGlzLmdldENyZWF0ZVN1Ym1pc3Npb25VcmwoKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cHNDb25uZWN0b3IucmVxdWVzdFByb21pc2lmaWVkKHVybCxcclxuICAgICAgICAgICAge21ldGhvZDogJ1BPU1QnLCBoZWFkZXJzOiB0aGlzLmJ1aWxkUmVxdWVzdEhlYWRlcnMoKX0sXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuYnVpbGRDcmVhdGVTdWJtaXNzaW9uUmVxdWVzdEJvZHkocHJvYmxlbUlkLCBzYW1wbGVJbmRleCkpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUNyZWF0ZVN1Ym1pc3Npb25SZXNwb25zZShyZXNwb25zZS5ib2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRUZXN0SW5wdXQoc3VibWlzc2lvbklkOiBzdHJpbmcpOiBQcm9taXNlPFRlc3Q+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSBiYXNlVXJsICsgdGhpcy5nZXRTdGFydFRlc3RVcmwoKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cHNDb25uZWN0b3IucmVxdWVzdFByb21pc2lmaWVkKHVybCxcclxuICAgICAgICAgICAge21ldGhvZDogJ1BVVCcsIGhlYWRlcnM6IHRoaXMuYnVpbGRSZXF1ZXN0SGVhZGVycygpfSxcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5idWlsZFN0YXJ0VGVzdFJlcXVlc3RCb2R5KHN1Ym1pc3Npb25JZCkpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVN0YXJ0VGVzdFJlc3BvbnNlKHJlc3BvbnNlLmJvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHN1Ym1pdFRlc3RSZXN1bHQodGVzdElkOiBzdHJpbmcsIG91dHB1dDogYW55KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYmFzZVVybCArIHRoaXMuZ2V0U3VibWl0VGVzdFJlc3VsdFVybCh0ZXN0SWQpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwc0Nvbm5lY3Rvci5yZXF1ZXN0UHJvbWlzaWZpZWQodXJsLFxyXG4gICAgICAgICAgICB7bWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IHRoaXMuYnVpbGRSZXF1ZXN0SGVhZGVycygpfSxcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5idWlsZFN1Ym1pdFRlc3RSZXN1bHRSZXF1ZXN0Qm9keShvdXRwdXQpKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VTdWJtaXRUZXN0UmVzdWx0UmVzcG9uc2VCb2R5KHJlc3BvbnNlLmJvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwbG9hZENvZGUocHJvYmxlbUlkOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIGZpbGVDb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSBiYXNlVXJsICsgdGhpcy5nZXRVcGxvYWRDb2RlVXJsKHByb2JsZW1JZCwgZmlsZU5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwc0Nvbm5lY3Rvci5yZXF1ZXN0UHJvbWlzaWZpZWQodXJsLFxyXG4gICAgICAgICAgICB7bWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnWC1BcGktVG9rZW4nOiB0aGlzLmFwaVRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJ1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIGAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPVwiJHtmaWxlTmFtZX1cIlxyXG5cclxuJHtmaWxlQ29udGVudH1gKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVVwbG9hZENvZGVSZXNwb25zZUJvZHkocmVzcG9uc2UuYm9keSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZFJlcXVlc3RIZWFkZXJzKCk6IHsgJ1gtQXBpLVRva2VuJzogc3RyaW5nOyAnQ29udGVudC1UeXBlJzogc3RyaW5nIH0ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdYLUFwaS1Ub2tlbic6IHRoaXMuYXBpVG9rZW4sXHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3JlYXRlU3VibWlzc2lvblVybCgpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvc3VibWlzc2lvbnMvc3RhcnQtc3VibWlzc2lvbic7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZENyZWF0ZVN1Ym1pc3Npb25SZXF1ZXN0Qm9keShwcm9ibGVtSWQ6IHN0cmluZywgc2FtcGxlSW5kZXg6IG51bWJlcnx1bmRlZmluZWQpOiB7cHJvYmxlbTogc3RyaW5nLCBzYW1wbGVfaW5kZXg/OiBudW1iZXJ9IHtcclxuICAgICAgICByZXR1cm4gc2FtcGxlSW5kZXggIT09IHVuZGVmaW5lZCA/IHtwcm9ibGVtOiBwcm9ibGVtSWQsIHNhbXBsZV9pbmRleDogc2FtcGxlSW5kZXh9IDoge3Byb2JsZW06IHByb2JsZW1JZH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZUNyZWF0ZVN1Ym1pc3Npb25SZXNwb25zZShyZXNwb25zZVN0cmluZzogc3RyaW5nKToge2lkOiBzdHJpbmcsIHRlc3RDb3VudDogbnVtYmVyLCBzYW1wbGVJbmRleDogbnVtYmVyLCBzdGFydGVkQXQ6IERhdGV9IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZUpzb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlU3RyaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZUpzb24uZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiByZXNwb25zZUpzb24uc3VibWlzc2lvbi5pZCxcclxuICAgICAgICAgICAgICAgIHRlc3RDb3VudDogcmVzcG9uc2VKc29uLnN1Ym1pc3Npb24udGVzdF9jb3VudCxcclxuICAgICAgICAgICAgICAgIHNhbXBsZUluZGV4OiByZXNwb25zZUpzb24uc3VibWlzc2lvbi5zYW1wbGVfaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzdGFydGVkQXQ6IG5ldyBEYXRlKHJlc3BvbnNlSnNvbi5zdWJtaXNzaW9uLnN0YXJ0ZWRfYXQpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgY3JlYXRlIHN1Ym1pc3Npb24uIEVycm9yIG1lc3NhZ2U6IFwiJHtyZXNwb25zZUpzb24uZXJyb3J9XCJgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFN0YXJ0VGVzdFVybCgpIHtcclxuICAgICAgICByZXR1cm4gJy9hcGkvc3VibWlzc2lvbnMvdGVzdCc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3VibWlzc2lvbklkXHJcbiAgICAgKiBAcmV0dXJucyB7e3N1Ym1pc3Npb246IHN0cmluZ319XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJ1aWxkU3RhcnRUZXN0UmVxdWVzdEJvZHkoc3VibWlzc2lvbklkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge3N1Ym1pc3Npb246IHN1Ym1pc3Npb25JZH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZVN0YXJ0VGVzdFJlc3BvbnNlKHJlc3BvbnNlU3RyaW5nOiBzdHJpbmcpOiBUZXN0IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZUpzb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlU3RyaW5nKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0ZXN0SWQ6IHJlc3BvbnNlSnNvbi50ZXN0X2lkLFxyXG4gICAgICAgICAgICBkZWFkbGluZTogbmV3IERhdGUocmVzcG9uc2VKc29uLmRlYWRsaW5lKSxcclxuICAgICAgICAgICAgaW5wdXQ6IHJlc3BvbnNlSnNvbi5pbnB1dCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGVzdElkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRTdWJtaXRUZXN0UmVzdWx0VXJsKHRlc3RJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGAvYXBpL3N1Ym1pc3Npb25zL3Rlc3QvJHt0ZXN0SWR9YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkU3VibWl0VGVzdFJlc3VsdFJlcXVlc3RCb2R5PFQ+KG91dHB1dDogVCk6IHtvdXRwdXQ6IFR9IHtcclxuICAgICAgICByZXR1cm4ge291dHB1dH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2VTdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVN1Ym1pdFRlc3RSZXN1bHRSZXNwb25zZUJvZHkocmVzcG9uc2VTdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlSnNvbiA9IEpTT04ucGFyc2UocmVzcG9uc2VTdHJpbmcpO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZUpzb24uY29ycmVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2JsZW1JZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRVcGxvYWRDb2RlVXJsKHByb2JsZW1JZDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGAvZmlsZXMvYXBpL3N1Ym1pc3Npb25zL2NvZGUtdXBsb2FkLyR7cHJvYmxlbUlkfS8ke2ZpbGVOYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2VTdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlVXBsb2FkQ29kZVJlc3BvbnNlQm9keShyZXNwb25zZVN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VKc29uID0gSlNPTi5wYXJzZShyZXNwb25zZVN0cmluZyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlSnNvbi5lcnJvcjtcclxuICAgIH1cclxufSJdfQ==