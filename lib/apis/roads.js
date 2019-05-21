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
 */ ;
var utils = require('../internal/convert');
var v = require('../internal/validate');
/**
 * Makes a snap-to-roads request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.snapToRoads
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.path
 * @param {boolean} [query.interpolate]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.snapToRoads = {
    url: 'https://roads.googleapis.com/v1/snapToRoads',
    supportsClientId: false,
    validator: v.object({
        path: utils.arrayOf(utils.latLng),
        interpolate: v.optional(v.boolean),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
/**
 * Makes a nearest roads request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.nearestRoads
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.points
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.nearestRoads = {
    url: 'https://roads.googleapis.com/v1/nearestRoads',
    supportsClientId: false,
    validator: v.object({
        points: utils.arrayOf(utils.latLng),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
/**
 * Makes a speed-limits request for a place ID. For speed-limits
 * requests using a path parameter, use the snappedSpeedLimits method.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.speedLimits
 * @function
 * @param {Object} query
 * @param {string[]} query.placeId
 * @param {string} [query.units] Either 'KPH' or 'MPH'
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.speedLimits = {
    url: 'https://roads.googleapis.com/v1/speedLimits',
    supportsClientId: false,
    validator: v.object({
        placeId: v.array(v.string),
        units: v.optional(v.oneOf(['KPH', 'MPH'])),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
/**
 * Makes a speed-limits request for a path.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.snappedSpeedLimits
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.path
 * @param {string} [query.units] Either 'KPH' or 'MPH'
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.snappedSpeedLimits = {
    url: 'https://roads.googleapis.com/v1/speedLimits',
    supportsClientId: false,
    validator: v.object({
        path: utils.arrayOf(utils.latLng),
        units: v.optional(v.oneOf(['KPH', 'MPH'])),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9hZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb2Fkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHLENBQUEsQ0FBQztBQUVKLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzNDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRXhDOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsT0FBTyxDQUFDLFdBQVcsR0FBRztJQUNwQixHQUFHLEVBQUUsNkNBQTZDO0lBQ2xELGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2xDLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDNUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM5QixDQUFDO0NBQ0gsQ0FBQztBQUVGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxPQUFPLENBQUMsWUFBWSxHQUFHO0lBQ3JCLEdBQUcsRUFBRSw4Q0FBOEM7SUFDbkQsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQixNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25DLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDNUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM5QixDQUFDO0NBQ0gsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE9BQU8sQ0FBQyxXQUFXLEdBQUc7SUFDcEIsR0FBRyxFQUFFLDZDQUE2QztJQUNsRCxnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzFDLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDNUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM5QixDQUFDO0NBQ0gsQ0FBQztBQUVGOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsT0FBTyxDQUFDLGtCQUFrQixHQUFHO0lBQzNCLEdBQUcsRUFBRSw2Q0FBNkM7SUFDbEQsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2pDLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDOUIsQ0FBQztDQUNILENBQUMifQ==