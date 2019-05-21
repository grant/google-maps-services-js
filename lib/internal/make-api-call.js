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
var url = require('url');
var Task = require('./task');
exports.inject = function (options) {
    var key = options.key || process.env.GOOGLE_MAPS_API_KEY;
    var channel = options.channel;
    var clientId = options.clientId || process.env.GOOGLE_MAPS_API_CLIENT_ID;
    var clientSecret = options.clientSecret || process.env.GOOGLE_MAPS_API_CLIENT_SECRET;
    var rate = options.rate || {};
    var rateLimit = rate.limit || 50; // 50 requests per ratePeriod.
    var ratePeriod = rate.period || 1000; // 1 second.
    var makeUrlRequest = options.makeUrlRequest || require('./make-url-request');
    var mySetTimeout = options.setTimeout || setTimeout;
    var myClearTimeout = options.clearTimeout || clearTimeout;
    var getTime = options.getTime || function () { return new Date().getTime(); };
    var wait = require('./wait').inject(mySetTimeout, myClearTimeout);
    var attempt = require('./attempt').inject(wait).attempt;
    var ThrottledQueue = require('./throttled-queue').inject(wait, getTime);
    var requestQueue = ThrottledQueue.create(rateLimit, ratePeriod);
    /**
     * Makes an API request using the injected makeUrlRequest.
     *
     * Inserts the API key (or client ID and signature) into the query
     * parameters. Retries requests when the status code requires it.
     * Parses the response body as JSON.
     *
     * The callback is given either an error or a response. The response
     * is an object with the following entries:
     * {
     *   status: number,
     *   body: string,
     *   json: Object
     * }
     *
     * @param {string} path
     * @param {Object} query This function mutates the query object.
     * @param {Function} callback
     * @return {{
     *   cancel: function(),
     *   finally: function(function()),
     *   asPromise: function(): Promise
     * }}
     */
    return function (path, query, callback) {
        callback = callback || function () { };
        var retryOptions = query.retryOptions || options.retryOptions || {};
        delete query.retryOptions;
        var timeout = query.timeout || options.timeout || 60 * 1000;
        delete query.timeout;
        var useClientId = query.supportsClientId && clientId && clientSecret;
        delete query.supportsClientId;
        var queryOptions = query.options || {};
        delete query.options;
        var isPost = queryOptions.method === 'POST';
        var requestUrl = formatRequestUrl(path, isPost ? {} : query, useClientId);
        if (isPost) {
            queryOptions.body = query;
        }
        // Determines whether a response indicates a retriable error.
        var canRetry = queryOptions.canRetry || function (response, query) {
            return (response == null
                || response.status === 500
                || response.status === 503
                || response.status === 504
                || (response.json && (response.json.status === 'OVER_QUERY_LIMIT' ||
                    response.json.status === 'RESOURCE_EXHAUSTED' ||
                    (response.json.status === 'INVALID_REQUEST' && query.pagetoken))));
        };
        delete queryOptions.canRetry;
        // Determines whether a response indicates success.
        var isSuccessful = queryOptions.isSuccessful || function (response) {
            return response.status === 200 && (response.json == undefined ||
                response.json.status === undefined ||
                response.json.status === 'OK' ||
                response.json.status === 'ZERO_RESULTS');
        };
        delete queryOptions.isSuccessful;
        function rateLimitedGet() {
            return requestQueue.add(function () {
                return Task.start(function (resolve, reject) {
                    return makeUrlRequest(requestUrl, resolve, reject, queryOptions);
                });
            });
        }
        var timeoutTask = wait(timeout).thenDo(function () {
            throw 'timeout';
        });
        var requestTask = attempt({
            'do': rateLimitedGet,
            until: function (response) { return !canRetry(response, query); },
            interval: retryOptions.interval,
            increment: retryOptions.increment,
            jitter: retryOptions.jitter
        });
        var task = Task.race([timeoutTask, requestTask])
            .thenDo(function (response) {
            // We add the request url and the original query to the response
            // to be able to use them when debugging errors.
            response.requestUrl = requestUrl;
            response.query = query;
            if (isSuccessful(response)) {
                return Task.withValue(response);
            }
            else {
                return Task.withError(response);
            }
        })
            .thenDo(function (response) { callback(null, response); }, function (err) { callback(err); });
        if (options.Promise) {
            var originalCallback = callback;
            var promise = new options.Promise(function (resolve, reject) {
                callback = function (err, result) {
                    if (err != null) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                    originalCallback(err, result);
                };
            });
            task.asPromise = function () { return promise; };
        }
        delete task.thenDo;
        return task;
    };
    /**
     * Adds auth information to the query, and formats it into a URL.
     * @param {string} path
     * @param {Object} query
     * @param {boolean} useClientId
     * @return {string} The formatted URL.
     */
    function formatRequestUrl(path, query, useClientId) {
        if (channel) {
            query.channel = channel;
        }
        if (useClientId) {
            query.client = clientId;
        }
        else if (key && key.indexOf('AIza') == 0) {
            query.key = key;
        }
        else {
            throw 'Missing either a valid API key, or a client ID and secret';
        }
        var requestUrl = url.format({ pathname: path, query: query });
        // When using client ID, generate and append the signature param.
        if (useClientId) {
            var secret = new Buffer(clientSecret, 'base64');
            var payload = url.parse(requestUrl).path;
            var signature = computeSignature(secret, payload);
            requestUrl += '&signature=' + encodeURIComponent(signature);
        }
        return requestUrl;
    }
    /**
     * @param {Buffer} secret
     * @param {string} payload
     * @return {string}
     */
    function computeSignature(secret, payload) {
        var signature = new Buffer(require('crypto')
            .createHmac('sha1', secret)
            .update(payload)
            .digest('base64'))
            .toString()
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        while (signature.length % 4) {
            signature += '=';
        }
        return signature;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS1hcGktY2FsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1ha2UtYXBpLWNhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFN0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFTLE9BQVk7SUFFcEMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0lBQ3pELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDOUIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0lBQ3pFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQztJQUVyRixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFFLDhCQUE4QjtJQUNqRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFFLFlBQVk7SUFFbkQsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3RSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQztJQUNwRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQztJQUMxRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FB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