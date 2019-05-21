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
var utils = require('../internal/convert');
var v = require('../internal/validate');
/**
 * Makes a directions request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.directions
 * @function
 * @param {Object} query
 * @param {LatLng} query.origin
 * @param {LatLng} query.destination
 * @param {string} [query.mode]
 * @param {LatLng[]} [query.waypoints]
 * @param {boolean} [query.alternatives]
 * @param {string[]} [query.avoid]
 * @param {string} [query.language]
 * @param {string} [query.units]
 * @param {string} [query.region]
 * @param {Date|number} [query.departure_time]
 * @param {Date|number} [query.arrival_time]
 * @param {string} [query.traffic_model]
 * @param {string[]} [query.transit_mode]
 * @param {string} [query.transit_routing_preference]
 * @param {boolean} [query.optimize]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.directions = {
    url: 'https://maps.googleapis.com/maps/api/directions/json',
    validator: v.compose([
        v.mutuallyExclusiveProperties(['arrival_time', 'departure_time']),
        v.object({
            origin: utils.latLng,
            destination: utils.latLng,
            mode: v.optional(v.oneOf([
                'driving', 'walking', 'bicycling', 'transit'
            ])),
            waypoints: v.optional(utils.arrayOf(utils.latLng)),
            alternatives: v.optional(v.boolean),
            avoid: v.optional(utils.arrayOf(v.oneOf([
                'tolls', 'highways', 'ferries', 'indoor'
            ]))),
            language: v.optional(v.string),
            units: v.optional(v.oneOf(['metric', 'imperial'])),
            region: v.optional(v.string),
            departure_time: v.optional(utils.timeStamp),
            arrival_time: v.optional(utils.timeStamp),
            traffic_model: v.optional(v.oneOf([
                'best_guess', 'pessimistic', 'optimistic'
            ])),
            transit_mode: v.optional(utils.arrayOf(v.oneOf([
                'bus', 'subway', 'train', 'tram', 'rail'
            ]))),
            transit_routing_preference: v.optional(v.oneOf([
                'less_walking', 'fewer_transfers'
            ])),
            optimize: v.optional(v.boolean),
            retryOptions: v.optional(utils.retryOptions),
            timeout: v.optional(v.number)
        }),
        function (query) {
            if (query.waypoints && query.optimize) {
                query.waypoints = 'optimize:true|' + query.waypoints;
            }
            delete query.optimize;
            if (query.waypoints && query.mode === 'transit') {
                throw new v.InvalidValueError('cannot specify waypoints with transit');
            }
            if (query.traffic_model && !query.departure_time) {
                throw new v.InvalidValueError('traffic_model requires departure_time');
            }
            return query;
        }
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpcmVjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7QUFFSCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUMzQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ1UsUUFBQSxVQUFVLEdBQUc7SUFDeEIsR0FBRyxFQUFFLHNEQUFzRDtJQUMzRCxTQUFTLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ1AsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLFdBQVcsRUFBRSxLQUFLLENBQUMsTUFBTTtZQUN6QixJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN2QixTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTO2FBQzdDLENBQUMsQ0FBQztZQUNILFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkMsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRO2FBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBQ0osUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUM5QixLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUM1QixjQUFjLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQzNDLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDekMsYUFBYSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDaEMsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZO2FBQzFDLENBQUMsQ0FBQztZQUNILFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0MsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU07YUFDekMsQ0FBQyxDQUFDLENBQUM7WUFDSiwwQkFBMEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLGNBQWMsRUFBRSxpQkFBaUI7YUFDbEMsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUMvQixZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQzVDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDOUIsQ0FBQztRQUNGLFVBQVMsS0FBVTtZQUNqQixJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDckMsS0FBSyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ3REO1lBQ0QsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBRXRCLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDL0MsTUFBTSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2FBQ3hFO1lBRUQsSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtnQkFDaEQsTUFBTSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQ0YsQ0FBQztDQUNILENBQUMifQ==