import http from 'http'; /* Documentation: https://nodejs.org/api/http.html */
import https from 'https'; /* Documentation: https://nodejs.org/api/https.html */

export default class HttpsConnector {
    /**
     * "Options" can be any valid HTTPS request options: https://nodejs.org/api/http.html#http_http_request_options_callback
     */
    requestPromisified(url: string, options: { [key: string]: any }, requestBody: string | undefined = undefined): Promise<{ statusCode: number | undefined, headers: http.IncomingHttpHeaders, body: string }> {
        return new Promise((resolve, reject) => {
            const request = https.request(url, options, (response) => {
                const statusCode = response.statusCode;
                const headers = response.headers;
                let body = '';
                response.setEncoding('utf8');
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => resolve({statusCode, headers, body}));
            });
            request.on('error', error => reject(error));
            if (requestBody) {
                request.write(requestBody);
            }
            request.end();
        });
    }
}