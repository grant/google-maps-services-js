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
describe('directions client library', function () {
    var googleMaps = require('./service');
    var inOneHour = Math.round((new Date().getTime() + 60 * 60 * 1000) / 1000);
    function expectOK(response) {
        // if (response.status !== 200) {
        //   console.log(JSON.stringify(response, null, 2));
        // }
        expect(response.status).toBe(200);
        expect(response.json.status).toBe('OK');
        return response;
    }
    it('gets the directions from the Sydney Town Hall to Parramatta, NSW', function (done) {
        googleMaps.directions({
            origin: 'Town Hall, Sydney, NSW',
            destination: 'Parramatta, NSW',
        })
            .asPromise()
            .then(expectOK)
            .then(function (response) {
            expect(response.json.routes).toEqual(arrayContaining([
                objectContaining({
                    legs: arrayContaining([
                        objectContaining({
                            end_address: stringMatching(/Parramatta NSW/)
                        })
                    ])
                })
            ]));
        })
            .then(done, fail);
    });
    it('accepts localization options', function (done) {
        googleMaps.directions({
            origin: 'Town Hall, Sydney, NSW',
            destination: 'Parramatta, NSW',
            language: 'en',
            units: 'metric',
            region: 'au',
        })
            .asPromise()
            .then(expectOK)
            .then(done, fail);
    });
    it('accepts transit options', function (done) {
        googleMaps.directions({
            origin: 'Town Hall, Sydney, NSW',
            destination: 'Parramatta, NSW',
            arrival_time: inOneHour,
            mode: 'transit',
            alternatives: true,
            transit_mode: ['bus', 'rail'],
            transit_routing_preference: 'fewer_transfers',
        })
            .asPromise()
            .then(expectOK)
            .then(done, fail);
    });
    it('accepts driving options', function (done) {
        googleMaps.directions({
            origin: 'Town Hall, Sydney, NSW',
            destination: 'Parramatta, NSW',
            departure_time: inOneHour,
            mode: 'driving',
            waypoints: 'Strathfield, NSW',
            alternatives: true,
            avoid: ['tolls', 'ferries'],
            traffic_model: 'best_guess',
            optimize: true,
        })
            .asPromise()
            .then(expectOK)
            .then(done, fail);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlyZWN0aW9ucy1zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQzlDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0FBQ2hELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFFNUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFO0lBQ3BDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV0QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpFLFNBQVMsUUFBUSxDQUFDLFFBQWE7UUFDN0IsaUNBQWlDO1FBQ2pDLG9EQUFvRDtRQUNwRCxJQUFJO1FBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxFQUFFLENBQUMsa0VBQWtFLEVBQUUsVUFBUyxJQUFJO1FBQ2xGLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDcEIsTUFBTSxFQUFFLHdCQUF3QjtZQUNoQyxXQUFXLEVBQUUsaUJBQWlCO1NBQy9CLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLFVBQVMsUUFBYTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQ2hDLGVBQWUsQ0FBQztnQkFDZCxnQkFBZ0IsQ0FBQztvQkFDZixJQUFJLEVBQUUsZUFBZSxDQUFDO3dCQUNwQixnQkFBZ0IsQ0FBQzs0QkFDZixXQUFXLEVBQUUsY0FBYyxDQUFDLGdCQUFnQixDQUFDO3lCQUM5QyxDQUFDO3FCQUNILENBQUM7aUJBQ0gsQ0FBQzthQUNILENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxVQUFTLElBQUk7UUFDOUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUNwQixNQUFNLEVBQUUsd0JBQXdCO1lBQ2hDLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsUUFBUTtZQUNmLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQzthQUNELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlCQUF5QixFQUFFLFVBQVMsSUFBSTtRQUN6QyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixZQUFZLEVBQUUsU0FBUztZQUN2QixJQUFJLEVBQUUsU0FBUztZQUNmLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDN0IsMEJBQTBCLEVBQUUsaUJBQWlCO1NBQzlDLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxVQUFTLElBQUk7UUFDekMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUNwQixNQUFNLEVBQUUsd0JBQXdCO1lBQ2hDLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsY0FBYyxFQUFFLFNBQVM7WUFDekIsSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsa0JBQWtCO1lBQzdCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7WUFDM0IsYUFBYSxFQUFFLFlBQVk7WUFDM0IsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNkLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9