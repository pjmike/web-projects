JavaScript 是轻量级解释型语言。浏览器接受到JavaScript代码，并以代码自身的文本格式运行它。从技术角度上看，几乎所有现代的JavaScript转换器都运用一种叫做即时编译（just-in-time compiling）的技术来改善它的表现


# 学习资料

- 阮一峰的JavaScript入门教程：[JavaScript教程](https://wangdoc.com/javascript/index.html)


# JS入门


## 脚本调用策略

脚本调用策略小结：

- 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async。
- 如果脚本需要等待解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中。


## 变量

- 存放数值的容器 （仅仅是用于存储数值的容器，不是数值本身）
- 变量能够存储任何的东西——不只是字符串和数字，变量可以存储更复杂的数据，甚至是函数
- 声明一个变量，可以使用let或var，推荐使用let (var存在于旧的JS代码，有些遗留问题)

PS: let声明的变量只在它所在的代码块有效



### 变量类型
- Number 对象将把传递给它的任何东西转换成一个数字
- 每个数字都有一个名为 toString() 的方法，它将把它转换成等价的字符串

### 动态类型
JS是一种动态类型语言，你不需要指定变量将包含什么数据类型（例如number或string)

```javascript
let myName = '500'
typeof myName; //string
myName = 500
typeof myName //number
```


## 函数

匿名函数：
```javascript
var myButton = document.querySelector('button');

myButton.onclick = function() {
  alert('hello');
}
```

## 事件
```javascript
var btn = document.querySelector('button');

btn.onclick = function() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```
- onclick 是被用在这个情景下的事件处理器的属性

addEventListener()函数：
- 具体化了两个参数——我们想要将处理器应用上去的事件名称，和包含我们用来回应事件的函数的代码

```javascript
btn.addEventListener('click', function() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
});
```
- 相对应：removeEventListener()方法移除事件监听器

