function sendData(data) {
    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;

    //将数据对象转换为URL编码的键/值对数组
    for (name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
    XHR.addEventListener('load', function (event) {
        alert('耶! 已发送数据并加载响应');
    })

    // 定义错误提示
    XHR.addEventListener('error', function (event) {
        alert('哎呀！出问题了。');
    });

    // 建立我们的请求
    XHR.open('POST', 'https://example.com/cors.php');

    // 为表单数据POST请求添加所需的HTTP头
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // 最后，发送我们的数据。
    XHR.send(urlEncodedData);
}