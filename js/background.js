/**
 */
$().ready(function(){
    console.log("Lb init....");
    $("#on").click(function(){
        chrome.tabs.executeScript(null, {code: "document.body.style.backgroundColor='#fff';", allFrames:true});
    });
    $("#off").click(function(){
        chrome.tabs.executeScript(null, {code: "document.body.style.backgroundColor='#000';", allFrames:true});
    });
    $("#_tsHello").click(function(){
        var notification = new Notification("中华人民共和国1",{body:"中华人民共和国2", icon:"img/alien.png", tag:""});
        notification.show();
    });
    $("#_autoComplete").click(function(){
        chrome.tabs.executeScript(null, {code: "autoDeal();"});
    });
    $("#_calcWorkTime").click(function(){
        chrome.tabs.executeScript(null, {code: "lvmamaWkTime.calcWorkTime();"});
    });
    $("#_lvmamaAddBGDiv").click(function(){
        chrome.tabs.executeScript(null, {code: "lvmamaAddBGDiv();"});
    });
    $("#_openChatTab").click(function(){
        chrome.tabs.create({'url': 'html/chat_tab.html'});
    });
    $("#_openSQLConvert").click(function(){
        chrome.tabs.create({'url': 'html/SQLFromCSV.html'});
    });

});

chrome.tabs.onCreated.addListener(function (tabId, changeInfo, tab) {
    initialize(tabId);
});

//chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
//    initialize(tabId);
//});

function initialize(tabId) {
    chrome.tabs.executeScript(null, {file: "js/jquery-1.9.1.min.js"});
    chrome.tabs.executeScript(null, {file: "js/lbmars.js"});
    chrome.tabs.executeScript(null, {file: "js/lvmamaWkTime.js"});
}
