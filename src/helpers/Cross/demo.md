# 跨域解决方案
该模块目的是解决在不同域下的数据传输问题。使用了postMessage技术。


# Server
## api
  - `constructor`
    - `domain`(**string**): 允许范围
  - `use`: 注册服务API
    - `apiName`(**string**): 接口名称
    - `handle`(**function**|**async function**): 处理函数，支持Promise

## example
```js
import { Server } from "./Cross";

const server = new Server(".demo.com");

server.use("functionName", () => {
  return Math.random();
});
```

# Client
## api
 - `constructor`
  - `server`(**string**): 服务地址
  - `options`(**object**): 附加配置
    - `timeout`(**number**): 超时时间，默认5秒
 - `send`
  - `apiName`(**string**): 接口名称
  - ...args: 其他参数

## example
```
import { Client } from "src/helpers/Cross";

const client = new Client("http://localhost.demo.com:3001/cross-server.html");

client.send("functionName").then(result => {
  debug.info(result);
}).catch(error => {
  debug.info(error.message);
});
```


# 其他注意事项
1. 无法传递function,所以不支持callback的形式的参数。
