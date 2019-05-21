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
var Task = require('./task');
exports.inject = function (setTimeout, clearTimeout) {
    /**
     * Returns a task that waits for the given delay.
     * @param  {number} delayMs
     * @return {Task<undefined>}
     */
    return function wait(delayMs) {
        return Task.start(function (resolve) {
            var id = setTimeout(resolve, delayMs);
            return function cancel() {
                clearTimeout(id);
            };
        });
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7QUFFSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFaEIsUUFBQSxNQUFNLEdBQUcsVUFBQyxVQUFvQixFQUFFLFlBQXNCO0lBQ2pFOzs7O09BSUc7SUFDSCxPQUFPLFNBQVMsSUFBSSxDQUFDLE9BQWU7UUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVMsT0FBaUI7WUFDMUMsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0QyxPQUFPLFNBQVMsTUFBTTtnQkFDcEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDIn0=