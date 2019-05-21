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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Google Maps Service module.
 * @module @google/maps
 */
var internalcli = require("./internal/cli");
var internalutil = require("./util");
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
exports.createClient = function (options) {
    options = options || {};
    var makeApiCall = require('./internal/make-api-call').inject(options);
    var deprecate = require('util').deprecate;
    var makeApiMethod = function (apiConfig) {
        return function (query, callback, customParams) {
            query = apiConfig.validator(query);
            query.supportsClientId = apiConfig.supportsClientId !== false;
            query.options = apiConfig.options;
            if (options.language && !query.language) {
                query.language = options.language;
            }
            // Merge query and customParams.
            var finalQuery = {};
            customParams = customParams || {};
            [customParams, query].map(function (obj) {
                Object.keys(obj).sort().map(function (key) {
                    finalQuery[key] = obj[key];
                });
            });
            return makeApiCall(apiConfig.url, finalQuery, callback);
        };
    };
    var geocode = require('./apis/geocode');
    var geolocation = require('./apis/geolocation');
    var timezone = require('./apis/timezone');
    var directions = require('./apis/directions');
    var distanceMatrix = require('./apis/distance-matrix');
    var elevation = require('./apis/elevation');
    var roads = require('./apis/roads');
    var places = require('./apis/places');
    return {
        directions: makeApiMethod(directions.directions),
        distanceMatrix: makeApiMethod(distanceMatrix.distanceMatrix),
        elevation: makeApiMethod(elevation.elevation),
        elevationAlongPath: makeApiMethod(elevation.elevationAlongPath),
        geocode: makeApiMethod(geocode.geocode),
        geolocate: makeApiMethod(geolocation.geolocate),
        reverseGeocode: makeApiMethod(geocode.reverseGeocode),
        findPlace: makeApiMethod(places.findPlace),
        places: makeApiMethod(places.places),
        placesNearby: makeApiMethod(places.placesNearby),
        placesRadar: deprecate(makeApiMethod(places.placesRadar), 'placesRadar is deprecated, see http://goo.gl/BGiumE'),
        place: makeApiMethod(places.place),
        placesPhoto: makeApiMethod(places.placesPhoto),
        placesAutoComplete: makeApiMethod(places.placesAutoComplete),
        placesQueryAutoComplete: makeApiMethod(places.placesQueryAutoComplete),
        snapToRoads: makeApiMethod(roads.snapToRoads),
        nearestRoads: makeApiMethod(roads.nearestRoads),
        speedLimits: makeApiMethod(roads.speedLimits),
        snappedSpeedLimits: makeApiMethod(roads.snappedSpeedLimits),
        timezone: makeApiMethod(timezone.timezone)
    };
};
exports.cli = internalcli;
exports.util = internalutil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOztBQUVIOzs7R0FHRztBQUNILDRDQUE4QztBQUM5QyxxQ0FBdUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsVUFBQyxPQUFZO0lBQ3ZDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ3hCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRTFDLElBQUksYUFBYSxHQUFHLFVBQVMsU0FBYztRQUN6QyxPQUFPLFVBQVMsS0FBVSxFQUFFLFFBQWtCLEVBQUUsWUFBb0I7WUFDbEUsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsS0FBSyxLQUFLLENBQUM7WUFDOUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2xDLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQzthQUNuQztZQUNELGdDQUFnQztZQUNoQyxJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7WUFDekIsWUFBWSxHQUFHLFlBQVksSUFBSSxFQUFFLENBQUM7WUFDbEMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBRztnQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FB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