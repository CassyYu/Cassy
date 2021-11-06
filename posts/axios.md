---
title: 'axios'
date: '2021-10-22'
tags: ['axios']
---

###### Table of Content

### 安装

```shell
yarn add axios
```

### 简介

Axios 是一个基于 *[promise](https://javascript.info/promise-basics)* 网络请求库，作用于[`node.js`](https://nodejs.org/) 和浏览器中。 它是 *[isomorphic](https://www.lullabot.com/articles/what-is-an-isomorphic-application)* 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

### 使用

配合 mockjs 使用

```js
Mock.mock('/api/news', 'get', {
	status: 200,
	meg: '获取数据成功',
	user_name: '@cword',
})
axios.get('/api/news').then(res => {
	console.log(res.data)
})

// 控制台输出：{status: 200, meg: '获取数据成功', user_name: '题'}
```

