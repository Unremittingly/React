/*
 * Author: bjiang
 * Create Time: 2019-09-20 17:50
 */

// eslint-disable-next-line node/no-deprecated-api


const OPEN_MOUSE = "open-mouse";
const DOMAIN = Symbol("domain");
const INIT = Symbol("INIT");

class CrossServer {
  constructor (domain) {
    this[DOMAIN] = domain;
    this.fns = {};
    this[INIT]();
  }

  [INIT] () {
    window.addEventListener("message", ({ data: { request, fn, args, transection }, origin, source }) => {
      
      console.log('origin',origin);
      const { hostname } = parse(origin);
      const domain = this[DOMAIN];
      // 输入域不在受限范围内，拒绝响应。
      if (hostname.indexOf(domain) !== hostname.length - domain.length) return;
      // 不是合法的API请求，拒绝响应
      if (request !== OPEN_MOUSE) return;
      // 方法不存在，拒绝响应。
      if (typeof fn !== "string") return;
      if (!this.fns[fn]) return;

      this.fns[fn].apply(null, [].concat(args)).then((result) => {
        source.postMessage({
          request: OPEN_MOUSE,
          result,
          transection
        }, origin);
      });
    }, false);
  }

  use (apiName, handle) {
    if (this.fns[apiName]) throw new Error(`无法注册【${apiName}】方法！`);
    this.fns[apiName] = (...args) => Promise.resolve(handle(...args));
  }
}

export default CrossServer;
