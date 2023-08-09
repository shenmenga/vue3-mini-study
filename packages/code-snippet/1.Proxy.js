// proxy 只能拦截当前层级的
// reactive 递归处理嵌套obj
let person = {
  age: 0,
  type: {
    a: 3,
  },
};
let hander = {
  get(obj, key) {
    console.log("触发了get:", key);
    return key in obj ? obj[key] : 66;
  },
  set(obj, key, val) {
    console.log("触发了set:");
    obj[key] = val;
    return true;
  },
};
let proxyObj = new Proxy(person, hander);
proxyObj.type.a = 33; // 触发了get: type
