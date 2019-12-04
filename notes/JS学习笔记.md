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

