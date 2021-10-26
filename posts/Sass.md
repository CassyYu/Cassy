---
title: 'Sass'
date: '2021-10-19'
tags: ['Sass']
---

## Sass 学习笔记

浏览器并不支持 Sass 代码。因此，你需要使用一个 Sass 预处理器将 Sass 代码转换为 CSS 代码。

Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承、内置函数等等特性。

### Sass 变量

Sass 变量可以存储：字符串、数字、颜色值、布尔值、列表、null 值

Sass 变量使用 `$` 符号：

```css
$variablename: value;
```

Sass 变量的作用域只能在当前的层级上有效果，可以使用 `!global` 关键词来设置变量是全局：

```css
h1 {
	$myColor: green !global;  // 全局作用域
}
```

**注意：**所有的全局变量我们一般定义在同一个文件，如：_globals.scss，然后使用 `@include` 来包含该文件。

### Sass @import

CSS @import 指令在每次调用时，都会创建一个额外的 HTTP 请求。但 Sass @import 指令将文件包含在 CSS 中，不需要额外的 HTTP 请求。

语法如下：

```
@import filename;
```

**注意：**包含文件时不需要指定文件后缀，Sass 会自动添加后缀 .scss。也可以导入 CSS 文件

### Sass Partials

如果你不希望将一个 Sass 的代码文件编译到一个 CSS 文件，你可以在文件名的开头添加一个下划线。这将告诉 Sass 不要将其编译到 CSS 文件。但是，在导入语句中我们不需要添加下划线。

Sass Partials 语法格式：

```css
_filename;
```

以下实例创建一个 _colors.scss 的文件，但是不会编译成 _colors.css 文件：

```css
myPink: #EE82EE;
myBlue: #4169E1;
myGreen: #8FBC8F;
```

如果要导入该文件，则不需要使用下划线：

```css
@import "colors";

body {
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  color: $myBlue;
}
```

**注意：**请不要将带下划线与不带下划线的同名文件放置在同一个目录下，比如，_colors.scss 和 colors.scss 不能同时存在于同一个目录下，否则带下划线的文件将会被忽略。

### Sass @mixin 与 @include

@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。

@include 指令可以将 mixin 引入到文档中。

使用：

```css
@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}
```

```css
selector {
  @include mixin-name;
}
```

可接收参数：

```css
/* mixin 接收两个参数 */
@mixin bordered($color, $width) {
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);  // 调用 mixin ，并传递两个参数
}

.myNotes {
  @include bordered(red, 2px); // 调用 mixin ，并传递两个参数
}
```

可以使用 `...` 来设置可变参数：

```css
@mixin box-shadow($shadows...) {
    -moz-box-shadow: $shadows;
    -webkit-box-shadow: $shadows;
    box-shadow: $shadows;
}
```

### Sass @extend

@extend 指令告诉 Sass 一个选择器的样式从另一选择器继承

### Sass 函数

| 序号 | 函数类别                                                     |
| ---- | :----------------------------------------------------------- |
| 1    | [Sass 字符串相关函数](https://www.runoob.com/sass/sass-string-func.html) |
| 2    | [Sass 数字相关函数](https://www.runoob.com/sass/sass-numeric-func.html) |
| 3    | [Sass 列表(List)相关函数](https://www.runoob.com/sass/sass-list-func.html) |
| 4    | [Sass 映射(Map)相关函数](https://www.runoob.com/sass/sass-map-func.html) |
| 5    | [Sass 选择器相关函数](https://www.runoob.com/sass/sass-selector-func.html) |
| 6    | [Sass Introspection 相关函数](https://www.runoob.com/sass/sass-introspection-func.html) |
| 7    | [Sass 颜色相关函数](https://www.runoob.com/sass/sass-color-func.html) |

