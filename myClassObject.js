const _class = {
  _constructor: function (a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  },

  method1: function () {
    return this.a + this.b + this.c;
  },

  method2: function () {
    return this.b + this.c;
  },

  addAll: function (number) {
    return this.a + this.b + this.c + number;
  }
};

const myNew = (myClass, ...properties) => {
  const instanceOfMyClass = {};

  const {_constructor, ...methods } = myClass;

  Object.entries(methods).forEach(([key, value]) => {
    let val = value;
    if (typeof value === 'function') {
      val = value.bind(instanceOfMyClass);
    }
    instanceOfMyClass[key] = val;
  });

  const boundConstructor = _constructor.bind(instanceOfMyClass);
  boundConstructor(...properties);
  return instanceOfMyClass;
};

const instance = myNew(_class, 10, 20, 30);
console.log(instance.method1());
console.log(instance.method2());
console.log(instance.addAll(100));
