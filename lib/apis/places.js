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
 * A Find Place request takes a text input, and returns a place.
 * The text input can be any kind of Places data, for example,
 * a name, address, or phone number.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.findPlace
 * @function
 * @param {Object} query
 * @param {string} query.input
 * @param {string} query.inputtype
 * @param {string} [query.language]
 * @param {Array<string>} [query.fields]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.findPlace = {
    url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
    validator: v.compose([
        v.object({
            input: v.string,
            inputtype: v.oneOf(['textquery', 'phonenumber']),
            language: v.optional(v.string),
            fields: v.optional(utils.arrayOf(v.oneOf([
                'formatted_address', 'geometry', 'icon', 'id', 'name',
                'permanently_closed', 'photos', 'place_id', 'scope', 'types',
                'vicinity', 'opening_hours', 'price_level', 'rating'
            ]), ',')),
            locationbias: v.optional(v.string),
            retryOptions: v.optional(utils.retryOptions),
            timeout: v.optional(v.number)
        }),
        function (query) {
            if (!query.locationbias || query.locationbias == 'ipbias') {
                return query;
            }
            var isLatLng = function (latLng) {
                latLng = latLng.split(',');
                return latLng.length == 2 && !isNaN(latLng[0]) && !isNaN(latLng[1]);
            };
            var parts = query.locationbias.split(':');
            switch (parts[0]) {
                case 'point':
                    if (isLatLng(parts[parts.length - 1])) {
                        return query;
                    }
                    break;
                case 'circle':
                    parts = parts[parts.length - 1].split('@');
                    if (!isNaN(parts[0]) && isLatLng(parts[parts.length - 1])) {
                        return query;
                    }
                    break;
                case 'rectangle':
                    parts = parts[parts.length - 1].split('|');
                    if (parts.length == 2 && isLatLng(parts[0]) && isLatLng(parts[1])) {
                        return query;
                    }
                    break;
            }
            throw new v.InvalidValueError('invalid locationbias');
        }
    ])
};
/**
 * Makes a places request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.places
 * @function
 * @param {Object} query
 * @param {string} query.query
 * @param {string} [query.language]
 * @param {LatLng} [query.location]
 * @param {number} [query.radius]
 * @param {number} [query.minprice]
 * @param {number} [query.maxprice]
 * @param {boolean} [query.opennow]
 * @param {string} [query.type]
 * @param {string} [query.pagetoken]
 * @param {string} [query.region]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.places = {
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    validator: v.object({
        query: v.optional(v.string),
        language: v.optional(v.string),
        location: v.optional(utils.latLng),
        radius: v.optional(v.number),
        minprice: v.optional(v.number),
        maxprice: v.optional(v.number),
        opennow: v.optional(v.boolean),
        type: v.optional(v.string),
        pagetoken: v.optional(v.string),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number),
        region: v.optional(v.string)
    })
};
/**
 * Makes a nearby places request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.placesNearby
 * @function
 * @param {Object} query
 * @param {LatLng} query.location
 * @param {string} [query.language]
 * @param {number} [query.radius]
 * @param {string} [query.keyword]
 * @param {number} [query.minprice]
 * @param {number} [query.maxprice]
 * @param {string} [query.name]
 * @param {boolean} [query.opennow]
 * @param {string} [query.rankby] Either 'prominence' or 'distance'
 * @param {string} [query.type]
 * @param {string} [query.pagetoken]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesNearby = {
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    validator: v.compose([
        v.mutuallyExclusivePropertiesRequired(['location', 'pagetoken']),
        v.object({
            location: v.optional(utils.latLng),
            language: v.optional(v.string),
            radius: v.optional(v.number),
            keyword: v.optional(v.string),
            minprice: v.optional(v.number),
            maxprice: v.optional(v.number),
            name: v.optional(v.string),
            opennow: v.optional(v.boolean),
            rankby: v.optional(v.oneOf(['prominence', 'distance'])),
            type: v.optional(v.string),
            pagetoken: v.optional(v.string),
            retryOptions: v.optional(utils.retryOptions),
            timeout: v.optional(v.number)
        })
    ])
};
/**
 * Makes a places radar search request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.placesRadar
 * @function
 * @param {Object} query
 * @param {LatLng} query.location
 * @param {number} query.radius
 * @param {string} [query.language]
 * @param {string} [query.keyword]
 * @param {number} [query.minprice]
 * @param {number} [query.maxprice]
 * @param {string} [query.name]
 * @param {boolean} [query.opennow]
 * @param {string} [query.type]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesRadar = {
    url: 'https://maps.googleapis.com/maps/api/place/radarsearch/json',
    validator: v.object({
        location: utils.latLng,
        radius: v.number,
        language: v.optional(v.string),
        keyword: v.optional(v.string),
        minprice: v.optional(v.number),
        maxprice: v.optional(v.number),
        name: v.optional(v.string),
        opennow: v.optional(v.boolean),
        type: v.optional(v.string),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
/**
 * Makes a place detail request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.place
 * @function
 * @param {Object} query
 * @param {string} query.placeid
 * @param {string} query.sessiontoken Unique string identifying a single user's session. For convenience use require('@google/maps').util.placesAutoCompleteSessionToken()
 * @param {string} [query.language]
 * @param {Array<string>} [query.fields]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.place = {
    url: 'https://maps.googleapis.com/maps/api/place/details/json',
    validator: v.object({
        placeid: v.string,
        sessiontoken: v.optional(v.string),
        language: v.optional(v.string),
        fields: v.optional(utils.arrayOf(v.oneOf([
            'address_component', 'adr_address', 'alt_id', 'formatted_address',
            'geometry', 'icon', 'id', 'name', 'permanently_closed', 'photo',
            'place_id', 'scope', 'type', 'url', 'utc_offset', 'vicinity',
            'formatted_phone_number', 'international_phone_number', 'opening_hours',
            'website', 'price_level', 'rating', 'review', 'user_ratings_total', 'plus_code'
        ]), ',')),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
/**
 * Makes a place photos request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.placesPhoto
 * @function
 * @param {Object} query
 * @param {string} query.photoreference
 * @param {number} [query.maxwidth]
 * @param {number} [query.maxheight]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesPhoto = {
    url: 'https://maps.googleapis.com/maps/api/place/photo',
    validator: v.compose([
        v.atLeastOneOfProperties(['maxwidth', 'maxheight']),
        v.object({
            photoreference: v.string,
            maxwidth: v.optional(v.number),
            maxheight: v.optional(v.number),
            retryOptions: v.optional(utils.retryOptions),
            timeout: v.optional(v.number)
        })
    ])
};
/**
 * Makes a places autocomplete request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.placesAutoComplete
 * @function
 * @param {Object} query
 * @param {string} query.input
 * @param {string} query.sessiontoken Unique string identifying a single user's session. For convenience use require('@google/maps').util.placesAutoCompleteSessionToken()
 * @param {number} [query.offset]
 * @param {LatLng} [query.location]
 * @param {string} [query.language]
 * @param {number} [query.radius]
 * @param {string} [query.types]
 * @param {Array<string>} [query.components]
 * @param {boolean} [query.strictbounds]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesAutoComplete = {
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    validator: v.object({
        input: v.string,
        sessiontoken: v.optional(v.string),
        offset: v.optional(v.number),
        location: v.optional(utils.latLng),
        language: v.optional(v.string),
        radius: v.optional(v.number),
        types: v.optional(v.oneOf(['geocode', 'address', 'establishment', '(regions)', '(cities)'])),
        components: v.optional(utils.pipedKeyValues),
        strictbounds: v.optional(v.boolean),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
/**
 * Makes a places query autocomplete request.
 *
 * @memberof! GoogleMapsClient
 * @name GoogleMapsClient.placesQueryAutoComplete
 * @function
 * @param {Object} query
 * @param {string} query.input
 * @param {number} [query.offset]
 * @param {LatLng} [query.location]
 * @param {string} [query.language]
 * @param {number} [query.radius]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesQueryAutoComplete = {
    url: 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json',
    validator: v.object({
        input: v.string,
        offset: v.optional(v.number),
        location: v.optional(utils.latLng),
        language: v.optional(v.string),
        radius: v.optional(v.number),
        retryOptions: v.optional(utils.retryOptions),
        timeout: v.optional(v.number)
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUcsQ0FBQSxDQUFDO0FBRUosSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDM0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsT0FBTyxDQUFDLFNBQVMsR0FBRztJQUNsQixHQUFHLEVBQUUsbUVBQW1FO0lBQ3hFLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07WUFDZixTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDdkMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTTtnQkFDckQsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTztnQkFDNUQsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsUUFBUTthQUNyRCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDVCxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2xDLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7WUFDNUMsT0FBTyxFQUFFLENBQUMs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