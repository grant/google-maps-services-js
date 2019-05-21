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

class Validate {
  static acceptAll(value: any) {
    return value;
  }

  static optional(validator: any) {
    return function(value: any) {
      return (value == undefined) ? value : validator(value);
    };
  }

  static that(predicate: Function, message: any) {
    return function(value: any) {
      if (predicate(value)) return value;
      throw new InvalidValueError(message);
    };
  }

  static number(value: any) {
    return Validate.that(function(value: any) {
      return typeof value === 'number';
    }, 'not a number');
  }
  static string(value: any) {
    return Validate.that(function(value: any) {
      return typeof value === 'string';
    }, 'not a string');
  }

  static object(propertyValidators: any) {
    return function(object: any) {
      var result: any = {};
  
      if (!object || typeof object !== 'object') {
        throw new InvalidValueError('not an Object');
      }
  
      // Validate all properties.
      for (key in propertyValidators) {
        var validator = propertyValidators[key];
        try {
          var valid = validator(object[key]);
        } catch (error) {
          if (key in object) {
            throw InvalidValueError.prepend('in property "' + key + '"', error);
          } else {
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
  }

  static array(validator: Function) {
    return function(array: any[]) {
      var result = [];
  
      if (Object.prototype.toString.call(array) !== '[object Array]') {
        throw new InvalidValueError('not an Array');
      }
  
      for (var i = 0; i < array.length; ++i) {
        try {
          result[i] = validator(array[i]);
        } catch (error) {
          throw InvalidValueError.prepend('at index ' + i, error);
        }
      }
  
      return result;
    };
  }

  static oneOf(names: string[]) {
    var myObject: any = {};
    var quotedNames: any = [];
    names.forEach(function(name) {
      myObject[name] = true;
      quotedNames.push('"' + name + '"');
    });

    return function(value: any) {
      if (myObject[value]) return value;
      throw new InvalidValueError('not one of ' + quotedNames.join(', '));
    };
  }

  static atLeastOneOfProperties(names: any) {
    return function(value: any) {
      if (!value) return value;
  
      var quotedNames = [];
      for (var i = 0; i < names.length; i++) {
        if (names[i] in value) {
          return value;
        }
        quotedNames.push('"' + names[i] + '"');
      }
  
      throw new InvalidValueError(
          'one of ' + quotedNames.join(', ') + ' is required');
    };
  };

  static mutuallyExclusiveProperties(names: string[], oneRequired: boolean) {
    return function(value: any) {
      if (!value) return value;
  
      var present: string[] = [];
      var quotedNames: string[] = [];
      names.forEach(function(name) {
        if (name in value) {
          present.push('"' + name + '"');
        }
        quotedNames.push('"' + name + '"');
      });
  
      if (present.length > 1) {
        throw new InvalidValueError(
            'cannot specify properties '
            + present.slice(0, -1).join(', ')
            + ' and '
            + present.slice(-1)
            + ' together');
      } else if (present.length == 0 && oneRequired) {
        throw new InvalidValueError(
            'one of ' + quotedNames.join(', ') + ' is required');
      }
  
      return value;
    };
  };
  
  static mutuallyExclusivePropertiesRequired(names: any) {
    return Validate.mutuallyExclusiveProperties(names, true);
  };

  static compose(validators: Function[]) {
    return function(value: any) {
      validators.forEach(function(validate) {
        value = validate(value);
      });
      return value;
    };
  };

  static boolean = Validate.compose([
    Validate.that(function(value: any) {
      return typeof value === 'boolean';
    }, 'not a boolean'), function(value: any) {
      // In each API, boolean fields default to false, and the presence of
      // a querystring value indicates true, so we omit the value if
      // explicitly set to false.
      return value ? value : undefined;
    }
  ]);
}

class InvalidValueError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'InvalidValueError';
    Error.captureStackTrace(this, InvalidValueError);
  }
  public static prepend(message: string, error: any) {
    if (error instanceof InvalidValueError) {
      return new InvalidValueError(message + ': ' + error.message);
    }
    return error;
  };
}
