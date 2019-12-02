## CSS简介
```css
h1 {
    color: red;
    font-size: 5em;
}
```
- 选择器+ { } + 属性(property)：值(value)

入门案例：[css-test](../css-example/css-test/style.css)


### 内部样式表

内部样式表是指不使用外部CSS文件，而是将CSS放在HTML文件`<head>`标签里的`<style>`标签之中。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
    <style>
      h1 {
        color: blue;
        background-color: yellow;
        border: 1px solid black;
      }

      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first CSS example</p>
  </body>
</html>
```
### 内联样式表

内联样式表存在于HTML元素的style属性之中。其特点是每个CSS表只影响一个元素：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
  </head>
  <body>
    <h1 style="color: blue;background-color: yellow;border: 1px solid black;">Hello World!</h1>
    <p style="color:red;">This is my first CSS example</p>
  </body>
</html>
```
- **注意：除非你有充足的理由，否则不要这样做！它难以维护**

## CSS是如何工作的

![css_work](./images/css_work.png)

- 浏览器载入HTML文件（比如从网络上获取）。
- 将HTML文件转化成一个DOM（Document Object Model），DOM是文件在计算机内存中的表现形式
- 浏览器会拉取该HTML相关的大部分资源，比如嵌入到页面的图片、视频和CSS样式。JavaScript则会稍后进行处理，
- 浏览器拉取到CSS之后会进行解析，根据选择器的不同类型（比如element、class、id等等）把他们分到不同的“桶”中。浏览器基于它找到的不同的选择器，将不同的规则（基于选择器的规则，如元素选择器、类选择器、id选择器等）应用在对应的DOM的节点中，并添加节点依赖的样式（这个中间步骤称为渲染树）。
- 上述的规则应用于渲染树之后，渲染树会依照应该出现的结构进行布局。
- 网页展示在屏幕上（这一步被称为着色）


### DOM
一个DOM有一个树形结构，标记语言中的每一个元素、属性以及每一段文字都对应着结构树中的一个节点

for example:
```html
<p>
  Let's use:
  <span>Cascading</span>
  <span>Style</span>
  <span>Sheets</span>
</p>
```
生成的DOM树形结构：
```
P
├─ "Let's use:"
├─ SPAN
|  └─ "Cascading"
├─ SPAN
|  └─ "Style"
└─ SPAN
   └─ "Sheets"
```

## CSS特性

### 层叠与继承
层叠
- Stylesheets cascade(样式表层叠)： css规则的顺序很重要；当应用两条同级别的规则到一个元素的时候，**写在后面的就是实际使用的规则**。

优先级
- 一个元素选择器不是很具体 — 会选择页面上该类型的所有元素 — 所以它的分数就会低一些。
- 一个类选择器稍微具体点 — 它会选择该页面中有特定 class 属性值的元素 — 所以它的分数就要高一点。

for example:
```
.main-heading { 
    color: red; 
}
        
h1 { 
    color: blue; 
}

<h1 class="main-heading">This is my heading.</h1>
```

继承：
- 一些设置在父元素上的css属性是可以被子元素继承的，比如color 和font-family，有些则不能，比如width，margins, padding, 和 borders 不会被继承
```css
body {
    color: blue;
}
/**/
span {
    color: black;
}
```
控制继承（CSS为控制继承提供了4个特殊的通用属性值）每个css属性都接收这些值：
- inherit：设置该属性会使子元素属性和父元素相同
- initial：设置属性值和浏览器默认样式相同
- unset：将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit
- all: all属性可以重设所有属性值


一般情况下是：优先级 > 资源顺序


### 选择器

- 元素选择器
```css
h1 {} 
```
- 类选择器
```css
.box{}
```
- ID选择器
```css
#one {
    background-color: yellow;
}
h1#heading {
    color: rebeccapurple;
}
```
- 属性选择器
```css
a[title] { }
```
- 伪类选择器
```css
/*文章段落的第一段*/
article p:first-child {
    font-size: 120%;
    font-weight: bold;
}
/*鼠标悬停*/   
a:hover {
    color:hotpink;
}
```
- 伪元素选择器
```css
/*选择第一行*/
article p::first-line {
    font-size: 120%;
    font-weight: bold;
}     
```
- 组合伪类和伪元素
```css
article p:first-child::first-line { 
  font-size: 120%; 
  font-weight: bold; 
}
```
- 后代选择器
```css
.box p {
    color: red;
}  
```
- 子选择器
```css
.box p {
    color: red;
}  
```

### 盒模型
完整的 CSS 盒模型应用于块级盒子，内联盒子只使用盒模型中定义的部分内容。模型定义了盒的每个部分 —— margin, border, padding, and content —— 合在一起就可以创建我们在页面上看到的内容

CSS中组成一个块级盒子需要:

