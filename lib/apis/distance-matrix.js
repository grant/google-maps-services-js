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
 * Makes a distance matrix request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.distanceMatrix
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.origins
 * @param {LatLng[]} query.destinations
 * @param {string} [query.mode]
 * @param {string} [query.language]
 * @param {string[]} [query.avoid]
 * @param {string} [query.units]
 * @param {Date|number} [query.departure_time]
 * @param {Date|number} [query.arrival_time]
 * @param {string[]} [query.transit_mode]
 * @param {string} [query.transit_routing_preference]
 * @param {string} [query.traffic_model]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.distanceMatrix = {
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
    validator: v.compose([
        v.mutuallyExclusiveProperties(['arrival_time', 'departure_time']),
        v.object({
            origins: utils.arrayOf(utils.latLng),
            destinations: utils.arrayOf(utils.latLng),
            mode: v.optional(v.oneOf([
                'driving', 'walking', 'bicycling', 'transit'
            ])),
            language: v.optional(v.string),
            region: v.optional(v.string),
            avoid: v.optional(utils.arrayOf(v.oneOf([
                'tolls', 'highways', 'ferries', 'indoor'
            ]))),
            units: v.optional(v.oneOf(['metric', 'imperial'])),
            departure_time: v.optional(utils.timeStamp),
            arrival_time: v.optional(utils.timeStamp),
            transit_mode: v.optional(utils.arrayOf(v.oneOf([
                'bus', 'subway', 'train', 'tram', 'rail'
            ]))),
            transit_routing_preference: v.optional(v.oneOf([
                'less_walking', 'fewer_transfers'
            ])),
            traffic_model: v.optional(v.oneOf([
                'best_guess', 'pessimistic', 'optimistic'
            ])),
            retryOptions: v.optional(utils.retryOptions),
            timeout: v.optional(v.number)
        })
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdGFuY2UtbWF0cml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzdGFuY2UtbWF0cml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUcsQ0FBQSxDQUFDO0FBRUosSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDM0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsT0FBTyxDQUFDLGNBQWMsR0FBRztJQUN2QixHQUFHLEVBQUUsMERBQTBEO0lBQy9ELFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDUCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3BDLFlBQVksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDekMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDdkIsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUzthQUM3QyxDQUFDLENBQUM7WUFDSCxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDNUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xELGNBQWMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDM0MsWUFBWSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN6QyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBQ0osMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUM3QyxjQUFjLEVBQUUsaUJBQWlCO2FBQ2xDLENBQUMsQ0FBQztZQUNILGFBQWEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hDLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWTthQUMxQyxDQUFDLENBQUM7WUFDSCxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQzVDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDOUIsQ0FBQztLQUNILENBQUM7Q0FDSCxDQUFDIn0=