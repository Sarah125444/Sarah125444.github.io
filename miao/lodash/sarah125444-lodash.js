/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 17:10:40
 * @LastEditTime: 2019-08-13 19:51:22
 * @LastEditors: Please set LastEditors
 */
//Lodash是一套工具库，内部封装了诸多对字符串，数组，对象等常见数据类型的处理函数，
//其中部分是目前ECMAScript尚未制订的规范，但同时被业界所认可的辅助函数。
// 模块组成：
// Array适合于数组类型，比如填充数据，查找元素，数组分片等工作
// Collocation适用于数组和对象类型，部分适用于字符串，比如分组，查找，过滤等操作
// Function 适用于函数类型，比如节流，延迟，缓存，设置钩子等操作
// Lang普遍适用于各种类型，常用于执行类型判断和类型转换
// Math 使用于数值类型，常用于执行数学运算
// Number 适用于生成随机数，比较数值与数值区间的关系
// Object 适用于对象类型，常用于对象的创建，扩展，类型转换，检索，集合等操作
// Seq 常用于创建链式调用，提高执行性能
// String 适用于字符串类型




var sarah125444 = function (){
  //chunk 按照给定个数来拆分数组 将数组array拆分为多个size长度的区块，并将这些区块组成一个新数组，如果array无法被分割成等长的区块，那么最后剩余的元素将组成一个区块
  //语法：_.chunk(array,[size = 1]) 第一个参数为数组，第二个参数为需要分割的长度
  //参数：array(Array):需要处理的数组    [size = 1] (number):每个数组区块的长度
  //返回：（Array):返回一个包含拆分区块的新数组（相当于一个二维数组）
  //例子：_.chunk(['a','b','c','d'],2);     返回值：[['a','b'],['c','d']]
  function chunk(arr,n){ //传入需要被分割的数组和需要被分割的个数
    var ans = []; //新建一个数组
    var num = Math.ceil(arr.length / n);  //向上取整数组的长度
    for(let i = 0; i < num; i++){ //开始一个for循环 取出每个数组遍历后的长度
      if (i == num - 1){ 
        ans[i] = arr.slice((num - 1) * n);
      } else {
        ans[i] = arr.slice(i * n , (i + 1) * n ); //把数据传入相应的位置
      }
    }
    return ans;
  }


//_.compact(array) 创建一个新数组，包含原数组中所有的非假值元素。 false,null,0,"",undefined和NaN都是被认为是“假值”
//例子：_.compact([0,1,false,2,'',3]); 输出：[1,2,3]
  function compact( ary) {
    return ary.filter(it => it) //返回过滤掉假值的新数组
  }

  //_.concat(array, [values]) 创建一个新数组，将array与任何数组或值连接在一起
  //例子： var array = [1];
  //      var  other = _.concat(array,2,[3],[[4]]);
  //      console.log(other); //[1,2,3,[4]]
 function concat(array , ...values){
  var arr = array.slice();
  for(let val of values){ //把另外一个数组里面的数都push到另外一个数组
    if(Array.isArray(val)){
      val.map(x => arr.push(x))
    } else {
      arr.push(val)
    }
  }
  return arr;
 }

  //_.difference(array, [values]); 创建一个具有唯一array的值的数组，每个值不包含在其他给定的数组中。
  //意思是创建一个新数组，这个数组中的值，为第一个数字（array参数）排除了给给定数组中的值。结果值的顺序是由第一个数组中的顺序确定的
  //参数：array(array):要检查的数组  [array]：排除的值
  //例子：_.difference([3,2,1] ,[4,2]);  返回值：[3,1]
  function difference(array, ...values){  //传入的是两个数组
    var arr = values.reduce((res, cur) => {
      return res.concat(cur)
    })
    var result = array.filter(item => !arr.includes(item));
    return result;
  }


  //_.differenceBy(array, [values] , [iterates = _.identity]) 这个方法类似._difference，除了它接受一个iterate（迭代器），调用arrray和values中的每一个元素以产生比较的标准。结果值是从第一数组中选择。iteratee会调用一个参数。
  //首先使用迭代器分别迭代array和values中的每个元素，返回的值作为比较值
  //_.differenceBy([{'x' : 2} , {'x' : 1}] , [{'x' : 1}],'x');  返回值[{'x' : 2}]
  
 function differenceBy(array , ...values){
   if(Array.isArray(values[values.length - 1]) == true){ 
    return difference(array, ...values);
   }
   var val = values.reduce((res , cur) => {
    return res.concat(cur)
   })
   
   var iteratee = val.pop();
   let func = 0;
   if(typeof iteratee == 'string'){
    func = obj => obj[iteratee]
   }
   if(typeof iteratee == 'function'){
    func = obj => iteratee(obj)
   }
   val = val.map(func)
   return array.filter(item => !val.includes(func(item)))

  }


  //—.differenceWith(array , [values] ,[comparator])
  //这个方法类似_.difference,除了它接受一个comparator,它调用的比较array,values中的元素。


  









}