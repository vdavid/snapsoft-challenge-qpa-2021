"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https")); /* Documentation: https://nodejs.org/api/https.html */
class HttpsConnector {
    /**
     * "Options" can be any valid HTTPS request options: https://nodejs.org/api/http.html#http_http_request_options_callback
     */
    requestPromisified(url, options, requestBody = undefined) {
        return new Promise((resolve, reject) => {
            const request = https_1.default.request(url, options, (response) => {
                const statusCode = response.statusCode;
                const headers = response.headers;
                let body = '';
                response.setEncoding('utf8');
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => resolve({ statusCode, headers, body }));
            });
            request.on('error', error => reject(error));
            if (requestBody) {
                request.write(requestBody);
            }
            request.end();
        });
    }
}
exports.default = HttpsConnector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cHNDb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvSHR0cHNDb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBMEIsQ0FBQyxzREFBc0Q7QUFFakYsTUFBcUIsY0FBYztJQUMvQjs7T0FFRztJQUNILGtCQUFrQixDQUFDLEdBQVcsRUFBRSxPQUErQixFQUFFLGNBQWtDLFNBQVM7UUFDeEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxNQUFNLE9BQU8sR0FBRyxlQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDckQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDdkMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDakMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNkLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUN4QixJQUFJLElBQUksS0FBSyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM5QjtZQUNELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQXZCRCxpQ0F1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHR0cCBmcm9tICdodHRwJzsgLyogRG9jdW1lbnRhdGlvbjogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwgKi9cbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7IC8qIERvY3VtZW50YXRpb246IGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cHMuaHRtbCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdHRwc0Nvbm5lY3RvciB7XG4gICAgLyoqXG4gICAgICogXCJPcHRpb25zXCIgY2FuIGJlIGFueSB2YWxpZCBIVFRQUyByZXF1ZXN0IG9wdGlvbnM6IGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfaHR0cF9yZXF1ZXN0X29wdGlvbnNfY2FsbGJhY2tcbiAgICAgKi9cbiAgICByZXF1ZXN0UHJvbWlzaWZpZWQodXJsOiBzdHJpbmcsIG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIHJlcXVlc3RCb2R5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBQcm9taXNlPHsgc3RhdHVzQ29kZTogbnVtYmVyIHwgdW5kZWZpbmVkLCBoZWFkZXJzOiBodHRwLkluY29taW5nSHR0cEhlYWRlcnMsIGJvZHk6IHN0cmluZyB9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdCh1cmwsIG9wdGlvbnMsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwb25zZS5oZWFkZXJzO1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gJyc7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGNodW5rID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSArPSBjaHVuaztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4gcmVzb2x2ZSh7c3RhdHVzQ29kZSwgaGVhZGVycywgYm9keX0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVxdWVzdC5vbignZXJyb3InLCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Qm9keSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3Qud3JpdGUocmVxdWVzdEJvZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==