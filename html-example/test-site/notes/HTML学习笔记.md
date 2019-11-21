# 基础知识

## 元素
### 块级元素和内联元素
> HTML中存在很多元素，每个元素也可以拥有自己的属性，比如`<p class="editor-note"> hello world</p>`

- 块级元素以块的形式出现，内容出现在新行
  - `<p>`: 段落

- 内联元素通常出现在块级元素并环绕文档内容的一小部分
  - `<i>`: 被用来传达传统上用斜体表达的意义：外国文字、分类名称、技术术语，一种思想……
  - `<b>`: 被用来传达传统上用粗体表达的意义：关键字，产品名称，引导句……
  - `<u>`: 被用来传达传统上用下划线表达的意义：专有名词，拼写错误……(通常用于超链接)

### 空元素

不是所有元素都拥有开始标签，内容和结束标记. 一些元素只有一个标签，通常用来在此元素所在位置插入/嵌入一些东西，比如`<img>`


## 高级文本排版方式
- 描述列表
  - `<dl><dt><dd></dd></dt></dl>`: 标记一组项目和相关描述

- 引用
  - 块引用： `<blockquote cite="用URL执向引用的资源"></blockquote>`
  - 行内引用： `<q cite="http:xxx"></q>`

- 缩略语
  - `<abbr title="超文本标记语言（Hypertext Markup Language）">HTML</abbr>`

## 文档组成部分

包括：
- `<header>`：页眉。
- `<nav>`：导航栏。
- `<main>`：主内容,每一个页面上只能用一次<main>，且直接位于<body>中，最好不要把它嵌套进其他元素，主内容中还可以有各种子内容区段
  - `<article>`： 内容即一篇文章
  - `<section>`: 
  - `<div>`：是一个块级无语义元素，应仅用于找不到更好的块级元素时，或者不想增加特定的意义时
- `<aside>`：侧边栏，经常嵌套在 <main> 中，简介信息
- `<footer>`：页脚。

示例如下：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>二次元俱乐部</title>
    <link href="https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
  </head>
  <body>
    <header> <!-- 本站所有网页的统一主标题 -->
      <h1>聆听电子天籁之音</h1>
    </header>
    <nav> <!-- 本站统一的导航栏 -->
      <ul>
        <li><a href="#">主页</a></li>
        <!-- 共n个导航栏项目，省略…… -->
      </ul>
      <form> <!-- 搜索栏是站点内导航的一个非线性的方式。 -->
        <input type="search" name="q" placeholder="要搜索的内容">
        <input type="submit" value="搜索">
      </form>
    </nav>
    <main> <!-- 网页主体内容 -->
      <article>
        <!-- 此处包含一个 article（一篇文章），内容略…… -->
      </article>
      <aside> <!-- 侧边栏在主内容右侧 -->
        <h2>相关链接</h2>
        <ul>
          <li><a href="#">这是一个超链接</a></li>
          <!-- 侧边栏有n个超链接，略略略…… -->
        </ul>
      </aside>
    </main>
    <footer> <!-- 本站所有网页的统一页脚 -->
    
      <p>© 2050 某某保留所有权利</p>
    </footer>
  </body>
</html>
```

## 多媒体标签

- 视频
  - `<video>：` 可以嵌入视频
```html
<!--controls: 用户可以控制视频和音频的回放功能-->
<video src="rabbit320.webm" controls>
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>


```
- 音频
  - `<audio>`: 嵌入音频
```html
  <body>
    <h1>Below is an audio player that will play in all modern browsers</h1>
    <audio controls>
        <!--浏览器将会检查 <source> 标签，并且播放第一个与其自身 codec 相匹配的媒体。-->
      <source src="viper.mp3" type="audio/mp3">
      <source src="viper.ogg" type="audio/ogg">
      <p>Your browser doesn't support HTML5 audio. Here is a <a href="viper.mp3">link to the audio</a> instead.</p> 
    </audio>
  </body>
```

### 响应式图片

- 方式一：
```html
<!--自适应图片: 默认是400px的，如果屏幕最大宽度小于或等于480px，用120px那张-->
<!--srcset中要正确显示图片的路径-->
<img srcset="images/firefoxlogo400.png 400w,
              images/firefoxlogo120.png 120w"
      sizes="(max-width: 480px) 120px,400px"
      src="images/firefoxlogo400.png" alt="firefox_log">
```
- 方式二
```html
<picture>
    <source media="(max-width: 600px)" srcset="images/redpanda600.png">
    <img src="images/redpanda1200.png" alt="redpanda">
</picture>
```
## 嵌入iframe
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/vSBcrmx4aFw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!--
1. frameborder: 如果设置为1，则会告诉浏览器在此框架和其他框架之间绘制边框，这是默认行为。0删除边框。不推荐这样设置，因为在CSS中可以更好地实现相同的效果。border: none;

2. allowfullscreen： 如果设置，<iframe>则可以通过全屏API设置为全屏模式
-->
```
- `<iframe>`元素允许您将其他web文档嵌入到当前文档中，比如Disqus等评论系统。**很适合引入第三方内容**

## 矢量图像

- 位图使用像素网格来定义 — 一个位图文件精确得包含了每个像素的位置和它的色彩信息。流行的位图格式包括 Bitmap (.bmp), PNG (.png), JPEG (.jpg), and GIF (.gif.)
- 矢量图使用算法来定义 — 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。 SVG 格式可以让我们创造用于 Web 的精彩的矢量图形。

> SVG 是用于描述矢量图像的XML语言。 它基本上是像HTML一样的标记，只是你有许多不同的元素来定义要显示在图像中的形状，以及要应用于这些形状的效果

