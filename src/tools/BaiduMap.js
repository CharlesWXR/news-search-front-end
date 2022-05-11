export function BaiduMap(ak) {
    return new Promise(function (resolve, reject) {
        window.BaiduMap = function () {
            resolve();
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://api.map.baidu.com/api?v=3.0&type=webgl&ak=${ak}&callback=BaiduMap`;
        script.onerror = reject;
        document.head.appendChild(script);
    })
}