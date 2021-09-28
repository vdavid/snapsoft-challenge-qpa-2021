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
    async solveProblem(id, sampleIndex, solver) {
        /* Create submission */
        try {
            const submissionResponse = await this.apiCommunicator.createSubmission(id, sampleIndex);
            console.log(`Got submission #${submissionResponse.id} with ${submissionResponse.testCount} tests, sampleIndex: ${sampleIndex}, startedAt: ${submissionResponse.startedAt}.`);
            // const submissionResponse = {id: 'aab256a8-1fd2-11ec-b7a2-06c3cc14c34c', testCount: 1};
            /* Fetch all tests */
            let allCorrect = true;
            for (let testIndex = 0; testIndex < submissionResponse.testCount; testIndex++) {
                const test = await this.apiCommunicator.getTestInput(submissionResponse.id);
                console.log(`Received Test #${testIndex} Input:`);
                util_1.default.inspect(test.input, false, 3, true);
                const solution = solver.solve(test);
                util_1.default.inspect(solution, false, 3, true);
                const response = await this.apiCommunicator.submitTestResult(test.testId, solution);
                console.log(response);
                if (!response) {
                    allCorrect = false;
                    break;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return false;
    }
}
exports.default = SnapsoftIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU25hcHNvZnRJbnRlZ3JhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TbmFwc29mdEludGVncmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0RBQXdCO0FBR3hCLE1BQXFCLG1CQUFtQjtJQUdwQyxZQUFZLGVBQWdDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQVUsRUFBRSxXQUE2QixFQUFFLE1BQXNCO1FBQ2hGLHVCQUF1QjtRQUN2QixJQUFJO1lBQ0EsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLGtCQUFrQixDQUFDLEVBQUUsU0FBUyxrQkFBa0IsQ0FBQyxTQUFTLHdCQUF3QixXQUFXLGdCQUFnQixrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO1lBRXhMLHlGQUF5RjtZQUM3RSxxQkFBcUI7WUFDckIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQzNFLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLFNBQVMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxjQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN0QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxVQUFVLEdBQUcsS0FBSyxDQUFDO29CQUNuQixNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFsQ0Qsc0NBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwaUNvbW11bmljYXRvciBmcm9tICcuL0FwaUNvbW11bmljYXRvcic7XHJcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge1NvbHZlckZ1bmN0aW9ufSBmcm9tICcuL1NvbHZlckZ1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYXBzb2Z0SW50ZWdyYXRpb24ge1xyXG4gICAgcHJpdmF0ZSBhcGlDb21tdW5pY2F0b3I6IEFwaUNvbW11bmljYXRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlDb21tdW5pY2F0b3I6IEFwaUNvbW11bmljYXRvcikge1xyXG4gICAgICAgIHRoaXMuYXBpQ29tbXVuaWNhdG9yID0gYXBpQ29tbXVuaWNhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNvbHZlUHJvYmxlbShpZDogc3RyaW5nLCBzYW1wbGVJbmRleDogbnVtYmVyfHVuZGVmaW5lZCwgc29sdmVyOiBTb2x2ZXJGdW5jdGlvbikge1xyXG4gICAgICAgIC8qIENyZWF0ZSBzdWJtaXNzaW9uICovXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgc3VibWlzc2lvblJlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGlDb21tdW5pY2F0b3IuY3JlYXRlU3VibWlzc2lvbihpZCwgc2FtcGxlSW5kZXgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgR290IHN1Ym1pc3Npb24gIyR7c3VibWlzc2lvblJlc3BvbnNlLmlkfSB3aXRoICR7c3VibWlzc2lvblJlc3BvbnNlLnRlc3RDb3VudH0gdGVzdHMsIHNhbXBsZUluZGV4OiAke3NhbXBsZUluZGV4fSwgc3RhcnRlZEF0OiAke3N1Ym1pc3Npb25SZXNwb25zZS5zdGFydGVkQXR9LmApXHJcblxyXG4vLyBjb25zdCBzdWJtaXNzaW9uUmVzcG9uc2UgPSB7aWQ6ICdhYWIyNTZhOC0xZmQyLTExZWMtYjdhMi0wNmMzY2MxNGMzNGMnLCB0ZXN0Q291bnQ6IDF9O1xyXG4gICAgICAgICAgICAvKiBGZXRjaCBhbGwgdGVzdHMgKi9cclxuICAgICAgICAgICAgbGV0IGFsbENvcnJlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB0ZXN0SW5kZXggPSAwOyB0ZXN0SW5kZXggPCBzdWJtaXNzaW9uUmVzcG9uc2UudGVzdENvdW50OyB0ZXN0SW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVzdCA9IGF3YWl0IHRoaXMuYXBpQ29tbXVuaWNhdG9yLmdldFRlc3RJbnB1dChzdWJtaXNzaW9uUmVzcG9uc2UuaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmVkIFRlc3QgIyR7dGVzdEluZGV4fSBJbnB1dDpgKTtcclxuICAgICAgICAgICAgICAgIHV0aWwuaW5zcGVjdCh0ZXN0LmlucHV0LCBmYWxzZSwgMywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHV0aW9uID0gc29sdmVyLnNvbHZlKHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgdXRpbC5pbnNwZWN0KHNvbHV0aW9uLCBmYWxzZSwgMywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGlDb21tdW5pY2F0b3Iuc3VibWl0VGVzdFJlc3VsdCh0ZXN0LnRlc3RJZCwgc29sdXRpb24pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsQ29ycmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==