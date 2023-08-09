// Reflect 是内置的对象，它提供拦截 JavaScript 操作的方法，并非构造函数，方法和属性都是静态的
// Reflect.get(target, propertyKey[, receiver])
// 如果target中指定了getter，receiver 则为getter调用时的this值

let data = {
  name:'qm',
  age: 7,
  get userinfo(){
    console.log('get -',this); // dataProxy: Object   dataProxy2: Proxy(Object)
    return this.name + this.age
  }
}

let dataProxy = new Proxy(data,{
  get(target,key,receiver){
    console.log('属性被读取');
    return target[key]
  }
})
console.log(dataProxy.userinfo); // 属性被读取 qm7

// dataProxy.userinfo的get输出的值是正确的，但是get只被触发了一次，这是不正常的
// userinfo里还读取了data的name和age，应当触发3次
// 调用userinfo的时候，实际执行的是data.userinfo，this指向了data，而不是 dataProxy

let dataProxy2 = new Proxy(data,{
  get(target,key,receiver){
    console.log('属性被读取');
    return Reflect.get(target,key,receiver)
  }
})

console.log(dataProxy2.userinfo); // 属性被读取 属性被读取 属性被读取 qm7