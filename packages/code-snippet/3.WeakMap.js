// 其键必须是对象，而值可以是任意的，键为弱引用(当其键所指对象没有其他地方引用的时候，它会被 GC 回收掉)
// 浏览器console / debugger 看不出具体效果，使用node可看出明确效果
// let obj = { name: "qm" };
// let map = new Map();
// map.set(obj, 1);
// obj = null;
// console.log(map); // map中还存在 obj 的key

// let obj2 = { name: "qm" };
// let weakMap2 = new WeakMap();
// weakMap2.set(obj2, 1);
// debugger;
// obj2 = null;
// console.log(weakMap2); // weakMap不存在 obj2 的key
// debugger;

// 允许手动执行垃圾回收机制
node --expose-gc
// ---- Map -----
global.gc();
let p0 = process.memoryUsage();
p0.heapUsed / 1024 / 1024

let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
global.gc();
let p1 = process.memoryUsage(); 
p1.heapUsed / 1024 / 1024

// key重置为null不会被清除回收
key = null;
global.gc();
p1 = process.memoryUsage();
p1.heapUsed / 1024 / 1024

// delete手动清除回收
// map.delete(key);
// global.gc();
// p1 = process.memoryUsage(); 
// p1.heapUsed / 1024 / 1024



// ---- WeakMap -----
global.gc();
let p2 = process.memoryUsage(); // heapUsed: 4529992 ≈ 4.4M
p2.heapUsed / 1024 / 1024

let weakMap = new weakMap();
let weakKey = new Array(5 * 1024 * 1024);
weakMap.set(weakKey, 1);
global.gc();
p2 = process.memoryUsage(); 
p2.heapUsed / 1024 / 1024

// 设置为 null 会被清除回收
weakKey = null;
global.gc();
p2 = process.memoryUsage();
p2.heapUsed / 1024 / 1024


