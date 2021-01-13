const ALLOW_LIST = ['console'];

export default class Module {
  exports = {}
  wrapper = [
    'return (function (exports, module) { ',
    '\n});'
  ];

  wrap(script) {
    return `${this.wrapper[0]} ${script} ${this.wrapper[1]}`;
  };

  runInContext(code) {
    code = `with (sandbox) { ${code}  }`;
    const fn = new Function('sandbox', code);
    return (sandbox) => {
      const proxy = new Proxy(sandbox, {
        has(target, key) {
          if (!ALLOW_LIST.includes(key)) {
            return true;
          }
        },
        get(target, key, receiver) {
          if (key === Symbol.unscopables) {
            return undefined;
          }
          Reflect.get(target, key, receiver);
        }
      });
      return fn(proxy);
    }
  }

  compile(content) {
    const wrapper = this.wrap(content);
    const compiledWrapper = this.runInContext(wrapper)({});
    compiledWrapper.call(this.exports, this.exports, this);
  }
}
