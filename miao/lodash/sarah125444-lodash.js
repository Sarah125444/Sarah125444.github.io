var sarah125444 = {
  iteratee: function(func = this.identity) {
    if (typeof func === "string") {
      return this.property(func);
    }
    if (Array.isArray(func)) {
      return this.matchesProperty(func[0], func[1]);
    }
    if (typeof func === "function") {
      return func;
    } else {
      return this.matches(func);
    }
  },

  identity: function(...args) {
    return args[0];
  },

  toPath: function(value) {
    return value.match(/\w+/g);
  },

  property: function(path) {
    if (typeof path === "string") {
      path = this.toPath(path);
    }
    return obj => path.reduce((res, item) => res[item], obj);
  },

  matchesProperty: function(path, srcValue) {
    return obj => sarah125444.isMatch(this.property(path)(obj), srcValue);
  },

  chunk: function(array, size = 1) {
    return array
      .map((_, index) =>
        index % size === 0 ? array.slice(index, index + size) : null
      )
      .filter(Boolean);
  },

  compact: function(array) {
    return array.filter(Boolean);
  },

  sameValueZero: function(x, y) {
    if (typeof x !== typeof y) return false;
    if (typeof x === "number") {
      if (isNaN(x) && isNaN(y)) return true;
      if (x === +0 && y === -0) return true;
      if (x === -0 && y === +0) return true;
      if (x === y) return true;
      return false;
    }
    return x == y;
  },

  difference: function(array, ...args) {
    return array.filter(item => !args.flat().includes(item));
  },

  differenceBy: function(array, ...args) {
    let func,
      lastArg = args[args.length - 1];
    if (typeof lastArg === "string" || typeof lastArg === "function") {
      func = this.iteratee(args.pop());
    } else {
      func = it => it;
    }
    let values = args.flat().map(func);
    return array.filter(item => values.includes(func(item)));
  },

  differenceWith: function() {
    
  },

  drop: function(array, n) {
    let arr = array.slice(n);
    return arr;
  },
  dropRight: function(array, n) {
    let arr = array.slice(0, n ? -n : array.length);
    return arr;
  },
  dropRightWhile: function() {},
  dropWhile: function() {},
  fill: function(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  },
  findIndex: function() {},
  findLastIndex: function() {},
  flatten: function(array) {
    return [].concat(...array);
  },
  flattenDeep: function(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] === `object`) {
        result.push(...flattenDeep(array[i]));
      } else {
        result.push(array[i]);
      }
    }
    return result;
  },
  flattenDepth: function(array, depth = 1) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (depth > 1) {
        if (typeof array[i] === `object`) {
          result.push(...flattenDepth(array[i], --depth));
        } else {
          result.push(array[i]);
        }
      } else {
        result.push(array[i]);
      }
    }
    return result;
  },
  fromPairs: function(pairs) {
    let object = {};
    pairs.forEach(Element => {
      object[Element[0]] = Element[1];
    });
    return pairs;
  },
  head: function(array) {
    return array[0];
  },
  indexOf: function(array, value, fromIndex = 0) {
    fromIndex += fromIndex < 0 ? array.length : 0;
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i;
      } else if (array[i] !== array[i] && value !== value) {
        return i;
      }
    }
    return -1;
  },
  initial: function(array) {
    return array.slice(0, array.length - 1);
  },
  intersection: function() {},
  intersectionBy: function() {},
  intersectionWith: function() {},
  join: function(array, separator = "") {
    let str = array[0] + "";
    for (let i = 1; i < array.length; i++) {
      str += separator + "" + array[i];
    }
    return str;
  },
  last: function(array) {
    let l = array.length - 1;
    return (nums = array[l]);
  },
  lastindexof: function(array, value, fromIndex) {
    for (var i = array.length; i > 0; i--) {
      if (array[i] === value) {
        return i;
      }
    }
  },
  nth: function(array, n = 0) {
    if (n >= 0) return array[n];
    if (n < 0) return array[array.length - -n];
  },
  pull: function(array, ...args) {
    return array.filter(item => !args.includes(item));
  },
  pullAll: function(array, array2) {
    for (let i = 0; i < array.length; ) {
      if (array2.includes(array[i])) {
        array.splice(i, 1);
      } else {
        i++;
      }
    }
    return array;
  },
  pullAllBy: function() {},
  pullAllWith: function() {},
  reverse: function(array) {
    let l = array.length,
      result = [];
    for (let i = 0; i <= l; i++) {
      result[i] = array[l - i];
    }
    return result;
  },
  sortedIndex: function(array, value) {
    let result = [value];
    let newarr = array.cancat(result).sort((a, b) => a - b);
    return newarr.indexOf(value);
  },
  sortedIndexBy: function() {},
  sortedIndexOf: function() {},
  sortedLastIndex: function() {},
  sortedLastIndexBy: function() {},
  sortedLastIndexOf: function() {},
  sortedUniq: function() {},
  sortedUniqBy: function() {},
  tail: function(array) {
    return array.slice(1, array.length);
  },
  take: function() {},

  takeRight: function() {},
  takeRightWhile: function() {},
  takeWhile: function() {},

  union: function() {},

  unionBy: function() {},
  unionWith: function() {},
  uniq: function() {},
  uniqBy: function() {},
  uniqWith: function() {},
  unzip: function() {},
  unziqWith: function() {},
  without: function() {},
  xor: function() {},
  xorBy: function() {},
  xorWith: function() {},
  zip: function() {},
  zipObject: function() {},
  zipObjectDeep: function() {},
  zipWith: function() {},
  countBy: function() {},
  every: function(collection, func = this.identity) {
    func = this.iteratee(func);
    if (Array.isArray(collection)) {
      for (let index = 0; index < collection.length; index++) {
        if (!func(collection[index], index, collection)) {
          return false;
        }
      }
      return true;
    } else {
      for (let key in collection) {
        if (!func(collection[key], key, collection)) {
          return false;
        }
      }
      return true;
    }
  },
  filter: function(collection, func = this.identity) {
    func = this.iteratee(func);
    var passed = [];
    if (Array.isArray(collection)) {
      for (var index = 0; index < collection.length; index++) {
        if (func(collection[index], index, collection)) {
          passed.push(collection[index]);
        }
      }
    } else {
      for (let key in collection) {
        if (func(collection[key], key, collection)) {
          passed.push(collection[key]);
        }
      }
    }
    return passed;
  },
  find: function() {},
  findlast: function() {},
  flatMap: function() {},
  flatMapDeep: function() {},
  flatMapDepth: function() {},
  forEach: function(collection, action) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        action(arr[i], i, arr);
      }
    } else {
      for (let key in collection) {
        action(collection[key], key, collection);
      }
    }
    return collection;
  },
  forEachRight: function() {},
  groupBy: function() {},
  includes: function() {},
  invokeMap: function() {},
  keyBy: function() {},
  map: function(collection, func = it => it) {
    func = this.iteratee(func);
    var transformed = [];
    if (Array.isArray(collection)) {
      for (var index = 0; index < collection.length; index++) {
        transformed.push(func(collection[index], index, collection));
      }
    } else {
      for (let key in collection) {
        transformed.push(func(collection[key], key, collection));
      }
    }
    return transformed;
  },
  orderBy: function() {},

  partition: function() {},
  reduce: function(collection, func = it => it, accumulator) {
    func = this.iteratee(func);
    let current = accumulator,
      j;
    if (Array.isArray(collection)) {
      if (accumulator !== undefined) {
        j = 0;
      } else {
        current = collection[0];
        j = 1;
      }
      for (let index = j; index < collection.length; index++) {
        current = func(current, collection[index], index, collection);
      }
    } else {
      for (const key in collection) {
        current = func(current, collection[key], key, collection);
      }
    }
    return current;
  },
  redeceRight: function() {},
  reject: function() {},
  sample: function() {},
  sampleSize: function() {},
  shuffle: function() {},
  size: function() {},
  some: function(collection, func = this.identity) {
    func = this.iteratee(func);
    if (Array.isArray(collection)) {
      for (let index = 0; index < collection.length; index++) {
        if (func(collection[index], index, collection)) {
          return true;
        }
      }
      return false;
    } else {
      for (let key in collection) {
        if (func(collection[key], key, collection)) {
          return true;
        }
      }
      return false;
    }
  },
  sortBy: function() {},
  defer: function() {},
  delay: function() {},
  castArray: function() {},
  conformsTo: function() {},
  eq: function() {},
  gt: function() {},
  gte: function() {},
  isArguments: function(value) {
    return Object.prototype.toString.call(value) === "[object Arguments]";
  },
  isArray: function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },
  isArrayBuffer: function(value) {
    return Object.prototype.toString.call(value) === "[object ArrayBuffer]";
  },
  isArrayLike: function(value) {},
  isArrayLikeObject: function(value) {},
  isBoolean: function(value) {
    return Object.prototype.toString.call(value) === "[object Boolean]";
  },
  isDate: function(value) {
    return Object.prototype.toString.call(value) === "[object Date]";
  },
  isElement: function(value) {
    return Object.prototype.toString.call(value) === "[object Element]";
  },
  isEmpty: function(value) {
    let count = 0;
    for (key in value) {
      count++;
    }
    return count == 0;
  },
  isEquel: function(value, other) {},
  isEqualWith: function() {},
  isError: function(value) {
    return value instanceof Error;
  },
  isFinite: function(value) {
    if (typeof value === "string") return false;
    return Number(value) !== Infinity;
  },
  isFunction: function(value) {
    return Object.prototype.toString.call(value) == "[object Function]";
  },
  isIntegar: function(value) {
    if (typeof value === "string") return false;
    if (!isNaN(value) && value % 1 === 0) {
      return true;
    } else {
      return false;
    }
  },
  isLength: function(value) {
    if (typeof value === "string") return false;
    if (value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER) {
      return true;
    } else {
      return false;
    }
  },
  isMap: function(value) {
    return Object.prototype.toString.call(value) == "[object Map]";
  },
  isMatch: function(object, source) {
    if (typeof source !== "object" || typeof object !== "object") {
      return source === object;
    }
    for (let key in source) {
      if (!(key in object) || !this.isMatch(object[key], source[key])) {
        return false;
      }
    }
    return true;
  },
  isMatchWith: function() {},
  matches: function(source) {
    return object => this.isMatch(object, source);
  },
  isNaN: function(value) {
    if (value != undefined && value != null) {
      return value.toString() === "NaN";
    }
    return false;
  },
  isNil: function(value) {
    if (value == undefined || value === null) {
      return true;
    } else {
      return false;
    }
  },
  isNull: function(value) {
    if (value === null) {
      return true;
    } else {
      return false;
    }
  },
  isNumber: function(value) {
    return Object.prototype.toString.call(value) === "[object Number]";
  },
  isObject: function(value) {
    let type = typeof value;
    return value != null && (type === "function" || type === "object");
  },
  isObjectLike: function(value) {
    return typeof value == "object" && value != null;
  },
  isPlainObject: function(value) {},
  isRegExp: function(value) {
    return Object.prototype.toString.call(value) === "[object RegExp]";
  },
  isSafeInteger: function(value) {
    return Name.isSafeInteger(value);
  },
  isSet: function(value) {
    return Object.prototype.toString.call(value) === "[object Set]";
  },
  isString: function() {
    return Object.prototype.toString.call(value) === "[object String]";
  },
  isSymbol: function() {
    return Object.prototype.toString.call(value) === "[object Symbol]";
  },
  isTypeArray: function() {},
  isUndefined: function(value) {
    return value === undefined;
  },
  isWeakMap: function(value) {
    return Object.prototype.toString.call(value) === "[object WeakMap]";
  },
  isWeakSet: function() {
    return Object.prototype.toString.call(value) === "[object WeakSet]";
  },
  it: function(value, other) {
    return value < other;
  },
  ite: function(value, other) {
    return value <= other;
  },
  toArray: function(value) {
    let result = [];
    for (key in value) {
      result.push(value[key]);
    }
    return result;
  },
  toFinite: function() {},
  toIntegar: function() {},
  toLength: function() {},
  toNumber: function() {},
  assgin: function() {},
  toSafeIntegar: function() {},
  add: function(augend, addend) {
    return augend + addend;
  },
  ceil: function(number, precision = 0) {
    let power = 10 ** precision;
    let num = Math.ceil(number * power);
    return num / power;
  },
  divide: function(dividend, divisor) {
    return dividend / divisor;
  },
  floor: function(number, precision = 0) {
    let power = 10 ** precision;
    let num = Math.floor(number * power);
    return num / power;
  },
  max: function(array) {
    return array.length === 0
      ? undefined
      : array.length(function(a, b) {
          return a > b ? a : b;
        }, array[0]);
  },
  maxBy: function(array, iteratee) {
    let max = array[0],
      temp;
    for (let i = 1; i < array.length; i++) {
      if (typeof iteratee === "function") {
        temp = iteratee(array[i]);
        if (iteratee(max) < temp) {
          max = array[i];
        }
      }
      if (typeof iteratee === "string") {
        temp = array[i][iteratee];
        if (max[iteratee] < temp) {
          max = array[i];
        }
      }
    }
    return max;
  },
  mean: function(array) {
    if (array.length === 0) return undefined;
    return array.reduce((a, b) => a + b) / array.length;
  },
  meanBy: function(array, iteratee) {
    let result = 0,
      temp = 0;
    for (let i = 0; i < array.length; i++) {
      if (typeof iteratee === "function") {
        temp = iteratee(array[i]);
      }
      if (typeof iteratee === "string") {
        temp = array[i][iteratee];
      }
      result += temp;
    }
    return result / array.length;
  },
  min: function(array) {
    if (array.length === 0) return undefined;
    let min = array[0];
    for (value of array) {
      if (value < min) min = value;
    }
    return min;
  },
  minBy: function(array, iteratee) {
    let min = array[0],
      temp = 0;
    for (let i = 0; i < array.length; i++) {
      if (typeof iteratee === "function") {
        temp = iteratee(array[i]);
      }
      if (typeof iteratee === "string") {
        temp = array[i][iteratee];
      }
      if (temp < min) {
        min = temp;
      }
    }
    return min;
  },
  multiply: function(multiplier, multiplied) {
    return multiplier * multiplied;
  },
  round: function(number, precision = 0) {
    let power = 10 ** precision;
    return Math.round(number * power) / power;
  },
  substract: function(minuend, subtrahead) {
    return minuend - subtrahead;
  },
  sum: function(array) {
    return array.reduce((a, b) => a + b);
  },
  sumBy: function(array, iteratee) {
    let result = 0,
      temp;
    for (let i = 0; i < array.length; i++) {
      if (typeof iteratee === "function") {
        temp = iteratee(array[i]);
      }
      if (typeof iteratee === "string") {
        temp = array[i][iteratee];
      }
      result += temp;
    }
    return result;
  },
  clamp: function(number, lower, upper) {
    if (number >= upper) return upper;
    if (number > lower) return number;
    if (number < lower) return lower;
  },

  inRange: function(number, start = 0, end) {
    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }
    if (start > end) {
      start += end;
      end = start - end;
      start = start - end;
    }
    if (number >= start && number < end) {
      return true;
    }
    return false;
  },
  assignIn: function(object, ...sources) {
    sources.forEach(function(obj) {
      for (key in obj) {
        object[key] = obj[key];
      }
    });
    return object;
  },
  defaults: function(object, ...sources) {
    let result = {};
    for (source of sources) {
      for (key in source) {
        result[key] = source[key];
      }
    }
    for (key in object) {
      result[key] = object[key];
    }
    return result;
  },
  findKey: function() {},
  findLastKey: function() {},
  forIn: function() {},
  forInRight: function() {},

  forOwn: function() {},
  forOwnRight: function() {},
  functions: function() {},
  functionsIn: function() {},
  get: function() {},
  has: function() {},
  hasIn: function() {},
  invert: function() {},
  invertBy: function() {},
  invoke: function() {},
  keys: function() {},
  keysIn: function() {},
  mapKeys: function() {},
  mapValues: function() {},
  merge: function() {},
  mergeWith: function() {},
  omit: function() {},
  omitBy: function() {},
  pick: function() {},
  pickBy: function() {},
  result: function() {},
  set: function() {},
  setWith: function() {},
  toPairs: function() {},
  toPairsIn: function() {},
  transform: function() {},
  unset: function() {},
  update: function() {},

  updateWith: function() {},

  values: function() {},

  valuesIn: function() {},

  camelCase: function() {},
  capitalize: function() {},
  deburr: function() {},
  endsWith: function() {},
  escape: function() {},
  pad: function() {},
  camelCase: function() {},
  camelCase: function() {}
};
