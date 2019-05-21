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
declare var Task: any;
/**
 * Creates a composite task, which uses the output of the first task to create
 * a subsequent task, and represents the two tasks together.
 *
 * This function is internal-only. It is used by Task.thenDo().
 *
 * @param {Task<T>} firstTask
 * @param {function(function(?, T))} whenFirstTaskFinishes The private
 *     setListener method on the firstTask.
 * @param {function(T): Task<U>} onResolve
 * @param {function(?): Task<U>} onReject
 * @return {Task<U>}
 * @template T, U
 */
declare function compose(firstTask: any, whenFirstTaskFinishes: Function, onResolve: Function, onReject: Function): any;
