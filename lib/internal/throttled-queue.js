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
var CircularBuffer = require('./circular-buffer');
var Task = require('./task');
exports.inject = function (wait, getTime) {
    return {
        /**
         * Creates a ThrottledQueue. The queue stores tasks, which will be executed
         * asynchronously, at a controlled rate.
         *
         * @param {number} limit The maximum number of tasks that can be executed
         *     over one period.
         * @param {number} period The time period (ms) over which limit is
         *     enforceable.
         * @return {ThrottledQueue}
         */
        create: function (limit, period) {
            var me = {};
            var queue = Task.withValue();
            var recentTimes = CircularBuffer.create(limit);
            /**
             * Adds a task to the work queue.
             *
             * @param {function(): Task<T>} doSomething Starts the task. This function
             *     will be called when the rate limit allows.
             * @return {Task<T>} The delayed task.
             * @template T
             */
            me.add = function (doSomething) {
                // Return a separate task from the queue, so that cancelling a task
                // doesn't propagate back and cancel the whole queue.
                var waitForMyTurn = Task
                    .start(function (resolve) {
                    queue.finally(resolve);
                })
                    .thenDo(function () {
                    var lastTime = recentTimes.item(limit - 1);
                    if (lastTime == undefined)
                        return;
                    return wait(Math.max(lastTime + period - getTime(), 0));
                })
                    .thenDo(function () {
                    recentTimes.insert(getTime());
                });
                queue = queue.thenDo(function () {
                    return Task.start(function (resolve) {
                        waitForMyTurn.finally(resolve);
                    });
                });
                return waitForMyTurn.thenDo(doSomething);
            };
            return me;
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGVkLXF1ZXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhyb3R0bGVkLXF1ZXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNsRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFN0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFTLElBQWMsRUFBRSxPQUFpQjtJQUN6RCxPQUFPO1FBQ0w7Ozs7Ozs7OztXQVNHO1FBQ0gsTUFBTSxFQUFFLFVBQVMsS0FBYSxFQUFFLE1BQWM7WUFDNUMsSUFBSSxFQUFFLEdBQVEsRUFBRSxDQUFDO1lBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM3QixJQUFJLFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9DOzs7Ozs7O2VBT0c7WUFDSCxFQUFFLENBQUMsR0FBRyxHQUFHLFVBQVMsV0FBcUI7Z0JBQ3JDLG1FQUFtRTtnQkFDbkUscURBQXFEO2dCQUNyRCxJQUFJLGFBQWEsR0FBRyxJQUFJO3FCQUNuQixLQUFLLENBQUMsVUFBUyxPQUFpQjtvQkFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDO3FCQUNELE1BQU0sQ0FBQztvQkFDTixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxRQUFRLElBQUksU0FBUzt3QkFBRSxPQUFPO29CQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLEdBQUcsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDO3FCQUNELE1BQU0sQ0FBQztvQkFDTixXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBUyxPQUFpQjt3QkFDMUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQztZQUVGLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDLENBQUMifQ==