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
describe('distance matrix client library', function () {
    var googleMaps = require('./service');
    var inOneHour = new Date().getTime() + 60 * 60 * 1000;
    function expectOK(response) {
        expect(response.status).toBe(200);
        expect(response.json.status).toBe('OK');
        return response;
    }
    it('gets the distance matrix for Sydney Town Hall to Parramatta, NSW', function (done) {
        googleMaps.distanceMatrix({
            origins: [
                'Perth, Australia', 'Sydney, Australia', 'Melbourne, Australia',
                'Adelaide, Australia', 'Brisbane, Australia', 'Darwin, Australia',
                'Hobart, Australia', 'Canberra, Australia'
            ],
            destinations: [
                'Uluru, Australia', 'Kakadu, Australia', 'Blue Mountains, Australia',
                'Bungle Bungles, Australia', 'The Pinnacles, Australia'
            ]
        })
            .asPromise()
            .then(expectOK)
            .then(function (response) {
            expect(response.json)
                .toEqual(objectContaining({
                destination_addresses: arrayContaining(['Uluru, Petermann NT 0872, Australia']),
                origin_addresses: arrayContaining(['Perth WA, Australia'])
            }));
        })
            .then(done, fail);
    });
    it('accepts localization options', function (done) {
        googleMaps.distanceMatrix({
            origins: ['Hornsby Station, NSW', 'Chatswood Station, NSW'],
            destinations: ['Central Station, NSW', 'Parramatta Station, NSW'],
            language: 'en',
            units: 'metric',
            region: 'au'
        })
            .asPromise()
            .then(expectOK)
            .then(done, fail);
    });
    it('accepts transit options', function (done) {
        googleMaps.distanceMatrix({
            origins: ['Hornsby Station, NSW', 'Chatswood Station, NSW'],
            destinations: ['Central Station, NSW', 'Parramatta Station, NSW'],
            arrival_time: inOneHour,
            mode: 'transit',
            transit_mode: ['bus', 'rail'],
            transit_routing_preference: 'fewer_transfers'
        })
            .asPromise()
            .then(expectOK)
            .then(done, fail);
    });
    it('accepts driving options', function (done) {
        googleMaps.distanceMatrix({
            origins: ['Hornsby Station, NSW', 'Chatswood Station, NSW'],
            destinations: ['Central Station, NSW', 'Parramatta Station, NSW'],
            departure_time: inOneHour,
            mode: 'driving',
            avoid: ['tolls', 'ferries'],
            traffic_model: 'best_guess'
        })
            .asPromise()
            .then(expectOK)
            .then(done, fail);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdGFuY2UtbWF0cml4LXNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXN0YW5jZS1tYXRyaXgtc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUM5QyxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztBQUVoRCxRQUFRLENBQUMsZ0NBQWdDLEVBQUU7SUFDekMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXRDLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFdEQsU0FBUyxRQUFRLENBQUMsUUFBYTtRQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELEVBQUUsQ0FBQyxrRUFBa0UsRUFBRSxVQUFTLElBQUk7UUFDbEYsVUFBVSxDQUFDLGNBQWMsQ0FBQztZQUN4QixPQUFPLEVBQUU7Z0JBQ1Asa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCO2dCQUMvRCxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUI7Z0JBQ2pFLG1CQUFtQixFQUFFLHFCQUFxQjthQUMzQztZQUNELFlBQVksRUFBRTtnQkFDWixrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSwyQkFBMkI7Z0JBQ3BFLDJCQUEyQixFQUFFLDBCQUEwQjthQUN4RDtTQUNGLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLFVBQVMsUUFBYTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztpQkFDcEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2dCQUN4QixxQkFBcUIsRUFBRSxlQUFlLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2dCQUMvRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxVQUFTLElBQUk7UUFDOUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztZQUN4QixPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx3QkFBd0IsQ0FBQztZQUMzRCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztZQUNqRSxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxRQUFRO1lBQ2YsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNkLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseUJBQXlCLEVBQUUsVUFBUyxJQUFJO1FBQ3pDLFVBQVUsQ0FBQyxjQUFjLENBQUM7WUFDeEIsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsd0JBQXdCLENBQUM7WUFDM0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLEVBQUUseUJBQXlCLENBQUM7WUFDakUsWUFBWSxFQUFFLFNBQVM7WUFDdkIsSUFBSSxFQUFFLFNBQVM7WUFDZixZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1lBQzdCLDBCQUEwQixFQUFFLGlCQUFpQjtTQUM5QyxDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNkLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseUJBQXlCLEVBQUUsVUFBUyxJQUFJO1FBQ3pDLFVBQVUsQ0FBQyxjQUFjLENBQUM7WUFDeEIsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsd0JBQXdCLENBQUM7WUFDM0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLEVBQUUseUJBQXlCLENBQUM7WUFDakUsY0FBYyxFQUFFLFNBQVM7WUFDekIsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQzNCLGFBQWEsRUFBRSxZQUFZO1NBQzVCLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=