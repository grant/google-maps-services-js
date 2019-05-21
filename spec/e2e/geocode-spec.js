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
var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;
var stringMatching = jasmine.stringMatching;
var googleMaps = require('./service');
function expectOK(response) {
    expect(response.status).toBe(200);
    expect(response.json.status).toBe('OK');
    return response;
}
describe('geocode client library', function () {
    function expectOperaHouse(response) {
        expect(response.json.results)
            .toEqual(arrayContaining([
            objectContaining({
                place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE'
            })
        ]));
        return response;
    }
    it('gets the coordinates for the Sydney Opera House', function (done) {
        googleMaps.geocode({
            address: 'Sydney Opera House'
        })
            .asPromise()
            .then(expectOK)
            .then(expectOperaHouse)
            .then(done, fail);
    });
    it('accepts components filters', function (done) {
        googleMaps.geocode({
            address: 'Opera House',
            components: {
                locality: 'Sydney'
            },
            bounds: { south: -33.9, west: 151.2, north: -33.8, east: 151.3 }
        })
            .asPromise()
            .then(expectOK)
            .then(expectOperaHouse)
            .then(done, fail);
    });
    it('accepts localization options', function (done) {
        googleMaps.geocode({
            address: 'Sydney Opera House',
            region: 'au',
            language: 'en'
        })
            .asPromise()
            .then(expectOK)
            .then(expectOperaHouse)
            .then(done, fail);
    });
    it('handles components without address', function (done) {
        googleMaps.geocode({
            components: {
                route: 'Macquarie St',
                locality: 'Sydney',
                postal_code: '2000',
                country: 'Australia'
            }
        })
            .asPromise()
            .then(expectOK)
            .then(done, fail);
    });
});
describe('reverse geocode client library', function () {
    function expectBennelongPoint(response) {
        expect(response.json.results)
            .toEqual(arrayContaining([
            objectContaining({
                formatted_address: stringMatching('Bennelong Point, Sydney NSW 2000, Australia')
            })
        ]));
    }
    function expectOperaHouse(response) {
        expect(response.json.results)
            .toEqual(arrayContaining([
            objectContaining({
                formatted_address: stringMatching('Opera House Bennelong point, NSW, Australia')
            })
        ]));
    }
    function expectCircularQuay(response) {
        expect(response.json.results)
            .toEqual(arrayContaining([
            objectContaining({
                formatted_address: stringMatching('Unit 14/2 Circular Quay E, Sydney NSW 2000, Australia')
            })
        ]));
    }
    it('reverse geocodes the coordinates for the Sydney Opera House', function (done) {
        googleMaps.reverseGeocode({
            latlng: [-33.8567844, 151.2152967],
        })
            .asPromise()
            .then(expectOK)
            .then(expectOperaHouse)
            .then(done, fail);
    });
    it('reverse geocodes the place ID for the Sydney Opera House', function (done) {
        googleMaps.reverseGeocode({
            place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE'
        })
            .asPromise()
            .then(expectOK)
            .then(expectBennelongPoint)
            .then(done, fail);
    });
    it('accepts localization options', function (done) {
        googleMaps.reverseGeocode({
            place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE',
            language: 'en'
        })
            .asPromise()
            .then(expectOK)
            .then(expectBennelongPoint)
            .then(done, fail);
    });
    it('filters by result_type and location_type', function (done) {
        googleMaps.reverseGeocode({
            latlng: [-33.8567844, 151.2152967],
            result_type: ['country', 'street_address'],
            location_type: ['ROOFTOP', 'APPROXIMATE']
        })
            .asPromise()
            .then(expectOK)
            .then(expectCircularQuay)
            .then(done, fail);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZS1zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VvY29kZS1zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQzlDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0FBQ2hELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFFNUMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXRDLFNBQVMsUUFBUSxDQUFDLFFBQWE7SUFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxRQUFRLENBQUMsd0JBQXdCLEVBQUU7SUFDakMsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFhO1FBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM1QixPQUFPLENBQUMsZUFBZSxDQUFDO1lBQ3ZCLGdCQUFnQixDQUFDO2dCQUNmLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEMsQ0FBQztTQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0osT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxVQUFTLElBQUk7UUFDakUsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNqQixPQUFPLEVBQUUsb0JBQW9CO1NBQzlCLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDO2FB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