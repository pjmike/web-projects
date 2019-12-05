JavaScript 是轻量级解释型语言。浏览器接受到JavaScript代码，并以代码自身的文本格式运行它。从技术角度上看，几乎所有现代的JavaScript转换器都运用一种叫做即时编译（just-in-time compiling）的技术来改善它的表现


## JS入门


### 脚本调用策略

脚本调用策略小结：

- 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async。
- 如果脚本需要等待解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中。


### 变量

- 存放数值的容器 （仅仅是用于存储数值的容器，不是数值本身）
- 变量能够存储任何的东西——不只是字符串和数字，变量可以存储更复杂的数据，甚至是函数
- 声明一个变量，可以使用let或var，推荐使用let (var存在于旧的JS代码，有些遗留问题)

#### 变量类型
- Number 对象将把传递给它的任何东西转换成一个数字
- 每个数字都有一个名为 toString() 的方法，它将把它转换成等价的字符串

#### 动态类型
JS是一种动态类型语言，你不需要指定变量将包含什么数据类型（例如number或string)

```javascript
let myName = '500'
typeof myName; //string
myName = 500
typeof myName //number
```


### 函数

匿名函数：
```javascript
var myButton = document.querySelector('button');

myButton.onclick = function() {
  alert('hello');
}
```

### 事件
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

#### **事件对象**：

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

### 对象
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

### 原型

参考资料：
- https://mp.weixin.qq.com/s/JzgalzgnhVjg0119xEf4BQ
- https://javascript.ruanyifeng.com/oop/prototype.html

#### 原型的基本概念



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

#### 原型链

JavaScript 规定，所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

- PS: 跟Java的层层继承有点像，最终会到Object的prototype

如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。

- PS： Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null

```javascript
Object.getPrototypeOf(Object.prototype)
// null
```
- Object.getPrototypeOf方法返回参数对象的原型


**原型链的向上搜索**
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




