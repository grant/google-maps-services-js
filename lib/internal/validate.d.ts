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
declare class Validate {
    static acceptAll(value: any): any;
    static optional(validator: any): (value: any) => any;
    static that(predicate: Function, message: any): (value: any) => any;
    static number(value: any): (value: any) => any;
    static string(value: any): (value: any) => any;
    static object(propertyValidators: any): (object: any) => any;
    static array(validator: Function): (array: any[]) => any[];
    static oneOf(names: string[]): (value: any) => any;
    static atLeastOneOfProperties(names: any): (value: any) => any;
    static mutuallyExclusiveProperties(names: string[], oneRequired: boolean): (value: any) => any;
    static mutuallyExclusivePropertiesRequired(names: any): (value: any) => any;
    static compose(validators: Function[]): (value: any) => any;
    static boolean: (value: any) => any;
}
declare class InvalidValueError extends Error {
    constructor(message: string);
    static prepend(message: string, error: any): any;
}
