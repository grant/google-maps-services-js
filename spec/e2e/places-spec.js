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
describe('places client library', function () {
    var googleMaps = require('./service');
    it('gets places for a text search query', function (done) {
        googleMaps.places({
            query: 'fast food',
            language: 'en',
            location: [-33.865, 151.038],
            radius: 5000,
            minprice: 1,
            maxprice: 4,
            opennow: true,
            type: 'restaurant'
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.results).toEqual(arrayContaining([
                objectContaining({
                    name: stringMatching('McDonald\'s')
                })
            ]));
        })
            .then(done, fail);
    });
    it('gets places for a nearby search query', function (done) {
        googleMaps.placesNearby({
            language: 'en',
            location: [-33.865, 151.038],
            radius: 5000,
            minprice: 1,
            maxprice: 4,
            opennow: true,
            type: 'restaurant'
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.results).toEqual(arrayContaining([
                objectContaining({
                    name: stringMatching('McDonald\'s')
                })
            ]));
        })
            .then(done, fail);
    });
    it('gets places for a nearby search query ranked by distance', function (done) {
        googleMaps.placesNearby({
            language: 'en',
            location: [-33.865, 151.038],
            rankby: 'distance',
            minprice: 1,
            maxprice: 4,
            opennow: true,
            type: 'restaurant'
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.results).toEqual(arrayContaining([
                objectContaining({
                    name: stringMatching('McDonald\'s')
                })
            ]));
        })
            .then(done, fail);
    });
    it('can page through results', function (done) {
        googleMaps.places({
            query: 'restaurant',
            language: 'en',
            location: [-33.86746, 151.207090],
            radius: 5000
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.next_page_token).not.toBeFalsy();
            function getNextPage() {
                return googleMaps.places({
                    pagetoken: response.json.next_page_token
                }).asPromise();
            }
            var repeatWhileInvalid = function (nextResponse) {
                if (nextResponse.json.status !== 'INVALID_REQUEST') {
                    return nextResponse;
                }
                // Wait one second, and try again.
                return new Promise(function (resolve) {
                    setTimeout(resolve, 2000);
                })
                    .then(getNextPage);
            };
            return getNextPage()
                .then(repeatWhileInvalid)
                .then(getNextPage)
                .then(repeatWhileInvalid);
        })
            .then(function (nextResponse) {
            expect(nextResponse.json.status).toBe('OK');
            expect(nextResponse.json.results.length).not.toBeFalsy();
        })
            .then(done, fail);
    }, 10000);
    it('gets details for a place', function (done) {
        googleMaps.place({
            placeid: 'ChIJc6EceWquEmsRmBVAjzjXM-g',
            language: 'fr'
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.result).toEqual(objectContaining({
                name: 'Spice Temple'
            }));
        })
            .then(done, fail);
    });
    it('gets a places photo', function (done) {
        googleMaps.placesPhoto({
            photoreference: 'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0',
            maxwidth: 100,
            maxheight: 100
        })
            .asPromise()
            .then(function (response) {
            expect(response.headers['content-type']).toBe('image/jpeg');
        })
            .then(done, fail);
    });
    it('gets autocomplete predictions for places', function (done) {
        googleMaps.placesAutoComplete({
            input: 'pizza',
            language: 'en',
            location: [40.724, -74.013],
            radius: 5000,
            components: { country: 'us' }
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.predictions).toEqual(arrayContaining([
                objectContaining({
                    terms: arrayContaining([
                        objectContaining({
                            value: 'NY'
                        })
                    ])
                })
            ]));
        })
            .then(done, fail);
    });
    it('gets autocomplete predictions for a query', function (done) {
        googleMaps.placesQueryAutoComplete({
            input: 'pizza near New York',
            language: 'en',
            location: [40.724, -74.013],
            radius: 5000
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.predictions).toEqual(arrayContaining([
                objectContaining({
                    description: 'pizza near New York, NY, USA'
                })
            ]));
        })
            .then(done, fail);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLXNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGFjZXMtc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUM5QyxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztBQUNoRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO0FBRTVDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtJQUNoQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdEMsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLFVBQVMsSUFBSTtRQUNyRCxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ2hCLEtBQUssRUFBRSxXQUFXO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQzVCLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQztZQUNYLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLFlBQVk7U0FDbkIsQ0FBQzthQUNELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFTLFFBQWE7WUFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUNqQyxlQUFlLENBQUM7Z0JBQ2QsZ0JBQWdCLENBQUM7b0JBQ2YsSUFBSSxFQUFFLGNBQWMsQ0FBQyxhQUFhLENBQUM7aUJBQ3BDLENBQUM7YUFDSCxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUUsVUFBUyxJQUFJO1FBQ3ZELFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDdEIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDNUIsTUFBTSxFQUFFLElBQUk7WUFDWixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsWUFBWTtTQUNuQixDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQVMsUUFBYTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQ2pDLGVBQWUsQ0FBQztnQkFDZCxnQkFBZ0IsQ0FBQztvQkFDZixJQUFJLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQztpQkFDcEMsQ0FBQzthQUNILENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwREFBMEQsRUFBRSxVQUFTLElBQUk7UUFDMUUsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUN0QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztZQUM1QixNQUFNLEVBQUUsVUFBVTtZQUNsQixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsWUFBWTtTQUNuQixDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQVMsUUFBYTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQ2pDLGVBQWUsQ0FBQztnQkFDZCxnQkFBZ0IsQ0FBQztvQkFDZixJQUFJLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQztpQkFDcEMsQ0FBQzthQUNILENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxVQUFTLElBQUk7UUFDMUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUNoQixLQUFLLEVBQUUsWUFBWTtZQUNuQixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztZQUNqQyxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBUyxRQUFhO1lBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RCxTQUFTLFdBQVc7Z0JBQ2xCLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQztvQkFDdkIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZTtpQkFDekMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLENBQUM7WUFDRCxJQUFJLGtCQUFrQixHQUFHLFVBQUMsWUFBaUI7Z0JBQ3pDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssaUJBQWlCLEVBQUU7b0JBQ2xELE9BQU8sWUFBWSxDQUFDO2lCQUNyQjtnQkFFRCxrQ0FBa0M7Z0JBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPO29CQUNqQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUM7cUJBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQztZQUNGLE9BQU8sV0FBVyxFQUFFO2lCQUNmLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztpQkFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQVMsWUFBaUI7WUFDOUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0QsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFVixFQUFFLENBQUMsMEJBQTBCLEVBQUUsVUFBUyxJQUFJO1FBQzFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQzthQUNELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFTLFFBQWE7WUFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUNoQyxnQkFBZ0IsQ0FBQztnQkFDZixJQUFJLEVBQUUsY0FBYzthQUNyQixDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUJBQXFCLEVBQUUsVUFBUyxJQUFJO1FBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDckIsY0FBYyxFQUFFLHFOQUFxTjtZQUNyTyxRQUFRLEVBQUUsR0FBRztZQUNiLFNBQVMsRUFBRSxHQUFHO1NBQ2YsQ0FBQzthQUNELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFTLFFBQWE7WUFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxVQUFTLElBQUk7UUFDMUQsVUFBVSxDQUFDLGtCQUFrQixDQUFDO1lBQzVCLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDM0IsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDO1NBQzVCLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBUyxRQUFhO1lBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FDckMsZUFBZSxDQUFDO2dCQUNkLGdCQUFnQixDQUFDO29CQUNmLEtBQUssRUFBRSxlQUFlLENBQUM7d0JBQ3JCLGdCQUFnQixDQUFDOzRCQUNmLEtBQUssRUFBRSxJQUFJO3lCQUNaLENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDO2FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLFVBQVMsSUFBSTtRQUMzRCxVQUFVLENBQUMsdUJBQXVCLENBQUM7WUFDakMsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUMzQixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBUyxRQUFhO1lBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FDckMsZUFBZSxDQUFDO2dCQUNkLGdCQUFnQixDQUFDO29CQUNmLFdBQVcsRUFBRSw4QkFBOEI7aUJBQzVDLENBQUM7YUFDSCxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9