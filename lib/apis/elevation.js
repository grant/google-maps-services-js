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
 * Makes an elevation request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.elevation
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.locations
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.elevation = {
    url: 'https://maps.googleapis.com/maps/api/elevation/json',
    validator: v.object({
        locations: utils.arrayOf(utils.latLng),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
/**
 * Makes an elevation-along-path request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.elevationAlongPath
 * @function
 * @param {Object} query
 * @param {LatLng[]|string} query.path
 * @param {number} query.samples
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.elevationAlongPath = {
    url: 'https://maps.googleapis.com/maps/api/elevation/json',
    validator: v.object({
        path: function (path) {
            if (typeof path == 'string') {
                return 'enc:' + path;
            }
            else {
                return utils.arrayOf(utils.latLng)(path);
            }
        },
        samples: v.number,
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxldmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUcsQ0FBQSxDQUFDO0FBRUosSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDM0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7R0FVRztBQUNILE9BQU8sQ0FBQyxTQUFTLEdBQUc7SUFDbEIsR0FBRyxFQUFFLHFEQUFxRDtJQUMxRCxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQixTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RDLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDNUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM5QixDQUFDO0NBQ0gsQ0FBQztBQUVGOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsT0FBTyxDQUFDLGtCQUFrQixHQUFHO0lBQzNCLEdBQUcsRUFBRSxxREFBcUQ7SUFDMUQsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEIsSUFBSSxFQUFFLFVBQVMsSUFBZ0I7WUFDN0IsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTTtRQUNqQixZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDOUIsQ0FBQztDQUNILENBQUMifQ==