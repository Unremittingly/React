/*
 * Author: bjiang
 * Create Time: 2019-09-20 17:50
 */
const OPEN_MOUSE = "open-mouse";
const APPEND_SERVER = Symbol("APPEND_SERVER");
const INIT = Symbol("INIT");
const ID = 'crossServer';

class CrossClient {
  constructor (server, { timeout = 5000 } = {}) {
    this.server = server;
    this.transection = {};
    this.target = this[APPEND_SERVER]();
    this.timeout = timeout;
    this[INIT]();
  }

  async [APPEND_SERVER] () {
    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.src = this.server;
      // iframe.id = ID
      iframe.style.display = "none";
      iframe.addEventListener("load", () => {
        // resolve(iframe.contentWindow);
        resolve(iframe)
      }, false);
      document.body.appendChild(iframe);
    });
  }

  [INIT] () {
    window.addEventListener("message", ({ data: { request, result, transection }, origin }) => {
      // 确定是由server响应的结果
      if (this.server.indexOf(origin) !== 0) return;
      // 不是合法的API请求，拒绝响应
      if (request !== OPEN_MOUSE) return;
      // 确定transection是否已过期
      if (!this.transection[transection]) return;
      // 响应请求
      const { resolve, timeout } = this.transection[transection];
      delete this.transection[transection];
      clearTimeout(timeout);
      resolve(result);
    }, false);
  }

  send (apiName, ...args) {
    const transection = (new Date().valueOf() % 864e5 + Math.random()).toString(16);
    return new Promise((resolve, reject) => {
      this.transection[transection] = {
        resolve,
        timeout: setTimeout(() => {
          delete this.transection[transection];
          reject(new Error(`THE ${apiName} TIMEOUT`));
        }, this.timeout)
      };
      this.target.then((target) => {
        // target.postMessage(
        // console.log(target.id)
        // console.log('send',args)
        target.contentWindow.postMessage(
          { request: OPEN_MOUSE, transection, fn: apiName, args },
          this.server
        );
      });
    });
  }
}

export default CrossClient;