- **Content box**: 这个区域是用来显示内容，大小可以通过设置 width 和 height.
- **Padding box**: 包围在内容区域外部  的空白区域； 大小通过 padding 相关属性设置。
- **Border box**: 边框盒包裹内容和内边距。大小通过 border 相关属性设置。
- **Margin box**: 这是最外面的区域，是盒子和其他元素之间的空白区域。大小通过 margin 相关属性设置

![box-model](./images/box-model.png)

在标准模型中，如果你给盒设置 width 和 height，实际设置的是 **content box**。 padding 和 border 再加上设置的宽高一起决定整个盒子的大小
```css
.box {
  width: 350px;
  height: 150px;
  margin: 25px;
  padding: 25px;
  border: 5px solid black;
}
```

### CSS的背景样式

#### 背景
```
.b {
  background-image: url(star.png);
  background-color: black;
  background-repeat: repeat-x;
}
<div class="wrapper">
  <div class="box a"></div>
  <div class="box b"></div>
</div>
```
- background-position属性允许您选择背景图像显示在其应用到的盒子中的位置。它使用的坐标系中，框的左上角是(0,0)，框沿着水平(x)和垂直(y)轴定位
- 可以使用 background-size属性，它可以设置长度或百分比值，来调整图像的大小以适应背景

#### 边框
```css
.box { 
  border: 1px solid black; 
} 
```
- 使用border为一个框的所有四个边设置边框

### Overflowing content (内容溢出)
```css
.box {
  border: 1px solid #333333;
  width: 200px;
  height: 100px;
  /*隐藏超出边框的内容*/
  overflow: hidden;
  /*做成滚动条*/
  /*overflow: scroll*/
}
```
```html
<div class="box">This box has a height and a width. This means that if there is too much content to be displayed within the assigned height, there will be an overflow situation. If overflow is set to hidden then any overflow will not be visible.</div>

<p>This content is outside of the box.</p>
```

### 值和单位

#### 相对长度单位

- em: 父元素的字体大小——带有ems类的<ul>内的<li>元素从它们的父元素中获取大小。因此，每一个连续的嵌套级别都会逐渐变大，因为每个嵌套的字体大小都被设置为1.3em—是其父嵌套字体大小的1.3倍
- rem: 根元素的字体大小——<ul>内的<li>元素和一个rems类从根元素(<html>)中获取它们的大小。这意味着每一个连续的嵌套层都不会不断变大。

#### 百分比
百分比的问题在于，它们总是相对于其他值设置的。例如，如果将元素的字体大小设置为百分比，那么它将是元素父元素字体大小的百分比。如果使用百分比作为宽度值，那么它将是父值宽度的百分比


#### rgb()与rgba()

- rgb() ——RGB值是一个函数—RGB()—它有三个参数，表示颜色的红色、绿色和蓝色通道值，与十六进制值的方法非常相似。RGB的不同之处在于，每个通道不是由两个十六进制数字表示的，而是由一个介于0到255之间的十进制数字表示的
- rgba() ——使用RGBA颜色——它们的工作方式与RGB颜色完全相同，因此您可以使用任何RGB值，但是有第四个值表示颜色的alpha通道，它控制不透明度。如果将这个值设置为0，它将使颜色完全透明，而设置为1将使颜色完全不透明


### 字体栈
```css
p {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}
```
在这种情况下，浏览器从列表的第一个开始，然后查看在当前机器中，这个字体是否可用。如果可用，就把这个字体应用到选中的元素中。如果不可用，它就移到列表中的下一个字体，然后再检查

### 文本对齐
 text-align 属性用来控制文本如何和它所在的内容盒子对齐，比如text-align: center


 ## CSS布局

 ### display属性

 在css中实现页面布局的主要方法是设定display属性的值。此属性允许我们更改默认的显示方式。

 正常流中的所有内容都有一个display的值，用作元素的默认行为方式：
 - display:block——显示在段落下面
 - display:inline——与文本的其余内容保持内联，并且不会打断到该行，比如`<a>`元素就是默认该值


 ### Flex布局

参考资料：ruanyifeng.com/blog/2015/07/flex-grammar.html

 #### 1. 基本概念
 > 利用了display:flex

 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

 ![flex](./images/flex.png)

 容器默认存在两根轴:
 - 水平的主轴
 - 垂直的交叉轴

 项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size
 ```css
 .box {
   display:flex
 }
 ```
 
 #### 2. 容器的属性

 - flex-direction属性: 决定主轴的方向

 ```css
 .box {
  flex-direction: row | row-reverse | column | column-reverse;
}
 ```
 - flex-wrap属性: 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行
   - nowarp: 默认不换行
   - wrap: 换行，第一行在上方
   - wrap-reverse：换行，第一行在下方。
- **flex-flow**: flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
- justify-content属性: justify-content属性定义了项目在主轴上的对齐方式。
```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
- align-items属性: 定义项目在交叉轴上如何对齐。
- align-content属性: align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用


#### 3. 项目的属性

- order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
- **flex属性**是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
- align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch






