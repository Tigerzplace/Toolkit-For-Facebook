// For certain sites, sub-frame must use mobile user agent

var chromeOnIphone = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36';

// change user agent for all requests
// chrome.webRequest.onBeforeSendHeaders.addListener(function (data) {
//     console.log("sub-frame fix header info");
//     console.log(data);
//     data.requestHeaders.push({
//         name: 'User-Agent',
//         value: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36',
//     });
//
//     data.requestHeaders.push({
//         name: 'Cache-Control',
//         value: 'max-age=0',
//     });
//
//     return {
//         requestHeaders: data.requestHeaders,
//     };
// }, {
//     urls: ['https://*.instagram.com/*'],
//     types: ["sub_frame"],
// }, ["requestHeaders", "blocking", "extraHeaders"]);

// todo : modify only post requests
chrome.webRequest.onBeforeSendHeaders.addListener(
    function (info) {
        console.log('info is');
        console.log(info);
        var userAgentSet = null;
        var cacheControlSet = null;
        for (var index = 0; index < info.requestHeaders.length; index++) {
            if (info.requestHeaders[index].name.toLowerCase() === 'user-agent') {
                info.requestHeaders[index].value = chromeOnIphone;
                userAgentSet = true;
            }
            if (info.requestHeaders[index].name.toLowerCase() === 'cache-control') {
                info.requestHeaders[index].value = 'max-age=0';
                cacheControlSet = true;
            }
        }
        if (!userAgentSet) {
            info.requestHeaders.push({
                'name': 'User-Agent',
                'value': chromeOnIphone,
            });
        }
        if (!cacheControlSet) {
            info.requestHeaders.push({
                name: 'Cache-Control',
                value: 'max-age=0',
            });
        }

        return {requestHeaders: info.requestHeaders};
    },
    {
        urls: ['https://*.instagram.com/*'],
        types: ["sub_frame"],
    },
    ['blocking', 'requestHeaders', "extraHeaders"]
);