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
exports.create = function (size) {
    var items = [];
    var current = 0;
    return {
        /**
         * Inserts an item into the circular buffer. The new item will have index 0,
         * and all other items will have their index incremented.
         */
        insert: function (item) {
            current = (current + 1) % size;
            items[current] = item;
        },
        /**
         * Returns the i-th item from the buffer. i=0 is the most-recently-inserted
         * item. i=1 is the second-most-recently-inserted item. Returns undefined if
         * i+1 items have not yet been inserted.
         */
        item: function (i) {
            return items[(current - i + size) % size];
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY3VsYXItYnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2lyY3VsYXItYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7O0FBRVUsUUFBQSxNQUFNLEdBQUcsVUFBQyxJQUFZO0lBQ2pDLElBQUksS0FBSyxHQUFVLEVBQUUsQ0FBQztJQUN0QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFaEIsT0FBTztRQUNMOzs7V0FHRztRQUNILE1BQU0sRUFBRSxVQUFDLElBQVM7WUFDaEIsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFDRDs7OztXQUlHO1FBQ0gsSUFBSSxFQUFFLFVBQUMsQ0FBUztZQUNkLE9BQU8sS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9