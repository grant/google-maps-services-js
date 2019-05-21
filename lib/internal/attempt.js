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
exports.inject = function (wait) {
    return {
        /**
         * Repeatedly calls the 'do' function, until its result passes the 'until'
         * predicate, or timeout. The 'do' function is retried with exponential
         * backoff.
         *
         * @param {function(): Task<T>} options.do Starts the task to try
         *     repeatedly.
         * @param {function(T): boolean} options.until A predicate that checks
         *     whether the result of options.do was successful.
         * @return {Task<T>}
         * @template T
         */
        attempt: function (options) {
            var doSomething = options['do'];
            var isSuccessful = options.until;
            var interval = options.interval || 500;
            var increment = options.increment || 1.5;
            var jitter = options.jitter || 0.5;
            return Task.withValue().thenDo(function loop() {
                return doSomething().thenDo(function (result) {
                    if (isSuccessful(result)) {
                        return Task.withValue(result);
                    }
                    var delay = interval * (1 + jitter * (2 * Math.random() - 1));
                    interval *= increment;
                    return wait(delay).thenDo(loop);
                });
            });
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ZW1wdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0dGVtcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7QUFFSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEIsUUFBQSxNQUFNLEdBQUcsVUFBQyxJQUFjO0lBQ25DLE9BQU87UUFDTDs7Ozs7Ozs7Ozs7V0FXRztRQUNILE9BQU8sRUFBRSxVQUFDLE9BQVk7WUFDcEIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7WUFDdkMsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUM7WUFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7WUFFckMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSTtnQkFDMUMsT0FBTyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUFXO29CQUN0QyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUMvQjtvQkFFRCxJQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxRQUFRLElBQUksU0FBUyxDQUFDO29CQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9