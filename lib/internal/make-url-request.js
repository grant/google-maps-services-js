"use strict";
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var https = require('https');
var parse = require('url').parse;
var version = require('../version');
var HttpsProxyAgent = require('https-proxy-agent');
// add keep-alive header to speed up request
var agent = new https.Agent({ keepAlive: true });
/**
 * Makes a secure HTTP GET request for the given URL.
 *
 * Calls the callback with two parameters (err, response). If there was an
 * error, response should be null. If there was no error, err should be null,
 * and response should be an object with these properties
 * {
 *   status: number,
 *   headers: Object,
 *   json: Object
 * }
 *
 * Returns a function that cancels the request.
 *
 * @param {string} url
 * @param {function(ClientResponse)} onSuccess
 * @param {function(?)} onError
 * @param {Object} options
 * @return {function()}
 */
module.exports = function makeUrlRequest(url, onSuccess, onError, options) {
    var requestOptions = parse(url);
    var body;
    // Allow each API to provide some of the request options such as the
    // HTTP method, headers, etc.
    if (options) {
        for (var k in options) {
            if (k === 'body') {
                body = options[k];
            }
            else {
                requestOptions[k] = options[k];
            }
        }
    }
    requestOptions.headers = requestOptions.headers || {};
    requestOptions.headers['User-Agent'] = 'GoogleGeoApiClientJS/' + version;
    // HTTP/HTTPS proxy to connect from within the enterprise/corporate network
    var proxy = process.env.http_proxy || process.env.https_proxy;
    if (proxy) {
        // create an instance of the `HttpsProxyAgent` class with the proxy server information
        var proxyAgent = new HttpsProxyAgent(proxy);
        requestOptions.agent = proxyAgent;
    }
    var request = https.request(requestOptions, function (response) {
        response.on('error', function (error) {
            onError(error);
        });
        if (response.statusCode === 302) {
            // Handle redirect.
            var url = response.headers['location'];
            makeUrlRequest(url, onSuccess, onError, options);
        }
        else if (response.headers['content-type'] == 'application/json; charset=UTF-8') {
            // Handle JSON.
            var data = [];
            response.on('data', function (chunk) {
                data.push(chunk);
            });
            response.on('end', function () {
                var json;
                try {
                    json = JSON.parse(Buffer.concat(data).toString());
                }
                catch (error) {
                    onError(error);
                    return;
                }
                onSuccess({
                    status: response.statusCode,
                    headers: response.headers,
                    json: json
                });
            });
        }
        else {
            // Fallback is for binary data, namely places photo download,
            // so just provide the response stream. Also provide the same
            // consistent name for status checking as per JSON responses.
            response.status = response.statusCode;
            onSuccess(response);
        }
    }).on('error', function (error) {
        onError(error);
    });
    if (body) {
        request.write(JSON.stringify(body));
    }
    request.end();
    return function cancel() { request.abort(); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS11cmwtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1ha2UtdXJsLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2pDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUVuRCw0Q0FBNEM7QUFDNUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFHakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFDLEdBQVcsRUFBRSxTQUFtQixFQUFFLE9BQWlCLEVBQUUsT0FBWTtJQUV4RyxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsSUFBSSxJQUFJLENBQUM7SUFFVCxvRUFBb0U7SUFDcEUsNkJBQTZCO0lBQzdCLElBQUksT0FBTyxFQUFFO1FBQ1gsS0FBSyxJQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUNoQixJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25CO2lCQUFNO2dCQUNMLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEM7U0FDRjtLQUNGO0lBRUQsY0FBYyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN0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