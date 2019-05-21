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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Validate = /** @class */ (function () {
    function Validate() {
    }
    Validate.acceptAll = function (value) {
        return value;
    };
    Validate.optional = function (validator) {
        return function (value) {
            return (value == undefined) ? value : validator(value);
        };
    };
    Validate.that = function (predicate, message) {
        return function (value) {
            if (predicate(value))
                return value;
            throw new InvalidValueError(message);
        };
    };
    Validate.number = function (value) {
        return Validate.that(function (value) {
            return typeof value === 'number';
        }, 'not a number');
    };
    Validate.string = function (value) {
        return Validate.that(function (value) {
            return typeof value === 'string';
        }, 'not a string');
    };
    Validate.object = function (propertyValidators) {
        return function (object) {
            var result = {};
            if (!object || typeof object !== 'object') {
                throw new InvalidValueError('not an Object');
            }
            // Validate all properties.
            for (key in propertyValidators) {
                var validator = propertyValidators[key];
                try {
                    var valid = validator(object[key]);
                }
                catch (error) {
                    if (key in object) {
                        throw InvalidValueError.prepend('in property "' + key + '"', error);
                    }
                    else {
                        throw new InvalidValueError('missing property "' + key + '"');
                    }
                }
                if (valid !== undefined) {
                    result[key] = valid;
                }
            }
            // Check for unexpected properties.
            for (var key in object) {
                if (!propertyValidators[key]) {
                    throw new InvalidValueError('unexpected property "' + key + '"');
                }
            }
            return result;
        };
    };
    Validate.array = function (validator) {
        return function (array) {
            var result = [];
            if (Object.prototype.toString.call(array) !== '[object Array]') {
                throw new InvalidValueError('not an Array');
            }
            for (var i = 0; i < array.length; ++i) {
                try {
                    result[i] = validator(array[i]);
                }
                catch (error) {
                    throw InvalidValueError.prepend('at index ' + i, error);
                }
            }
            return result;
        };
    };
    Validate.oneOf = function (names) {
        var myObject = {};
        var quotedNames = [];
        names.forEach(function (name) {
            myObject[name] = true;
            quotedNames.push('"' + name + '"');
        });
        return function (value) {
            if (myObject[value])
                return value;
            throw new InvalidValueError('not one of ' + quotedNames.join(', '));
        };
    };
    Validate.atLeastOneOfProperties = function (names) {
        return function (value) {
            if (!value)
                return value;
            var quotedNames = [];
            for (var i = 0; i < names.length; i++) {
                if (names[i] in value) {
                    return value;
                }
                quotedNames.push('"' + names[i] + '"');
            }
            throw new InvalidValueError('one of ' + quotedNames.join(', ') + ' is required');
        };
    };
    ;
    Validate.mutuallyExclusiveProperties = function (names, oneRequired) {
        return function (value) {
            if (!value)
                return value;
            var present = [];
            var quotedNames = [];
            names.forEach(function (name) {
                if (name in value) {
                    present.push('"' + name + '"');
                }
                quotedNames.push('"' + name + '"');
            });
            if (present.length > 1) {
                throw new InvalidValueError('cannot specify properties '
                    + present.slice(0, -1).join(', ')
                    + ' and '
                    + present.slice(-1)
                    + ' together');
            }
            else if (present.length == 0 && oneRequired) {
                throw new InvalidValueError('one of ' + quotedNames.join(', ') + ' is required');
            }
            return value;
        };
    };
    ;
    Validate.mutuallyExclusivePropertiesRequired = function (names) {
        return Validate.mutuallyExclusiveProperties(names, true);
    };
    ;
    Validate.compose = function (validators) {
        return function (value) {
            validators.forEach(function (validate) {
                value = validate(value);
            });
            return value;
        };
    };
    ;
    Validate.boolean = Validate.compose([
        Validate.that(function (value) {
            return typeof value === 'boolean';
        }, 'not a boolean'), function (value) {
            // In each API, boolean fields default to false, and the presence of
            // a querystring value indicates true, so we omit the value if
            // explicitly set to false.
            return value ? value : undefined;
        }
    ]);
    return Validate;
}());
var InvalidValueError = /** @class */ (function (_super) {
    __extends(InvalidValueError, _super);
    function InvalidValueError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = 'InvalidValueError';
        Error.captureStackTrace(_this, InvalidValueError);
        return _this;
    }
    InvalidValueError.prepend = function (message, error) {
        if (error instanceof InvalidValueError) {
            return new InvalidValueError(message + ': ' + error.message);
        }
        return error;
    };
    ;
    return InvalidValueError;
}(Error));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7Ozs7Ozs7Ozs7OztBQUVIO0lBQUE7SUF3S0EsQ0FBQztJQXZLUSxrQkFBUyxHQUFoQixVQUFpQixLQUFVO1FBQ3pCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGlCQUFRLEdBQWYsVUFBZ0IsU0FBYztRQUM1QixPQUFPLFVBQVMsS0FBVTtZQUN4QixPQUFPLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sYUFBSSxHQUFYLFVBQVksU0FBbUIsRUFBRSxPQUFZO1FBQzNDLE9BQU8sVUFBUyxLQUFVO1lBQ3hCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUNuQyxNQUFNLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLGVBQU0sR0FBYixVQUFjLEtBQVU7UUFDdEIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVMsS0FBVTtZQUN0QyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztRQUNuQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNNLGVBQU0sR0FBYixVQUFjLEtBQVU7UUFDdEIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVMsS0FBVTtZQUN0QyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztRQUNuQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLGVBQU0sR0FBYixVQUFjLGtCQUF1QjtRQUNuQyxPQUFPLFVBQVMsTUFB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