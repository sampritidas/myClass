const _class = function () {
  const _constructor = function (a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  };

  const method1 = function () {
    return this.a + this.b + this.c;
  };

  const method2 = function () {
    return this.b + this.c;
  };

  const addAll = function (number) {
    return this.a + this.b + this.c + number;
  };

  return { _constructor, method1, method2, addAll };
};

const myNew = (myClass, ...properties) => {
  const holder = {};

  const {_constructor, ...methods } = myClass();

  Object.entries(methods).forEach(([fnName, fnRef]) => {
    holder[fnName] = fnRef.bind(holder);
  });

  const boundConstructor = _constructor.bind(holder);
  boundConstructor(...properties);
  return holder;
};

const instance = myNew(_class, 10, 20, 30);
console.log(instance.method1());
console.log(instance.method2());
console.log(instance.addAll(100));
