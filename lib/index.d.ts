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
/**
 * Google Maps Service module.
 * @module @google/maps
 */
import * as internalcli from './internal/cli';
import * as internalutil from './util';
/**
 * Creates a Google Maps client. The client object contains all the API methods.
 *
 * @param {Object} options
 * @param {string} options.key API key (required, unless clientID and
 *     clientSecret provided).
 * @param {string=} options.clientId Maps API for Work client ID.
 * @param {string=} options.clientSecret Maps API for Work client secret (a.k.a.
 *     private key).
 * @param {string=} options.channel Maps API for Work channel.
 * @param {number=} options.timeout Timeout in milliseconds.
 *     (Default: 60 * 1000 ms)
 * @param {string=} options.language Default language for all queries.
        See https://developers.google.com/maps/faq#languagesupport
 * @param {number=} options.rate.limit Controls rate-limiting of requests.
 *     Maximum number of requests per period. (Default: 50)
 * @param {number=} options.rate.period Period for rate limit, in milliseconds.
 *     (Default: 1000 ms)
 * @param {number=} options.retryOptions.interval If a transient server error
 *     occurs, how long to wait before retrying the request, in milliseconds.
 *     (Default: 500 ms)
 * @param {Function=} options.Promise - Promise constructor (optional).
 * @return {GoogleMapsClient} The client object containing all API methods.
 */
export declare const createClient: (options: any) => {
    directions: (query: any, callback: Function, customParams: Object) => any;
    distanceMatrix: (query: any, callback: Function, customParams: Object) => any;
    elevation: (query: any, callback: Function, customParams: Object) => any;
    elevationAlongPath: (query: any, callback: Function, customParams: Object) => any;
    geocode: (query: any, callback: Function, customParams: Object) => any;
    geolocate: (query: any, callback: Function, customParams: Object) => any;
    reverseGeocode: (query: any, callback: Function, customParams: Object) => any;
    findPlace: (query: any, callback: Function, customParams: Object) => any;
    places: (query: any, callback: Function, customParams: Object) => any;
    placesNearby: (query: any, callback: Function, customParams: Object) => any;
    placesRadar: any;
    place: (query: any, callback: Function, customParams: Object) => any;
    placesPhoto: (query: any, callback: Function, customParams: Object) => any;
    placesAutoComplete: (query: any, callback: Function, customParams: Object) => any;
    placesQueryAutoComplete: (query: any, callback: Function, customParams: Object) => any;
    snapToRoads: (query: any, callback: Function, customParams: Object) => any;
    nearestRoads: (query: any, callback: Function, customParams: Object) => any;
    speedLimits: (query: any, callback: Function, customParams: Object) => any;
    snappedSpeedLimits: (query: any, callback: Function, customParams: Object) => any;
    timezone: (query: any, callback: Function, customParams: Object) => any;
};
export declare const cli: typeof internalcli;
export declare const util: typeof internalutil;
