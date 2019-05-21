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
var numberCloseTo = require('../number-close-to');
describe('elevation client library', function () {
    var googleMaps = require('./service');
    it('gets the elevation for the Sydney Opera House', function (done) {
        googleMaps.elevation({
            locations: { lat: -33.8571965, lng: 151.2151398 }
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.results).toEqual(arrayContaining([
                objectContaining({
                    elevation: numberCloseTo(16).within(5)
                })
            ]));
        })
            .then(done, fail);
    });
    it('gets the elevation for a path', function (done) {
        googleMaps.elevationAlongPath({
            path: [[-33.7287972, 150.300299], [-33.7311794, 150.301794]],
            samples: 5
        })
            .asPromise()
            .then(function (response) {
            expect(response.json.results).toEqual(arrayContaining([
                objectContaining({
                    elevation: numberCloseTo(959)
                }),
                objectContaining({
                    elevation: numberCloseTo(771)
                })
            ]));
        })
            .then(done, fail);
    });
    it('gets the elevation for an encoded polyline', function (done) {
        googleMaps.elevationAlongPath({
            path: 'v}kmEyetx[h@nAcAlBWl@Sd@Ol@Mb@OBIBEAQ?qAPiATu@NC?ABm@^GBE@m@DD]DS',
            samples: 5
        })
            .asPromise()
            .then(function (response) {
            expect(response.status).toBe(200);
            expect(response.json.status).toBe('OK');
        })
            .then(done, fail);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmF0aW9uLXNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbGV2YXRpb24tc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUM5QyxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztBQUNoRCxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7SUFDbkMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXRDLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxVQUFTLElBQUk7UUFDL0QsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUNuQixTQUFTLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBQztTQUNoRCxDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQVMsUUFBYTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQ2pDLGVBQWUsQ0FBQztnQkFDZCxnQkFBZ0IsQ0FBQztvQkFDZixTQUFTLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDLENBQUM7YUFDSCxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUUsVUFBUyxJQUFJO1FBQy9DLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztZQUM1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUQsT0FBTyxFQUFFLENBQUM7U0FDWCxDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQVMsUUFBYTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQ2pDLGVBQWUsQ0FBQztnQkFDZCxnQkFBZ0IsQ0FBQztvQkFDZixTQUFTLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQztpQkFDOUIsQ0FBQztnQkFDRixnQkFBZ0IsQ0FBQztvQkFDZixTQUFTLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQztpQkFDOUIsQ0FBQzthQUNILENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxVQUFTLElBQUk7UUFDNUQsVUFBVSxDQUFDLGtCQUFrQixDQUFDO1lBQzVCLElBQUksRUFBRSxtRUFBbUU7WUFDekUsT0FBTyxFQUFFLENBQUM7U0FDWCxDQUFDO2FBQ0QsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQVMsUUFBYTtZQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=