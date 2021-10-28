---
title: 'Safari浏览器下的ol缩进问题'
date: '2021-10-26'
tags: ['开发']
---

# Safari浏览器下ol的缩进问题

注意到在 Safari 浏览器中，ol 会溢出，使用 margin 控制边距时会遮挡掉序号的一部分，使用 padding 控制边距时则会出现以下现象：

<img src="/Users/cassy/Library/Application Support/typora-user-images/image-20211026161541961.png" alt="image-20211026161541961" style="zoom:30%;" />

解决方法：

在 css 中更改 ol 的样式：`margin-left: 35px;`（默认为30px）。

不是强迫症的话，这样其实就能很好地解决这个问题了。但是在谷歌浏览器上，序号就会多缩进一些，而不是和边缘对齐了。于是可以使用 js 判断浏览器类型，然后根据类型渲染不同的样式，即可完美解决。