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

const v = require('./validate');

const asArray = (arg: any) => {
  return Array.isArray(arg) ? arg : [arg];
};

export const pipedKeyValues = (arg: any) => {
  if (!arg || typeof arg !== 'object') {
    throw new v.InvalidValueError('not an Object');
  }
  return Object.keys(arg).sort().map((key) => {
    if (typeof arg[key] === 'object') {
      return arg[key].map((type: any) => {
        return key + ':' + type;
      }).join('|');
    }
    return key + ':' + arg[key];
  }).join('|');
};

export const locations = (arg: any) => {
  if (Array.isArray(arg) && arg.length == 2 && typeof arg[0] == 'number' && typeof arg[1] == 'number') {
    arg = [arg];
  }
  return asArray(arg).map(latLng).join('|');
};

export const arrayOf = (validateItem: any, sep: any) => {
  const validateArray = v.array(validateItem);
  return (value: any) => {
    value = validateArray(asArray(value));
    return value.join(sep || '|');
  };
};

export const latLng = (arg: any) => {
  if (!arg) {
    throw new v.InvalidValueError();
  } else if (arg.lat != undefined && arg.lng != undefined) {
    arg = [arg.lat, arg.lng];
  } else if (arg.latitude != undefined && arg.longitude != undefined) {
    arg = [arg.latitude, arg.longitude];
  }
  return asArray(arg).join(',');
};

const validateBounds = v.object({
  south: v.number,
  west: v.number,
  north: v.number,
  east: v.number
});

export const bounds = (arg: any) => {
  arg = validateBounds(arg);
  return arg.south + ',' + arg.west + '|' + arg.north + ',' + arg.east;
};

export const timeStamp = (arg: any) => {
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

export const retryOptions = v.object({
  timeout: v.optional(v.number),
  interval: v.optional(v.number),
  increment: v.optional(v.number),
  jitter: v.optional(v.number)
});
