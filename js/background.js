document.addEventListener('DOMContentLoaded', function () {
    initActions();
});

function initActions() {
    $("#on")[0].addEventListener("click", function (e) {
        chrome.tabs.executeScript(null, {code: "switchLight('" + e.target.id + "');", allFrames: true});
    });
    $("#off")[0].addEventListener("click", function (e) {
        chrome.tabs.executeScript(null, {code: "switchLight('" + e.target.id + "');", allFrames: true});
    });
    $("#_autoComplete")[0].addEventListener("click", function (e) {
        chrome.tabs.executeScript(null, {code: "autoDeal();", allFrames: true});
    });
    $("#_tsHello")[0].addEventListener("click", function (e) {
        chrome.tabs.executeScript(null, {code: "hello('123');", allFrames: true});
    });
    $("#_tsAutoClose")[0].addEventListener("click", function (e) {
        chrome.tabs.executeScript(null, {code: "autoClose();", allFrames: true});
    });
    $("#_lvmamaAddBGDiv")[0].addEventListener("click", function (e) {
        chrome.tabs.executeScript(null, {code: "lvmamaAddBGDiv();", allFrames: true});
    });
    $("#_calcWorkTime")[0].addEventListener("click", function (e) {
        chrome.tabs.executeScript(null, {code: "calcWorkTime();", allFrames: true});
    });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    initialize(tabId);
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    initialize(tabId);
});

function initialize(tabId) {
    chrome.tabs.executeScript(tabId, {file: "js/jquery-1.9.1.min.js", allFrames: true});
    chrome.tabs.executeScript(tabId, {file: "js/lbmars.js", allFrames: true});
}

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        chrome.tabs.executeScript(null, {code: "switchLight(" + request + ");", allFrames: true});
    }
);
