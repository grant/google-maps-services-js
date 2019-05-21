"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
 */ ;
var utils = require('../internal/convert');
var v = require('../internal/validate');
/**
 * Makes a geolocation request.
 *
 * For a detailed guide, see https://developers.google.com/maps/documentation/geolocation/intro
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.geolocate
 * @function
 * @param {Object} query
 * @param {number} [query.homeMobileCountryCode]
 * @param {number} [query.homeMobileNetworkCode]
 * @param {string} [query.radioType]
 * @param {string} [query.carrier]
 * @param {boolean} [query.considerIp]
 * @param {Object[]} [query.cellTowers]
 * @param {Object[]} [query.wifiAccessPoints]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.geolocate = {
    url: 'https://www.googleapis.com/geolocation/v1/geolocate',
    options: {
        method: 'POST',
        headers: { 'content-type': 'application/json;' },
        canRetry: function (response) {
            return response.status === 403;
        },
        isSuccessful: function (response) {
            return response.status === 200 || response.status === 404;
        }
    },
    validator: v.object({
        homeMobileCountryCode: v.optional(v.number),
        homeMobileNetworkCode: v.optional(v.number),
        radioType: v.optional(v.string),
        carrier: v.optional(v.string),
        considerIp: v.optional(v.boolean),
        cellTowers: v.optional(v.array(v.object({
            cellId: v.number,
            locationAreaCode: v.number,
            mobileCountryCode: v.number,
            mobileNetworkCode: v.number,
            age: v.optional(v.number),
            signalStrength: v.optional(v.number),
            timingAdvance: v.optional(v.number)
        }))),
        wifiAccessPoints: v.optional(v.array(v.object({
            macAddress: v.string,
            signalStrength: v.optional(v.number),
            age: v.optional(v.number),
            channel: v.optional(v.number),
            signalToNoiseRatio: v.optional(v.number)
        }))),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZW9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHLENBQUEsQ0FBQztBQUVKLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzNDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxPQUFPLENBQUMsU0FBUyxHQUFHO0lBQ2xCLEdBQUcsRUFBRSxxREFBcUQ7SUFDMUQsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUJBQW1CLEVBQUM7UUFDOUMsUUFBUSxFQUFFLFVBQVMsUUFBYTtZQUM5QixPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxZQUFZLEVBQUUsVUFBUyxRQUFhO1lBQ2xDLE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUM7UUFDNUQsQ0FBQztLQUNGO0lBQ0QsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEIscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDN0IsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDdEMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO1lBQ2hCLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxNQUFNO1lBQzFCLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNO1lBQzNCLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNO1lBQzNCLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDekIsY0FBYyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNwQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ0osZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDNUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNO1lBQ3BCLGNBQWMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDcEMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzdCLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNKLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDNUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM5QixDQUFDO0NBQ0gsQ0FBQyJ9