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
var v = require('./validate');
var asArray = function (arg) {
    return Array.isArray(arg) ? arg : [arg];
};
exports.pipedKeyValues = function (arg) {
    if (!arg || typeof arg !== 'object') {
        throw new v.InvalidValueError('not an Object');
    }
    return Object.keys(arg).sort().map(function (key) {
        if (typeof arg[key] === 'object') {
            return arg[key].map(function (type) {
                return key + ':' + type;
            }).join('|');
        }
        return key + ':' + arg[key];
    }).join('|');
};
exports.locations = function (arg) {
    if (Array.isArray(arg) && arg.length == 2 && typeof arg[0] == 'number' && typeof arg[1] == 'number') {
        arg = [arg];
    }
    return asArray(arg).map(exports.latLng).join('|');
};
exports.arrayOf = function (validateItem, sep) {
    var validateArray = v.array(validateItem);
    return function (value) {
        value = validateArray(asArray(value));
        return value.join(sep || '|');
    };
};
exports.latLng = function (arg) {
    if (!arg) {
        throw new v.InvalidValueError();
    }
    else if (arg.lat != undefined && arg.lng != undefined) {
        arg = [arg.lat, arg.lng];
    }
    else if (arg.latitude != undefined && arg.longitude != undefined) {
        arg = [arg.latitude, arg.longitude];
    }
    return asArray(arg).join(',');
};
var validateBounds = v.object({
    south: v.number,
    west: v.number,
    north: v.number,
    east: v.number
});
exports.bounds = function (arg) {
    arg = validateBounds(arg);
    return arg.south + ',' + arg.west + '|' + arg.north + ',' + arg.east;
};
exports.timeStamp = function (arg) {
    if (arg == undefined) {
        arg = new Date();
    }
    if (arg.getTime) {
        arg = arg.getTime();
        // NOTE: Unix time is seconds past epoch.
        return Math.round(arg / 1000);
    }
    // Otherwise assume arg is Unix time
    return arg;
};
exports.retryOptions = v.object({
    timeout: v.optional(v.number),
    interval: v.optional(v.number),
    increment: v.optional(v.number),
    jitter: v.optional(v.number)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7QUFFSCxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFaEMsSUFBTSxPQUFPLEdBQUcsVUFBQyxHQUFRO0lBQ3ZCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHLFVBQUMsR0FBUTtJQUNyQyxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUNuQyxNQUFNLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDckMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDaEMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUztnQkFDNUIsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDZDtRQUNELE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRVcsUUFBQSxTQUFTLEdBQUcsVUFBQyxHQUFRO0lBQ2hDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFO1FBQ25HLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFDRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUVXLFFBQUEsT0FBTyxHQUFHLFVBQUMsWUFBaUIsRUFBRSxHQUFRO0lBQ2pELElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsT0FBTyxVQUFDLEtBQVU7UUFDaEIsS0FBSyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVXLFFBQUEsTUFBTSxHQUFHLFVBQUMsR0FBUTtJQUM3QixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsTUFBTSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRTtRQUN2RCxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQjtTQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxTQUFTLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7UUFDbEUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDckM7SUFDRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUYsSUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM5QixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZCxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07SUFDZixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07Q0FDZixDQUFDLENBQUM7QUFFVSxRQUFBLE1BQU0sR0FBRyxVQUFDLEdBQVE7SUFDN0IsR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDdkUsQ0FBQyxDQUFDO0FBRVcsUUFBQSxTQUFTLEdBQUcsVUFBQyxHQUFRO0lBQ2hDLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBRTtRQUNwQixHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUNsQjtJQUNELElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUNmLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIseUNBQXlDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFFRCxvQ0FBb0M7SUFDcEMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ25DLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDN0IsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM5QixTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9CLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Q0FDN0IsQ0FBQyxDQUFDIn0=