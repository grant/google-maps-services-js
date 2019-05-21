"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
/**
 * Polyline encodes an array of LatLng objects.
 *
 * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
 *
 * @memberof! module:@google/maps
 * @name module:@google/maps.util.encodePath
 * @function
 * @param {LatLng[]} path
 * @return {string}
 */
exports.encodePath = function (path) {
    var result = [];
    var start = [0, 0];
    var end;
    var encodePart = function (part) {
        part = part < 0 ? ~(part << 1) : (part << 1);
        while (part >= 0x20) {
            result.push(String.fromCharCode((0x20 | (part & 0x1f)) + 63));
            part >>= 5;
        }
        result.push(String.fromCharCode(part + 63));
    };
    for (var i = 0, I = path.length || 0; i < I; ++i) {
        end = [Math.round(path[i].lat * 1e5), Math.round(path[i].lng * 1e5)];
        encodePart(end[0] - start[0]); // lat
        encodePart(end[1] - start[1]); // lng
        start = end;
    }
    return result.join('');
};
/**
 * Decodes a polyline encoded string.
 *
 * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
 *
 * @memberof! module:@google/maps
 * @name module:@google/maps.util.decodePath
 * @function
 * @param {string} path
 * @return {LatLng[]}
 */
exports.decodePath = function (encodedPath) {
    var len = encodedPath.length || 0;
    var path = new Array(Math.floor(encodedPath.length / 2));
    var index = 0;
    var lat = 0;
    var lng = 0;
    for (var pointIndex = 0; index < len; ++pointIndex) {
        var result = 1;
        var shift = 0;
        var b = void 0;
        do {
            b = encodedPath.charCodeAt(index++) - 63 - 1;
            result += b << shift;
            shift += 5;
        } while (b >= 0x1f);
        lat += ((result & 1) ? ~(result >> 1) : (result >> 1));
        result = 1;
        shift = 0;
        do {
            b = encodedPath.charCodeAt(index++) - 63 - 1;
            result += b << shift;
            shift += 5;
        } while (b >= 0x1f);
        lng += ((result & 1) ? ~(result >> 1) : (result >> 1));
        path[pointIndex] = { lat: lat * 1e-5, lng: lng * 1e-5 };
    }
    path.length = pointIndex;
    return path;
};
exports.placesAutoCompleteSessionToken = require('uuid/v4');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUcsQ0FBQSxDQUFDO0FBRUo7Ozs7Ozs7Ozs7R0FVRztBQUNVLFFBQUEsVUFBVSxHQUFHLFVBQUMsSUFBUztJQUNsQyxJQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkIsSUFBSSxHQUFHLENBQUM7SUFFUixJQUFNLFVBQVUsR0FBRyxVQUFTLElBQVk7UUFDdEMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksS0FBSyxDQUFDLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNoRCxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLE1BQU07UUFDdEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLE1BQU07UUFDdEMsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUNiO0lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQTtBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDVSxRQUFBLFVBQVUsR0FBRyxVQUFDLFdBQW1CO0lBQzVDLElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUVaLEtBQUssSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUU7UUFDbEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQUEsQ0FBQztRQUNOLEdBQUc7WUFDRCxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0MsTUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUM7WUFDckIsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNaLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUNwQixHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNWLEdBQUc7WUFDRCxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0MsTUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUM7WUFDckIsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNaLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUNwQixHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBQyxDQUFDO0tBQ3ZEO0lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFFekIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFFVyxRQUFBLDhCQUE4QixHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyJ9