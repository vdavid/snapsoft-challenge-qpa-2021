"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
class SnapsoftIntegration {
    constructor(apiCommunicator) {
        this.apiCommunicator = apiCommunicator;
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
        try {
            const submissionResponse = await this.apiCommunicator.createSubmission(id, sampleIndex);
            console.log(`Got submission #${submissionResponse.id} with ${submissionResponse.testCount} tests, sampleIndex: ${sampleIndex}, startedAt: ${submissionResponse.startedAt}.`);
            // const submissionResponse = {id: 'aab256a8-1fd2-11ec-b7a2-06c3cc14c34c', testCount: 1};
            /* Fetch all tests */
            const tests = [];
            for (let testIndex = 0; testIndex < submissionResponse.testCount; testIndex++) {
                tests.push(await this.apiCommunicator.getTestInput(submissionResponse.id));
            }
            console.log(`Received #${tests.length} tests. Inputs:`);
            tests.forEach(test => console.log(test.input));
            /* Solve each test */
            const testResults = tests.map(test => ({ id: test.testId, output: solver.solve(test.input) }));
            console.log(`Results:`);
            console.log(util_1.default.inspect(testResults, false, 3, true));
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
        }
        catch (error) {
            console.log(error);
        }
        return false;
    }
}
exports.default = SnapsoftIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU25hcHNvZnRJbnRlZ3JhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TbmFwc29mdEludGVncmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0RBQXdCO0FBTXhCLE1BQXFCLG1CQUFtQjtJQUdwQyxZQUFZLGVBQWdDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQVUsRUFBRSxXQUFtQixFQUFFLE1BQXNCLEVBQUUsbUJBQTZCO1FBQ3JHLHVCQUF1QjtRQUN2QixJQUFJO1lBQ0EsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLGtCQUFrQixDQUFDLEVBQUUsU0FBUyxrQkFBa0IsQ0FBQyxTQUFTLHdCQUF3QixXQUFXLGdCQUFnQixrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO1lBRXhMLHlGQUF5RjtZQUM3RSxxQkFBcUI7WUFDckIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQzNFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlFO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEtBQUssQ0FBQyxNQUFNLGlCQUFpQixDQUFDLENBQUM7WUFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFL0MscUJBQXFCO1lBQ3JCLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1SSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkIsNEJBQTRCO1lBQzVCLElBQUksV0FBVyxLQUFLLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QiwyQkFBMkI7Z0JBQzNCLDBIQUEwSDtnQkFDMUgsMERBQTBEO2dCQUMxRCx1SEFBdUg7Z0JBQ3ZILGlCQUFpQjtnQkFDakIsV0FBVztnQkFDWCxXQUFXO2dCQUNYLHNCQUFzQjtnQkFDdEIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQUMsT0FBTyxLQUFVLEVBQUU7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQXZERCxzQ0F1REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBpQ29tbXVuaWNhdG9yIGZyb20gJy4vQXBpQ29tbXVuaWNhdG9yJztcclxuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XHJcblxyXG5pbnRlcmZhY2UgU29sdmVyRnVuY3Rpb24ge1xyXG4gICAgc29sdmUoaW5wdXQ6IG9iamVjdCk6IG9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25hcHNvZnRJbnRlZ3JhdGlvbiB7XHJcbiAgICBwcml2YXRlIGFwaUNvbW11bmljYXRvcjogQXBpQ29tbXVuaWNhdG9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwaUNvbW11bmljYXRvcjogQXBpQ29tbXVuaWNhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5hcGlDb21tdW5pY2F0b3IgPSBhcGlDb21tdW5pY2F0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzYW1wbGVJbmRleFxyXG4gICAgICogQHBhcmFtIHt7c29sdmU6IGZ1bmN0aW9uKCopOiAqfX0gc29sdmVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzb3VyY2VDb2RlRmlsZU5hbWVzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuICAgICAqL1xyXG4gICAgYXN5bmMgc29sdmVQcm9ibGVtKGlkOiBzdHJpbmcsIHNhbXBsZUluZGV4OiBudW1iZXIsIHNvbHZlcjogU29sdmVyRnVuY3Rpb24sIHNvdXJjZUNvZGVGaWxlTmFtZXM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgLyogQ3JlYXRlIHN1Ym1pc3Npb24gKi9cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJtaXNzaW9uUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaUNvbW11bmljYXRvci5jcmVhdGVTdWJtaXNzaW9uKGlkLCBzYW1wbGVJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBHb3Qgc3VibWlzc2lvbiAjJHtzdWJtaXNzaW9uUmVzcG9uc2UuaWR9IHdpdGggJHtzdWJtaXNzaW9uUmVzcG9uc2UudGVzdENvdW50fSB0ZXN0cywgc2FtcGxlSW5kZXg6ICR7c2FtcGxlSW5kZXh9LCBzdGFydGVkQXQ6ICR7c3VibWlzc2lvblJlc3BvbnNlLnN0YXJ0ZWRBdH0uYClcclxuXHJcbi8vIGNvbnN0IHN1Ym1pc3Npb25SZXNwb25zZSA9IHtpZDogJ2FhYjI1NmE4LTFmZDItMTFlYy1iN2EyLTA2YzNjYzE0YzM0YycsIHRlc3RDb3VudDogMX07XHJcbiAgICAgICAgICAgIC8qIEZldGNoIGFsbCB0ZXN0cyAqL1xyXG4gICAgICAgICAgICBjb25zdCB0ZXN0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB0ZXN0SW5kZXggPSAwOyB0ZXN0SW5kZXggPCBzdWJtaXNzaW9uUmVzcG9uc2UudGVzdENvdW50OyB0ZXN0SW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGVzdHMucHVzaChhd2FpdCB0aGlzLmFwaUNvbW11bmljYXRvci5nZXRUZXN0SW5wdXQoc3VibWlzc2lvblJlc3BvbnNlLmlkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmVkICMke3Rlc3RzLmxlbmd0aH0gdGVzdHMuIElucHV0czpgKTtcclxuICAgICAgICAgICAgdGVzdHMuZm9yRWFjaCh0ZXN0ID0+IGNvbnNvbGUubG9nKHRlc3QuaW5wdXQpKTtcclxuXHJcbiAgICAgICAgICAgIC8qIFNvbHZlIGVhY2ggdGVzdCAqL1xyXG4gICAgICAgICAgICBjb25zdCB0ZXN0UmVzdWx0cyA9IHRlc3RzLm1hcCh0ZXN0ID0+ICh7aWQ6IHRlc3QudGVzdElkLCBvdXRwdXQ6IHNvbHZlci5zb2x2ZSh0ZXN0LmlucHV0KX0pKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlc3VsdHM6YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHV0aWwuaW5zcGVjdCh0ZXN0UmVzdWx0cywgZmFsc2UsIDMsIHRydWUpKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VzID0gYXdhaXQgUHJvbWlzZS5hbGwodGVzdFJlc3VsdHMubWFwKHRlc3RSZXN1bHQgPT4gdGhpcy5hcGlDb21tdW5pY2F0b3Iuc3VibWl0VGVzdFJlc3VsdCh0ZXN0UmVzdWx0LmlkLCB0ZXN0UmVzdWx0Lm91dHB1dCkpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlc3BvbnNlczpgKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VzKTtcclxuXHJcbiAgICAgICAgICAgIC8qIFppcCBmaWxlcyBpZiBzdWNjZWVkZWQgKi9cclxuICAgICAgICAgICAgaWYgKHNhbXBsZUluZGV4ID09PSB1bmRlZmluZWQgJiYgIXJlc3BvbnNlcy5maW5kKHJlc3BvbnNlID0+ICFyZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBbGwgZ29vZCEnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHppcCA9IG5ldyBKU1ppcCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gYXdhaXQgUHJvbWlzZS5hbGwoc291cmNlQ29kZUZpbGVOYW1lcy5tYXAoYXN5bmMgZmlsZU5hbWUgPT4gemlwLmZpbGUoZmlsZU5hbWUsIGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVOYW1lKSkpKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHppcHBlZENvbnRlbnQgPSB6aXAuZ2VuZXJhdGVBc3luYyh7dHlwZTpcImJsb2JcIn0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgYXBpQ29tbXVuaWNhdG9yLnVwbG9hZENvZGUoc2FuaXR5Q2hlY2tQcm9ibGVtSWQsIGAke3Nhbml0eUNoZWNrUHJvYmxlbUlkfS16aXBgLCB6aXBwZWRDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhbGwgZ29vZFxyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHdyaXRlIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==