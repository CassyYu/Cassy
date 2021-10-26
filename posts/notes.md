---
title: '2021年10月18日学习笔记'
date: '2021-10-18'
tags: ['学习笔记']
---

## 2021年10月18日

### mac 命令行如何配置 code 快捷键

  1. Command + Shift + P 打开 Command Palette（也可在左下角设置中打开）
  2. 输入并选择 Shell Command: Install 'code' Command in PATH 即可
       这样就能很方便地在命令行使用 'code .' 打开文件夹了
### Mock.js

资料：https://github.com/nuysoft/Mock/wiki ；http://mockjs.com/examples.html

#### 作用

生成随机数据，拦截 Ajax 请求

#### 安装

使用 npm

```shell
npm install mockjs
```

或者使用 yarn

```shell
yarn add mockjs
```

#### 使用

```js
var Mock = require('mockjs')
```

或者

```js
import Mock from 'mockjs'
```



#### 语法规则

##### 数据模板定义

`name|rule: value` 

String

`'name|min-max': string` 生成 [min, max] 个 string
`'name|count': string` 生成 count 个 string

```js
'name|min-max': string
'name|count': string
```

Number（number用来确定类型）

`'name|+1': number` 属性值自动加 1
`'name|min-max': number` 生成 [min,max] 的随机数
`'name|min-max.dmin-dmax': number` 生成整数范围为 [min,max] 小数位数为 [dmin,dmax] 的随机小数

```js
'name|+1': number
'name|min-max': number
'name|min-max.dmin-dmax': number
```

Boolean

```js
'name|1': boolean
'name|min-max': boolean
```

Object

```js
'name|count': object
'name|min-max': object
```

Array

```js
'name|1': array
'name|+1': array
'name|min-max': array
'name|count': array
```

Function

```js
'name': function
```

RegExp

```js
'name': regexp
```

Path

```js
Absolute Path
Relative Path
```

### 在 react 中引入渲染 markdown文件

**安装依赖**

```shell
yarn add react-markdown

yarn add raw-loader
```

**配置**

在 `next.config.js` 中写入

```js
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: 'raw-loader'
    })
    return config
  },
}
```

**使用**

```js
import ReactMarkdown from 'react-markdown';

export default function TargetFile() {
    return (
        <ReactMarkdown children={markdown} />
    );
}
```

### Sass

资料：https://www.sass.hk/docs/

#### mac下安装

mac 自带 ruby（可用 `ruby -v` 查看版本），因此直接安装即可（防止没有写入权限加上 `sudo` )

```shell
sudo gem install sass
```

#### 使用

**安装依赖**

```shell
yarn add sass
```

1. 嵌套规则

   将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器

   ```scss
   #main p {
     color: #00ff00;
     width: 97%;
   
     .redbox {
       background-color: #ff0000;
       color: #000000;
     }
   }
   ```

2. 父选择器 `&`
3. 属性嵌套

### 可选链 `?.`

```tsx
const a = undefined
const val = a.b;
console.log(val); // 报错：Cannot read property 'b' of undefined
```

```tsx
const a = undefined
const val = a?.b;
console.log(val); // 输出：undefined
```

有时用 `&&` 代替 `?.` 

```javascript
if (a && a.b) { } 

if (a?.b) { }
/**
* if (a?.b) { } 编译后的ES5代码
* 
* if (
*  a === null || a === void 0 
*  ? void 0 : a.b) {
* }
*/
```

`?.` 与 `&&` 运算符行为略有不同，`&&` 专门用于检测 `falsy` 值，比如空字符串、0、NaN、null 和 false 等。而 `?.` 只会验证对象是否为 `null` 或 `undefined`，对于 0 或空字符串来说，并不会出现 “短路”。

### 遇到的问题

#### 使用 Next.js 跑 `yarn dev` 命令之后报错：

```shell
ChunkLoadError: Loading chunk node_modules_next_dist_client_dev_noop_js failed.
(error:http://localhost:3000/_next/static/chunks/fallback/node_modules_next_dist_client_dev_noop_js.js)
```

**解决方法：**

1. 删除 `.next` 文件夹

2. `yarn dev` 重新启动项目

3. 强制刷新浏览器并删除缓存

#### 使用命令行安装 sass 报错

```shell
ERROR:  SSL verification error at depth 0: self signed certificate (18)
ERROR:  Certificate /C=CN/ST=Fujian/L=Fuzhou/O=Ruijie/OU=SEC/CN=ruijie/emailAddress=ruijie.com.cn is not trusted
Error fetching https://gems.ruby-china.com:
	SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (self signed certificate) (https://gems.ruby-china.com/specs.4.8.gz)
```

**解决方法**：

1. 检查网络

2. 切换访问环境至镜像

   查询当前访问环境：

   ```shell
   gem sources -l
   ```

   显示结果：

   ```shel
   *** CURRENT SOURCES ***
   https://rubygems.org/
   ```

   替换RubyGems镜像：

   ```shel
   gem sources --remove https://rubygems.org/
   gem sources -a https://gems.ruby-china.com
   gem sources -l
   ```

   显示结果：

   ```shell
   *** CURRENT SOURCES ***
   https://gems.ruby-china.com
   ```


## 2021年10月19日

### 个人网站的开发规划

支持网页端和移动端

- 主页：个人博客
  - 按照标签分类等（Hux Blog）
  - Markdown 在线编辑器（Typora）

- 游戏板块
  - 贪吃蛇

- 组件库板块
  - 留言板

- 效率工具板块
  - 日程规划（Goodnotes 可导出 pdf A4）
  - 个人笔记（Notion）

### CSS 实现毛玻璃效果

资料：https://www.jianshu.com/p/8a3b828dbbfb ；https://www.php.cn/css-tutorial-480529.html
