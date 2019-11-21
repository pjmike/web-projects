/**
 * querySelector()函数获取标题的引用  
 * <p>
 * 声明一个变量，先输入关键字let或者是var
 * </p>
 */

 //添加一个图像切换器
 let myImage = document.querySelector('img');
 myImage.onclick = function() {
     let mySrc = myImage.getAttribute('src');
     if(mySrc === 'images/Netty-1.png') {
         myImage.setAttribute('src','images/components.png');
     } else {
         myImage.setAttribute('src','images/Netty-1.png');
     }
 }

//添加个性化欢迎信息
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

//疑问： 这里为什么会执行，难道是js脚本按顺序执行下来，这里并没有进行事件触发调用？ //TODO
//初始化代码：在页面初次读取时进行构造工作
if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storeName = localStorage.getItem('name');
    myHeading.textContent = '基于Netty的API网关设计与实现，'+storeName;
}

//个性化欢迎信息设置函数
function setUserName() {
    //与alert()类似会弹出一个对话框，这里需要用户输入数据，并保存在myName变量里
    let myName = prompt('请输入你的名字');
    if(!myName || myName === null) {
        //内存存储,kv
        localStorage.setItem('name','pjmike');
    } else {
        localStorage.setItem('name',myName);
        myHeading.innerHTML = '基于Netty的API网关设计与实现，'+myName;
    }
}

//为按钮设置onclick事件处理器
myButton.onclick = function() {
    setUserName();
}