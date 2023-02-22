// allow displaying certain sites in iframe

// change header options
chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        // console.log("iframe fix header info");
        // console.log(info);
        var headers = info.responseHeaders;
        for (var i = headers.length - 1; i >= 0; --i) {
            var header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options') {
                headers.splice(i, 1); // Remove header
            }
        }
        return {
            responseHeaders: headers,
        };
    }, {
        urls: ['https://*.instagram.com/*'],
    }, ['blocking', 'responseHeaders', "extraHeaders"]
);