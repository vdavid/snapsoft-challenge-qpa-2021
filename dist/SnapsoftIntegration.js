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
    async solveProblem(id, sampleIndex, solver, sourceCodeFileNames) {
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
        }
        catch (error) {
            console.log(error);
        }
        return false;
    }
}
exports.default = SnapsoftIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU25hcHNvZnRJbnRlZ3JhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TbmFwc29mdEludGVncmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0RBQXdCO0FBR3hCLE1BQXFCLG1CQUFtQjtJQUdwQyxZQUFZLGVBQWdDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQVUsRUFBRSxXQUE2QixFQUFFLE1BQXNCLEVBQUUsbUJBQTZCO1FBQy9HLHVCQUF1QjtRQUN2QixJQUFJO1lBQ0EsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLGtCQUFrQixDQUFDLEVBQUUsU0FBUyxrQkFBa0IsQ0FBQyxTQUFTLHdCQUF3QixXQUFXLGdCQUFnQixrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO1lBRXhMLHlGQUF5RjtZQUM3RSxxQkFBcUI7WUFDckIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQzNFLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLFNBQVMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxjQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN0QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxVQUFVLEdBQUcsS0FBSyxDQUFDO29CQUNuQixNQUFNO2lCQUNUO2FBQ0o7WUFFRCw0QkFBNEI7WUFDNUIsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekIsMkJBQTJCO2dCQUMzQiwwSEFBMEg7Z0JBQzFILDBEQUEwRDtnQkFDMUQsdUhBQXVIO2dCQUN2SCxpQkFBaUI7Z0JBQ2pCLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWCxzQkFBc0I7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFoREQsc0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwaUNvbW11bmljYXRvciBmcm9tICcuL0FwaUNvbW11bmljYXRvcic7XHJcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge1NvbHZlckZ1bmN0aW9ufSBmcm9tICcuL1NvbHZlckZ1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYXBzb2Z0SW50ZWdyYXRpb24ge1xyXG4gICAgcHJpdmF0ZSBhcGlDb21tdW5pY2F0b3I6IEFwaUNvbW11bmljYXRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlDb21tdW5pY2F0b3I6IEFwaUNvbW11bmljYXRvcikge1xyXG4gICAgICAgIHRoaXMuYXBpQ29tbXVuaWNhdG9yID0gYXBpQ29tbXVuaWNhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNvbHZlUHJvYmxlbShpZDogc3RyaW5nLCBzYW1wbGVJbmRleDogbnVtYmVyfHVuZGVmaW5lZCwgc29sdmVyOiBTb2x2ZXJGdW5jdGlvbiwgc291cmNlQ29kZUZpbGVOYW1lczogc3RyaW5nW10pIHtcclxuICAgICAgICAvKiBDcmVhdGUgc3VibWlzc2lvbiAqL1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pc3Npb25SZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ29tbXVuaWNhdG9yLmNyZWF0ZVN1Ym1pc3Npb24oaWQsIHNhbXBsZUluZGV4KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEdvdCBzdWJtaXNzaW9uICMke3N1Ym1pc3Npb25SZXNwb25zZS5pZH0gd2l0aCAke3N1Ym1pc3Npb25SZXNwb25zZS50ZXN0Q291bnR9IHRlc3RzLCBzYW1wbGVJbmRleDogJHtzYW1wbGVJbmRleH0sIHN0YXJ0ZWRBdDogJHtzdWJtaXNzaW9uUmVzcG9uc2Uuc3RhcnRlZEF0fS5gKVxyXG5cclxuLy8gY29uc3Qgc3VibWlzc2lvblJlc3BvbnNlID0ge2lkOiAnYWFiMjU2YTgtMWZkMi0xMWVjLWI3YTItMDZjM2NjMTRjMzRjJywgdGVzdENvdW50OiAxfTtcclxuICAgICAgICAgICAgLyogRmV0Y2ggYWxsIHRlc3RzICovXHJcbiAgICAgICAgICAgIGxldCBhbGxDb3JyZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgdGVzdEluZGV4ID0gMDsgdGVzdEluZGV4IDwgc3VibWlzc2lvblJlc3BvbnNlLnRlc3RDb3VudDsgdGVzdEluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSBhd2FpdCB0aGlzLmFwaUNvbW11bmljYXRvci5nZXRUZXN0SW5wdXQoc3VibWlzc2lvblJlc3BvbnNlLmlkKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlZCBUZXN0ICMke3Rlc3RJbmRleH0gSW5wdXQ6YCk7XHJcbiAgICAgICAgICAgICAgICB1dGlsLmluc3BlY3QodGVzdC5pbnB1dCwgZmFsc2UsIDMsIHRydWUpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb2x1dGlvbiA9IHNvbHZlci5zb2x2ZSh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIHV0aWwuaW5zcGVjdChzb2x1dGlvbiwgZmFsc2UsIDMsIHRydWUpXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ29tbXVuaWNhdG9yLnN1Ym1pdFRlc3RSZXN1bHQodGVzdC50ZXN0SWQsIHNvbHV0aW9uKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbENvcnJlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyogWmlwIGZpbGVzIGlmIHN1Y2NlZWRlZCAqL1xyXG4gICAgICAgICAgICBpZiAoYWxsQ29ycmVjdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FsbCBnb29kIScpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgemlwID0gbmV3IEpTWmlwKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBhd2FpdCBQcm9taXNlLmFsbChzb3VyY2VDb2RlRmlsZU5hbWVzLm1hcChhc3luYyBmaWxlTmFtZSA9PiB6aXAuZmlsZShmaWxlTmFtZSwgYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoZmlsZU5hbWUpKSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgemlwcGVkQ29udGVudCA9IHppcC5nZW5lcmF0ZUFzeW5jKHt0eXBlOlwiYmxvYlwifSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBhcGlDb21tdW5pY2F0b3IudXBsb2FkQ29kZShzYW5pdHlDaGVja1Byb2JsZW1JZCwgYCR7c2FuaXR5Q2hlY2tQcm9ibGVtSWR9LXppcGAsIHppcHBlZENvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFsbCBnb29kXHJcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gd3JpdGUgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19