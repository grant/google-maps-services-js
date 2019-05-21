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
export declare const encodePath: (path: any) => string;
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
export declare const decodePath: (encodedPath: string) => any[];
export declare const placesAutoCompleteSessionToken: any;