同一监听器注册多个处理器(当元素被点击时两个函数都会工作）：
```javascript
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);
```

### **事件对象**：

- 有时候在事件处理函数内部，您可能会看到一个固定指定名称的参数，例如event，evt或简单的e。 这被称为事件对象，它被自动传递给事件处理函数，以提供额外的功能和信息
```js
function bgChange(e) {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}  

btn.addEventListener('click', bgChange);
```
- 在函数中设置背景颜色样式在e.target上-它指的是按钮本身
- 事件对象 e 的target属性始终是事件刚刚发生的元素的引用

## 对象
```javascript
var person = {
  name : ['Bob', 'Smith'],
  age : 32,
  gender : 'male',
  interests : ['music', 'skiing'],
  bio : function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
```
- 对象： 包含相关数据和方法的集合
- 对象成员的值可以是任意的
- 对象也可以创建新的成员
- 括号表示法： person['age']

## 原型

参考资料：
- https://mp.weixin.qq.com/s/JzgalzgnhVjg0119xEf4BQ
- https://javascript.ruanyifeng.com/oop/prototype.html

### 原型的基本概念



大部分面向对象的编程语言，都是通过“类”（class）来实现对象的继承。JavaScript 语言的继承则是通过“原型对象”（prototype）

JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。

```javascript
function f() {}
typeof f.prototype // "object"
```
- 每个函数都有一个prototype属性，指向同一个对象
- 函数f默认具有prototype属性，指向一个对象
- 对于普通函数来说，该属性基本无用，但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型 

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white
```
- 构造函数Animal的prototype属性，就是实例对象cat1和cat2的原型对象，原型对象上添加一个color属性，结果，实例对象都共享了该属性，该原型对象就相当于两个cat的妈，两个对象继承了妈的所有特点，但是它们各自又可以自定义属性

- 原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。
- 当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法

总结：
- 原型对象的作用，就是定义所有实例对象共享的属性和方法，而实例对象可以视作从原型对象衍生出来的子对象

### 原型链

JavaScript 规定，所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

- PS: 跟Java的层层继承有点像，最终会到Object的prototype

如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。

- PS： Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null

```javascript
Object.getPrototypeOf(Object.prototype)
// null
```
- Object.getPrototypeOf方法返回参数对象的原型


#### **原型链的向上搜索**
- 读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）


如果让构造函数的prototype属性指向一个数组，就意味着实例对象可以调用数组方法。
```javascript
var MyArray = function () {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length // 3
mine instanceof Array // true
```
- prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数

```javascript
function P() {}
var p = new P();

p.constructor === P // true
p.constructor === P.prototype.constructor // true
p.hasOwnProperty('constructor') // false
```
- p是构造函数P的实例对象，但是p自身没有constructor属性，该属性其实是读取原型链上面的P.prototype.constructor属性
- constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = {
  method: function () {}
};

Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true
```
- 修改原型对象时，一般要同时修改constructor属性的指向
```javascript
// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法
C.prototype.method1 = function (...) { ... };
```
- 要么将constructor属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证instanceof运算符不会失真


**instanceof**
- instanceof的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上。有一种特殊情况，就是左边对象的原型链上，只有null对象。这时，instanceof判断会失真
```javascript
var obj = Object.create(null);
typeof obj // "object"
Object.create(null) instanceof Object // false
```

- instanceof运算符只能用于对象，不适用原始类型的值
```javascript
var s = 'hello';
s instanceof String // false
```

### 构造函数的继承

让一个构造函数继承另一个构造函数，是非常常见的需求。这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数。
```
function Sub(value) {
  Super.call(this);
  this.prop = value;
}
```
第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型
```
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';
```

举例说明，下面是一个Shape构造函数：
```javascript
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
```
我们需要让Rectangle构造函数继承Shape
```javascript
// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
```

### 模块

模块是实现特定功能的一组属性和方法的封装。

简单的做法是把模块写成一个对象，所有的模块成员都放到这个对象里面。
```javascript
var module1 = new Object({
　_count : 0,
　m1 : function (){
　　//...
　},
　m2 : function (){
  　//...
　}
});
```

#### **1. 封装私有变量：构造函数的写法**

```javascript
function StringBuilder() {
  this._buffer = [];
}

StringBuilder.prototype = {
  constructor: StringBuilder,
  add: function (str) {
    this._buffer.push(str);
  },
  toString: function () {
    return this._buffer.join('');
  }
};
```

## Object的相关方法

### Object.create()

生成实例对象的常用方法是，使用new命令让构造函数返回一个实例。但是很多时候，只能拿到一个实例对象，它可能根本不是由构建函数生成的，那么能不能从一个实例对象，生成另一个实例对象呢？


JavaScript 提供了Object.create方法，用来满足这种需求。该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。

```javascript
// 原型对象
var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true
```
- Object.create方法以A对象为原型，生成了B对象，B继承了A的所有属性和方法



## JS异步


### 单线程模型

单线程模型指的是，JavaScript 只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待

缺点：
- 只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 JavaScript 代码长时间运行（比如死循环）

- JavaScript 语言本身并不慢，慢的是读写外部数据，比如等待 Ajax 请求返回结果。这个时候，如果对方服务器迟迟没有响应，或者网络不通畅，就会导致脚本的长时间停滞


### 同步任务和异步任务

- 同步任务：那些没有被引擎挂起，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务

- 异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应

### 任务队列和事件循环

JS运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue) ，里面是各种需要程序处理的异步任务。


主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行


异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作

引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）

### 异步操作的模式

#### 1. 回调函数

```javascript
function f1(callback) {
  // ...
  callback();
}

function f2() {
  // ...
}

f1(f2);
```
- f2必须等到f1执行完成，才能执行。

#### 2. 事件监听

```javascript
f1.on('done', f2); // 为f1绑定一个事件

function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done'); //触发done事件
  }, 1000);
}
//当f1发生done事件时，就执行f2
```


#### 3. 发布订阅模式

```javascript
jQuery.subscribe('done', f2); //订阅done信号

function f1() {
  setTimeout(function () {
    // ...
    jQuery.publish('done'); //发布done信号
  }, 1000);
}
```


### 异步操作的流程控制

#### 串行执行

```javascript
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

function series(item) {
  if(item) {
    async( item, function(result) {
      results.push(result);
      return series(items.shift());
    });
  } else {
    return final(results[results.length - 1]);
  }
}

series(items.shift());
```
- 函数series就是串行函数，它会依次执行异步任务，所有任务都完成后，才会执行final函数。items数组保存每一个异步任务的参数，results数组保存每一个异步任务的运行结果

### Promise对象
```javascript
// 传统写法
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // ...
      });
    });
  });
});

// Promise 的写法
(new Promise(step1))
  .then(step2)
  .then(step3)
  .then(step4);
```
- 传统的写法可能需要把f2作为回调函数传入f1，比如写成f1(f2)，异步操作完成后，在f1内部调用f2。Promise 使得f1和f2变成了链式写法。不仅改善了可读性，而且对于多层嵌套的回调函数尤其方便


> 有点类似Java8 中的CompletableFuture


## DOM

DOM是JS操作网页的接口，全称为"文档对象模型"。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。



#  浏览器



## script原理

为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对`<script>`元素加入defer属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。

### defer属性

```javascript
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```

### async属性
解决“阻塞效应”的另一个方法是对`<script>`元素加入async属性。`

```javascript
<script src="a.js" async></script>
<script src="b.js" async></script>
```

async属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

- 浏览器开始解析 HTML 网页。
- 解析过程中，发现带有async属性的script标签。
- 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`标签中的外部脚本。
- 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
- 脚本执行完毕，浏览器恢复解析 HTML 网页。


## 浏览器的组成

浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。

### 渲染引擎

渲染引擎处理网页时，通常分为4个阶段：
- 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
- 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
- 布局：计算出渲染树的布局（layout）。
- 绘制：将渲染树绘制到屏幕。

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了


- 参考资料：[浏览器的渲染原理](https://coolshell.cn/articles/9666.html)


###  JS引擎

JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行

JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。


## AJAX

AJAX，它是 Asynchronous JavaScript and XML 的缩写，JS的异步通信


具体来说，AJAX 包括以下几个步骤。

- 创建 XMLHttpRequest 实例
- 发出 HTTP 请求
- 接收服务器传回的数据
- 更新网页数据


AJAX 通过原生的XMLHttpRequest对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。


下面是例子：
```javascript
var xhr = new XMLHttpRequest();
//指定回调函数，监听通信状态（readyState属性）的变化
//XMLHttpRequest.onreadystatechange属性指向一个监听函数。readystatechange事件发生时（实例的readyState属性变化），就会执行这个属性。
xhr.onreadystatechange = function() {
    //通信成功时，状态值为4
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr,this.responseText);
        } else {
            console.error(xhr.statusText);
        }
    }
}

xhr.onerror = function (e) {
    console.error(xhr.statusText);
}
xhr.open("GET","/endpoint",true); //第三个true表示请求是异步的
xhr.send(null); //send()的参数为null，表示发送请求的时候，不带有数据体。如果发送的是 POST 请求，这里就需要指定数据体
```

## 同源限制

### 1. 含义

同源政策，它的含义是指：A网页设置的Cookie，B网页不能打开，除非这个网页"同源"，所谓"同源" 指的是"三个相同"

- 协议相同
- 域名相同
- 端口相同


举例来说，http://www.example.com/dir/page.html这个网址，协议是http://，域名是www.example.com，端口是80（默认端口可以省略），它的同源情况如下。

- http://www.example.com/dir2/other.html：同源
- http://example.com/dir/other.html：不同源（域名不同）
- http://v2.www.example.com/dir/other.html：不同源（域名不同）
- http://www.example.com:81/dir/other.html：不同源（端口不同）
- https://www.example.com/dir/page.html：不同源（协议不同）


### 2. 目的

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。


### 3. 限制范围
- 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
- 无法接触非同源网页的 DOM。
- 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）

另外，通过 JavaScript 脚本可以拿到其他窗口的window对象。如果是非同源的网页，目前允许一个窗口可以接触其他网页的window对象的九个属性和四个方法

### 4. Cookie

Cookie是服务器写入浏览器的一小段信息，只有同源的网页才能共享，如果两个网页一级域名相同，只是次级域名不同，浏览器允许通过设置document.domain共享Cookie

举例来说，A 网页的网址是http://w1.example.com/a.html，B 网页的网址是http://w2.example.com/b.html，那么只要设置相同的document.domain，两个网页就可以共享 Cookie。因为浏览器通过document.domain属性来检查是否同源。
```javascript
// 两个网页都需要设置
document.domain = 'example.com';
```
注意，A 和 B 两个网页都需要设置document.domain属性，才能达到同源的目的。因为设置document.domain的同时，会把端口重置为null，因此如果只设置一个网页的document.domain，会导致两个网址的端口不同，还是达不到同源的目的

### 5. iFrame和多窗口通信


iframe元素可以在当前网页之中，嵌入其他网页。每个iframe元素形成自己的窗口，即有自己的window对象。iframe窗口之中的脚本，可以获得父窗口和子窗口。但是，只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的 DOM。


### 6. AJAX

同源政策规定，AJAX请求只能发送给同源的网址，否则就报错。

除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三个方法规避这个限制：
- JSONP
- WebSocket
- CORS


#### 6.1 JSONP
JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单易用，没有兼容性问题，老式浏览器全部支持，服务端改造非常小。

> 注意：JSONP只支持GET请求，而与他作用类似的CORS支持所有类型HTTP请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

- 第一步，网页添加一个`<script>`元素，向服务器请求一个脚本，这不受同源政策限制，可以跨域请求。
```javascript
<script src="http://api.foo.com?callback=bar"></script>
```
注意，请求的脚本网址有一个callback参数（?callback=bar），用来告诉服务器，客户端的回调函数名称（bar）。

- 第二步，服务器收到请求后，拼接一个字符串，将 JSON 数据放在函数名里面，作为字符串返回（bar({...})）

- 第三步，客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是`<script>`标签请求的脚本内容。这时，客户端只要定义了bar()函数，就能在该函数体内，拿到服务器返回的 JSON 数据。

示例：
```javascript
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```

- 通过动态添加`<script>`元素，向服务器example.com发出请求，注意该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必须的

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。
```javascript
foo({
  'ip': '8.8.8.8'
});
```

由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用JSON.parse的步骤。



#### 6.2 WebSocket


WebSocket 是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信

```javascript
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

上面代码中，有一个字段是Origin，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了Origin这个字段，所以 WebSocket 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。
```javascript
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

#### 6.3 CORS通信

CORS，跨域资源共享，它允许浏览器向跨域的服务器，发出XMLHttpRequest请求，从而克服AJAX只能同源使用的限制。


CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能。

整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，**CORS 通信与普通的 AJAX 通信没有差别，代码完全一样**。浏览器一旦发现 AJAX 请求跨域，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感知。因此，实现 CORS 通信的关键是服务器。**只要服务器实现了 CORS 接口，就可以跨域通信**。

- 参考资料：https://wangdoc.com/javascript/bom/cors.html



# JS的闭包

闭包，可以简单理解为能够读取其他函数内部变量的**函数**。


由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

如下列的f2()函数就是闭包：
```javascript
　　function f1(){

　　　　var n=999;

　　　　function f2(){
　　　　　　alert(n);
　　　　}

　　　　return f2;

　　}

　　var result=f1();

　　result(); // 999
```


