### 1.REST

> 万维网软件架构风格

- Representational State Transfer
  - Representational：数据表现形式（XML，JSON）
  - State：当前状态或数据
  - Transfer：数据传输

> REST 六大限制

- 1、客户-服务器（C/S 架构）
  - 关注点分离
  - 服务端专注数据存储，提升了简单性
  - 前端专注用户页面。提升了可移植性
- 2、无状态（Stateless）
  - 所有用户会话信息都保存在客户端
  - 客户端每次请求都必须包括所有信息，不能依赖上下文信息
  - 服务端不用保存会话信息，提升了简单性、可靠性、可见性
- 3、缓存（Cache）
  - 所有服务端响应都要被标识为可缓存或者不可缓存
  - 减少前后端交互，提升了性能
- 4、统一接口（Uniform Interface）
  - 接口设计尽可能统一通用，提升了简单性、可见性
  - 接口与实现解耦，使前后端可以独立开发迭代
- 5、分层系统（Layered System）
  - 每层只知道相邻的一层，后面隐藏的就不知道了
  - 客户端不知道是和代理还是真实服务器通信
  - 其他层：安全层、负载均衡、缓存层
- 6、按需代码（Code-On-Demand 可选）
  - 客户端可以下载运行服务端传来的代码
  - 通过减少一些功能，简化了客户端

> 统一接口限制

- 1、资源的标识
  - 资源可以是任何可以命名的事物
  - 每个资源可以通过 URI 被唯一标识
- 2、通过表述来操作资源
  - 表述就是 Representation,比如 JSON、XML
- 3、自描述信息
  - 每个消息（请求或响应）必须提供足够的信息让接收者理解
  - 媒体类型（application/json，application/xml）
  - HTTP 方法：GET、POST、PATCH、DELETE
  - 是否缓存：Cache-Control
- 4、超媒体作为应用状态引擎
  - 超媒体：带文字的链接
  - 应用状态：一个网页
  - 引擎：驱动、跳转
  - 合起来：点击链接跳转网页

### 2、RESTful API

> 基本的 URI
> 标准的 HTTP 方法
> 传输的数据媒体类型

### 3、请求设计规范

> URI 使用名词，尽量使用复数，如 /users
> URI 使用嵌套表示关联关系
> 使用正确的 HTTP 方法
> 不符合 CRUD 的情况：POST/action/子资源

### 4、响应设计规范

> 查询
> 分页
> 字段过滤
> 状态码
> 错误处理

### 5、安全

> HTTPS
> 鉴权
> 限流

### 什么是控制器

> 拿到路由分配的任务，并执行
> 获取 HTTP 请求参数

- Query String（查询字符串）,如?q=keywords
- Router Params（路由参数），如/users/:id
- Body,如{name:'李雷'}
- Header,如 Accept、Cookie

> 发送 HTTP 响应

- 发送 Status，如 200/400 等
- 发送 Body，如{name: '李雷'}
- 发送 Header

> 可以执行业务逻辑
