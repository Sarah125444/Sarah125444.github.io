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
    return array.filter(item => !values.includes(func(item)));
  },

  differenceWith: function(array, ...args) {
    let func,
      lastArg = args[args.length - 1];
    if (typeof lastArg === "string" || typeof lastArg === "function") {
      func = this.iteratee(args.pop());
    } else {
      func = it => it;
    }
    let values = args.flat();
    return array.filter(arrVal =>
      values.every(othVal => !func(arrVal, othVal))
    );
  },

  drop: function(array, n = 1) {
    return array.slice(n);
  },

  dropRight: function(array, n = 1) {
    return array
      .reverse()
      .slice(n)
      .reverse();
  },

  dropRightWhile: function(array, func = this.identity) {
    func = this.iteratee(func);
    let res = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
      if (func(array[i])) {
        res.pop();
      } else {
        break;
      }
    }
    return res;
  },

  dropWhile: function(array, func = this.identity) {
    func = this.iteratee(func);
    let res = array.slice();
    for (let i = 0; i < array.length - 1; i++) {
      if (func(array[i])) {
        res.shift();
      } else {
        break;
      }
    }
    return res;
  },

  fill: function(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  },

  findIndex: function(array, func = this.identity, fromIndex = 0) {
    func = this.iteratee(func);
    for (let i = fromIndex; i < array.length; i++) {
      if (func(array[i])) {
        return i;
        break;
      }
    }
  },

  findLastIndex: function(
    array,
    func = this.identity,
    fromIndex = array.length - 1
  ) {
    func = this.iteratee(func);
    for (let i = fromIndex; i >= 0; i--) {
      if (func(array[i])) {
        return i;
        break;
      }
    }
  },

  flatten: function(array) {
    return [].concat(...array);
  },

  flattenDeep: function(array) {
    while (array.some(Array.isArray)) array = array.flat();
    return array;
  },

  flattenDepth: function(array, depth = 1) {
    for (let i = 0; i < depth; i++) {
      array = array.flat();
    }
    return array;
  },

  fromPairs: function(pairs) {
    return pairs.reduce((res, item) => {
      res[item[0]] = item[1];
      return res;
    }, {});
  },

  head: function(array) {
    return array[0];
  },

  indexOf: function(array, value, fromIndex = 0) {
    fromIndex += fromIndex < 0 ? array.length : 0;
    for (let i = fromIndex; i < array.length; i++) {
      if (this.sameValueZero(array[i], value)) return i;
    }
    return -1;
  },

  initial: function(array) {
    return array.slice(0, array.length - 1);
  },

  intersection: function(...args) {
    return args[0].filter(item =>
      args.slice(1).every(arr => arr.includes(item))
    );
  },

  intersectionBy: function(array, ...args) {
    let func;
    let lastArgs = args[args.length - 1];
    if (typeof lastArgs === "string" || typeof lastArgs === "function") {
      func = this.iteratee(args.pop());
    } else {
      func = it => it;
    }
    return array.filter(item =>
      args.every(arr => arr.map(func).includes(func(item)))
    );
  },

  intersectionWith: function(...args) {
    let func = args.pop();
    return args[0].filter(item =>
      args.slice(1).every(arr => arr.some(arrVal => func(item, arrVal)))
    );
  },

  join: function(array, separator = ",") {
    return array.reduce((res, item) => "" + res + separator + item);
  },

  last: function(array) {
    return array[array.length - 1];
  },

  lastIndexOf: function(array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i > 0; i--) {
      if (this.sameValueZero(array[i], value)) return i;
    }
    return -1;
  },

  nth: function(array, n = 0) {
    n += n < 0 ? array.length : 0;
    return array[n];
  },

  pull: function(array, ...args) {
    return array.filter(item => !args.includes(item));
  },

  pullAll: function(array, values) {
    return array.filter(item => !values.includes(item));
  },

  pullAllBy: function(array, values, func = identity) {
    func = this.iteratee(func);
    return array.filter(it => !values.map(func).includes(func(it)));
  },

  pullAllWith: function(array, values, func) {
    return array.filter(it => !values.some(item => func(it, item)));
  },

  reverse: function(array) {
    return array.reverse();
  },

  sortedIndex: function(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] < value && array[i + 1] >= value) {
        return i + 1;
      }
    }
  },

  sortedIndexBy: function(array, value, func) {
    func = this.iteratee(func);
    for (let i = 0; i < array.length; i++) {
      if (func(array[i]) <= func(value) && func(array[i + 1]) > func(value)) {
        return i;
      }
    }
  },

  sortedIndexOf: function(array, value) {
    return array.sort((a, b) => a - b).indexOf(value);
  },

  sortedLastIndex: function(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] <= value && array[i + 1] > value) {
        return i + 1;
      }
    }
  },

  sortedLastIndexBy: function(array, value, func = identity) {
    func = this.iteratee(func);
    for (let i = 0; i < array.length; i++) {
      if (func(array[i]) <= func(value) && func(array[i + 1]) > func(value)) {
        return i + 1;
      }
    }
  },

  sortedLastIndexOf: function(array, value) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] > value && array[i - 1] <= value) {
        return i - 1;
      }
    }
  },

  sortedUniq: function(array) {
    return [...new Set(array)];
  },

  sortedUniqBy: function(array, func) {
    let res = [];
    for (let i = 0; i < array.length; i++) {
      if (func(array[i]) !== func(res[res.length - 1])) {
        res.push(array[i]);
      }
    }
    return res;
  },

  tail: function(array) {
    return array.slice(1, array.length);
  },

  take: function(array, n = 1) {
    return array.slice(0,n)
  },

  takeRight: function(array, n = 1) {
    if (n > 0) return array.slice(-n);
    if (n === 0) return this.take(array, n);
  },

  takeRightWhile: function(arr, func = identity) {
    func = this.iteratee(func);
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!func(arr[i], i, arr)) {
        return arr.slice(i + 1);
      }
    }
    return arr.slice();
  },

  takeWhile: function(array,func=identity) {
    func = this.iteratee(func);
    for(let i = 0; i < array.length; i++){
      if(!func(array[i],i,array)){
        return array.slice(0,i)
      }
    }
    return array.slice();
  },

  union: function(...args) {
    return [...new Set(args.flat())]
  },

  unionBy: function(...args) {
    let lastArgs = args[args.length - 1];
    if(typeof lastArgs === "function" || typeof lastArgs === "string"){
      func = this.iteratee(args.pop())
    }else{
      func = it => it
    }
    let argsOrigin = args.flat();
    let argsTransformed = argsOrigin.map(func);
    return argsOrigin.filter((_,index) => argsTransformed.indexOf(argsTransformed[index]) === index)
  },

  unionWith: function(...args) {
    func = this.iteratee(args.pop())
    return args.flat().reduce((res,item) => res.some(it => func(item,it)) ? res : [...res,item],[])
  },

  uniq: function(array) {
    return [...new Set(array)]
  },

  uniqBy: function(array,func=identity) {
    func=this.iteratee(func);
    let transfromed = array.map(func);
    return array.filter((_,index) => transfromed.indexOf(transfromed[index]) === index)
  },

  uniqWith: function(array,func) {
    func = this.iteratee(func)
    return array.reduce((res,item) => res.some(it => func(item,it)) ? res : [...res,item],[])
  },

  unzip: function(array) {
    return  array[0].map((_,index) => array.map(item => item[index]))
  },

  unzipWith: function(array,func) {
    return  array[0].map((_,i) => func(...array.map(arr => arr[i])))
  },

  without: function(array, ...args) {
    let res = [];
    let newAry=[...new Set(array)];
    for(let i = 0; i < newAry.length;i++){
      let cur = newAry[i];
      let shouldPush = true;
      for(let j = 0; j < args.length;j++){
        if(cur === args[j]){
          shouldPush = false;
          break;
        }
      }
      if(shouldPush) res.push(newAry[i]);
    }
    return res;
  },

  xor: function(...args) {
    let newArg = args.flat();
    return  newArg.filter(it => newArg.indexOf(it) === newArg.lastIndexOf(it))
  },

  xorBy: function(...args) {
    let lastArgs = args[args.length - 1];
    if(typeof lastArgs === "function" || typeof lastArgs === "string"){
      func = this.iteratee(args.pop())
    }else{
      func = it => it
    }
    let OriginArgs = args.flat();
    let transArgs = OriginArgs.map(func)
    return OriginArgs.filter((_,index) => transArgs.indexOf(transArgs[index]) === transArgs.lastIndexOf(transArgs[index]))
  },

  xorWith: function() {},

  zip: function(...args) {
    return  Array(Math.max(...args.map(it => it.length))).fill(0).map((_,index) => args.map(item => item[index]))
  },

  zipObject: function(props,values) {
    return Object.fromEntries(this.zip(props,values))
  },

  zipObjectDeep: function() {},

  zipWith: function(...args) {
    func = this.iteratee(args.pop())
    return  args[0].map((_,i) => func(...args.map(arr => arr[i])))
  },

  countBy: function() {},

  every: function(collection,func=this.identity) {
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

  isEqual: function(value, other) {
    if (value === other) return true;
    if (
      value === null ||
      other === null ||
      typeof value !== "object" ||
      typeof other !== "object"
    )
      return false;
    let keysVal = Object.keys(value),
      keysOth = Object.keys(other);
    if (keysVal.length !== keysOth.length) return false;
    for (let key of keysVal) {
      if (
        !keysOth.includes(key) ||
        !sarah125444.isEqual(value[key], other[key])
      )
        return false;
    }
    return true;
  },

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
