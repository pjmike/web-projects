var xhr = new XMLHttpRequest();
//指定回调函数，监听通信状态（readyState属性）的变化
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
xhr.open("GET","/http://example.com",true); //第三个true表示请求是异步的
xhr.send(null); //send()的参数为null，表示发送请求的时候，不带有数据体。如果发送的是 POST 请求，这里就需要指定数据体