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

  concat: function(array,...args){
    return array.concat(...args)
  },

  toPath: function(value) {
    value = String(value);s
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
    return array.slice(0, n);
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

  takeWhile: function(array, func = identity) {
    func = this.iteratee(func);
    for (let i = 0; i < array.length; i++) {
      if (!func(array[i], i, array)) {
        return array.slice(0, i);
      }
    }
    return array.slice();
  },

  union: function(...args) {
    return [...new Set(args.flat())];
  },

  unionBy: function(...args) {
    let lastArgs = args[args.length - 1];
    if (typeof lastArgs === "function" || typeof lastArgs === "string") {
      func = this.iteratee(args.pop());
    } else {
      func = it => it;
    }
    let argsOrigin = args.flat();
    let argsTransformed = argsOrigin.map(func);
    return argsOrigin.filter(
      (_, index) => argsTransformed.indexOf(argsTransformed[index]) === index
    );
  },

  unionWith: function(...args) {
    func = this.iteratee(args.pop());
    return args
      .flat()
      .reduce(
        (res, item) => (res.some(it => func(item, it)) ? res : [...res, item]),
        []
      );
  },

  uniq: function(array) {
    return [...new Set(array)];
  },

  uniqBy: function(array, func = identity) {
    func = this.iteratee(func);
    let transfromed = array.map(func);
    return array.filter(
      (_, index) => transfromed.indexOf(transfromed[index]) === index
    );
  },

  uniqWith: function(array, func) {
    func = this.iteratee(func);
    return array.reduce(
      (res, item) => (res.some(it => func(item, it)) ? res : [...res, item]),
      []
    );
  },

  unzip: function(array) {
    return array[0].map((_, index) => array.map(item => item[index]));
  },

  unzipWith: function(array, func) {
    return array[0].map((_, i) => func(...array.map(arr => arr[i])));
  },

  without: function(array, ...args) {
    let res = [];
    let newAry = [...new Set(array)];
    for (let i = 0; i < newAry.length; i++) {
      let cur = newAry[i];
      let shouldPush = true;
      for (let j = 0; j < args.length; j++) {
        if (cur === args[j]) {
          shouldPush = false;
          break;
        }
      }
      if (shouldPush) res.push(newAry[i]);
    }
    return res;
  },

  xor: function(...args) {
    let newArg = args.flat();
    return newArg.filter(it => newArg.indexOf(it) === newArg.lastIndexOf(it));
  },

  xorBy: function(...args) {
    let lastArgs = args[args.length - 1];
    if (typeof lastArgs === "function" || typeof lastArgs === "string") {
      func = this.iteratee(args.pop());
    } else {
      func = it => it;
    }
    let OriginArgs = args.flat();
    let transArgs = OriginArgs.map(func);
    return OriginArgs.filter(
      (_, index) =>
        transArgs.indexOf(transArgs[index]) ===
        transArgs.lastIndexOf(transArgs[index])
    );
  },

  xorWith: function(...args) {
    func = this.iteratee(args.pop());
    let originArgs = args.flat();
    return originArgs.filter((item, index) =>
      [...originArgs.slice(0, index), ...originArgs.slice(index + 1)].every(
        it => !func(item, it)
      )
    );
  },

  zip: function(...args) {
    return Array(Math.max(...args.map(it => it.length)))
      .fill(0)
      .map((_, index) => args.map(item => item[index]));
  },

  zipObject: function(props, values) {
    return Object.fromEntries(this.zip(props, values));
  },

  set: function(object, path, value) {
    path = (typeof path === "string" ? path.match(/\w+/g) : path).map(it =>
      Number(it) >= 0 ? +it : it
    );
    path.reduce((res, item, index) => {
      if (index === path.length - 1) {
        res[item] = value;
      } else if (!res[item] && typeof path[index + 1] === "number") {
        res[item] = [];
      } else if (!res[item] && typeof path[index + 1] === "string") {
        res[item] = {};
      }
      return res[item];
    }, object);
    return object;
  },

  zipObjectDeep: function(props = [], values = []) {
    const res = {};
    props.forEach((item, index) => this.set(res, item, values[index]));
    return res;
  },

  zipWith: function(...args) {
    func = this.iteratee(args.pop());
    return args[0].map((_, i) => func(...args.map(arr => arr[i])));
  },

  countBy: function(collection, func = this.identity) {
    func = this.iteratee(func);
    let arr = collection.map(it => func(it)).sort((a, b) => a - b);
    const obj = {};
    arr.forEach(it => (it in obj ? obj[it]++ : (obj[it] = 1)));
    return obj;
  },

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

  find: function(collection, func = this.identity, fromIndex = 0) {
    func = this.iteratee(func);
    return collection.filter(func)[0];
  },

  findLast: function(
    collection,
    func = this.identity,
    fromIndex = collection.length - 1
  ) {
    func = this.identity(func);
    for (let i = fromIndex; i > 0; i--) {
      if (func(collection[i])) return collection[i];
    }
    return undefined;
  },

  flatMap: function(collection, func = identity) {
    func = this.identity(func);
    return collection.map(item => func(item)).flat();
  },

  flatMapDeep: function(collection, func = identity) {
    func = this.identity(func);
    return this.flattenDeep(collection.map(func));
  },

  flatMapDepth: function(collection, func = identity, depth = 1) {
    func = this.identity(func);
    return this.flattenDepth(collection.map(func), depth);
  },

  forEach: function(collection, action) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        action(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        action(collection[key], key, collection);
      }
    }
    return collection;
  },

  forEachRight: function(collection, action) {
    if (Array.isArray(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        action(collection[i], i, collection);
      }
    } else {
      let objTransformed = Object.entries(collection);
      for (let i = collection.length - 1; i >= 0; i--) {
        action(objTransformed[i][1], objTransformed[i][0], collection);
      }
    }
    return collection;
  },

  groupBy: function(collection, func = identity) {
    func = this.iteratee(func);
    const res = {};
    const originCol = collection.sort((a, b) => a - b);
    const transCol = collection.map(func).sort((a, b) => a - b);
    transCol.forEach((item, index) =>
      item in res
        ? res[item].push(originCol[index])
        : (res[item] = [originCol[index]])
    );
    return res;
  },

  includes: function(collection, value, fromIndex = 0) {
    if (Array.isArray(collection)) {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) {
          return true;
        }
      }
      return false;
    }
    if (this.isString(collection)) {
      collection = collection.slice(fromIndex);
      return collection.includes(value);
    }
    if (this.isObject(collection)) {
      let tans = Object.values(collection);
      for (let i = fromIndex; i < tans.length; i++) {
        if (tans[i] === value) {
          return true;
        }
      }
      return false;
    }
  },

  invokeMap: function(collection, path, ...args) {
    if (typeof path === "string") {
      return collection.map(item => item[path](...args));
    } else if (typeof path === "function") {
      return collection.map(item => path.call(item, ...args));
    } else {
      return collection.map(item =>
        this.iteratee(path)(it).call(item, ...args)
      );
    }
  },

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

  orderBy: function(collection, funcs = this.identity, orders) {
    funcs = funcs.map(it => this.iteratee(it));
    const compare = (a, b, func, order = "asc") => {
      const flag = order === "asc" ? 1 : -1;
      if (func(a) < func(b)) return -1 * flag;
      if (func(a) > func(b)) return 1 * flag;
      return 0;
    };
    if (Array.isArray(collection)) {
      return collection.sort((a, b) => {
        for (let i = 0; i < funcs.length; i++) {
          const res = compare(a, b, funcs[i], orders[i]);
          if (res !== 0) return res;
        }
        return 0;
      });
    }
  },

  partition: function(collection, func = identity) {
    func = this.iteratee(func);
    return collection.reduce(
      (res, item) => {
        res[func(item) ? 0 : 1].push(item);
        return res;
      },
      [[], []]
    );
  },

  reduce: function(collection, func = identity, accumulator) {
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

  reduceRight: function(collection, func = identity, accumulator) {
    func = this.iteratee(func);
    let current = accumulator;
    if (Array.isArray(collection)) {
      for (let index = collection.length - 1; index >= 0; index--) {
        current = func(current, collection[index], index, collection);
      }
    }
    return current;
  },

  reject: function(collection, func = identity) {
    func = this.iteratee(func);
    return collection.filter(item => !func(item));
  },

  sample: function(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
  },

  sampleSize: function(collection, n = 1) {
    return collection.sort(() => Math.random() - 0.5).slice(0, n);
  },

  shuffle: function(collection) {
    return collection.sort(() => Math.random() - 1);
  },

  size: function(collection) {
    if (Array.isArray(collection)) {
      return collection.length;
    }
    if (typeof collection === "string") {
      return collection.length;
    }
    if (this.isObject(collection)) {
      let transCol = Object.keys(collection);
      return transCol.length;
    }
  },

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

  sortBy: function(collection, funcs = this.identity) {
    funcs = funcs.map(it => this.iteratee(it));
    const compare = (a, b, funcs) => {
      for (let i = 0; i < funcs.length; i++) {
        if (funcs[i](a) > funcs[i](b)) return 1;
        if (funcs[i](a) < funcs[i](b)) return -1;
      }
      return 0;
    };
    return collection.sort((a, b) => compare(a, b, funcs));
  },

  defer: function(func, args) {
    return setTimeout(() => func(args), 0);
  },

  delay: function(func, wait, ...args) {
    return setTimeout(() => func(...args), wait);
  },

  castArray: function(...args) {
    return Array.isArray(...args) ? args[0] : args;
  },

  conformsTo: function(object, source) {
    return Object.values(source).every((func, index) =>
      func(object[Object.keys(source)[index]])
    );
  },

  eq: function(value, other) {
    return this.sameValueZero(value, other);
  },

  gt: function(value, other) {
    return Number(value) > Number(other) ? true : false;
  },

  gte: function(value, other) {
    return this.gt(value, other) || this.eq(value, other);
  },

  isArguments: function(value) {
    return Object.prototype.toString.call(value) === "[object Arguments]";
  },

  isArray: function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },

  isArrayBuffer: function(value) {
    return Object.prototype.toString.call(value) === "[object ArrayBuffer]";
  },

  isArrayLike: function(value) {
    if (this.isArray(value)) return true;
    if (this.isString(value)) return true;
    if (typeof value !== "function") return true;
    if (
      value !== undefined &&
      value !== null &&
      value.length >= 0 &&
      value.length <= Number.MAX_SAFE_INTEGER
    )
      return true;
  },

  isArrayLikeObject: function(value) {
    return this.isArrayLike(value) && this.isObject(value);
  },

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

  isEqualWith: function(value, other, customizer) {
    if (customizer(value, other) || value === other) return true;
    if (
      value === null ||
      other === null ||
      typeof value !== "object" ||
      typeof value !== "object"
    )
      return false;
    let keysVal = Object.keys(value),
      keysOth = Object.keys(other);
    if (keysVal.length !== keysOth.length) return false;
    for (let key of keysVal) {
      if (!keysOth.includes(key)) return false;
      if (
        !customizer(value[key], other[key], key, value, other) &&
        !this.isEqualWith(value[key], other[key], customizer)
      )
        return false;
    }
    return true;
  },

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

  isInteger: function(value) {
    if (typeof value === "string") return false;
    return !isNaN(value) && value % 1 === 0;
  },

  isLength: function(value) {
    if (typeof value === "string") return false;
    return value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
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

  isMatchWith: function(object, source, customizer) {
    if (this.isMatch(object, source)) return true;
    if (this.isEqualWith(object, source, customizer)) return true;
  },

  matches: function(source) {
    return object => this.isMatch(object, source);
  },

  isNaN: function(value) {
    if (value != undefined && value != null) {
      return value.toString() === "NaN";
    }
    return false;
  },

  isNative: function(value) {
    return value.toString().includes("[native code]");
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

  isPlainObject: function(value) {
    return (
      Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null
    );
  },

  isRegExp: function(value) {
    return Object.prototype.toString.call(value) === "[object RegExp]";
  },

  isSafeInteger: function(value) {
    return Number.isSafeInteger(value);
  },

  isSet: function(value) {
    return Object.prototype.toString.call(value) === "[object Set]";
  },

  isString: function(value) {
    return Object.prototype.toString.call(value) === "[object String]";
  },

  isSymbol: function(value) {
    return Object.prototype.toString.call(value) === "[object Symbol]";
  },

  isTypedArray: function(value) {
    let reg = /^(Int|Uint|Float)(8|16|32|64)(Clamped)?(Array)$/;
    return reg.test(Object.prototype.toString.call(value).slice(8, -1));
  },

  isUndefined: function(value) {
    return value === undefined;
  },

  isWeakMap: function(value) {
    return Object.prototype.toString.call(value) === "[object WeakMap]";
  },

  isWeakSet: function(value) {
    return Object.prototype.toString.call(value) === "[object WeakSet]";
  },

  lt: function(value, other) {
    return value < other;
  },

  lte: function(value, other) {
    return value <= other;
  },

  toArray: function(value) {
    let result = [];
    for (key in value) {
      result.push(value[key]);
    }
    return result;
  },

  toFinite: function(value) {
    value = Number(value);
    if (value === Infinity) return Number.MAX_VALUE;
    if (value === -Infinity) return Number.MIN_VALUE;
    return value;
  },

  toInteger: function(value) {
    value = Number(value);
    if (this.isNaN(value) || value === 0) return 0;
    if (value === Infinity) return Number.MAX_VALUE;
    if (value === -Infinity) return -Number.MAX_VALUE;
    return Math.floor(Math.abs(value)) * (value > 0 ? 1 : -1);
  },

  toLength: function(value) {
    value = this.toInteger(value);
    if (value < 0) return 0;
    return value > 2 ** 32 - 1 ? 2 ** 32 - 1 : value;
  },

  toNumber: function(value) {
    return Number(value);
  },

  assign: function(object, ...args) {
    return Object.assign(object, ...args);
  },

  toSafeInteger: function(value) {
    value = Number(value);
    value = Math.min(Number.MAX_SAFE_INTEGER, value);
    value = Math.max(Number.MIN_SAFE_INTEGER, value);
    if (this.isNaN(value) || value === 0) return 0;
    return Math.floor(Math.abs(value)) * (value > 0 ? 1 : -1);
  },

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
    return array.length === 0 ? undefined : array.sort((a, b) => b - a)[0];
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

  subtract: function(minuend, subtrahead) {
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

  random: function() {},

  assignIn: function(object, ...sources) {
    sources.forEach(function(obj) {
      for (key in obj) {
        object[key] = obj[key];
      }
    });
    return object;
  },

  at: function(object, paths) {
    let pathArr = paths.map(it => this.toPath(it));
    let result = [];
    for (let i = 0; i < pathArr.length; i++) {
      result.push(pathArr[i].reduce((res, item) => res[item], object));
    }
    return result;
  },

  defaults: function(object, ...sources) {
    let res = {};
    for (let item of sources) {
      for (let it in item) {
        if (!Object.getOwnPropertyNames(object).includes(it)) {
          res[it] = item[it];
        }
      }
    }
    return Object.assign(object, res);
  },

  defaultsDeep: function(object, ...sources) {
    sources.forEach(srcObj => {
      for (let key in srcObj) {
        if (object[key] === undefined) object[key] = srcObj[key];
        else if (
          typeof object[key] === "object" &&
          typeof srcObj[key] === "object" &&
          typeof object[key] !== null &&
          typeof srcObj[key] !== null
        ) {
          this.defaultsDeep(object[key], srcObj[key]);
        }
      }
    });
    return object;
  },

  findKey: function(object, func = this.identity) {
    func = this.iteratee(func);
    for (let key in object) {
      if (func(object[key], key, object)) {
        return key;
      }
    }
    return undefined;
  },

  findLastKey: function(object, func = identity) {
    func = this.iteratee(func);
    let objArr = Object.fromEntries(Object.entries(object).reverse());
    for (let key in objArr) {
      if (func(objArr[key], key, objArr)) {
        return key;
      }
    }
    return undefined;
  },

  forIn: function(object, func = identity) {
    func = this.iteratee(func);
    for (let key in object) {
      if (func(object[key], key, object) === false) break;
    }
    return object;
  },

  forInRight: function(object, func = identity) {
    func = this.iteratee(func);
    let temp = [];
    for (let key in object) {
      temp.unshift(key);
    }
    for (let i = 0; i < temp.length; i++) {
      if (func(object[temp[i]], temp[i], object) === false) break;
    }
    return object;
  },

  forOwn: function(object, func = iteratee) {
    func = this.iteratee(func);
    let objArr = Object.keys(object);
    for (let i = 0; i < objArr.length; i++) {
      if (func(object[objArr[i]], objArr[i], object) === false) break;
    }
    return object;
  },

  forOwnRight: function(object, func = identity) {
    func = this.iteratee(func);
    let objArr = Object.keys(object).reverse();
    for (let i = 0; i < objArr.length; i++) {
      if (func(object[objArr[i]], objArr[i], object) === false) break;
    }
    return object;
  },

  functions: function(object) {
    return Object.keys(object).filter(key => typeof object[key] === "function");
  },

  functionsIn: function(object) {
    let temp = [];
    for (let key in object) {
      temp.push(key);
    }
    return temp.filter(key => typeof object[key] === "function");
  },

  get: function(object, path, defaultValue) {
    if (typeof path === "string") {
      path = this.toPath(path);
    }
    for (let i = 0; i < path.length; i++) {
      if (object[path[i]] === undefined) {
        return defaultValue;
      }
      object = object[path[i]];
    }
    return object === undefined ? defaultValue : object;
  },

  has: function(object, path) {
    if (typeof path === "string") {
      path = this.toPath(path);
    }
    for (let i = 0; i < path.length; i++) {
      if (Object.getOwnPropertyNames(object).includes(path[i])) return true;
    }
    return false;
  },

  create: function(prototype, properties) {
    return Object.create(prototype, properties);
  },

  hasIn: function(object, path) {
    if (typeof path === "string") {
      path = this.toPath(path);
    }
    for (let i = 0; i < path.length; i++) {
      if (!(path[i] in object)) {
        return false;
      }
      object = object[path[i]];
    }
    return true;
  },

  invert: function(object) {
    let res = {};
    for (let key in object) {
      res[object[key]] = key;
    }
    return res;
  },

  invertBy: function(object, func = this.identity) {
    const res = {};
    for (const key in object) {
      const funcKey = func(object[key]);
      if (funcKey in res) {
        res[funcKey].push(key);
      } else {
        res[funcKey] = [key];
      }
    }
    return res;
  },

  invoke: function(object, path, ...args) {
    let pathTrans = _.toPath(path),
      temp = pathTrans.slice(0, -1),
      func = pathTrans[pathTrans.length - 1];
    return temp.reduce((res, item) => res[item], object)[func](...args);
  },

  keys: function(object) {
    return Object.keys(object);
  },

  keysIn: function(object) {
    let res = [];
    for (let key in object) {
      res.push(key);
    }
    return res;
  },

  mapKeys: function(object, func = identity) {
    let res = {};
    for (let key in object) {
      funcKey = func(object[key], key, object);
      res[funcKey] = object[key];
    }
    return res;
  },

  mapValues: function(object, func = identity) {
    func = this.iteratee(func);
    let res = {};
    for (let key in object) {
      funcVal = func(object[key], key, object);
      res[key] = funcVal;
    }
    return res;
  },

  merge: function(object, ...sources) {
    sources.forEach(src => {
      for (let key in src) {
        if (!(key in object)) {
          object[key] = src[key];
        } else {
          if (
            typeof object[key] === "object" &&
            typeof src[key] === "object" &&
            object[key] !== null &&
            src[key] !== null
          ) {
            this.merge(object[key], src[key]);
          }
        }
      }
    });
    return object;
  },

  mergeWith: function(object, ...sources) {
    let customizer = sources.pop();
    sources.forEach(src => {
      for (let key in src) {
        if (!(key in object)) {
          object[key] = src[key];
        } else {
          if (
            key in object &&
            typeof object[key] === "object" &&
            typeof src[key] === "object" &&
            object[key] !== null &&
            src[key] !== null
          ) {
            let res = customizer(object[key], src[key], key, object, src);
            object[key] = res;
          }
        }
      }
    });
    return object;
  },

  omit: function(object, paths) {
    let res = {};
    resArr = Object.keys(object).filter(item => !paths.includes(item));
    for (let item of resArr) {
      res[item] = object[item];
    }
    return res;
  },

  omitBy: function(object, func = identity) {
    let res = {};
    for (let key in object) {
      if (!func(object[key], key)) res[key] = object[key];
    }
    return res;
  },

  pick: function(object, paths) {
    let res = {};
    resArr = Object.keys(object).filter(item => paths.includes(item));
    for (let item of resArr) {
      res[item] = object[item];
    }
    return res;
  },

  pickBy: function(object, func = identity) {
    let res = {};
    for (let key in object) {
      if (func(object[key], key)) res[key] = object[key];
    }
    return res;
  },

  result: function(object, path, defaultValue) {
    if (typeof path === "string") path = this.toPath(path);
    let pre = null,
      res = object;
    for (let item of path) {
      pre = res;
      res = res[item];
      if (res === undefined) {
        return typeof defaultValue === "function"
          ? defaultValue()
          : defaultValue;
      }
    }
    return typeof res === "function" ? res.call(pre) : res;
  },

  setWith: function(object, path, value, customizer) {
    if (!customizer) this.set(object, path, value);
    if (typeof path === "string") path = this.toPath(path);
    path.reduce((res, item, index) => {
      if (index === path.length - 1) {
        res[item] = value;
      } else if (customizer() !== undefined) {
        res[item] = customizer();
      } else if (!res[item] && typeof path[i + 1] === "number") {
        res[item] = [];
      } else if (!res[item] && typeof path[i + 1] === "string") {
        res[item] = {};
      }
      return res[item];
    }, object);
    return object;
  },

  toPairs: function(object) {
    return Object.entries(object);
  },

  toPairsIn: function(object) {
    let res = {};
    for (let key in object) {
      res[key] = object[key];
    }
    return Object.entries(res);
  },

  transform: function() {},

  unset: function(object, path) {
    return this.property(path)(object) ? true : false;
  },

  update: function(object, path, updater) {
    const val = updater(this.get(object, path));
    this.set(object, path, val);
    return object;
  },

  updateWith: function(object,path,updater,customizer) {
    const val = updater(this.get(object,path));
    this.setWith(object,path,val,customizer);
    return object;
  },

  values: function(object) {
    return Object.values(object);
  },

  valuesIn: function(object) {
    let res = [];
    for(let key in object){
      res.push(object[key])
    }
    return res;
  },

  camelCase: function(string='') {
    let strArr = string.match(/[a-zA-Z]+/g);
    return strArr.map((item,index) => (index ? item[0].toUpperCase() : item[0].toLowerCase()) + item.slice(1).toLowerCase()).join("");
  },


  capitalize: function(string='') {
    let strArr = string.match(/[a-zA-Z]+/g);
    return strArr.map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join('')
  },

  endsWith: function(string='',target,position=string.length) {
    return string.endsWith(target,position);
  },

  escape: function(string='') {
    const entities = [
      ["amp","&"],
      ["lt", "<"],
      ["gt",">"],
      ["quot",'"'],
      ["apos",'"'],
    ];
    return entities.reduce((res,[en,c]) => res.replace(c,`&${en};`),string);
  },

  escapeRegExp: function(string="") {
    const reg = /[\^\$\,\.\*\+\?\(\)\[\]\{\}\|]/g;
    return string.replace(reg,`\\$&`)
  },

  kebabCase: function(string='') {
    let regex = /[A-Za-z][a-z]+|[A-Z]+/g;
    let strArr = string.match(regex);
    return strArr.map(it => it.toLowerCase()).join('-');
  },

  lowerCase: function(string=''){
    let regex = /[A-Za-z][a-z]+|[A-Z]+/g;
    let strArr = string.match(regex);
    return strArr.map(it => it.toLowerCase()).join(' ');
  },

  lowerFirst: function(string=''){
    return string[0].toLowerCase()+string.slice(1);
  },

  pad: function(string="", length = 0, chars=" ") {
    let padLen = length - string.length;
    let charsStr = chars.repeat(Math.ceil(padLen / chars.length)).slice(0, padLen);
    let left = charsStr.slice(0, Math.floor(padLen / 2));
    let right = charsStr.slice(Math.floor(padLen / 2));
    return `${left}${string}${right}`;
  },

  padEnd: function(string='',length=0,chars=' ') {
    let padLen = length - string.length;
    let charsStr = chars.repeat(Math.ceil(padLen / chars.length)).slice(0,padLen);
    return `${string}${charsStr}`;
  },

  padStart: function(string='',length=0,chars=' ') {
    let padLen = length - string.length;
    let charsStr = chars.repeat(Math.ceil(padLen / chars.length)).slice(0,padLen);
    return `${charsStr}${string}`;
  },

  parseInt: function(string,radix) {
    if(radix === undefined || radix === 0 || arguments.length > 2) radix = 10;
    if(string.slice(0,2) === "0x") radix = 16;
    return parseInt(string,radix);
  },

  repeat: function(string='',n=1) {
    return string.repeat(n);
  },

  replace: function(string='',pattern,replacement) {
    return string.replace(pattern,replacement)
  },

  snakeCase: function(string='') {
    let regex = /[A-Za-z][a-z]+|[A-Z]+/g;
    let strArr = string.match(regex);
    return strArr.map(it => it[0].toLowerCase()+it.slice(1).toLowerCase()).join('_');
  },

  split: function(string='',separator,limit) {
    return string.split(separator,limit)
  },

  startCase: function(string='') {
    let regex = /[a-zA-Z][a-z]+|[A-Z]+/g;
    let strArr = string.match(regex);
    return strArr.map(it => it[0].toUpperCase()+it.slice(1)).join(' ');
  },

  startsWith: function(string='',target,position=0) {
    return string.startsWith(target,position)
  },

  toLower: function(string='') {
    return string.toLowerCase();
  },

  toUpper: function(string='') {
    return string.toUpperCase();
  },


  trim: function(string="",chars='  ') {
    return  this.trimEnd(this.trimStart(string,chars),chars);
  },

  trimEnd: function(string="",chars='  ') {
    for(let i = string.length - 1; i >= 0 ;i--){
      if(!chars.includes(string[i])) return string.slice(0,i+1);
    }
    return '';
  },

  trimStart: function(string='',chars='  ') {
    for(let i = 0; i < string.length;i++){
      if(!chars.includes(string[i])) return string.slice(i);
    }
    return '';
  },

  truncate: function(string='',opt={}) {
    if(!opt.length) opt.length=30;
    if(!opt.omission) opt.omission='...';
    let resLen = opt.length - opt.omission.length, sep = opt.separator;
    string = string.slice(0,resLen);
    if(!sep) return string + opt.omission;
    if(this.isRegExp(sep) && !sep.global) sep = new RegExp(sep , sep.flags+'g');
    let idx = Array.from(string.matchAll(sep)).pop()["index"];
    return string.slice(0,idx) + opt.omission;
  },

  unescape: function(string='') {
    const entities = [
      ["&amp;","&"],
      ["&lt;","<"],
      ["&gt;",">"],
      ["&quot;",'"'],
      ["&apos;",'"'],
    ];
    return entities.reduce((res,[en,c]) => res.replace(`${en}`,c),string )
  }, 

  upperCase(string='') {
    let regex = /[a-zA-Z][a-z]+|[a-z]+/g;
    return string.match(regex).map(it => it.toUpperCase()).join(' ');
  },
       
  upperFirst: function(string='') {
    return string[0].toUpperCase()+string.slice(1,string.length+1)
  },


  words: function(string='',pattern=/[A-Za-z][a-z]+|[A-Z]+/g) {
   return string.match(pattern);
  },

  bindAll: function(value,defaultValue) {
    
    
  },

  defaultTo: function(value,defaultValue) {
    return value === undefined ? defaultValue : value;
  },

  range: function(start=0,end,step) {
    if(end === undefined){
      end = start,start = 0;
    }
    if(step === undefined) step=start > end ? -1 : 1;
    if(step === 0) return Array(Math.ceil(end - start)).fill(start);
    let res = [];
    for(let i = start;end < start ? i > end : i < end; i += step){
        res.push(i);
    }
    return res;
  },

  rangeRight: function(start=0,end,step) {
    return this.range(start,end,step).reverse();
  },

  mixin: function(object,source) {
     if(!source){
       source = object;
       object = _;
     }
     for(let key in source){
       if(typeof source[key] === "function"){
        object[key] = source[key];
        if(typeof object ===  "function"){
          object.prototype[key] = source[key];
        }
       }
     }
    return object;
  },


  times: function(n, func = identity) {
    let res = [];
    for(let i = 0 ; i < n;i++){
      res.push(func(i))
    }
    return res;
  },

  uniqueId: function() {

  },
  cloneDeep: function() {},

  pullAt: function(array,index) {
    let res = [];
     for(let i = array.length-1; i >= 0 ;i--){
        if(index.includes(i)){
          res.push(...array.splice(i,1))
        }
     }
     return res.reverse();
  },

  ary: function(func,n=func.length) {
     return (...args) => func(...args.slice(0,n)); 
  },

  unary: function(func) {
    return (...args) => func(args[0])
  },

  negate: function(func) {
    return (...args) =>  !func(...args);
  },

  once: function(func) {
     
  },

  spread: function(func) {
    return args => func(...args);
  },

  curry: function(func,) {

  },

  memoize: function() {

  },

  flip: function(func) {
    return (...args) => func(...args.reverse());
  },

  conforms: function(source) {
   return object => {
     for(let key in source){
        if(!source[key](object[key])) return false
     }
     return true;
   }
  },

  constant: function(value) {
    return () => value;
  },

  flow: function(funcs) {
    return (...args) => {
      let res = funcs[0](...args);
      for(let i = 1; i < funcs.length;i++){
        res = funcs[i](res);
      }
      return res;
    }
  },

  method: function(path,...args) {
    if(typeof path === "string") path= this.toPath(path);
    return (object) =>  path.reduce((res,it) => res[it] ,object)(...args);
  },

  methodOf: function(object,...args) {
    return (path) =>  {
      if(typeof path === "string") path= this.toPath(path);
      return path.reduce((res,it) => res[it] ,object)(...args);
    }  
  },  

  nthArg: function(n) {
    return (...args) => {
      n = n>0 ? n : args.length+n
      return args[n];
    } 
  },

  propertyOf: function(object) {
    return path => {
      path =  typeof path === "string" || typeof path === "number" ? this.toPath : path;
      return path.reduce((res,item) => res[item], object);
    }
  },

  parseJson: function(value) {
    return JSON.parse(value);
  },

  stringifyJson: function(value) {
    return JSON.stringify(value);
  }
};
